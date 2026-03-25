import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';
import { getScaleSize, SHOW_TOAST, Storage, useString } from '../../constant';
import { Button, Header, Input, KeyBoardAware } from '../../components';
import { SCREENS } from '..';
import { API } from '../../api';
import { CommonActions } from '@react-navigation/native';
import { userRoles } from '../../constant/utils';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';

const AddAdress = (props: any) => {
    const { data } = props.route.params ?? "";

    const STRING = useString();

    const { theme } = useContext(ThemeContext);

    const [loading, setLoading] = React.useState(false);

    const { userType, setUser, setUserType, setProfile } =
        useContext<any>(AuthContext);

    const [state, setState] = React.useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
    });

    // async function onSignup() {

    //     // REGEX (clean + strict)
    //     const emojiRegex =
    //         /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+)/;

    //     const nameRegex = /^[A-Za-z.\- ]+$/;
    //     const onlyNumbers = /^\d+$/;
    //     const onlySpecialChars = /^[^A-Za-z0-9]+$/;
    //     const mobileRegex = /^[0-9]{10}$/;

    //     // Trim everything first
    //     const cleanAddress1 = state.addressLine1.trim();
    //     const cleanAddress2 = state.addressLine2.trim();
    //     const cleanCity = state.city.trim();
    //     const cleanState = state.state.trim();
    //     const cleanCountry = state.country.trim();
    //     const cleanPostalCode = state.postalCode.trim();
    //     // const cleanEmail = data.email.trim();

    //     // // Update state with trimmed values
    //     // setName(cleanName);
    //     // setMobileNo(cleanMobile);
    //     // setAddress(cleanAddress);
    //     // setEmail(cleanEmail);

    //     // let hasError = false;

    //     // setNameError('');
    //     // setMobileNoError('');
    //     // setEmailError('');
    //     // setAddressError('')

    //     // // NAME VALIDATION 
    //     // if (!cleanName) {
    //     //   setNameError(STRING.name_required);
    //     //   hasError = true;
    //     // }
    //     // else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(cleanName)) {
    //     //   setNameError(STRING.name_invalid_characters);
    //     //   hasError = true;
    //     // }

    //     // // MOBILE VALIDATION 
    //     // if (!cleanMobile) {
    //     //   setMobileNoError(STRING.mobile_number_required);
    //     //   hasError = true;
    //     // } else if (!mobileRegex.test(cleanMobile)) {
    //     //   setMobileNoError(STRING.mobile_must_be_10_digits);
    //     //   hasError = true;
    //     // }

    //     // // EMAIL VALIDATION 
    //     // if (!cleanEmail) {
    //     //   setEmailError(STRING.email_required);
    //     //   hasError = true;
    //     // } else if (
    //     //   cleanEmail.length < 6 ||
    //     //   cleanEmail.length > 100 ||
    //     //   !REGEX.email.test(cleanEmail)
    //     // ) {
    //     //   setEmailError(STRING.please_enter_valid_email);
    //     //   hasError = true;
    //     // }

    //     // ADDRESS VALIDATION 
    //     // if (!cleanAddress1) {
    //     //   setAddressError(STRING.address_required);
    //     //   hasError = true;
    //     // }
    //     // else if (/^\d+$/.test(cleanAddress1)) {
    //     //   setAddressError(STRING.address_only_numbers_error);
    //     //   hasError = true;
    //     // }
    //     // else if (/^[^A-Za-z0-9]+$/.test(cleanAddress1)) {
    //     //   setAddressError(STRING.address_special_char_error);
    //     //   hasError = true;
    //     // }

    //     // if (hasError) {
    //     //   return
    //     // }
    //     // else {
    //     const params = {
    //         mobile: data?.mobile,
    //         phone_country_code: data?.phone_country_code,
    //         name: data?.name,
    //         email: data?.email,
    //         address: cleanAddress1 + ', ' + cleanAddress2 + ', ' + cleanCity + ', ' + cleanState + ', ' + cleanCountry + ', ' + cleanPostalCode,
    //         role: data?.role,
    //     };

    //     try {
    //         setLoading(true);
    //         const result = await API.Instance.post(
    //             API.API_ROUTES.addPersonalDetails,
    //             params,
    //         );

    //         if (result.status) {
    //             SHOW_TOAST(result?.data?.message ?? '', 'success');
    //             Storage.save(
    //                 Storage.USER_DETAILS,
    //                 JSON.stringify(result?.data?.data),
    //             );
    //             setUser(result?.data?.data);
    //             setUserType(result?.data?.data?.user_data?.role);
    //             getProfileData();
    //         } else {
    //             SHOW_TOAST(result?.data?.message ?? '', 'error');
    //         }
    //     } catch (error: any) {
    //         SHOW_TOAST(error?.message ?? '', 'error');
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    // async function getProfileData() {
    //     try {
    //         setLoading(true);
    //         const result = await API.Instance.get(API.API_ROUTES.getUserDetails + `?platform=app`);
    //         if (result.status) {
    //             setProfile(result?.data?.data);
    //             onNext();
    //         } else {
    //             SHOW_TOAST(result?.data?.message, 'error');
    //             console.log('ERR', result?.data?.message);
    //         }
    //     } catch (error: any) {
    //         SHOW_TOAST(error?.message ?? '', 'error');
    //         return null;
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async function onNext() {
    //     if (userType == 'service_provider') {
    //         props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier);
    //     } else {
    //         props.navigation.dispatch(
    //             CommonActions.reset({
    //                 index: 0,
    //                 routes: [{ name: SCREENS.BottomBar.identifier }],
    //             }),
    //         );
    //     }
    // }

    const handleAddAddress = () => {
        if (userType == userRoles.Service_Seeker_individual) {
            // TODO: Add address for service seeker individual
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: SCREENS.Login.identifier,
                        },
                    ],
                }),
            );
        } else {
            // TODO: Add address for service seeker business
            props.navigation.navigate(SCREENS.VerificationDetails.identifier)
        }
    }

    return (
        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.addAdress.title}
            />
            <KeyBoardAware
                enableOnAndroid
                extraScrollHeight={getScaleSize(40)}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles(theme).scrollContent}
            >
                <View style={styles(theme).mainContainer}>
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.address_line_1}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.addressLine1}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, addressLine1: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.address_line_2}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.addressLine2}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, addressLine2: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.city}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.city}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, city: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.country}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.country}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, country: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.state}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.state}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, state: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.postal_code}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.postalCode}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, postalCode: text }));
                        }}
                    />
                </View>
            </KeyBoardAware>
            <Button
                title={STRING.buttonText.add_address}
                style={styles(theme).btnStyle}
                onPress={() => {
                    handleAddAddress();
                }}
            />
        </AppSafeAreaView>
    );
};

export default AddAdress;

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.white,
            flex: 1.0,
        },
        mainContainer: {

            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(18),

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
            marginHorizontal: getScaleSize(24),
            marginBottom: getScaleSize(10),
            marginTop: 'auto'
        }
    });