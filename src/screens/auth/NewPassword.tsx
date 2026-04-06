import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS } from '../../assets';
import { getScaleSize, REGEX, useString } from '../../constant';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';
import { createNewPasswordAction } from '../../actions/auth/authAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function NewPassword(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);
    const dispatch = useAppDispatch()

    const email = props?.route?.params?.email || '';
    const { isLoading } = useAppSelector(state => state.auth)

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [show, setShow] = useState(true);
    const [confirmShow, setConfirmShow] = useState(true);

    async function onNewPassword() {
        const cleanPassword = password.trim();
        const cleanConfirmPassword = confirmPassword.trim();

        setPasswordError('');
        setConfirmPasswordError('');

        // Password required
        if (!cleanPassword) {
            setPasswordError(STRING.password_required);
            return;
        }

        // No whitespace allowed
        else if (/\s/.test(cleanPassword)) {
            setPasswordError('Password cannot contain spaces');
            return;
        }

        // Length check (8–12)
        else if (cleanPassword.length < 8 || cleanPassword.length > 12) {
            setPasswordError('Password must be 8 to 12 characters long');
            return;
        }

        // Strong password validation
        else if (!REGEX.password.test(cleanPassword)) {
            setPasswordError(STRING.password_validation_message);
            return;
        }

        // Confirm password required
        else if (!cleanConfirmPassword) {
            setConfirmPasswordError('Confirm password is required');
            return;
        }

        // Password mismatch
        else if (cleanPassword !== cleanConfirmPassword) {
            setConfirmPasswordError("Password Doesn't Match");
            return;
        }
        else {
            setPasswordError('');
            setConfirmPasswordError('');
            const params = {
                email: email,
                password: password,
                confirm_password: confirmPassword,
            }
            dispatch(createNewPasswordAction(params))
          
        }
    }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.set_new_password}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme.secondaryText}
                        style={{ marginBottom: getScaleSize(20) }}>
                        {STRING.Your_new_password_must_be_different_from_previously_used_passwords}
                    </Text>
                    <View style={{ gap: getScaleSize(16) }}>
                        <Input
                            placeholder={STRING.enter_new_password}
                            placeholderTextColor={theme._939393}
                            value={password}
                            passwordIcon={true}
                            secureTextEntry={show}
                            onChnageIcon={() => {
                                setShow(!show);
                            }}
                            onChangeText={text => {
                                const trimmed = text.trimStart(); // remove leading spaces
                                const noSpaces = trimmed.replace(/\s/g, ''); // remove all spaces
                                const limited = noSpaces.slice(0, 12); // max 12 chars

                                setPassword(limited);
                                setPasswordError('');
                            }}
                            isError={passwordError}
                        />
                        <Input
                            placeholder={STRING.re_enter_new_password}
                            placeholderTextColor={theme._939393}
                            value={confirmPassword}
                            passwordIcon={true}
                            secureTextEntry={confirmShow}
                            continerStyle={{ marginTop: getScaleSize(16) }}
                            onChnageIcon={() => {
                                setConfirmShow(!confirmShow);
                            }}
                            onChangeText={text => {
                                const trimmed = text.trimStart();
                                const noSpaces = trimmed.replace(/\s/g, '');
                                const limited = noSpaces.slice(0, 12);

                                setConfirmPassword(limited);
                                setConfirmPasswordError('');
                            }}
                            isError={confirmPasswordError}
                        />
                    </View>
                </View>
            </ScrollView>
            <Button
                loading={isLoading}
                title={STRING.reset_password}
                style={{ marginVertical: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
                    onNewPassword();
                }}
            />
        </View>
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
