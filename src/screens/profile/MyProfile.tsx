import React, { useContext, useMemo, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, SHOW_SUCCESS_TOAST, SHOW_TOAST, useString } from '../../constant';

//COMPONENTS
import { Text, Header, Input, Button, BottomSheet, SelectCountrySheet, KeyBoardAware } from '../../components';

//API
import { API } from '../../api';

//PACKAGES
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

//SCREENS
import { SCREENS } from '..';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { editSeekerProfileAction, uploadSeekerProfilePhotoAction } from '../../actions/auth/authAction';

export default function MyProfile(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const { profile, fetchProfile, setUser, setUserType, userType } = useContext(AuthContext)

    const { userData } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const bottomSheetRef = useRef<any>(null);
    const inputHeight = Platform.OS == 'ios' ? getScaleSize(56) : getScaleSize(56)

    const initialValues = useMemo(() => ({
        name: userData?.profile?.full_name || "",
        email: userData?.user?.email ?? "",
        mobile: userData?.user?.mobile ?? "",
        countryCode: userData?.user?.phone_country_code || '+91',
    }), [userData]);

    const [name, setName] = useState(initialValues.name);
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState(initialValues.email);
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [address, setAddress] = useState(userData?.user?.address ?? "");
    const [addressError, setAddressError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<any>(null);
    const [addressHeight, setAddressHeight] = useState(inputHeight);
    const [visibleCountry, setVisibleCountry] = useState(false);

    const [isEmailVerified, setIsEmailVerified] = useState(false)

    const [countryCode, setCountryCode] = useState(initialValues.countryCode);
    const [countryFlag, setCountryFlag] = useState('🇮🇳');
    const [mobileNumber, setMobileNumber] = useState(initialValues.mobile);

    const pickImage = async () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.errorCode && response.assets) {
                const asset: any = response.assets[0];
                console.log('asset', asset)
                let formData = new FormData();
                formData.append('user_id', userData?.user?.user_id);
                formData.append('file', {
                    uri: asset?.uri,
                    name: asset?.fileName || 'profile_image.jpg',
                    type: asset?.type || 'image/jpeg',
                } as any);
                dispatch(
                    uploadSeekerProfilePhotoAction(
                        formData,
                        handleProfileImageSucess,
                        () => setProfileImage(null),
                    ),
                );

            } else {
                console.log('response', response)
            }
        });
    }

    const handleProfileImageSucess= (data?: any) =>{
            let apiData={
                 profile_photo_id: data?.profile_photo_id,
            }
        dispatch(editSeekerProfileAction(apiData))
    }

    const isOnlyWhitespace = (value: string) => !value || !value.trim();

    // Detect emoji (Unicode emoji ranges)
    const containsEmoji = (str: any) => {
        return /[\p{Extended_Pictographic}]/u.test(str);
    };

    // Detect HTML/script tags
    const containsHTML = (str: any) => /<[^>]*>/g.test(str);

    // Find first invalid character
    const findInvalidChar = (value: any, regex: any) => {
        for (let char of value) {
            if (!regex.test(char)) {
                return char;
            }
        }
        return null;
    };

    // NAME VALIDATION 
    const validateName = (value: any) => {
        const trimmed = value.trim();

        // 1. Only whitespace
        if (!trimmed) {
            return "Name cannot be empty or only spaces";
        }

        // 2. Length
        if (trimmed.length < 2 || trimmed.length > 50) {
            return "Name must be between 2 and 50 characters";
        }

        // 3. Emoji check
        if (containsEmoji(trimmed)) {
            return "Name cannot contain emojis";
        }

        // 4. Allow only letters + space
        const validNameChar = /^[A-Za-z\s]$/;
        const invalidChar = findInvalidChar(trimmed, validNameChar);

        if (invalidChar) {
            return `Invalid character in name: "${invalidChar}"`;
        }

        return "";
    };

    // ADDRESS VALIDATION 

    const validateAddress = (value: string) => {
        if (!value) {
            return "Address is required.";
        }

        const trimmed = value.trim();

        if (!trimmed) {
            return "Address is required.";
        }

        if (trimmed.length < 5) {
            return "Address must be at least 05 characters long.";
        }

        if (trimmed.length > 250) {
            return "Address cannot exceed 250 characters.";
        }

        // Allow only approved characters
        const allowedRegex = /^[A-Za-z0-9\s,.\-/#]+$/;

        if (!allowedRegex.test(trimmed)) {
            return "Special characters are not allowed except , . - / #.";
        }

        // Must contain at least one letter (not only numbers or special chars)
        if (!/[A-Za-z]/.test(trimmed)) {
            return "Please enter a valid address.";
        }

        return "";
    }

    const hasChanges = useMemo(() => {
        return (
            name !== initialValues.name ||
            email !== initialValues.email ||
            mobileNumber !== initialValues.mobile ||
            countryCode !== initialValues.countryCode
        );
    }, [name, email, mobileNumber, countryCode, initialValues]);

    async function onEditUserProfile() {
        let data = {
            mobile: mobileNumber,
            phone_country_code:countryCode,
            full_name: name,
        }
        dispatch(editSeekerProfileAction(data))
        // try {
        //     const params = {
        //         user_data: {
        //             name: trimmedName,
        //             address: trimmedAddress,
        //             phone_number: mobileNumber,
        //             phone_country_code: countryCode,
        //         }
        //     };

        //     console.log('EDIT PARAMS', params)

        //     setLoading(true);
        //     const result = await API.Instance.patch(API.API_ROUTES.editProfile, params);
        //     setLoading(false);

        //     console.log('EDIT PROFILE RES', JSON.stringify(result))

        //     if (result?.status) {
        //         SHOW_SUCCESS_TOAST(STRING.profile_updated_successfully)
        //         setLoading(false);
        //         props.navigation.goBack();
        //         await fetchProfile()
        //     }
        //     else {
        //         SHOW_TOAST(result?.data?.message, 'error')
        //         console.log('ERR', result?.data?.message)
        //     }
        // } catch (error: any) {
        //     SHOW_TOAST(error?.message ?? '', 'error');
        // }
    }

    async function onDeleteProfile() {

        try {
            setLoading(true);
            const result: any = await API.Instance.delete(API.API_ROUTES.deleteProfile);
            setLoading(false);

            console.log('DELETE PROFILE RES', JSON.stringify(result))

            if (result?.status) {
                await AsyncStorage.clear()
                setUser(null);
                setUserType(null);
                setTimeout(() => {
                    setLoading(false)
                    props.navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [{
                            name: SCREENS.Login.identifier
                        }]
                    }))
                }, 500);
            }
            else {
                SHOW_TOAST(result?.data?.message, 'error')
                console.log('ERR', result?.data?.message)
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        }
    }

    const isEmailChange = email !== profile?.user?.email;

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).headerContainer}>
                <Header
                    rightIcon={{ icon: IMAGES.ic_delete_profile, title: STRING.delete_account }}
                    rightIconContainerStyle={styles(theme).deleteIconContainer}
                    onPress={() => { bottomSheetRef.current.open() }}
                    onBack={() => { props.navigation.goBack() }}
                    screenName={STRING.my_profile}
                />
            </View>
            {/* <KeyBoardAware showsVerticalScrollIndicator={false}> */}
            <View style={styles(theme).mainContainer}>
                {(userData?.profile?.profile_photo?.url || profileImage) ? (
                    <Image
                        source={{ uri: (userData?.profile?.profile_photo?.url) ? userData?.profile?.profile_photo?.url : profileImage?.url }}
                        resizeMode='cover'
                        style={styles(theme).profileContainer} />
                ) : (
                    <View style={styles(theme).EmptyProfileContainer}>
                        <Text
                            size={getScaleSize(24)}
                            font={FONTS.Lato.Regular}
                            align="center"
                            color={theme._262B43E5}>
                            {(userData?.profile?.full_name?.charAt(0) ?? '').toUpperCase()}
                            {/* // +
                                //     (profile?.user?.last_name?.charAt(0) ?? '').toUpperCase()} */}
                        </Text>
                    </View>
                )}
                <TouchableOpacity onPress={pickImage}>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        align="center"
                        color={theme._EC613D}
                        style={styles(theme).editPicText}>
                        {STRING.edit_picture_or_avatar}
                    </Text>
                </TouchableOpacity>
                <Text
                    style={styles(theme).sectionTitle}
                    size={getScaleSize(20)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._2B2B2B}>
                    {STRING.personal_information}
                </Text>
                <View style={styles(theme).fieldsWrapper}>
                    <Input
                        placeholder={STRING.enter_name}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.name}
                        inputColor={true}
                        maxLength={50}
                        value={name}
                        continerStyle={styles(theme).inputSpacing}
                        onChangeText={text => {
                            // Remove invalid characters
                            let cleaned = text.replace(/[^A-Za-z\s]/g, '');

                            // Remove leading spaces
                            cleaned = cleaned.replace(/^\s+/, '');

                            // Replace multiple spaces with single space
                            cleaned = cleaned.replace(/\s{2,}/g, ' ');

                            setName(cleaned);
                            setNameError('');
                        }}
                        isError={nameError}
                    />

                    {/* <Input
                        placeholder={STRING.enter_mobile_number}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.mobile_number}
                        inputColor={true}
                        keyboardType="numeric"
                        continerStyle={styles(theme).inputSpacing}
                        value={mobileNumber}
                        maxLength={10}
                        onChangeText={text => {
                            const cleaned = text.replace(/[^0-9]/g, '');
                            setMobileNumber(cleaned);
                            setMobileNumberError('');
                        }}
                        isError={mobileNumberError}
                    /> */}
                    <Input
                                placeholder={STRING.enter_mobile_no}
                                placeholderTextColor={theme._939393}
                                inputTitle={STRING.mobile_number}
                                // inputColor={true}
                                  continerStyle={styles(theme).inputSpacing}
                                value={mobileNumber}
                               onChangeText={text => {
                            const cleaned = text.replace(/[^0-9]/g, '');
                            setMobileNumber(cleaned);
                            setMobileNumberError('');
                        }}
                                keyboardType="number-pad"
                                maxLength={10}
                                isError={mobileNumberError}
                                countryCode={countryCode}
                                // countryFlag={countryFlag}
                                onPressCountryCode={() => {
                                  setVisibleCountry(true);
                                }}
                              />
                    <Input
                        inputTitle={STRING.e_mail_id}
                        // inputColor={true}
                        containerStyle={styles(theme).emailContainer}
                        value={email}
                        inputContainer={styles(theme).emailInput}
                        onChangeText={text => {
                            setEmail(text);
                            setEmailError('');
                        }}
                        isError={emailError}
                        editable={true}
                    />
                </View>
            </View>
            {/* </KeyBoardAware> */}
            <Button
                title={STRING.update}
                style={[styles(theme).updateButton, !hasChanges && styles(theme).disabledButton]}
                disabled={!hasChanges}
                onPress={onEditUserProfile}
            />
            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                height={getScaleSize(360)}
                isInfo={true}
                title={STRING.are_you_sure_you_want_to_delete_your_account}
                description={'Once deleted, your account and all associated data are permanently erased. No refunds will be issued.'}
                buttonTitle={STRING.delete_account}
                secondButtonTitle={STRING.cancel}
                onPressSecondButton={() => {
                    bottomSheetRef.current.close();
                }}
                onPressButton={() => {
                    onDeleteProfile()
                }}
            />
            <SelectCountrySheet
                height={getScaleSize(500)}
                isVisible={visibleCountry}
                onPress={(e: any) => {
                    console.log('e', e)
                    setCountryCode(e.dial_code);
                    setCountryFlag(e.flag);
                    setVisibleCountry(false);
                }}
                onClose={() => {
                    setVisibleCountry(false);
                }}
            />
        </View >
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.white
        },
        mainContainer: {
            flex: 1,
            marginHorizontal: getScaleSize(24),
        },
        profileContainer: {
            width: getScaleSize(126),
            height: getScaleSize(126),
            borderRadius: getScaleSize(126),
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: theme._F0EFF0,
            marginBottom: getScaleSize(12),
        },
        EmptyProfileContainer: {
            width: getScaleSize(126),
            height: getScaleSize(126),
            backgroundColor: theme._F0EFF0,
            borderRadius: getScaleSize(126),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: getScaleSize(12),
        },
        changeEmailBtn: {
            borderRadius: getScaleSize(10),
            backgroundColor: theme.primary,
            paddingVertical: getScaleSize(10),
            paddingHorizontal: getScaleSize(24),
            marginRight: getScaleSize(16)
        },
        headerContainer: {
            marginTop: getScaleSize(10),
        },
        deleteIconContainer: {
            backgroundColor: theme.white,
            padding: getScaleSize(8),
            borderRadius: getScaleSize(6),
        },
        editPicText: {
            marginTop: getScaleSize(6),
        },
        sectionTitle: {
            marginTop: getScaleSize(22),
            marginBottom: getScaleSize(12),
        },
        fieldsWrapper: {
            gap: getScaleSize(16),
        },
        inputSpacing: {
            marginBottom: getScaleSize(20),
        },
        emailContainer: {
            paddingHorizontal: 0,
            marginBottom: getScaleSize(20),
            opacity: 0.5,
            backgroundColor: theme._F0EFF0,
        },
        emailInput: {
            fontSize: getScaleSize(16),
            // opacity: 0.7,
            color: theme.primaryText,
            paddingHorizontal: getScaleSize(10),
        },
        updateButton: {
            marginVertical: getScaleSize(24),
            marginHorizontal: getScaleSize(24),
        },
        disabledButton: {
            opacity: 0.6,
        },
    });
