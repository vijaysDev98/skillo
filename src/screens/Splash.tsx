import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../context';

//CONSTANT & ASSETS
import { IMAGES } from '../assets';
import { getScaleSize, SHOW_TOAST, Storage } from '../constant';

//SCREENS
import { SCREENS } from '.';
import { CommonActions } from '@react-navigation/native';

//API
import { API } from '../api';

import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import LinearGradient from 'react-native-linear-gradient'
import { userRoles } from '../constant/utils';
import { useAppDispatch } from '../redux/hooks';
import { getProviderProfile, getSeekerProfile } from '../actions/auth/authAction';
import NavigationService from './NavigationService';

export default function Splash(props: any) {
  const { theme } = useContext(ThemeContext);
  const { setUser, setUserType, setProfile, userType } = useContext<any>(AuthContext);
  const dispatch = useAppDispatch();


  console.log("Splash userType=====>>>", userType)
  useEffect(() => {
    checkUserDetails();
  }, []);

  useEffect(() => {
    requestPermissions();
    getLocation();
  }, []);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await request(PERMISSIONS.IOS.CAMERA);
      if (status === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  async function getLocation() {
    const permission = await hasLocationPermission();
    if (!permission) return;

    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
      },
      error => {
        console.log('Error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    } else {
      await request(PERMISSIONS.IOS.CAMERA);
    }
  };

  async function checkUserDetails() {
    const userDetails = await Storage.get(Storage.USER_DETAILS);
    const userData = JSON.parse(userDetails ?? '{}');
    if (userData && userData?.user_data?.role) {
      setUser(userData);
      const role = userData?.user_data?.role;
      setUserType(role);
      await getProfileData(role);
    } else {
      setTimeout(() => {
        // props?.navigation?.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: SCREENS.Login.identifier }],
        //   }),
        // );
        //  props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        NavigationService.navigate(SCREENS.Login.identifier);
        setUser('');
        setUserType('');
        setProfile('');
      }, 2000);
    }
  }

  async function getProfileData(role: string) {
    // const resetTo = (screen: string) => {
    //   props.navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [
    //         {
    //           name: screen,
    //         },
    //       ],
    //     }),
    //   );
    // };

    try {
      const onSuccess = (profile: any) => {
        setProfile(profile);
        const profileRole = profile?.user_data?.role;
        if (profileRole) {
          setUserType(profileRole);
        }
      };

      if (role === userRoles.Service_Provider_business || role === userRoles.Service_Provider_individual) {
        await dispatch<any>(getProviderProfile(onSuccess));
      } else {
        await dispatch<any>(getSeekerProfile(onSuccess));
      }

      // resetTo(SCREENS.BottomBar.identifier);
      NavigationService.reset(SCREENS.BottomBar.identifier);
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
      // resetTo(SCREENS.Login.identifier);
      NavigationService.reset(SCREENS.Login.identifier);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
      // barStyle={'light-content'} 
      />
      <LinearGradient
        colors={['#E94675', '#EC613D']}
        start={{ x: 0, y: -1 }}
        end={{ x: 1, y: -1 }}
        style={[styles(theme).container]}>
        <Image source={IMAGES.ic_splashlogo} style={styles(theme).logo} resizeMode='contain' />
      </LinearGradient>
    </View>

  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1.0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    logo: {
      width: Dimensions.get('window').width - getScaleSize(116),
      height: Dimensions.get('window').width - getScaleSize(116),
    },
    statusBar: {
      height: StatusBar.currentHeight
    },
  });
