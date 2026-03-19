import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';

import { AuthContext, ThemeContext, ThemeContextType } from '../context';
import { getScaleSize, useString } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const HomeHeader = (props: any) => {
  const STRING = useString();
  const { theme } = useContext(ThemeContext);
  const { user, profile } = useContext<any>(AuthContext);
  const insets = useSafeAreaInsets();

  const {
    userData,
    bannerImg,
    onPressNotification,
    onSearchPress,
    onPressUserProfile,
    onBack,
    containerStyle,
    screenName
  } = props

  return (
    <LinearGradient
      colors={['#E8C8C5', '#F2DAD6', '#F7E9E6', '#fafafa']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.4, 0.7, 1]}
      style={[
        styles(theme).container,
        {
          paddingTop: insets.top,
          paddingBottom: getScaleSize(10)
        },containerStyle
      ]}
    >
    
        
{props.onBack ?
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          {props.onBack &&
            <TouchableOpacity onPress={props.onBack}>
              <Image source={IMAGES.ic_back} style={{
                width: getScaleSize(40),
                height: getScaleSize(40),
                marginRight: getScaleSize(16)
              }} />
            </TouchableOpacity>
          }
          <Text
          size={getScaleSize(18)}
          font={FONTS.Lato.SemiBold}
          >{screenName ? screenName:"All Services"}</Text>
        </View>
        :         
         <View style={styles(theme).topRow}>
            <Pressable
              onPress={onPressUserProfile}
              style={styles(theme).profileRow}>
              <View style={styles(theme).avatarWrapper}>
                <Image
                  source={IMAGES.ic_my_profile}
                  style={styles(theme).avatar}
                />
              </View>
              <View style={styles(theme).nameContainer}>
                <Text
                  color={theme._404040}
                  size={getScaleSize(14)}
                  font={FONTS.Lato.Bold}
                >
                  Hello!
                </Text>
                <Text
                  color={theme.primaryText}
                  size={getScaleSize(20)}
                  font={FONTS.Lato.Bold}
                >
                  {userData?.userName ? userData?.userName : "Jhon Doe"}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={onPressNotification}
            >
              <Image
                source={IMAGES.ic_notifications}
                style={styles(theme).notificationIcon}
              />
            </Pressable>
          </View>}
          <View style={styles(theme).searchContainer}>
            <Image
              source={IMAGES.search}
              style={styles(theme).searchIcon}
            />
            <Pressable
              onPress={onSearchPress}
              style={styles(theme).searchPressable}
            >
              <TextInput
                style={styles(theme).searchInput}
                placeholderTextColor={theme.secondaryText}
                placeholder={STRING.search_for_services}
                editable={false}
              />
            </Pressable>
          </View>
      
      {/* {bannerImg && <Image
        source={bannerImg}
        style={styles(theme).banner}
        resizeMode="contain"
      />} */}

    </LinearGradient>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: getScaleSize(24),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarWrapper: {
      backgroundColor: 'white',
      borderRadius: getScaleSize(24),
      borderWidth: 0.5,
      borderColor: theme._8C8C8C,
    },
    avatar: {
      width: getScaleSize(48),
      height: getScaleSize(48),
      borderRadius: getScaleSize(24),
    },
    nameContainer: {
      marginLeft: getScaleSize(8),
    },
    notificationIcon: {
      width: getScaleSize(48),
      height: getScaleSize(48),
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: getScaleSize(10),
      backgroundColor: theme.white,
      paddingHorizontal: getScaleSize(10),
      paddingVertical: getScaleSize(4),
      marginTop: getScaleSize(30),
      borderWidth: 0.5,
      borderColor: theme._D9D9D9
    },
    searchIcon: {
      width: getScaleSize(24),
      height: getScaleSize(24),
      marginLeft: getScaleSize(14),
    },
    searchPressable: {
      flex: 1,
    },
    searchInput: {
      fontFamily: FONTS.Lato.Regular,
      fontSize: getScaleSize(16),
      color: theme.black,
    },
    banner: {
      width: '100%',
      height: getScaleSize(200),
    },
  });
export default HomeHeader;
