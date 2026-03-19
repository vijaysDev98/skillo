// import React, {useCallback, useContext, useState} from 'react';
// import {
//   View,
//   StatusBar,
//   StyleSheet,
//   Dimensions,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Alert,
//   ScrollView,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Platform,
//   SafeAreaView,
//   TextInput,
//   Pressable,
//   ImageBackground,
// } from 'react-native';

// //ASSETS
// import {FONTS, IMAGES} from '../../assets';

// //CONTEXT
// import {ThemeContext, ThemeContextType} from '../../context';

// //CONSTANT
// import {getScaleSize, useString} from '../../constant';

// //COMPONENT
// import {
//   AssistanceItems,
//   CalendarComponent,
//   Header,
//   HomeHeader,
//   Input,
//   ProgressSlider,
//   SearchComponent,
//   ServiceItem,
//   Text,
//   TimePicker,
// } from '../../components';

// //PACKAGES
// import {useFocusEffect} from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import { SCREENS } from '..';

// const {width} = Dimensions.get('window');
// const cellSize = (width - 30) / 7;

// export default function Transport(props: any) {
//   const {service} = props.route.params;
//   const STRING = useString();
//   const {theme} = useContext<any>(ThemeContext);


//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const servicesData = [
//     {
//       id: '1',
//       title: 'Furniture Assembly',
//       image: 'https://picsum.photos/id/1/200/300',
//     },
//     {
//       id: '2',
//       title: 'Interior Painting',
//       image: 'https://picsum.photos/id/1/200/300',
//     },
//   ];

//   useFocusEffect(
//     React.useCallback(() => {
//       if (Platform.OS === 'android') {
//         // StatusBar.setBackgroundColor(theme.white);
//         // StatusBar.setBarStyle('dark-content');
//       }
//     }, []),
//   );

//   const renderItem = useCallback(
//       ({ item, index }: { item: any; index: number }) => {
//         const imageUri = item?.image;

//         return (
//           <Pressable
//             onPress={() => {
//             }}
//             style={[
//               styles(theme).cardContainer,
//             ]}
//           >


//             <ImageBackground
//               source={{ uri: imageUri }}
//               style={[styles(theme).imageView, { overflow: "hidden", }]}
//             >
//               <LinearGradient
//                 colors={["transparent", "#ffffff", "#ffffff"]}
//                 locations={[0.6, 0.9, 1]}
//                 style={styles(theme).listItemLinearContainer}
//               >
//                 <Text
//                   size={getScaleSize(12)}
//                   font={FONTS.Lato.Bold}
//                   align='center'
//                   color={theme.primaryText}
//                 >{item?.title}</Text>
//               </LinearGradient>
//             </ImageBackground>
//           </Pressable>
//         );
//       },
//       [theme, servicesData] // 🔥 dependencies
//     );

//   return (
//     // <View style={styles(theme).container}>
//     //   {/* <Header
//     //     onBack={() => {
//     //       props.navigation.goBack();
//     //     }}
//     //     screenName={STRING.Transport}
//     //   /> */}
//     //    <HomeHeader
//     //     // screenName={selectedCategory ? selectedCategory?.category_name : service?.name}
//     //     screenName={ service}
//     //     onBack={() => props.navigation.goBack()}
//     //   />
//     //   <FlatList
//     //     data={servicesData}
//     //     ListHeaderComponent={() => {
//     //       // return (
//     //       //   // <>
//     //       //     <Image
//     //       //       style={styles(theme).bannerContainer}
//     //       //       resizeMode="contain"
//     //       //       source={IMAGES.viewAllBanner}
//     //       //     />
//     //       //   // </>
//     //       // );
//     //       return (
//     //         // <>
//     //           <Image
//     //             style={styles(theme).bannerContainer}
//     //             source={IMAGES.viewAllBanner}
//     //             resizeMode="contain"
//     //           />             
//     //         // </>
//     //       );
//     //     }}
//     //     renderItem={({item, index}) => (
//     //       <View style={{marginHorizontal: getScaleSize(22)}}>
//     //         <AssistanceItems item={item} index={index} />
//     //       </View>
//     //     )}
//     //     keyExtractor={item => item.id}
//     //     showsVerticalScrollIndicator={false}
//     //     ListFooterComponent={() => {
//     //       return <View style={{height: 16}} />;
//     //     }}
//     //   />
//     //   {/* <ScrollView
//     //     showsVerticalScrollIndicator={false}
//     //     style={{
//     //       marginTop: getScaleSize(40),
//     //       marginHorizontal: getScaleSize(22),
//     //     }}>
//     //     {['',''].map((item)=>{
//     //           return (
//     //             <AssistanceItems />
//     //           )
//     //         })}
//     //   </ScrollView> */}
//     // </View>

//     <View style={styles(theme).container}>
//       <HomeHeader
//         screenName="Transport"
//         onBack={() => props.navigation.goBack()}
//       />
//       <FlatList
//       data={servicesData}
//       numColumns={2}
//       showsVerticalScrollIndicator ={false}
//      ListHeaderComponent={() => (
//   <View style={styles(theme).bannerWrapper}>
//     <Image
//       source={IMAGES.viewAllBanner}
//       style={styles(theme).bannerImage}
//       resizeMode={"contain"}
//     />
//   </View>
// )}
//       renderItem={renderItem}
//       contentContainerStyle={{paddingBottom: getScaleSize(20),paddingHorizontal:getScaleSize(24)}}
//       />

