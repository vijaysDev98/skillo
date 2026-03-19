import React, { useContext } from 'react';
import { View,  Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext, ThemeContextType } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import { getScaleSize } from '../constant';
import { FONTS } from '../assets';


const SCREEN_WIDTH = Dimensions.get('window').width;

// ✅ Responsive card size (2 column)
const CARD_WIDTH = (SCREEN_WIDTH - getScaleSize(48 + 16)) / 2;
// 48 = screen padding (24 + 24)
// 16 = gap between 2 items

const CARD_HEIGHT = CARD_WIDTH * (219 / 183);

const ServiceCard = (props:any) => {
    const {theme}=useContext(ThemeContext)
const {handleOnPress,containerStyle,bgImage,name,bgImgStyle,gardiantContainer} = props;

  return (
   <Pressable
          onPress={handleOnPress}
          style={[
            styles(theme).cardContainer,
           containerStyle
          ]}
        >
          <ImageBackground
            source={bgImage}
            style={[styles(theme).imageView,bgImgStyle]}
          >
            <LinearGradient
              colors={["transparent", "#ffffff", "#ffffff"]}
              locations={[0.6, 0.9, 1]}
              style={[styles(theme).gradient,gardiantContainer]}
            >
              <Text
                size={getScaleSize(12)}
                font={FONTS.Lato.Bold}
                align='center'
                color={theme.primaryText}
              >{name}</Text>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
  );
};

export default ServiceCard;

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    // cardContainer: {
    //       borderRadius: getScaleSize(20),
    //       backgroundColor: theme._EAF0F3,
    //       width: (Dimensions.get('window').width - getScaleSize(64)) / 2,
    //       marginLeft: getScaleSize(16),
    //       elevation: 1
    //     },
    //     listItemLinearContainer: {
    //   borderRadius: getScaleSize(20), flex: 1,
    //   justifyContent: 'flex-end',
    //   paddingBottom: getScaleSize(16)
    // },
    //     imageView: {
    //       flex: 1.0,
    //       borderRadius: getScaleSize(20),
    //       overflow: "hidden",
    //     },
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
})