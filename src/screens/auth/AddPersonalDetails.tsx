
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, REGEX, sanitizeAddressInput, sanitizeNameInput, SHOW_TOAST, Storage, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import {
  Header,
  Input,
  Text,
  Button,
  SelectCountrySheet,
  KeyBoardAware,
  CheckBox,
  SafeView,
} from '../../components';
import { CommonActions } from '@react-navigation/native';
import { API } from '../../api';
import { launchImageLibrary } from 'react-native-image-picker';
import { userRoles } from '../../constant/utils';

const RadioItem = ({ label, value, selected, onPress }: any) => {

  const { theme } = useContext<any>(ThemeContext);
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
      onPress={() => onPress(value)}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 18,
          borderWidth: selected === value ? 5 : 2,
          borderColor: selected === value ? theme.primary : theme._8C8C8C,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10
        }}
      >
        {selected === value && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: theme.white
            }}
          />
        )}
      </View>

      <Text
        size={getScaleSize(16)}
        font={FONTS.Lato.Regular}
        color={selected === value ? theme.primary : theme._8C8C8C}
      >{label}</Text>
    </TouchableOpacity>
  );
};

export default function AddPersonalDetails(props: any) {

  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);
  const { userType, setUser, setUserType, setProfile, userRole } =
    useContext<any>(AuthContext);

  const isEmail = props?.route?.params?.email || '';
  // const isPhoneNumber = props?.route?.params?.isPhoneNumber || false;
  // const isCountryCode = props?.route?.params?.countryCode || '+91';

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [email, setEmail] = useState(isEmail ? isEmail : '');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [visibleCountry, setVisibleCountry] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [profileImage, setProfileImage] = useState<any>(null);
  const [countryFlag, setCountryFlag] = useState('🇮🇳');
  const [nationality, setNationality] = useState('');
  const [residence, setResidence] = useState('');
  const [dropDownType, setDropDownType] = useState<'nationality' | 'residence' | 'mobile_number'>('nationality');


  const [businessName, setBusinessName] = useState('')
  const [businessNameError, setBusinessNameError] = useState('')
  const [vatNumber, setVatNumber] = useState('')
  const [vatNumberError, setVatNumberError] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessEmailError, setBusinessEmailError] = useState('')
  const [businessDisc, setBusinessDisc] = useState('')
  const [businessDiscError, setBusinessDiscError] = useState('')
  const [contactPersonName, setContactPersonName] = useState('')
  const [contactPersonNameError, setContactPersonNameError] = useState('')

  const [passportNumber, setPassportNumber] = useState('')
  const [passportError, setPassportError] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [nextOfKinName, setNextOfKinName] = useState('')
  const [nextOfKinNumber, setNextOfKinNumber] = useState('')
  const [relation, setRelation] = useState('')
  const [professionalTraining, setProfessionalTraining] = useState('')
  const [selfTaught, setSelfTaught] = useState('')
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // useEffect(() => {
  //   if (isPhoneNumber) {
  //     setMobileNo(isEmail);
  //     setCountryCode(isCountryCode);
  //   } else {
  //     setEmail(isEmail);
  //   }
  // }, [isEmail]);

  const getInitialName = (fullName: string) => {
    if (!fullName) return '';

    const words = fullName.trim().split(' ');

    if (words.length === 1) {
      return words[0][0]?.toUpperCase();
    }

    return (
      words[0][0]?.toUpperCase() +
      words[words.length - 1][0]?.toUpperCase()
    );
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const asset: any = response.assets[0];
        setProfileImage(asset);
        uploadProfileImage(asset);
      } else {
        console.log('response', response);
      }
    });
  };

  async function uploadProfileImage(asset: any) {
    try {
      const formData = new FormData();
      formData.append('email', isEmail);
      formData.append('file', {
        uri: asset?.uri,
        name: asset?.fileName || 'profile_image.jpg',
        type: asset?.type || 'image/jpeg',
      });
      setLoading(true);
      const result = await API.Instance.post(
        API.API_ROUTES.uploadProfileImage,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setLoading(false);
      if (result.status) {
        SHOW_TOAST(result?.data?.message ?? '', 'success');
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
        setProfileImage(null);
      }
      console.log('error==>', result?.data?.message);
    } catch (error: any) {
      setProfileImage(null);
      setLoading(false);
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }

  // async function onSignup() {

  //   // REGEX (clean + strict)
  //   const emojiRegex =
  //     /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+)/;

  //   const nameRegex = /^[A-Za-z.\- ]+$/;
  //   const onlyNumbers = /^\d+$/;
  //   const onlySpecialChars = /^[^A-Za-z0-9]+$/;
  //   const mobileRegex = /^[0-9]{10}$/;

  //   // Trim everything first
  //   const cleanName = name.trim();
  //   const cleanMobile = mobileNo.trim();
  //   const cleanAddress = address.trim();
  //   const cleanEmail = email.trim();

  //   // Update state with trimmed values
  //   setName(cleanName);
  //   setMobileNo(cleanMobile);
  //   setAddress(cleanAddress);
  //   setEmail(cleanEmail);

  //   let hasError = false;

  //   setNameError('');
  //   setMobileNoError('');
  //   setEmailError('');
  //   setAddressError('')

  //   // NAME VALIDATION 
  //   if (!cleanName) {
  //     setNameError(STRING.name_required);
  //     hasError = true;
  //   }
  //   else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(cleanName)) {
  //     setNameError(STRING.name_invalid_characters);
  //     hasError = true;
  //   }

  //   // MOBILE VALIDATION 
  //   if (!cleanMobile) {
  //     setMobileNoError(STRING.mobile_number_required);
  //     hasError = true;
  //   } else if (!mobileRegex.test(cleanMobile)) {
  //     setMobileNoError(STRING.mobile_must_be_10_digits);
  //     hasError = true;
  //   }

  //   // EMAIL VALIDATION 
  //   if (!cleanEmail) {
  //     setEmailError(STRING.email_required);
  //     hasError = true;
  //   } else if (
  //     cleanEmail.length < 6 ||
  //     cleanEmail.length > 100 ||
  //     !REGEX.email.test(cleanEmail)
  //   ) {
  //     setEmailError(STRING.please_enter_valid_email);
  //     hasError = true;
  //   }

  //   // ADDRESS VALIDATION 
  //   if (!cleanAddress) {
  //     setAddressError(STRING.address_required);
  //     hasError = true;
  //   }
  //   else if (/^\d+$/.test(cleanAddress)) {
  //     setAddressError(STRING.address_only_numbers_error);
  //     hasError = true;
  //   }
  //   else if (/^[^A-Za-z0-9]+$/.test(cleanAddress)) {
  //     setAddressError(STRING.address_special_char_error);
  //     hasError = true;
  //   }

  //   if (hasError) {
  //     return
  //   }
  //   else {
  //     const params = {
  //       mobile: cleanMobile,
  //       phone_country_code: countryCode,
  //       name: cleanName,
  //       email: cleanEmail,
  //       address: cleanAddress,
  //       role: userType,
  //     };

  //     props.navigation.navigate(SCREENS.AddAdress.identifier, { data: params });

  //     // try {
  //     //   setLoading(true);
  //     //   const result = await API.Instance.post(
  //     //     API.API_ROUTES.addPersonalDetails,
  //     //     params,
  //     //   );

  //     //   if (result.status) {
  //     //     SHOW_TOAST(result?.data?.message ?? '', 'success');
  //     //     Storage.save(
  //     //       Storage.USER_DETAILS,
  //     //       JSON.stringify(result?.data?.data),
  //     //     );
  //     //     setUser(result?.data?.data);
  //     //     setUserType(result?.data?.data?.user_data?.role);
  //     //     getProfileData();
  //     //   } else {
  //     //     SHOW_TOAST(result?.data?.message ?? '', 'error');
  //     //   }
  //     // } catch (error: any) {
  //     //   SHOW_TOAST(error?.message ?? '', 'error');
  //     // } finally {
  //     //   setLoading(false);
  //     // }
  //   }
  // }

  function validateIndividualForm() {

    const cleanName = name.trim();
    const cleanMobile = mobileNo.trim();
    const cleanEmail = email.trim();

    let hasError = false;

    const mobileRegex = /^[0-9]{10}$/;

    setNameError('');
    setMobileNoError('');
    setEmailError('');

    if (!cleanName) {
      setNameError(STRING.name_required);
      hasError = true;
    }

    if (!cleanMobile) {
      setMobileNoError(STRING.mobile_number_required);
      hasError = true;
    } else if (!mobileRegex.test(cleanMobile)) {
      setMobileNoError(STRING.mobile_must_be_10_digits);
      hasError = true;
    }

    if (!cleanEmail) {
      setEmailError(STRING.email_required);
      hasError = true;
    } else if (!REGEX.email.test(cleanEmail)) {
      setEmailError(STRING.please_enter_valid_email);
      hasError = true;
    }

    if (!nationality) {
      SHOW_TOAST("Please select nationality", "error");
      hasError = true;
    }

    if (!residence) {
      SHOW_TOAST("Please select country of residence", "error");
      hasError = true;
    }

    return !hasError;
  }

  function validateBusinessForm() {

    let hasError = false;

    const cleanBusinessName = businessName.trim();
    const cleanVat = vatNumber.trim();
    const cleanEmail = businessEmail.trim();
    const cleanContactPerson = contactPersonName.trim();
    const cleanMobile = mobileNo.trim();

    const mobileRegex = /^[0-9]{10}$/;

    setBusinessNameError('');
    setVatNumberError('');
    setBusinessEmailError('');
    setContactPersonNameError('');
    setMobileNoError('');

    if (!cleanBusinessName) {
      setBusinessNameError("Business name is required");
      hasError = true;
    }

    if (!cleanVat) {
      setVatNumberError("VAT number is required");
      hasError = true;
    }

    if (!cleanEmail) {
      setBusinessEmailError("Business email is required");
      hasError = true;
    } else if (!REGEX.email.test(cleanEmail)) {
      setBusinessEmailError("Please enter valid business email");
      hasError = true;
    }

    if (!cleanContactPerson) {
      setContactPersonNameError("Contact person name is required");
      hasError = true;
    }

    if (!cleanMobile) {
      setMobileNoError("Mobile number is required");
      hasError = true;
    } else if (!mobileRegex.test(cleanMobile)) {
      setMobileNoError("Mobile must be 10 digits");
      hasError = true;
    }

    if (!residence) {
      SHOW_TOAST("Please select country of residence", "error");
      hasError = true;
    }

    return !hasError;
  }

  async function onSignup() {

    // if (userType === userRoles.Service_Seeker_individual) {
    //   if (!validateIndividualForm()) return;
    // }

    // if (userType === userRoles.Service_Seeker_business) {
    //   if (!validateBusinessForm()) return;
    // }

    const params = {
      mobile: mobileNo.trim(),
      phone_country_code: countryCode,
      name: name.trim(),
      email: email.trim(),
      address: address.trim(),
      role: userType,
    };

    props.navigation.navigate(SCREENS.AddAdress.identifier, { data: params });
  }


  async function getProfileData() {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getUserDetails + `?platform=app`);
      if (result.status) {
        setProfile(result?.data?.data);
        onNext();
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

  async function onNext() {
    if (userType == 'service_provider') {
      props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier);
    } else {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: SCREENS.BottomBar.identifier }],
        }),
      );
    }
  }

  function getForm() {
    if (userType === userRoles.Service_Seeker_individual) {
      return (
        <>
          <Input
            placeholder={STRING.enter_name}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.name}
            // inputColor={}
            // continerStyle={{ marginBottom: getScaleSize(16) }}
            value={name}
            maxLength={50}
            onChangeText={text => {
              const clean = sanitizeNameInput(text);
              setName(clean);
              setNameError('');
            }}
            isError={nameError}
          />
          <Input
            placeholder={STRING.enter_mobile_no}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.mobile_no}
            countryCode={countryCode}
            onPressCountryCode={() => {
              setDropDownType('mobile_number');
              setVisibleCountry(true);
            }}
            // inputColor={true}
            // continerStyle={{ marginBottom: getScaleSize(16) }}
            value={mobileNo}
            // editable={!isPhoneNumber}
            onChangeText={text => {
              const digitsOnly = text.replace(/[^0-9]/g, '');
              setMobileNo(digitsOnly);
              setMobileNoError('');
            }}
            keyboardType="number-pad"
            maxLength={10}
            isError={mobileNoError}
          // countryCode={countryCode}
          // countryFlag={countryFlag}
          // onPressCountryCode={() => {
          //   setVisibleCountry(true);
          // }}
          />
          <Input
            placeholder={STRING.example_email}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.email}
            // inputColor={true}
            containerStyle={{
              opacity: 0.5,
              backgroundColor: theme._F0EFF0,
            }}
            // continerStyle={{ marginBottom: getScaleSize(16) }}
            value={email}
            editable={isEmail ? false : true}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
            isError={emailError}
          />
          <Input
            placeholder={STRING.placeHolders.select_nationality}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.inputTitle.nationality}
            isDropDown={true}
            // continerStyle={{ marginBottom: getScaleSize(16) }}
            value={nationality}
            onPress={() => {
              setDropDownType('nationality');
              setVisibleCountry(true)
            }}
          />
          <Input
            placeholder={STRING.placeHolders.select_country_of_residence}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.inputTitle.country_of_residence}
            isDropDown={true}
            // continerStyle={{ marginBottom: getScaleSize(16) }}
            value={residence}
            onPress={() => {
              setDropDownType('residence');
              setVisibleCountry(true);
            }}
          />

          {/* <Input
            placeholder={STRING.enter_address}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.address}
            // inputColor={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={address}
            maxLength={250}
            onChangeText={text => {
              const clean = sanitizeAddressInput(text);
              setAddress(clean);
              setAddressError('');
            }}
            isError={addressError}
          /> */}


        </>
      )
    }
    else if (userType === userRoles.Service_Seeker_business || userType === userRoles.Service_Provider_business) {
      return (
        <>
          <Input
            placeholder={STRING.enter_business_name}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.business_name}
            // inputColor={}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={businessName}
            maxLength={50}
            onChangeText={text => {
              const clean = sanitizeNameInput(text);
              setBusinessName(clean);
              setBusinessNameError('');
            }}
            isError={businessNameError}
          />
          <Input
            placeholder={STRING.enter_business_disc}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.business_disc}
            // inputColor={}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={businessDisc}
            maxLength={50}
            onChangeText={text => {
              // const clean = sanitizeNameInput(text);
              setBusinessDisc(text);
              setBusinessDiscError('');
            }}
            isError={businessDiscError}
          />
          <Input
            placeholder={STRING.example_email}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.business_email}
            // inputColor={true}
            containerStyle={{
              opacity: 0.5,
              backgroundColor: theme._F0EFF0,
            }}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={email}
            editable={isEmail ? false : true}
            onChangeText={text => {
              setBusinessEmail(text);
              setBusinessEmailError('');
            }}
            isError={businessEmailError}
          />
          <Input
            placeholder={STRING.enter_vat_number}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.vat_number}
            // inputColor={true}
            // containerStyle={{
            //   opacity: 0.5,
            //   backgroundColor: theme._F0EFF0,
            // }}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={vatNumber}
            // editable={isEmail ? false : true}
            onChangeText={text => {
              setVatNumber(text);
              setVatNumberError('');
            }}
            isError={vatNumberError}
          />
          <Input
            placeholder={STRING.enter_contact_person_name}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.contact_person_name}
            // inputColor={}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={contactPersonName}
            maxLength={50}
            onChangeText={text => {
              const clean = sanitizeNameInput(text);
              setContactPersonName(clean);
              setContactPersonNameError('');
            }}
            isError={contactPersonNameError}
          />
          <Input
            placeholder={STRING.enter_mobile_no}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.mobile_no}
            // inputColor={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={mobileNo}
            // editable={!isPhoneNumber}
            onChangeText={text => {
              const digitsOnly = text.replace(/[^0-9]/g, '');
              setMobileNo(digitsOnly);
              setMobileNoError('');
            }}
            keyboardType="number-pad"
            maxLength={10}
            isError={mobileNoError}
            countryCode={countryCode}
            // countryFlag={countryFlag}
            onPressCountryCode={() => {
              setDropDownType('mobile_number')
              setVisibleCountry(true);
            }}
          />
          <Input
            placeholder={STRING.placeHolders.select_nationality}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.inputTitle.nationality}
            isDropDown={true}
            // continerStyle={{ marginBottom: getScaleSize(16) }}
            value={nationality}
            onPress={() => {
              setDropDownType('nationality');
              setVisibleCountry(true)
            }}
          />
          <Input
            placeholder={STRING.placeHolders.select_country_of_residence}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.inputTitle.country_of_residence}
            isDropDown={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={residence}
            onPress={() => {
              setDropDownType('residence');
              setVisibleCountry(true);
            }}
          />
        </>
      )
    }
    else if (userType === userRoles.Service_Provider_individual) {
      return (
        <>
          <Input
            placeholder="Enter Name"
            inputTitle="Full Name"
            value={name}
            onChangeText={(text) => {
              const clean = sanitizeNameInput(text)
              setName(clean)
              setNameError('')
            }}
            isError={nameError}
          />

          <Input
            placeholder="Enter Passport Number"
            inputTitle="Passport Number"
            value={passportNumber}
            onChangeText={(text) => {
              setPassportNumber(text)
              setPassportError('')
            }}
            isError={passportError}
          />

          <Input
            placeholder="Date of Birth"
            inputTitle="Date of Birth"
            value={dob}
            isDropDown={true}
          />

          <Input
            placeholder="Gender"
            inputTitle="Gender"
            isDropDown={true}
            value={gender}
          />

          <Input
            placeholder="Enter Mobile No"
            inputTitle="Mobile Number"
            value={mobileNo}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(text) => {
              const digits = text.replace(/[^0-9]/g, '')
              setMobileNo(digits)
            }}
            countryCode={countryCode}
            onPressCountryCode={() => {
              setDropDownType('mobile_number')
              setVisibleCountry(true)
            }}
          />

          <Input
            placeholder="Enter Email"
            inputTitle="Email address"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Select Nationality"
            inputTitle="Nationality"
            isDropDown={true}
            value={nationality}
            onPress={() => {
              setDropDownType('nationality')
              setVisibleCountry(true)
            }}
          />
          <Input
            placeholder="Select Country of Residence"
            inputTitle="Country of Residence"
            isDropDown={true}
            value={residence}
            onPress={() => {
              setDropDownType('residence')
              setVisibleCountry(true)
            }}
          />
          <Input
            placeholder="Next of Kin Name"
            inputTitle="Next of Kin's Name"
            value={nextOfKinName}
            onChangeText={setNextOfKinName}
          />
          <Input
            placeholder="Enter Mobile No"
            inputTitle="Next of Kin's number"
            keyboardType="number-pad"
            value={nextOfKinNumber}
            onChangeText={setNextOfKinNumber}
          />
          <Input
            placeholder="Relation"
            inputTitle="Relation"
            value={relation}
            onChangeText={setRelation}
          />
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
          >
            Do you have professional training?
          </Text>
          <RadioItem
            label="Yes, I have professional training."
            value="yes"
            selected={professionalTraining}
            onPress={setProfessionalTraining}
          />
          <RadioItem
            label="No, I don't have any professional training."
            value="no"
            selected={professionalTraining}
            onPress={setProfessionalTraining}
          />
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
          >
            Are you self taught?
          </Text>
          <RadioItem
            label="Yes, I am self taught."
            value="yes"
            selected={selfTaught}
            onPress={setSelfTaught}
          />

          <RadioItem
            label="No, I am not self taught."
            value="no"
            selected={selfTaught}
            onPress={setSelfTaught}
          />
        </>
      )
    }
  }

  return (
    <SafeView style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={userType == userRoles.Service_Seeker_individual ? STRING.addPersonalDetails.title : STRING.add_business_details}
      />
      <KeyBoardAware
        enableOnAndroid
        extraScrollHeight={getScaleSize(40)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles(theme).scrollContent}
      >
        <View style={styles(theme).mainContainer}>
          <View style={styles(theme).imageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage?.uri }}
                style={styles(theme).image}
              />
            ) : name.trim() ? (
              <View style={styles(theme).image}>
                <Text
                  size={getScaleSize(24)}
                  font={FONTS.Lato.Regular}
                  color={theme._262B43E5}>
                  {getInitialName(name)}
                </Text>
              </View>
            ) : (
              <Image
                source={IMAGES.user_placeholder}
                style={styles(theme).image}
                resizeMode="cover"
              />
            )}
            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}>
              <Text
                size={getScaleSize(16)}
                font={FONTS.Lato.SemiBold}
                color={theme.mainText}
                align="center">
                {STRING.buttonText.upload_profile_picture}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme.secondaryText}
            style={{ marginBottom: getScaleSize(16) }}>
            {userType == userRoles.Service_Seeker_individual ? STRING.addPersonalDetails.subTitle : STRING.enter_business_details}
          </Text>
          <View style={{ gap: getScaleSize(16) }}>
            {getForm()}
            <CheckBox
              label="I agree to the terms and conditions"
              checked={isTermsAccepted}
              onPress={() => setIsTermsAccepted(!isTermsAccepted)}
              onPressInfo={() => {
                props.navigation.navigate(SCREENS.PrivacyDetails.identifier);
              }}
            />
          </View>
        </View>
        <Button
          title={STRING.next}
          style={styles(theme).btnStyle}
          onPress={() => {
            onSignup();
            // props.navigation.navigate(SCREENS.AddAdress.identifier);
          }}
        />
      </KeyBoardAware>
      <SelectCountrySheet
        height={getScaleSize(500)}
        isVisible={visibleCountry}
        onPress={(e: any) => {
          console.log('Selected Country:', dropDownType);

          const countryName = e?.code ?? '';

          if (dropDownType === 'nationality') {
            setNationality(countryName);
          } else if (dropDownType === 'residence') {
            setResidence(countryName);
          } else if (dropDownType === 'mobile_number') {
            setCountryCode(e?.dial_code);
          }
          setVisibleCountry(false);
        }}
        onClose={() => {
          setVisibleCountry(false);
        }}
      />
    </SafeView>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      flex: 1.0,
    },
    mainContainer: {
      // flex: 1.0,
      marginHorizontal: getScaleSize(24),
      marginVertical: getScaleSize(18),
      // justifyContent: 'center',
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: getScaleSize(20),
      marginBottom: getScaleSize(16),
    },
    image: {
      backgroundColor: theme._F0EFF0,
      width: getScaleSize(126),
      height: getScaleSize(126),
      borderRadius: getScaleSize(126),
      marginBottom: getScaleSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContent: {
      paddingBottom: getScaleSize(50),
    },
    btnStyle: {
      marginVertical: getScaleSize(24),
      marginHorizontal: getScaleSize(24),
    }
  });
