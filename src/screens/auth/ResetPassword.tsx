import { Dimensions, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, REGEX, SHOW_TOAST, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, SelectCountrySheet } from '../../components';
import { API } from '../../api';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetPasswordStartAction } from '../../actions/auth/authAction';

export default function ResetPassword(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    // const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [visibleCountry, setVisibleCountry] = useState(false);

    // useEffect(() => {
    //     if (email.length >= 3) {
    //         const isNumber = REGEX.phoneRegex.test(email);
    //         setIsPhoneNumber(isNumber)
    //     }
    //     else {
    //         setIsPhoneNumber(false)
    //     }
    // }, [email])

    async function onResetPassword() {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setEmailError(STRING.email_required);

        } else if (trimmedEmail.length < 6 || trimmedEmail.length > 100) {
            setEmailError(STRING.email_must_be_six_to_hundred_char_allow);

        } else if (!REGEX.email.test(trimmedEmail)) {
            setEmailError(STRING.please_enter_valid_email);

        }
        else {
            setEmailError('');
            // let params = {}
            // if (isPhoneNumber) {
            //     params = {
            //         mobile: email,
            //         phone_country_code: countryCode,
            //     }
            // } else {
            const params = {
                email: email,
            };
            // }
            // props.navigation.navigate(SCREENS.Otp.identifier, {
            //     email: email,
            //     // isPhoneNumber: isPhoneNumber,
            //     isResetPassword:true,
            //     countryCode: countryCode,
            // });
            dispatch(resetPasswordStartAction(params));
            
        }
    }


    return (
        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.forgotPassword}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme.secondaryText}
                        style={{ marginBottom: getScaleSize(20) }}>
                        {STRING.enter_your_registered_email_below_to_get_reset_your_password}
                    </Text>
                    <View style={styles(theme).inputContainer}>
                        {/* {isPhoneNumber ? (
                            <Input
                                placeholder={STRING.enter_email_or_mobile_number}
                                placeholderTextColor={theme._939393}
                                inputTitle={STRING.email_or_mobile_number}
                                inputColor={false}
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
                            placeholderTextColor={theme._8C8C8C}
                            inputTitle={STRING.inputTitle.email}
                            inputColor={false}
                            value={email}
                            maxLength={100}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={text => {
                                setEmail(text.replace(/\s/g, ''));
                                setEmailError('');
                            }}
                            isError={emailError}
                        />
                        {/* )} */}
                    </View>
                </View>
            </ScrollView>
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
            <Button
            loading={isLoading}
                title={STRING.buttonText.send_otp}
                style={styles(theme).sendOtpBtn}
                onPress={() => {
                    onResetPassword();

                }}
            />
        </AppSafeAreaView>
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
            justifyContent: 'center'
        },
        logo: {
            width: Dimensions.get('window').width - getScaleSize(240),
            height: Dimensions.get('window').width - getScaleSize(240),
            alignSelf: 'center',
            marginBottom: getScaleSize(31),
        },
        inputContainer: {
            marginBottom: getScaleSize(16),
        },
        sendOtpBtn: {
            marginBottom: getScaleSize(10),
            marginHorizontal: getScaleSize(24)
        }
    });
