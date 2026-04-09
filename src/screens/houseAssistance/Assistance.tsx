import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
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
import { getScaleSize } from '../../constant';

//COMPONENT
import {
  HomeHeader,
  ProgressView,
  Text,
} from '../../components';

//API
import { SCREENS } from '..';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSubCategoryData } from '../../actions/seekerHome/seekerHomeAction';
import { screenWidth } from '../../constant/scaleSize';

export default function Assistance(props: any) {

  const { service, id } = props?.route?.params || "";
  const dispatch = useAppDispatch()
  const { theme } = useContext<any>(ThemeContext);
  const { serviceCategoryData, isLoading, serviceCategoryList } = useAppSelector(state => state.seekerHome)

  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedCategoryId, setSelectedCategoryId] = useState(id)
  const [from, setFrom] = useState<string>(service);
  const [searchText, setSearchText] = useState('');

  const scrollY = useSharedValue(0);
  const maxScrollOffset = getScaleSize(220);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(getSubCategoryData(selectedCategoryId))
  }, [selectedCategoryId]);

  const search = searchText.toLowerCase();

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
      const isSelected = selectedCategoryId === item?.id;
      return (
        <TouchableOpacity
          style={[
            styles(theme).itemContainer,
            index === 0 ? styles(theme).firstCategoryItem : styles(theme).categoryItem,
            {
              backgroundColor: isSelected
                ? theme.activeTabBg
                : theme.inActiveTabBg,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => {
            if (isSelected) return; // 🔥 avoid unnecessary re-render
            setFrom("")
            setSearchText('');
            setSelectedCategory(item);
            setSelectedCategoryId(item?.id)

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
            source={item?.category_logo ? { uri: item?.category_logo } : IMAGES.childCareImg}
          />

          <Text
            style={styles(theme).categoryText}
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
              height: getScaleSize(219),
              // gap: 10,
            },
          ]}
        >
          <ImageBackground
            source={{ uri: item?.image || '' }}
            style={[styles(theme).imageView, styles(theme).imageBackground]}
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
              >{item?.service_name}</Text>
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
        screenName={from ? from : serviceCategoryData?.Banner?.category_name}
        onBack={() => props.navigation.goBack()}
      />
      <View style={styles(theme).secondContainer}>
        <Animated.View style={[styles(theme).animatedBannerContainer, animatedHeaderStyle]}>
          <>
            {serviceCategoryData?.Banner?.url || IMAGES.viewAllBanner ? (
              <Image
                style={styles(theme).bannerContainer}
                resizeMode="contain"
                source={serviceCategoryData?.Banner?.url
                  ? { uri: serviceCategoryData?.Banner?.url }
                  : IMAGES.viewAllBanner}
              />
            ) : (
              <View style={styles(theme).bannerContainer} />
            )}
            {serviceCategoryList.length > 0 && (
              <View style={styles(theme).tabContainer}>
                <FlatList
                  ref={flatListRef}
                  data={serviceCategoryList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item: any, index: number) => index.toString()}
                  ListHeaderComponent={() => {
                    return <View style={styles(theme).tabListHeaderSpacer} />;
                  }}
                  ListFooterComponent={() => {
                    return <View style={styles(theme).tabListFooterSpacer} />;
                  }}
                  renderItem={categoryRenderItem}
                />
              </View>
            )}
          </>
        </Animated.View>

        <Animated.FlatList
          data={serviceCategoryData?.Services}
          numColumns={2}
          contentContainerStyle={styles(theme).listContentContainer}
          keyExtractor={(item: any, index: number) => index.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles(theme).columnWrapper}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          ListHeaderComponent={() => {
            return <View style={styles(theme).listHeaderSpacer} />;
          }}
          ListFooterComponent={() => {
            return <View style={styles(theme).listFooterSpacer} />;
          }}
          renderItem={subCategoryRenderItem}
          ListEmptyComponent={() => (
            <View style={styles(theme).emptyState}>
              <Text
                size={getScaleSize(16)}
                font={FONTS.Lato.Bold}
                color={theme._8C8C8C}>
                {"No Category Available"}
              </Text>
            </View>
          )}
        />

      </View>
      {isLoading && <ProgressView />}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme._fafafa
    },
    secondContainer: {
      flex: 1,
      overflow: 'hidden'
    },
    animatedBannerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.white,
      alignItems: 'center',
    },
    bannerContainer: {
      height: getScaleSize(161),
      borderRadius: getScaleSize(20),
      marginVertical: getScaleSize(20),
      marginHorizontal: getScaleSize(24),
    },
    tabContainer: {
      height: getScaleSize(40),
    },
    itemContainer: {
      borderRadius: getScaleSize(10),
      paddingHorizontal: getScaleSize(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    firstCategoryItem: {
      marginLeft: 0,
    },
    categoryItem: {
      marginLeft: 8,
    },
    listItemLinearContainer: {
      borderRadius: getScaleSize(20),
      flex: 1,
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
      width: (screenWidth - getScaleSize(64)) / 2,
      marginLeft: getScaleSize(16),
      elevation: 1
    },
    imageView: {
      height: '100%',
      width: '100%',
      borderRadius: getScaleSize(20),
    },
    bookNowButton: {
      position: 'absolute',
      bottom: getScaleSize(35),
      left: getScaleSize(32),
      paddingTop: getScaleSize(12),
      paddingHorizontal: getScaleSize(10),
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(25),
    },
    categoryText: {
      marginLeft: getScaleSize(14),
      alignSelf: 'center',
    },
    imageBackground: {
      overflow: 'hidden',
    },
    listContentContainer: {
      paddingBottom: getScaleSize(16),
      paddingVertical: getScaleSize(16)
    },
    tabListHeaderSpacer: {
      width: getScaleSize(22),
    },
    tabListFooterSpacer: {
      width: getScaleSize(16),
    },
    columnWrapper: {
      paddingLeft: getScaleSize(8),
    },
    listHeaderSpacer: {
      height: getScaleSize(250),
    },
    listFooterSpacer: {
      height: getScaleSize(50),
    },
    emptyState: {
      height: getScaleSize(200),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme._F0EFF0,
      elevation: 2,
      borderRadius: 10,
      marginHorizontal: getScaleSize(24),
    },
  });
