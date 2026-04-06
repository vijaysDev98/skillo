import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, REGEX, SHOW_TOAST, Storage, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, SelectCountrySheet } from '../../components';
import { CommonActions } from '@react-navigation/native';
import { API } from '../../api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signUpAction } from '../../actions/auth/authAction';

export default function Signup(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);
    const { userType } = useContext<any>(AuthContext);
    const { isLoading } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [visibleCountry, setVisibleCountry] = useState(false);

    const dispatch = useAppDispatch()

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
            
            const params = {
                email: trimmedEmail,
                role: userType,
            }
            console.log("params", params)
            dispatch(signUpAction(params))
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
                        loading={isLoading}
                        onPress={() => {
                            onSignup();
                            // props.navigation.navigate(SCREENS.Otp.identifier, {
                            //     isFromSignup: true,
                            //     email: email,
                            // })
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
