import React, { useContext, useEffect, useMemo } from 'react';
import { Image, ImageBackground, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

// CONSTANT & ASSETS
import { getScaleSize, useString, Storage, TABBAR_HEIGHT } from '../constant';
import { IMAGES } from '../assets/images';
import { FONTS } from '../assets';
import { AuthContext, ThemeContext, ThemeContextType } from '../context';
import Text from './Text';
import { EventRegister } from 'react-native-event-listeners';
import { SCREENS } from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { userRoles } from '../constant/utils';
import NavigationService from '../screens/NavigationService';
import { screenWidth } from '../constant/scaleSize';

function Tabbar(props: any) {

  const insets = useSafeAreaInsets();
  const { theme } = useContext<any>(ThemeContext);

  const { userType, setUser, setUserType, fetchProfile } = useContext<any>(AuthContext);

  useEffect(() => {
    const parseParams = (url: string) => {
      const queryString = url.split('?')[1] || '';
      const params: Record<string, string> = {};

      queryString.split('&').forEach(item => {
        if (!item) return;
        const [key, value] = item.split('=');
        params[key] = decodeURIComponent(value || '');
      });

      return params;
    };

    Linking.getInitialURL().then((url: any) => {
      if (!url) return;

      if (url.includes('payment-success')) {
        const params = parseParams(url);

        const serviceId = params.service_id;
        const type = params.type;
        if (type == 'services_payment') {
          props.navigation.navigate(SCREENS.ServiceConfirmed.identifier, {
            serviceId: serviceId,
          });
        }
      }

      if (url.includes('account-success')) {
        const params = parseParams(url);
        fetchProfile()
        NavigationService.reset(SCREENS.BottomBar.identifier);
      }

      if (url.includes('account-cancel')) {
        const params = parseParams(url);
        fetchProfile()
        NavigationService.reset(SCREENS.BottomBar.identifier);
      }

      if (url.includes('payment-cancel')) {
        const params = parseParams(url);
        const error = params.error || 'Payment cancelled';
        const type = params.type;

        if (type == 'services_payment') {
          EventRegister.emit('onPaymentCancel', {
            message: error,
          });
        }
      }
    });

    const handleUrl = ({ url }: { url: string }) => {
      console.log('Deep link:', url);
      // ✅ PAYMENT SUCCESS
      if (url.startsWith('coudpouss://payment-success')) {
        const params = parseParams(url);

        const serviceId = params.service_id;
        const type = params.type;

        if (type == 'services_payment') {
          setTimeout(() => {
            props.navigation.navigate(SCREENS.ServiceConfirmed.identifier, {
              serviceId: serviceId,
            });
          }, 2000);
        } else {
        }
        return;
      }

      if (url.startsWith('coudpouss://account-success')) {
        const params = parseParams(url);
        EventRegister.emit('onAccountSuccess', {
          message: 'Account created successfully',
        });
      }

      if (url.startsWith('coudpouss://payment-success')) {
        const params = parseParams(url);
        const type = params.type
        if (type == 'payment_type') {
          setTimeout(() => {
            props.navigation.navigate(SCREENS.Notification.identifier, {
              isFromDeepLink: true,
            });
          }, 2000);
        }
        return;
      }

      if (url.startsWith('coudpouss://payment-cancel')) {
        const params = parseParams(url);
        const type = params.type
        if (type == 'payment_type') {
          setTimeout(() => {
            props.navigation.navigate(SCREENS.Notification.identifier, {
              isFromDeepLink: true,
              isError: params.error,
            });
          }, 2000);
        }
      }

      if (url.startsWith('coudpouss://account-cancle')) {
        const params = parseParams(url);
        EventRegister.emit('onAccountCancel', {
          message: 'Account cancelled',
        });
        return;
      }
      // ❌ PAYMENT CANCEL
      if (url.startsWith('coudpouss://payment-cancel')) {
        const params = parseParams(url);
        const error = params.error || 'Payment cancelled';
        const type = params.type;

        if (type == 'services_payment') {
          EventRegister.emit('onPaymentCancel', {
            message: error,
          });
        }
        return;
      }
    };

    Linking.addEventListener('url', handleUrl);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  useEffect(() => {
    EventRegister.addEventListener('onInvalidToken', () => {
      onLogout();
    });
    return () => {
      EventRegister.removeEventListener('onInvalidToken');
    };
  }, []);

  function onLogout() {
    Storage.clear();
    setUser(null);
    setUserType(null);
    NavigationService.reset(SCREENS.Login.identifier);
  }

  const isProvider = userType === userRoles.Service_Provider_individual || userType === userRoles.Service_Provider_business;

  const tabs = useMemo(() => {
    if (isProvider) {
      return [
        { label: 'Home', image: IMAGES.home_unselected },
        { label: 'Task', image: IMAGES.request_unselected },
        { label: 'Chats', image: IMAGES.chat_unselected, altImage: IMAGES.seekerChatsIcon },
        { label: 'Profile', image: IMAGES.profile_unselected },
      ];
    }

    return [
      { label: 'Home', image: IMAGES.home_unselected },
      { label: 'Request', image: IMAGES.request_unselected },
      { label: 'Create', image: IMAGES.plus, isPlus: true },
      { label: 'Chats', image: IMAGES.chat_unselected, altImage: IMAGES.seekerChatsIcon },
      { label: 'Profile', image: IMAGES.profile_unselected },
    ];
  }, [isProvider]);

  const STRING = useString();

  function onPress(name: string) {
    if (name === 'plus') {
      NavigationService.navigate(SCREENS.CreateRequest.identifier);
    } else {
      NavigationService.navigate(name);
    }
  }

  function renderView() {
    return (
      <View style={[
        userType === userRoles.Service_Seeker_business || userType === userRoles.Service_Seeker_individual
          ? styles(theme).tabContainer
          : styles(theme).tabContainerServiceProvider,
        // { paddingBottom: insets.bottom }
      ]}>
        {props.state.routes.map((route: any, index: number) => {
          const tab = tabs[index];
          if (!tab) return null;
          return (
            <Item
              key={index}
              onPress={() => onPress(route.name)}
              title={tab.label}
              index={index}
              selected={props.state.index == index}
              image={tab.image}
              altImage={tab.altImage}
              isPlus={tab.isPlus}
              isProvider={isProvider}
            />
          );
        })}
      </View>
    )
  }
  if (userType === userRoles.Service_Provider_individual || userType === userRoles.Service_Provider_business) {
    return (
      // <SafeAreaView style={{ backgroundColor: 'transparent' }}>
      <View style={[styles(theme).mainContainer]}>
        {renderView()}
      </View>
      // </SafeAreaView>
    )
  }
  else {
    return (
      <ImageBackground style={[styles(theme).mainView,
      { height: TABBAR_HEIGHT }
      ]}
        resizeMode='cover'
        source={IMAGES.ic_tab_bar}>
        {/* <SafeAreaView edges={['bottom']}> */}
        {renderView()}
        {/* </SafeAreaView> */}
      </ImageBackground>
    )
  }
  // return (
  //   <SafeAreaView style={{ backgroundColor: 'transparent' }}>
  //     <ImageBackground style={[
  //       styles(theme).mainView,
  //       { height: TABBAR_HEIGHT + insets.bottom }
  //     ]}
  //       resizeMode="stretch"
  //       source={IMAGES.ic_tab_bar}>
  //       <View style={styles(theme).tabContainer}>
  //         {props.state.routes.map((route: any, index: number) => {
  //           return (
  //             <Item
  //               key={index}
  //               onPress={() => onPress(route.name)}
  //               title={route.name}
  //               index={index}
  //               selected={props.state.index == index}
  //               image={images[index]}
  //             />
  //           );
  //         })}
  //       </View>
  //     </ImageBackground >
  //   </SafeAreaView>
  // );
}

type ItemProps = {
  onPress: () => void;
  title: string;
  index: number;
  selected: boolean;
  image: any;
  altImage?: any;
  isPlus?: boolean;
  isProvider: boolean;
};

const Item = (props: ItemProps) => {
  const { theme } = useContext<any>(ThemeContext);
  const STRING = useString();

  if (props.isPlus) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={styles(theme).plusButton}>
        <Image
          style={styles(theme).plusImage}
          resizeMode="cover"
          source={IMAGES.plus}
        />
      </TouchableOpacity>
    );
  }

  const displayImage = props.selected ? props.image : props.altImage || props.image;
  const isProvider = props.isProvider;
  const selectedTextSize = isProvider ? 14 : 14;
  const unselectedTextSize = isProvider ? 12 : 12;
  const selectedMarginTop = isProvider ? 8 : 4;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles(theme).itemContainer}>
      <View style={styles(theme).itemInner}>
        <Image
          style={props.selected ? styles(theme).itemImageSelected : styles(theme).itemImage}
          resizeMode="contain"
          tintColor={props.selected ? theme.primary : theme._8C8C8C}
          source={displayImage}
        />
        <Text
          style={{ marginTop: getScaleSize(selectedMarginTop) }}
          size={props.selected ? getScaleSize(selectedTextSize) : getScaleSize(unselectedTextSize)}
          font={props.selected ? FONTS.Lato.Bold : FONTS.Lato.Medium}
          color={props.selected ? theme.primary : theme._8C8C8C}
          align="center">
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.white,
      borderTopLeftRadius: getScaleSize(20),
      borderTopRightRadius: getScaleSize(20),
      overflow: 'hidden',
    },
    mainView: {
      width: screenWidth,
      // backgroundColor: theme.white,
      // position: 'absolute',
      // bottom: 10,
      // left: 0,
      // right: 0,
    },
    tabContainer: {
      flexDirection: 'row',
      height: TABBAR_HEIGHT,
      alignItems: 'center',
      // paddingBottom:20
    },
    tabContainerServiceProvider: {
      flexDirection: 'row',
      height: TABBAR_HEIGHT + getScaleSize(20),
      alignItems: 'center',
      paddingBottom: getScaleSize(6),
    },
    itemContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      // paddingTop: getScaleSize(10),
    },
    itemInner: {
      alignSelf: 'center',
    },
    itemImageSelected: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
      // marginTop: getScaleSize(45)
    },
    itemImage: {
      height: getScaleSize(24),
      width: getScaleSize(24),
      alignSelf: 'center',
      tintColor: theme._8C8C8C
      // marginTop: getScaleSize(45)
    },
    tabText: {
      marginTop: getScaleSize(7),
    },
    iconMessageContainer: {
      minHeight: getScaleSize(16),
      maxHeight: getScaleSize(18),
      paddingHorizontal: getScaleSize(5),
      borderRadius: getScaleSize(10),
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -3,
      right: -3,
    },
    plusButton: {
      alignSelf: 'center',
      transform: [{ translateY: -getScaleSize(20) }],
      zIndex: 10,
    },
    plusImage: {
      height: getScaleSize(55),
      width: getScaleSize(55),
    },
  });

export default Tabbar;
