import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,

} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { DummyData, getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  Header,
  HomeHeader,
  ProgressView,
  SearchComponent,
  Text,
} from '../../components';

//API
import { API } from '../../api';
import { SCREENS } from '..';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const cellSize = (width - 30) / 7;

export default function Assistance(props: any) {

  const service = props.route.params?.service;
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState(DummyData.categoryList);
  const [subCategoryList, setSubCategoryList] = useState(DummyData.filteredSubCategories || []);
  const [bannerData, setBannerData] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState(DummyData.filteredSubCategories || []);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollY = useSharedValue(0);
  const maxScrollOffset = getScaleSize(220);
  const flatListRef = useRef<FlatList>(null);

  // useEffect(() => {
  //   getCategoryData();
  // }, []);

  // useEffect(() => {
  //   if (selectedCategory) {
  //     getSubCategoryData(selectedCategory?.id);
  //     setErrorMessage('');
  //   }
  // }, [selectedCategory]);

  // useEffect(() => {
  //   if (!searchText.trim()) {
  //     setFilteredSubCategories(subCategoryList);
  //     return;
  //   }

  const search = searchText.toLowerCase();

  //   const filtered = subCategoryList.filter((item: any) => {
  //     const title = (item?.subcategory_name || "").toLowerCase();
  //     return title.includes(search);
  //   });
  //   console.log('filtered==>', JSON.stringify(filtered.length == 0))
  //   if(filtered?.length == 0){
  //     setErrorMessage('No data found')
  //   }
  //   setFilteredSubCategories(filtered);
  // }, [searchText, subCategoryList]);

  async function getCategoryData() {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getHomeData + `?service_name=${service?.name}`);
      setLoading(false)
      console.log('CAT', JSON.stringify(result))
      if (result.status) {
        setCategoryList(result?.data?.data?.categories ?? []);
        if (result?.data?.data?.categories?.[0]?.id) {
          setSelectedCategory(result?.data?.data?.categories?.[0]);
          getSubCategoryData(result?.data?.data?.categories?.[0]?.id);
        }
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error')
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function getSubCategoryData(id: string) {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getHomeData + `/${id}`);
      setLoading(false)
      if (result.status) {
        console.log('subcategoryList==', JSON.stringify(result?.data?.data?.subcategories?.length < 0))
        setBannerData(result?.data?.data?.Banner ?? null);
        setSubCategoryList(result?.data?.data?.subcategories ?? []);
        setFilteredSubCategories(result?.data?.data?.subcategories ?? []);
        if (result?.data?.data?.subcategories?.length == 0) {
          setErrorMessage('No data found')
        }
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error')
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  console.log('BANNER', JSON.stringify(bannerData))

  // const patterns = searchText ? ['small'] : ['small', 'large', 'large', 'small'];
  const patterns = ['small', 'large', 'large', 'small'];

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, maxScrollOffset],
      [0, -maxScrollOffset],
      'clamp'
    );
    return {
      transform: [{ translateY }],
    };
  });


  const categoryRenderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const isSelected = selectedCategory?.id === item?.id;
      return (
        <TouchableOpacity
          style={[
            styles(theme).itemContainer,
            {
              marginLeft: index === 0 ? 0 : 8,
              backgroundColor: isSelected
                ? theme.activeTabBg
                : theme.inActiveTabBg,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => {
            if (isSelected) return; // 🔥 avoid unnecessary re-render

            setSearchText('');
            setSelectedCategory(item);

            flatListRef.current?.scrollToIndex({
              index,
              animated: true,
              viewPosition: 0.5,
            });
          }}
        >
          <Image
            resizeMode="cover"
            style={styles(theme).categoryImage}
            source={item?.category_logo}
          />

          <Text
            style={{
              marginLeft: getScaleSize(14),
              alignSelf: 'center',
            }}
            size={getScaleSize(16)}
            font={FONTS.Lato.Regular}
            color={isSelected ? theme.primary : theme._8C8C8C}
          >
            {item?.category_name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory, theme] // 🔥 dependencies
  );


  const subCategoryRenderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const type = patterns[index % 4];
      const isLarge = type === 'large';
      const imageUri = item?.image;

      return (
        <Pressable
          onPress={() => {
            props.navigation.navigate(
              SCREENS.CreateRequest.identifier,
              {
                category: selectedCategory || service,
                subCategory: item,
              }
            );
          }}
          style={[
            styles(theme).cardContainer,
            {
              height: isLarge
                ? getScaleSize(233)
                : getScaleSize(188),
              marginTop:
                isLarge && index % 2 === 0
                  ? getScaleSize(-25)
                  : getScaleSize(20),
            },
          ]}
        >


          <ImageBackground
            source={{ uri: imageUri }}
            // style={{
            //     width: "100%",
            //     height: getScaleSize(220),
            //     overflow: "hidden",
            //     marginBottom: getScaleSize(16),
            //     shadowColor: "#000",
            //     shadowOpacity: 0.1,
            //     shadowRadius: 8,
            //     elevation: 4
            // }}
            style={[styles(theme).imageView, { overflow: "hidden", }]}
          >
            <LinearGradient
              colors={["transparent", "#ffffff", "#ffffff"]}
              locations={[0.6, 0.9, 1]}
              style={styles(theme).listItemLinearContainer}
            >
              <Text
                size={getScaleSize(12)}
                font={FONTS.Lato.Bold}
                align='center'
                color={theme.primaryText}
              >{item?.subcategory_name}</Text>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      );
    },
    [patterns, theme, selectedCategory, service] // 🔥 dependencies
  );

  return (
    <View style={styles(theme).container}>
      <HomeHeader
        // screenName={selectedCategory ? selectedCategory?.category_name : service?.name}
        screenName={selectedCategory ? selectedCategory?.category_name : service}
        onBack={() => props.navigation.goBack()}
      />
      <View style={styles(theme).secondContainer}>
        <Animated.View style={[styles(theme).animatedBannerContainer, animatedHeaderStyle]}>
          <>
            {bannerData || IMAGES.viewAllBanner ? (
              // <View>
              <Image
                style={styles(theme).bannerContainer}
                resizeMode="contain"
                source={bannerData ? { uri: bannerData?.url } : IMAGES.viewAllBanner}
              />
              //   /* <TouchableOpacity
              //     activeOpacity={0.8}
              //     onPress={() => {
              //       props.navigation.navigate(SCREENS.CreateRequest.identifier);
              //     }}
              //     style={styles(theme).bookNowButton}>
              //     <Text
              //       size={getScaleSize(14)}
              //       font={FONTS.Lato.Bold}
              //       color={theme.white}>
              //       {STRING.book_now}
              //     </Text>
              //   </TouchableOpacity>
              // </View> */}
            ) : (
              <View style={styles(theme).bannerContainer} />
            )}
            {categoryList.length > 1 && (
              <View style={styles(theme).tabContainer}>
                <FlatList
                  ref={flatListRef}
                  data={categoryList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item: any, index: number) => index.toString()}
                  ListHeaderComponent={() => {
                    return <View style={{ width: getScaleSize(22) }} />;
                  }}
                  ListFooterComponent={() => {
                    return <View style={{ width: getScaleSize(16) }} />;
                  }}
                  renderItem={categoryRenderItem}
                />
              </View>
            )}
          </>
        </Animated.View>
        {/* {subCategoryList && subCategoryList.length > 0 && filteredSubCategories.length > 0 && loading === false ? */}
        <Animated.FlatList
          data={filteredSubCategories}
          numColumns={2}
          contentContainerStyle={{}}
          keyExtractor={(item: any, index: number) => index.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ paddingLeft: getScaleSize(8) }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          ListHeaderComponent={() => {
            return <View style={{ height: categoryList.length > 1 ? getScaleSize(280) : getScaleSize(210) }} />;
          }}
          ListFooterComponent={() => {
            return <View style={{ height: getScaleSize(50) }} />;
          }}
          renderItem={subCategoryRenderItem}
        />
        {/* :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Bold}
              color={theme.primary}>
              {errorMessage ?? 'No Data Available'}
            </Text>
          </View>
        } */}
      </View>
      {!loading && <ProgressView />}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    secondContainer: { flex: 1, overflow: 'hidden' },
    animatedBannerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.white,
      alignItems: 'center',
    },
    deviderView: {
      marginTop: getScaleSize(30),
      height: getScaleSize(6),
      backgroundColor: '#F8F8F8',
    },
    bannerContainer: {
      height: getScaleSize(161),
      borderRadius: getScaleSize(20),
      marginVertical: getScaleSize(20),
      marginHorizontal: getScaleSize(24),
    },
    tabContainer: {
      marginTop: getScaleSize(20),
      height: getScaleSize(50)
    },
    itemContainer: {
      height: getScaleSize(44),
      paddingHorizontal: getScaleSize(20),
      borderRadius: getScaleSize(10),
      flexDirection: 'row',
    },
    listItemLinearContainer: {
      borderRadius: getScaleSize(20), flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: getScaleSize(16)
    },
    categoryImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
    },
    cardContainer: {
      borderRadius: getScaleSize(20),
      backgroundColor: theme._EAF0F3,
      width: (Dimensions.get('window').width - getScaleSize(64)) / 2,
      marginLeft: getScaleSize(16),
      elevation: 1
    },
    imageView: {
      flex: 1.0,
      borderRadius: getScaleSize(20),
    },
    bookNowButton: {
      position: 'absolute',
      bottom: getScaleSize(35),
      left: getScaleSize(32),
      paddingHorizontal: getScaleSize(20),
      paddingVertical: getScaleSize(10),
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(25),
    },
  });
