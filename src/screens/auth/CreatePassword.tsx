import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS } from '../../assets';
import { getScaleSize, REGEX, useString } from '../../constant';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import { createwPasswordAction, newPasswordAction } from '../../actions/auth/authAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function CreatePassword(props: any) {
    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);
    const {email,id} = props?.route?.params || {};

    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector((state) => state.auth);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [show, setShow] = useState(true);
    const [confirmShow, setConfirmShow] = useState(true);



    async function onSignup() {
        if (!password) {
            setPasswordError(STRING.errorText.password_required);
        }
        else if (/\s/.test(password)) {
            setPasswordError(STRING.white_space_not_allowed);
        }
        else if (password.length > 12) {
            setPasswordError(STRING.maximum_12_characters_allowed);
        }
        else if (!REGEX.password.test(password)) {
            setPasswordError(STRING.password_validation_message);
        } else if (!confirmPassword) {
            setConfirmPasswordError(STRING.confirm_password_required);
        } else if (password !== confirmPassword) {
            setConfirmPasswordError(STRING.passwords_do_not_match);
        } else {
            setPasswordError('');
            setConfirmPasswordError('');
            const params = {
                email: email,
                password: password,
                confirm_password: confirmPassword,
            }
        
            console.log("params", params)
            dispatch(createwPasswordAction(params))
        }
    }

    return (

        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.createPassWord.title}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._565656}
                        style={{ marginBottom: getScaleSize(20) }}>
                        {STRING.createPassWord.subTitle}
                    </Text>
                    <View style={{ gap: getScaleSize(16) }}>
                        <Input
                            placeholder={STRING.placeHolders.enter_new_password}
                            placeholderTextColor={theme._939393}
                            inputColor={true}
                            value={password}
                            passwordIcon={true}
                            secureTextEntry={show}
                            onChnageIcon={() => {
                                setShow(!show);
                            }}
                            onChangeText={text => {
                                // Remove all whitespace
                                const cleaned = text.replace(/\s/g, '');

                                // Limit to 12 characters
                                const trimmed = cleaned.slice(0, 12);

                                setPassword(trimmed);
                                setPasswordError('');
                            }}
                            isError={passwordError}
                        />
                        <Input
                            placeholder={STRING.placeHolders.re_enter_new_password}
                            placeholderTextColor={theme._939393}
                            inputColor={true}
                            value={confirmPassword}
                            passwordIcon={true}
                            secureTextEntry={confirmShow}
                            continerStyle={{ marginTop: getScaleSize(16) }}
                            onChnageIcon={() => {
                                setConfirmShow(!confirmShow);
                            }}
                            onChangeText={text => {
                                const cleaned = text.replace(/\s/g, '');
                                const trimmed = cleaned.slice(0, 12);

                                setConfirmPassword(trimmed);
                                setConfirmPasswordError('');
                            }}
                            isError={confirmPasswordError}
                        />
                    </View>
                </View>
            </ScrollView>
            <Button
                title={STRING.next}
                loading={isLoading}
                style={{ marginVertical: getScaleSize(10), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
                    onSignup();
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
    });
