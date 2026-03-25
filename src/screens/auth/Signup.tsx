import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, REGEX, SHOW_TOAST, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, SelectCountrySheet } from '../../components';
import { CommonActions } from '@react-navigation/native';
import { API } from '../../api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Signup(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);
    const { userType } = useContext<any>(AuthContext);

    console.log("userType======>>>>", userType)

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [visibleCountry, setVisibleCountry] = useState(false);
    // const [countryCode, setCountryCode] = useState('+91');
    // const [isPhoneNumber, setIsPhoneNumber] = useState(false);

    // useEffect(() => {
    //     if (email.length >= 3) {
    //         const isNumber = REGEX.phoneRegex.test(email);
    //         setIsPhoneNumber(isNumber)
    //     }
    //     else {
    //         setIsPhoneNumber(false)
    //     }
    // }, [email])

    async function onSignup() {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setEmailError(STRING.errorText.email_required);

        } else if (trimmedEmail.length < 6 || trimmedEmail.length > 100) {
            setEmailError(STRING.errorText.email_must_be_six_to_hundred_char_allow);

        } else if (!REGEX.email.test(trimmedEmail)) {
            setEmailError(STRING.errorText.please_enter_valid_email);

        } else {
            setEmailError('');
            // let params = {}
            // if (isPhoneNumber) {
            //     params = {
            //         mobile: email,
            //         phone_country_code: countryCode,
            //         role: userType,
            //     }
            // } else {
            const params = {
                email: trimmedEmail,
                role: userType,
            }
            // }
            try {
                setLoading(true);
                const result: any = await API.Instance.post(API.API_ROUTES.signup, params);
                setLoading(false);
                console.log('result', result?.code, result)
                if (result.status) {
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    props.navigation.navigate(SCREENS.Otp.identifier, {
                        isFromSignup: true,
                        email: email,
                        // isPhoneNumber: isPhoneNumber,
                        // countryCode: countryCode,
                    });
                } else {
                    if (result?.code === 409) {
                        if (result?.data?.message == 'OTP already sent. Redirect to Verify page.') {
                            props.navigation.navigate(SCREENS.Otp.identifier, {
                                isFromSignup: true,
                                email: email,
                            })
                        } else if (result?.data?.message == 'OTP already verified. Redirect to Password page.') {
                            props.navigation.navigate(SCREENS.CreatePassword.identifier, {
                                email: email,
                            })
                        } else if (result?.data?.message == 'Password already set. Redirect to Details page.') {
                            props.navigation.navigate(SCREENS.AddPersonalDetails.identifier, {
                                email: email,
                            })
                        } else {
                            SHOW_TOAST(result?.data?.message ?? '', 'error')
                        }
                    } else {
                        SHOW_TOAST(result?.data?.message ?? '', 'error')
                        console.log('error==>', result?.data?.message)
                    }
                }
            } catch (error: any) {
                setLoading(false);
                SHOW_TOAST(error?.message ?? '', 'error');
                console.log(error?.message)
            }
        }
    }

    return (
        <View style={styles(theme).container}>
            <Header />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                // extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 20,
                    flexGrow: 1,
                }}
            >
                <View style={styles(theme).mainContainer}>
                    <Image source={IMAGES.ic_logo} style={styles(theme).logo} />
                    <Text
                        size={getScaleSize(28)}
                        font={FONTS.Lato.ExtraBold}
                        color={theme._111111}
                        align="center"
                        style={{ marginBottom: getScaleSize(24) }}>
                        {STRING.SingUp.getStartedNow}
                    </Text>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._404040}
                        style={{ marginBottom: getScaleSize(32) }}
                        align="center"
                    >
                        {STRING.SingUp.subText}
                    </Text>
                    {/* {isPhoneNumber ? (
                        <Input
                            placeholder={STRING.enter_email_or_mobile_number}
                            placeholderTextColor={theme._939393}
                            inputTitle={STRING.email_or_mobile_number}
                            inputColor={false}
                            continerStyle={{ marginTop: getScaleSize(82) }}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            maxLength={10}
                            onChangeText={text => {
                                setEmail(text);
                                setEmailError('');
                            }}
                            isError={emailError}
                            countryCode={countryCode}
                            onPressCountryCode={() => {
                                setVisibleCountry(true);
                            }}
                        />
                    ) : ( */}
                    <Input
                        placeholder={STRING.placeHolders.enter_email}
                        placeholderTextColor={theme._B3B3B3}
                        inputColor={emailError ? true : false}
                        inputTitle={STRING.inputTitle.email}
                        continerStyle={{ marginTop: getScaleSize(32) }}
                        value={email}
                        maxLength={100}
                        keyboardType="default"
                        autoCapitalize="none"
                        onChangeText={text => {
                            setEmail(text.replace(/\s/g, ''));
                            setEmailError('');
                        }}
                        isError={emailError}
                    />
                    {/* )} */}
                    <Button
                        title={STRING.buttonText.sign_up}
                        style={{ marginTop: getScaleSize(32) }}
                        onPress={() => {
                            // onSignup();
                            props.navigation.navigate(SCREENS.Otp.identifier, {
                                isFromSignup: true,
                                email: email,
                            })
                        }}
                    />
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.Regular}
                        color={theme._999999}
                        align="center"
                        style={{ marginTop: getScaleSize(30) }}>
                        {STRING.SingUp.already_have_an_account}{' '}
                        <Text
                            size={getScaleSize(20)}
                            font={FONTS.Lato.SemiBold}
                            color={theme.mainText}
                            style={{ textDecorationLine: 'underline' }}
                            onPress={() => {
                                props.navigation.navigate(SCREENS.Login.identifier);
                            }}>
                            {STRING.buttonText.log_in}
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
            {/* <SelectCountrySheet
                height={getScaleSize(500)}
                isVisible={visibleCountry}
                onPress={(e: any) => {
                    console.log('e000', e)
                    setCountryCode(e.dial_code);
                    setVisibleCountry(false);
                }}
                onClose={() => {
                    setVisibleCountry(false);
                }}
            /> */}
        </View>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1.0,
            backgroundColor: theme.white,
        },
        mainContainer: {
            // flex: 1.0,
            marginHorizontal: getScaleSize(24),
            marginTop: getScaleSize(80),
        },
        logo: {
            width: Dimensions.get('window').width - getScaleSize(240),
            height: Dimensions.get('window').width - getScaleSize(240),
            alignSelf: 'center',
            marginBottom: getScaleSize(49),
        },

    });
