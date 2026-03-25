import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';

//PACKAGES
import OTPTextInput from 'react-native-otp-textinput';

import { API } from '../../api';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';

export default function Otp(props: any) {

    const STRING = useString();
    const isFromSignup = props?.route?.params?.isFromSignup || false;
    // const isPhoneNumber = props?.route?.params?.isPhoneNumber || false;
    // const countryCode = props?.route?.params?.countryCode || '+91';
    const { email, type } = props?.route?.params || {};

    console.log("email", email);
    console.log("type", type);

    const { theme } = useContext<any>(ThemeContext);
    const otpInput = useRef<OTPTextInput>(null);

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60); // seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
        let interval: any;
        if (isResendDisabled) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isResendDisabled]);


    async function onOtp() {
        if (type == "emailChange") {
            console.log("ajbcdbabjskbbkj")
            props.navigation.goBack();
            return;
        }
        // props.navigation.navigate(SCREENS.CreatePassword.identifier, {
        //                         email: email,
        //                     })
        if (isFromSignup) {
            // onSignup()
            props.navigation.navigate(SCREENS.CreatePassword.identifier, {
                email: email,
                // isPhoneNumber: isPhoneNumber,
                // countryCode: countryCode,
            });
        } else {
            // onNewPassword();
            props.navigation.navigate(SCREENS.NewPassword.identifier, {
                email: email,
                // isPhoneNumber: isPhoneNumber,
                // countryCode: countryCode,
            });
        }
    }

    async function onNewPassword() {
        if (!otp) {
            setOtpError(STRING.errorText.please_enter_your_otp);
        } else {
            setOtpError('');
            // let params = {}
            // if (isPhoneNumber) {
            //     params = {
            //         mobile: email,
            //         phone_country_code: countryCode,
            //         otp: otp,
            //     }
            // } else {
            const params = {
                email: email,
                otp: otp,
            }
            // }
            try {
                setLoading(true);
                const result: any = await API.Instance.post(API.API_ROUTES.verifyResetPassword, params);
                setLoading(false);
                console.log('result', result.status, result)
                if (result.status) {
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    props.navigation.navigate(SCREENS.NewPassword.identifier, {
                        email: email,
                        // isPhoneNumber: isPhoneNumber,
                        // countryCode: countryCode,
                    });
                } else {
                    SHOW_TOAST(result?.data?.message ?? '', 'error')
                    console.log('error==>', result?.data?.message)
                }
            } catch (error: any) {
                setLoading(false);
                SHOW_TOAST(error?.message ?? '', 'error');
                console.log(error?.message)
            } finally {
                setLoading(false);
            }
        }
    }

    async function onSignup() {
        if (!otp) {
            setOtpError(STRING.errorText.please_enter_valid_code);
        } else {
            setOtpError('');
            // let params = {}
            // if (isPhoneNumber) {
            //     params = {
            //         mobile: email,
            //         phone_country_code: countryCode,
            //         otp: otp,
            //     }
            // } else {
            const params = {
                email: email,
                otp: otp,
            }
            // }
            try {
                setLoading(true);
                const result: any = await API.Instance.post(API.API_ROUTES.verifyOtp, params);
                setLoading(false);
                console.log('result', result.status, result)
                if (result.status) {
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    props.navigation.navigate(SCREENS.CreatePassword.identifier, {
                        email: email,
                        // isPhoneNumber: isPhoneNumber,
                        // countryCode: countryCode,
                    });
                } else {
                    if (result?.code === 409) {
                        if (result?.data?.message == 'OTP already verified. Redirect to Password page.') {
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
            } finally {
                setLoading(false);
            }
        }
    }

    async function onResendOtp() {
        try {
            // let params = {}
            // if (isPhoneNumber) {
            //     params = {
            //         mobile: email,
            //         phone_country_code: countryCode,
            //     }
            // } else {
            const params = {
                email: email,
            }
            // }
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.resendOtp, params);
            setLoading(false);
            console.log('result', result.status, result)
            if (result.status) {
                SHOW_TOAST(result?.data?.message ?? '', 'success')
                otpInput.current?.clear();
                setTimer(60);
                setIsResendDisabled(true);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error')
                console.log('error==>', result?.data?.message)
            }
        }
        catch (error: any) {
            setLoading(false);
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (

        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={type == "emailChange" ? "Email Verification" : STRING.otp.title}
            />
            {/* <KeyboardAvoidingView
            style={{flex:1}}
            > */}
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={styles(theme).mainContainer}>
                <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.SemiBold}
                    color={theme.secondaryText}
                    style={{ marginBottom: getScaleSize(32) }}
                >
                    {type === "emailChange" ? (
                        <>
                            Enter the 6-digit code we sent to your email{" "}
                            <Text
                                size={getScaleSize(16)}
                                font={FONTS.Lato.SemiBold} // 👈 optional highlight
                                color={theme._111111}
                            >
                                {email}
                            </Text>{" "}
                            to change the email
                        </>
                    ) : (
                        STRING.otp.subTitle
                    )}
                </Text>
                <View style={styles(theme).inputContainer}>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.Medium}
                        color={theme.primaryText}
                        style={{ marginBottom: getScaleSize(8) }}>
                        {STRING.otp.code}
                    </Text>

                    <OTPTextInput
                        ref={otpInput}
                        inputCount={6}
                        handleTextChange={(val: string) => {
                            setOtp(val);
                            setOtpError('');
                        }}
                        tintColor={theme.primary} // active border
                        offTintColor={theme._BFBFBF} // inactive border
                        textInputStyle={
                            styles(theme).textInput
                        }
                    />
                    {otpError &&
                        <Text
                            style={{ marginTop: getScaleSize(8) }}
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Regular}
                            color={theme.mainText}
                            align="center"
                        >
                            {otpError}
                        </Text>
                    }
                </View>
            </View>

            <View style={styles(theme).resendOtpView}>
                {isResendDisabled ? (
                    <Text
                        font={FONTS.Lato.SemiBold}
                        color={theme.mainText}
                        size={getScaleSize(16)}
                        align="center">
                        Resend -
                        <Text
                            font={FONTS.Lato.SemiBold}
                            color={theme._8C8C8C}
                            size={getScaleSize(16)}
                            align="center">
                            {` 00:${timer} Sec`}
                        </Text>
                    </Text>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            onResendOtp();
                        }}>
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.SemiBold}
                            color={theme.mainText}
                            align="center"
                            style={{ marginBottom: getScaleSize(16) }}>
                            {STRING.otp.resend_code}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <Button
                // title={isFromSignup ? STRING.buttonText.verify_OTP : STRING.buttonText.continue}
                title={STRING.buttonText.verify_OTP}
                // disabled={!otp}
                style={{ marginBottom: getScaleSize(10), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
                    onOtp()
                }}
            />
        </AppSafeAreaView>
        // </KeyboardAvoidingView>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1.0,
            backgroundColor: theme.white,
            justifyContent: 'center'
        },
        mainContainer: {
            flex: 1.0,
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(18),
            // justifyContent: 'center'
        },
        inputContainer: {
            marginBottom: getScaleSize(16),
        },
        textInput: {
            width: getScaleSize(47),
            height: getScaleSize(54),
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            borderBottomWidth: 1,
            // borderColor: theme._BFBFBF,
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.Bold,
            color: theme.secondaryText,
            backgroundColor: theme.white,
        },
        resendOtpView: {
            alignItems: 'center',
            marginTop: getScaleSize(12),
            marginBottom: getScaleSize(31)
        },
    });