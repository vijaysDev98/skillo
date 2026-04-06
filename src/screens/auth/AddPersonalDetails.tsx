
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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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
  GenderSelection,
} from '../../components';
import { CommonActions } from '@react-navigation/native';
import { API } from '../../api';
import { launchImageLibrary } from 'react-native-image-picker';
import { userRoles } from '../../constant/utils';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addPersonalDetailsAction, addProviderPersonalDetailsAction, providerAddressCreateAction, uploadProviderProfilePhotoAction, uploadSeekerProfilePhotoAction } from '../../actions/auth/authAction';
import { setLoading } from '../../actions/auth/authSlice';
import NavigationService from '../NavigationService';

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
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { userType, setUser, setUserType, setProfile, userRole } =
    useContext<any>(AuthContext);

  const isEmail = props?.route?.params?.email || '';
  const { id } = props?.route?.params || {};
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
  const [visibleCountry, setVisibleCountry] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [profileImage, setProfileImage] = useState<any>(null);
  const [countryFlag, setCountryFlag] = useState('🇮🇳');
  const [nationality, setNationality] = useState('');
  const [residence, setResidence] = useState('');
  const [dropDownType, setDropDownType] = useState<'nationality' | 'residence' | 'mobile_number' | 'kin_mobile_number'>('nationality');
  const [kinCountryCode, setKinCountryCode] = useState('+91');


  const [businessName, setBusinessName] = useState('')
  const [businessNameError, setBusinessNameError] = useState('')
  const [vatNumber, setVatNumber] = useState('')
  const [vatNumberError, setVatNumberError] = useState('')
  const [businessEmail, setBusinessEmail] = useState(isEmail ? isEmail : '')
  const [businessEmailError, setBusinessEmailError] = useState('')
  const [businessDisc, setBusinessDisc] = useState('')
  const [businessDiscError, setBusinessDiscError] = useState('')
  const [contactPersonName, setContactPersonName] = useState('')
  const [contactPersonNameError, setContactPersonNameError] = useState('')

  const [passportNumber, setPassportNumber] = useState('')
  const [passportError, setPassportError] = useState('')
  const [dobError, setDobError] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [nextOfKinName, setNextOfKinName] = useState('')
  const [nextOfKinNumber, setNextOfKinNumber] = useState('')
  const [relation, setRelation] = useState('')
  const [professionalTraining, setProfessionalTraining] = useState('')
  const [selfTaught, setSelfTaught] = useState('')
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [kinNameError, setKinNameError] = useState('');
  const [kinNumberError, setKinNumberError] = useState('');
  const [relationError, setRelationError] = useState('');
  const [genderError, setGenderError] = useState('');

  const [nationalityError, setNationalityError] = useState('');
  const [residenceError, setResidenceError] = useState('');

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
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const userData: any = await Storage.get(Storage.USER_DETAILS)
        const userDataParse = JSON.parse(userData)
        console.log("userDataParse", userDataParse)
        console.log("userDataParse?.user_id", userDataParse?.user_id || userDataParse?._id)
        const asset: any = response.assets[0];
        const formData = new FormData();
        formData.append('user_id', userDataParse?.user_id || userDataParse?._id);
        formData.append('file', {
          uri: asset?.uri,
          name: asset?.fileName || 'profile_image.jpg',
          type: asset?.type || 'image/jpeg',
        } as any);
        if (userType === userRoles.Service_Provider_individual || userType === userRoles.Service_Provider_business) {
          dispatch(
            uploadProviderProfilePhotoAction(
              formData,
              (data: any) => {
                console.log("data", data)
                setProfileImage(data)
              },
              () => setProfileImage(null),
            ),
          );
        } else {
          dispatch(
            uploadSeekerProfilePhotoAction(
              formData,
              (data: any) => {
                console.log("data", data)
                setProfileImage(data)
              },
              () => setProfileImage(null),
            ),
          );
        }

      } else {
        console.log('response', response);
      }
    });
  };

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

  function validateProviderIndividualForm() {
    let hasError = false;

    const cleanName = name.trim();
    const cleanMobile = mobileNo.trim();
    const mobileRegex = /^[0-9]{10}$/;

    setNameError('');
    setMobileNoError('');
    setPassportError('');
    setDobError('');
    setKinNameError('');
    setKinNumberError('');
    setRelationError('');
    setGenderError('');

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

    if (!passportNumber.trim()) {
      setPassportError('Passport number is required');
      hasError = true;
    }

    if (!dob) {
      setDobError('Date of birth is required');
      hasError = true;
    }

    if (!gender) {
      setGenderError('Gender is required');
      hasError = true;
    }

    if (!nextOfKinName.trim()) {
      setKinNameError('Next of kin name is required');
      hasError = true;
    }

    if (!nextOfKinNumber.trim()) {
      setKinNumberError('Next of kin number is required');
      hasError = true;
    }

    if (!relation.trim()) {
      setRelationError('Relation is required');
      hasError = true;
    }

    if (!nationality) {
      setNationalityError('Please select nationality');
      hasError = true;
    }

    if (!residence) {
      setResidenceError('Please select country of residence');
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

  async function handlePersonalDetails() {


    if (userType === userRoles.Service_Seeker_individual) {
      if (!validateIndividualForm()) return;
    }

    if (userType === userRoles.Service_Seeker_business || userType === userRoles.Service_Provider_business) {
      if (!validateBusinessForm()) return;
    }

    if (userType === userRoles.Service_Provider_individual) {
      if (!validateProviderIndividualForm()) return;
    }

    if (!isTermsAccepted) {
      SHOW_TOAST('Please accept Privacy Policy & Terms to continue', 'error');
      return;
    }
    if (userType === userRoles.Service_Seeker_individual) {
      let apiData = {
        mobile: mobileNo,
        phone_country_code: countryCode,
        name: name,
        nationality: nationality,
        country_of_residence: residence,
        profile_photo_id: profileImage?.profile_photo_id,
      }
      dispatch(
        addPersonalDetailsAction(apiData, () => {
          NavigationService.navigate(SCREENS.AddAdress.identifier, { data: apiData });
        }),
      );
    }
    else if (userType === userRoles.Service_Seeker_business) {
      let apiData = {
        mobile: mobileNo,
        phone_country_code: countryCode,
        name: name,
        nationality: nationality,
        country_of_residence: residence,
        profile_photo_id: profileImage?.profile_photo_id,
        business_name: businessName,
        business_description: businessDisc,
        vat_number: vatNumber,
        contact_person_name: contactPersonName,
      }
      dispatch(
        addPersonalDetailsAction(apiData, () => {
          NavigationService.navigate(SCREENS.AddAdress.identifier, { data: apiData });
        }),
      );
    }
    else if (userType === userRoles.Service_Provider_individual) {
      const apiData = {
        mobile: mobileNo,
        phone_country_code: countryCode,
        nationality: nationality,
        country_of_residence: residence,
        profile_photo_id: profileImage?.profile_photo_id,
        is_terms_accepted: isTermsAccepted,
        full_name: name,
        passport_number: passportNumber,
        date_of_birth: dob,
        gender: gender,
        next_of_kin_name: nextOfKinName,
        next_of_kin_number: nextOfKinNumber,
        next_kin_phone_country_code:kinCountryCode,
        relation: relation,
        has_professional_training: professionalTraining === 'yes' ? true : false,
        is_self_taught: selfTaught === 'yes' ? true : false,
      };

      dispatch(addProviderPersonalDetailsAction(apiData, () => {
        NavigationService.navigate(SCREENS.AddAdress.identifier, { data: apiData });
      }));
    }
    else if (userType === userRoles.Service_Provider_business) {
      let apiData = {
        profile_photo_id: profileImage?.profile_photo_id,
        business_name: businessName,
        vat_number: vatNumber,
        business_description: businessDisc,
        contact_person_name: contactPersonName,
        phone_country_code: countryCode,
        mobile: mobileNo,
        country_of_residence: residence,
        //  nationality: nationality,
        is_terms_accepted: isTermsAccepted
      }
      dispatch(addProviderPersonalDetailsAction(apiData, () => {
        NavigationService.navigate(SCREENS.AddAdress.identifier, { data: apiData });
      }));
    }
  }


  // async function getProfileData() {
  //   try {
  //     dispatch(setLoading(true));
  //     const result = await API.Instance.get(API.API_ROUTES.getUserDetails + `?platform=app`);
  //     if (result.status) {
  //       setProfile(result?.data?.data);
  //       onNext();
  //     } else {
  //       SHOW_TOAST(result?.data?.message, 'error');
  //       console.log('ERR', result?.data?.message);
  //     }
  //   } catch (error: any) {
  //     SHOW_TOAST(error?.message ?? '', 'error');
  //     return null;
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // }

  // async function onNext() {
  //   if (userType == 'service_provider') {
  //     props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier);
  //   } else {
  //     props.navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: SCREENS.BottomBar.identifier }],
  //       }),
  //     );
  //   }
  // }

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
          {/* <Input
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
          /> */}
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
            value={businessEmail}
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
            inputTitle={STRING.mobile_number}
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
          {userType == userRoles.Service_Seeker_business && (
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
          )} 
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
            placeholder="Enter Full Name"
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
            editable={false}
            isDropDown={true}
            onPress={() => {
              setShowDatePicker(true);
            }}
            isError={dobError}
          />

          <GenderSelection
            inputTitle={STRING.gender}
            placeholder={STRING.gender}
            value={gender}
            onSelect={setGender}
            isError={genderError}
          />

          <Input
            placeholder={STRING.enter_mobile_no}
            inputTitle={STRING.mobile_number}
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
            isError={mobileNoError}
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
            placeholder="Select Nationality"
            inputTitle="Nationality"
            isDropDown={true}
            value={nationality}
            onPress={() => {
              setDropDownType('nationality')
              setVisibleCountry(true)
            }}
            isError={nationalityError}
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
            isError={residenceError}
          />
          <Input
            placeholder="Next of Kin Name"
            inputTitle="Next of Kin's Name"
            value={nextOfKinName}
            onChangeText={setNextOfKinName}
            isError={kinNameError}
          />
          <Input
            placeholder="Enter Mobile No"
            inputTitle="Next of Kin's number"
            keyboardType="number-pad"
            value={nextOfKinNumber}
            onChangeText={setNextOfKinNumber}
            countryCode={kinCountryCode}
            onPressCountryCode={() => {
              setDropDownType('kin_mobile_number');
              setVisibleCountry(true);
            }}
            isError={kinNumberError}
          />
          <Input
            placeholder="Relation"
            inputTitle="Relation"
            value={relation}
            onChangeText={setRelation}
            isError={relationError}
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
    <AppSafeAreaView style={styles(theme).container}>
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
                source={{ uri: profileImage?.url }}
                style={styles(theme).image}
              />
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
                NavigationService.navigate(SCREENS.PrivacyDetails.identifier);
              }}
            />
          </View>
        </View>
        <Button
          title={STRING.next}
          loading={isLoading}
          style={styles(theme).btnStyle}
          onPress={() => {
            handlePersonalDetails();
          }}
        />
      </KeyBoardAware>
      <SelectCountrySheet
        height={getScaleSize(500)}
        isVisible={visibleCountry}
        onPress={(e: any) => {
          console.log('Selected Country:', e, "name", e?.name?.en);

          const countryCode = e?.code ?? '';
          const countryName = e?.name?.en ?? '';

          if (dropDownType === 'nationality') {
            setNationality(countryName);
          } else if (dropDownType === 'residence') {
            setResidence(countryName);
          } else if (dropDownType === 'mobile_number') {
            setCountryCode(e?.dial_code);
          } else if (dropDownType === 'kin_mobile_number') {
            setKinCountryCode(e?.dial_code);
          }
          setVisibleCountry(false);
        }}
        onClose={() => {
          setVisibleCountry(false);
        }}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDob(moment(selectedDate).format('YYYY-MM-DD'));
            }
          }}
        />
      )}
    </AppSafeAreaView>
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
