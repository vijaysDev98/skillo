import { Dimensions, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import {
  getScaleSize,
  REGEX,
  requestLocationPermission,
  SHOW_TOAST,
  Storage,
  useString,
} from '../../constant';

//COMPONENTS
import { Header, Input, Text, Button, ProgressView, KeyBoardAware } from '../../components';

//SCREENS
import { SCREENS } from '..';

//PACKAGES
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { API } from '../../api';
import Geolocation from 'react-native-geolocation-service';

import { createNewThread } from '../../services/chat';
import { userRoles } from '../../constant/utils';

export default function Login(props: any) {
  const STRING = useString();
  const { setUser, setUserType, setProfile, profile } =
    useContext<any>(AuthContext);
  const { theme } = useContext<any>(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [visibleCountry, setVisibleCountry] = useState(false);

  const [showRoleModal, setShowRoleModal] = useState(false);

  console.log('profile==>', profile);
  // const [countryCode, setCountryCode] = useState('+91');
  // const [isPhoneNumber, setIsPhoneNumber] = useState(false);

  // useEffect(() => {
  //   if (email.length >= 3) {
  //     const isNumber = REGEX.phoneRegex.test(email);
  //     setIsPhoneNumber(isNumber)
  //   }
  //   else {
  //     setIsPhoneNumber(false)
  //   }
  // }, [email])

  useEffect(() => {
    getLocation();
  }, []);

  async function onVerification() {
    if (!email) {
      setEmailError(STRING.email_required);
    } else if (!password) {
      setPasswordError(STRING.password_required);
    } else {
      setEmailError('');
      setPasswordError('');
      onLogin();
    }
  }

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
      },
      error => {
        console.log('Error:', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  async function onLogin() {
    // let params = {}
    // if (isPhoneNumber) {
    //   params = {
    //     mobile: email,
    //     phone_country_code: countryCode,
    //     password: password,
    //   }
    // } else {
    const params = {
      email: email,
      password: password,
    };
    // }

    // setUserType(userRoles.Service_Provider_individual);

    // props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: SCREENS.BottomBar.identifier,
    //       },
    //     ],
    //   }),
    // );

    try {
      setLoading(true);
      const result = await API.Instance.post(API.API_ROUTES.login, params);
      if (result.status) {
        Storage.save(Storage.USER_DETAILS, JSON.stringify(result?.data?.data));
        setUser(result?.data?.data);
        // setUserType(result?.data?.data?.user_data?.role);
        setUserType(userRoles.Service_Provider_individual)
        getProfileData();
      } else {
        SHOW_TOAST(result?.data?.message, 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function getProfileData() {
    try {
      setLoading(true);
      const result = await API.Instance.get(
        API.API_ROUTES.getUserDetails + `?platform=app`,
      );
      if (result.status) {
        console.log('=== Full API Response ===');
        console.log(JSON.stringify(result?.data, null, 2));

        // API returns data.data.user structure
        const userProfileData = result?.data?.data?.user;
        setProfile(result?.data?.data);

        // Save user to Firebase for chat functionality
        try {
          console.log('🧪 Testing Firebase connection first...');
          // const isConnected = await testFirebaseConnection();
          // if (!isConnected) {
          //   console.log('⚠️ Firebase connection failed, but continuing...');
          // }

          // Map profile data fields correctly - use actual field names from API
          // console.log('=== Extracting Firebase Data ===');
          // const firebaseUserData = {
          //   user_id: userProfileData?.id,
          //   name: userProfileData?.first_name || '',
          //   email: userProfileData?.email || '',
          //   mobile: userProfileData?.phone_number || '',
          //   role: userProfileData?.role || '',
          //   address:
          //     userProfileData?.elder_address || userProfileData?.address || '',
          //   avatarUrl: userProfileData?.profile_photo_url || '',
          // };
          // console.log('=== Firebase Data to Send ===');
          // console.log(JSON.stringify(firebaseUserData, null, 2));
          createNewThread(
            userProfileData.id,
            userProfileData?.first_name,
            userProfileData?.email,
            userProfileData?.phone_number,
            userProfileData?.role || '',
            userProfileData?.elder_address || userProfileData?.address || '',
            userProfileData?.profile_photo_url || '',
          )
            .then(() => { })
            .finally(() => { });
          console.log('✅ User saved to Firebase successfully');
        } catch (firebaseError: any) {
          console.log('❌ Failed to save user to Firebase:', firebaseError);
        }

        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: SCREENS.BottomBar.identifier,
              },
            ],
          }),
        );
        setShowRoleModal(true)
      } else {
        SHOW_TOAST(result?.data?.message, 'error');
        console.log('ERR', result?.data?.message);
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles(theme).container}>
      <Header />
      <KeyBoardAware>
        <View style={styles(theme).mainContainer}>
          <Image source={IMAGES.ic_logo} style={styles(theme).logo} />
          <Text
            size={getScaleSize(28)}
            font={FONTS.Lato.ExtraBold}
            color={theme.primaryText}
            align="center"
            style={{ marginBottom: getScaleSize(12) }}>
            {STRING.welcome_back}
          </Text>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._565656}
            align="center"
            style={{ marginBottom: getScaleSize(36) }}>
            {STRING.enter_your_email_and_password_to_login}
          </Text>
          <View style={styles(theme).inputContainer}>
            {/* {isPhoneNumber ? (
              <Input
                placeholder={STRING.enter_email}
                placeholderTextColor={theme._939393}
                inputTitle={STRING.email}
                inputColor={false}
                value={email}
                maxLength={10}
                keyboardType="email-address"
                autoCapitalize="none"
                countryCode={countryCode ? countryCode : '+91'}
                onPressCountryCode={() => {
                  setVisibleCountry(true);
                }}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
                isError={emailError}
              />
            ) : ( */}
            <Input
              placeholder={STRING.placeHolders.enter_email}
              placeholderTextColor={theme._B3B3B3}
              inputTitle={STRING.inputTitle.email}
              inputColor={false}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              isError={emailError}
            />
            {/* )} */}
          </View>
          <View style={styles(theme).inputContainer}>
            <Input
              placeholder={STRING.placeHolders.enter_password}
              placeholderTextColor={theme._B3B3B3}
              inputTitle={STRING.inputTitle.password}
              inputColor={false}
              value={password}
              passwordIcon={true}
              secureTextEntry={show}
              onChnageIcon={() => {
                setShow(!show);
              }}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              isError={passwordError}
            />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              onPress={() => {
                props.navigation.navigate(SCREENS.ResetPassword.identifier);
              }}
              color={theme.primary}
              align="right"
              style={{ marginTop: getScaleSize(12) }}>
              {STRING.buttonText.forgotPassword}
            </Text>
          </View>
          <Button
            title="Log In"
            style={{ marginBottom: getScaleSize(24) }}
            onPress={() => {
              onVerification();
            }}
          />
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.Regular}
            color={theme._999999}
            align="center"
            style={{ marginTop: getScaleSize(12) }}>
            {STRING.dont_have_an_account}{' '}
            <Text
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme.primary}
              style={{ textDecorationLine: 'underline' }}
              onPress={() => {
                setUserType(userRoles.Service_Seeker_individual)
                props.navigation.navigate(SCREENS.RoleTypeSelection.identifier, { isFromSignup: true });
              }}>
              {STRING.buttonText.sign_up}
            </Text>
          </Text>
        </View>
      </KeyBoardAware>
      {/* <SelectCountrySheet
        height={getScaleSize(500)}
        isVisible={visibleCountry}
        onPress={(e: any) => {
          console.log('e000', e);
          setCountryCode(e.dial_code);
          setVisibleCountry(false);
        }}
        onClose={() => {
          setVisibleCountry(false);
        }}
      /> */}
      {isLoading && <ProgressView />}

      {/* {showRoleModal && (
        <UserRoleModal
  visible={showRoleModal}
  onClose={() => setShowRoleModal(false)}
  onSelect={(role) => {
    console.log("Selected Role:", role);
    setTimeout(()=>{
      setUserType(role);
    props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: SCREENS.BottomBar.identifier,
              },
            ],
          }),
        );
    },100)
    
  }}
/>)
      } */}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1.0,
      backgroundColor: theme.white,
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 1.0,
      marginHorizontal: getScaleSize(24),
      marginVertical: getScaleSize(24),
      justifyContent: 'center',
    },
    logo: {
      width: getScaleSize(150),
      height: getScaleSize(150),
      alignSelf: 'center',
      marginBottom: getScaleSize(50),
    },
    inputContainer: {
      marginBottom: getScaleSize(16),
    },
  });


interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (role: string) => void;
}

const roles = [
  { id: userRoles.Service_Seeker_individual, label: userRoles.Service_Seeker_individual },
  { id: userRoles.Service_Seeker_business, label: userRoles.Service_Seeker_business },
];

function UserRoleModal({
  visible,
  onClose,
  onSelect,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleContinue = () => {
    if (!selectedRole) return;
    onSelect(selectedRole);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>

          {/* TITLE */}
          <Text
            size={getScaleSize(16)}
            color='black'
            font={FONTS.Lato.Bold}
            align='center'
          >
            Select Your Role
          </Text>
          <View style={{ gap: 20, marginTop: 20 }}>
            {/* OPTIONS */}
            {roles.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={modalStyles.option}
                onPress={() => setSelectedRole(item.id)}
              >
                {/* RADIO */}
                <View
                  style={[
                    modalStyles.radio,
                    selectedRole === item.id && modalStyles.radioSelected,
                  ]}
                />

                {/* LABEL */}
                <Text
                  size={getScaleSize(14)}
                  color='black'
                  font={FONTS.Lato.Regular}
                  align='left'
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* BUTTON */}
          <TouchableOpacity
            style={[
              modalStyles.button,
              !selectedRole && { opacity: 0.5 },
            ]}
            disabled={!selectedRole}
            onPress={handleContinue}
          >
            <Text
              size={16}
              color={!selectedRole ? "black" : "white"}
              font={FONTS.Lato.SemiBold}
            >
              Continue
            </Text>
          </TouchableOpacity>

          {/* CANCEL */}
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "#EC613D", borderRadius: 10, alignItems: "center", marginTop: 20, paddingVertical: 12 }}
            onPress={onClose}>
            <Text
              size={16}
              color={"#EC613D"}
              font={FONTS.Lato.SemiBold}
            >Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: getScaleSize(24),
  },

  container: {
    backgroundColor: '#fff',
    borderRadius: getScaleSize(20),
    padding: getScaleSize(20),
  },

  title: {
    fontSize: getScaleSize(18),
    fontFamily: FONTS.Manrope.Bold,
    textAlign: 'center',
    marginBottom: getScaleSize(20),
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScaleSize(16),
  },

  radio: {
    width: getScaleSize(20),
    height: getScaleSize(20),
    borderRadius: getScaleSize(10),
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: getScaleSize(12),
  },

  radioSelected: {
    borderColor: '#E85D3F',
    backgroundColor: '#E85D3F',
  },

  optionText: {
    fontSize: getScaleSize(14),
    fontFamily: FONTS.Manrope.Medium,
  },

  button: {
    backgroundColor: '#E85D3F',
    paddingVertical: getScaleSize(14),
    borderRadius: getScaleSize(10),
    alignItems: 'center',
    marginTop: getScaleSize(10),
  },

  buttonText: {
    color: '#fff',
    fontFamily: FONTS.Manrope.Bold,
  },

  cancelText: {
    textAlign: 'center',
    marginTop: getScaleSize(12),
    color: '#888',
  },

});