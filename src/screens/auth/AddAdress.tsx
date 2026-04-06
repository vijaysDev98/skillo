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
import { useAppDispatch } from '../../redux/hooks';
import { addressCreateAction, getSeekerProfile, providerAddressCreateAction } from '../../actions/auth/authAction';
import NavigationService from '../NavigationService';

const AddAdress = (props: any) => {
    const { data, title } = props.route.params ?? "";
    const fromChangeAddress = props.route.params?.fromChangeAddress ?? "";
    const dispatch = useAppDispatch()

    const STRING = useString();

    const { theme } = useContext(ThemeContext);

    const [loading, setLoading] = React.useState(false);

    const { userType, setUser, setUserType, setProfile } =
        useContext<any>(AuthContext);

    const [state, setState] = React.useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        addressState: '',
        country: '',
        postalCode: '',
    });

    const [errors, setErrors] = React.useState({
        addressLine1: '',
        city: '',
        addressState: '',
        country: '',
        postalCode: '',
    });

    const handleAddAddress = () => {
        const nextErrors = {
            addressLine1: !state.addressLine1.trim() ? 'Address Line 1 is required' : '',
            city: !state.city.trim() ? 'City is required' : '',
            addressState: !state.addressState.trim() ? 'State is required' : '',
            country: !state.country.trim() ? 'Country is required' : '',
            postalCode: !state.postalCode.trim() ? 'Postal code is required' : '',
        } as typeof errors;

        setErrors(nextErrors);

        const hasErrors = Object.values(nextErrors).some(Boolean);
        if (hasErrors) {
            SHOW_TOAST('Please fill all required fields', 'error');
            return;
        }

        if (fromChangeAddress) {
            props.navigation.navigate(SCREENS.AddressMapScreen.identifier)
            return;
        }
        if (userType == userRoles.Service_Seeker_individual || userType == userRoles.Service_Seeker_business) {
            let data = {
                address_line1: state?.addressLine1,
                address_line2: state?.addressLine2,
                city: state?.city,
                state: state?.addressState,
                country: state?.country,
                postal_code: state?.postalCode,
                is_default: true
            }
            dispatch(addressCreateAction(data, handleSuccess))
        } else {
            // TODO: Add address for service seeker business
            // props.navigation.navigate(SCREENS.VerificationDetails.identifier)
            let data = {
                address_line1: state?.addressLine1,
                address_line2: state?.addressLine2,
                city: state?.city,
                state: state?.addressState,
                country: state?.country,
                postal_code: state?.postalCode,
                is_default: true
            }
            // handleSuccess()
            dispatch(providerAddressCreateAction(data, handleSuccess))
        }
    }


    const handleSuccess = () => {
        if (userType === userRoles.Service_Seeker_individual) {
            dispatch(getSeekerProfile())
            NavigationService.reset(SCREENS.BottomBar.identifier)
        } else {
            NavigationService.navigate(SCREENS.VerificationDetails.identifier)
        }
    }

    return (
        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={title ? title : STRING.addAdress.title}
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
                        mainContinerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.addressLine1}
                        isError={errors.addressLine1}
                        onChangeText={text => {
                            if (errors.addressLine1) setErrors((prev) => ({ ...prev, addressLine1: '' }));
                            setState((prev) => ({ ...prev, addressLine1: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.address_line_2}
                        mainContinerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.addressLine2}
                        onChangeText={text => {
                            setState((prev) => ({ ...prev, addressLine2: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.city}
                        mainContinerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.city}
                        isError={errors.city}
                        onChangeText={text => {
                            if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                            setState((prev) => ({ ...prev, city: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.state}
                        mainContinerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.addressState}
                        isError={errors.addressState}
                        onChangeText={text => {
                            if (errors.addressState) setErrors((prev) => ({ ...prev, addressState: '' }));
                            setState((prev) => ({ ...prev, addressState: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.country}
                        mainContinerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.country}
                        isError={errors.country}
                        onChangeText={text => {
                            if (errors.country) setErrors((prev) => ({ ...prev, country: '' }));
                            setState((prev) => ({ ...prev, country: text }));
                        }}
                    />
                    <Input
                        placeholder={""}
                        inputTitle={STRING.inputTitle.postal_code}
                        mainContinerStyle={{ marginBottom: getScaleSize(16) }}
                        value={state?.postalCode}
                        isError={errors.postalCode}
                        onChangeText={text => {
                            if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: '' }));
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