//     </View>
//   );
// }

// const styles = (theme: ThemeContextType['theme']) =>
//   StyleSheet.create({
//     container: {flex: 1, backgroundColor: theme.white},
//     bannerWrapper: {
//   alignItems: 'center', // 👈 center horizontally
//   // marginVertical: getScaleSize(20),
// },

// bannerImage: {
//   height: getScaleSize(161),
//   // width: '100%', // 👈 important for centering
//   borderRadius: getScaleSize(20),
// },
// cardContainer: {
//       borderRadius: getScaleSize(20),
//       backgroundColor: theme._EAF0F3,
//       // width: (Dimensions.get('window').width - getScaleSize(64)) / 2,
//       width:(Dimensions.get('window').width - getScaleSize(250)),
//       // marginLeft: getScaleSize(16),
//       elevation: 1
//     },
//     imageView: {
//       flex: 1.0,
//       borderRadius: getScaleSize(20),
//       height: getScaleSize(120),
//     },
//      listItemLinearContainer: {
//       borderRadius: getScaleSize(20), flex: 1,
//       justifyContent: 'flex-end',
//       paddingBottom: getScaleSize(16)
//     },

//     itemContainer: {
//       marginTop: getScaleSize(42),
//       height: getScaleSize(44),
//       paddingHorizontal: getScaleSize(20),
//       borderRadius: getScaleSize(32),
//       borderWidth: 1,
//       borderColor: '#F1F1F1',
//       flexDirection: 'row',
//     },
//     categoryImage: {
//       height: getScaleSize(24),
//       width: getScaleSize(24),
//       alignSelf: 'center',
//     },
//   });


import React, { useCallback, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ImageBackground,
} from 'react-native';

// ASSETS
import { FONTS, IMAGES } from '../../assets';

// CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

// CONSTANT
import { getScaleSize } from '../../constant';

// COMPONENT
import { HomeHeader, Text } from '../../components';

// PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

// ✅ Responsive card size (2 column)
const CARD_WIDTH = (SCREEN_WIDTH - getScaleSize(48 + 16)) / 2;
// 48 = screen padding (24 + 24)
// 16 = gap between 2 items

const CARD_HEIGHT = CARD_WIDTH * (219 / 183);

export default function Transport(props: any) {
  const { theme } = useContext<any>(ThemeContext);
  const { service } = props.route.params;

  const servicesData = [
    {
      id: '1',
      title: 'Furniture Assembly',
      image: 'https://picsum.photos/id/1/400/400',
    },
    {
      id: '2',
      title: 'Interior Painting',
      image: 'https://picsum.photos/id/2/400/400',
    },
    {
      id: '3',
      title: 'Installation of Lamps',
      image: 'https://picsum.photos/id/3/400/400',
    },
    {
      id: '4',
      title: 'Other Installation',
      image: 'https://picsum.photos/id/4/400/400',
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
      }
    }, [])
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <Pressable style={styles(theme).cardContainer}>
          <ImageBackground
            source={{ uri: item.image }}
            style={[styles(theme).imageView, { overflow: 'hidden' }]}
          >
            <LinearGradient
              colors={["transparent", "#ffffff", "#ffffff"]}
              locations={[0.6, 0.9, 1]}
              style={styles(theme).gradient}
            >
              <Text
                size={getScaleSize(12)}
                font={FONTS.Lato.Bold}
                align="center"
                color={theme.primaryText}
              >
                {item.title}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      );
    },
    [theme]
  );

  return (
    <View style={styles(theme).container}>
      <HomeHeader
        // screenName={selectedCategory ? selectedCategory?.category_name : service?.name}
        screenName={service}
        onBack={() => props.navigation.goBack()}
      />

      <FlatList
        data={servicesData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles(theme).row}
        contentContainerStyle={styles(theme).listContainer}
        ListHeaderComponent={() => (
          <View style={styles(theme).bannerWrapper}>
            <Image
              source={IMAGES.viewAllBanner}
              style={styles(theme).bannerImage}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },

    listContainer: {
      paddingHorizontal: getScaleSize(24),
      paddingBottom: getScaleSize(20),
    },

    row: {
      justifyContent: 'space-between',
      marginBottom: getScaleSize(16),
    },

    bannerWrapper: {
      alignItems: 'center',
      marginVertical: getScaleSize(20),
    },

    bannerImage: {
      height: getScaleSize(161),
      width: '100%',
      borderRadius: getScaleSize(20),
    },

    cardContainer: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: getScaleSize(20),
      backgroundColor: theme._EAF0F3,
      overflow: 'hidden',
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },

    imageView: {
      flex: 1.0,
      borderRadius: getScaleSize(20),
    },

    // gradient: {
    //   paddingBottom: getScaleSize(12),
    //   paddingHorizontal: getScaleSize(8),
    // },
    gradient: {
      borderRadius: getScaleSize(20), flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: getScaleSize(16)
    },
  });