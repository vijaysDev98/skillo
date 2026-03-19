import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';


export default function AddBankDetails(props: any) {

    const STRING = useString();

    const isEdit = props.route.params?.isEdit || false;
    const isProfile = props.route.params?.isProfile || false;

    const { theme } = useContext<any>(ThemeContext);
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [confirmAccountNumberError, setConfirmAccountNumberError] = useState('');
    const [bankNameError, setBankNameError] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [accountHolderNameError, setAccountHolderNameError] = useState('');

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={ isEdit ? STRING.edit_bank_details : STRING.add_bank_details}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(24) }}>
                        {STRING.select_the_plan_that_fits_your_activity_You_can_change_it_later_in_your_profile}
                    </Text>
                    <Input
                        placeholder={STRING.enter_name}
                        inputTitle={STRING.account_holder_name}
                        inputColor={true}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={accountHolderName}
                        onChangeText={(text) => {
                            setAccountHolderName(text);
                            setAccountHolderNameError('');
                        }}
                        isError={accountHolderNameError}
                    />
                    <Input
                        placeholder={STRING.enter_account_number}
                        inputTitle={STRING.account_number}
                        inputColor={true}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={accountNumber}
                        onChangeText={(text) => {
                            setAccountNumber(text);
                            setAccountNumberError('');
                        }}
                        isError={accountNumberError}
                    />
                    <Input
                        placeholder={STRING.re_enter_account_number}
                        inputTitle={STRING.confirm_account_number}
                        inputColor={true}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={confirmAccountNumber}
                        onChangeText={(text) => {
                            setConfirmAccountNumber(text);
                            setConfirmAccountNumberError('');
                        }}
                        isError={confirmAccountNumberError}
                    />

                    <Input
                        placeholder={STRING.enter_ifsc_code}
                        inputTitle={STRING.ifsc_code}
                        inputColor={true}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={ifscCode}
                        onChangeText={(text) => {
                            setIfscCode(text);
                            setIfscCodeError('');
                        }}
                        isError={ifscCodeError}
                    />
                    <Input
                        placeholder={STRING.enter_bank_name}
                        inputTitle={STRING.bank_name}
                        inputColor={true}
                        continerStyle={{ marginBottom: getScaleSize(16) }}
                        value={bankName}
                        onChangeText={(text) => {
                            setBankName(text);
                            setBankNameError('');
                        }}
                        isError={bankNameError}
                    />
                </View>
            </ScrollView>
            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }} style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme._214C65}
                        align="center">
                        { isEdit ? STRING.cancel : STRING.skip}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={ isEdit ? STRING.save : STRING.add}
                    style={{ flex: 1.0 }}
                    onPress={() => {
                        if (isEdit) {
                            props.navigation.goBack();
                        } else {
                            if (isProfile) {
                                props.navigation.goBack();
                            } else {
                                props.navigation.navigate(SCREENS.AccountCreatedSuccessfully.identifier);
                            }
                        }
                    }}
                />
            </View>
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
            marginVertical: getScaleSize(14),
            justifyContent: 'center'
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: getScaleSize(24),
            marginBottom: getScaleSize(24)
        },
        backButton: {
            flex: 1.0,
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            borderColor: theme._214C65,
            paddingVertical: getScaleSize(18),
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
