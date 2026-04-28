import { Alert, Dimensions, Image, Keyboard, Linking, Platform, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST, openStripeCheckout } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button, KeyBoardAware } from '../../components';
import { EventRegister } from 'react-native-event-listeners';
import { API } from '../../api';
import { CommonActions } from '@react-navigation/native';
import CouponSuccessModal from '../../components/CouponSuccessModal';
import { userRoles } from '../../constant/utils';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';

export default function PaymentMethod(props: any) {

    const STRING = useString();

    const planDetails: any = props?.route?.params?.planDetails ?? {};
    const isFromSubscriptionButton: any = props?.route?.params?.isFromSubscriptionButton ?? false;
    const from = props?.route?.params?.from ?? "";
    const { theme } = useContext<any>(ThemeContext);
    const { fetchProfile, profile } = useContext<any>(AuthContext);

    const [isLoading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<any>({});
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [isCouponVisible, setIsCouponVisible] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState<number>(0);

    console.log(isFromSubscriptionButton, 'isFromSubscriptionButton')

    console.log("planDetails", planDetails)

    const paymentMethods = [
        { id: 1, title: 'Mobile Money', icon: IMAGES.mobileMoneyIcon },
        { id: 2, title: 'Credit Card', icon: IMAGES.creditCardIcon },
    ]

    useEffect(() => {
        EventRegister.addEventListener('subscriptionPaymentCancel', (data: any) => {
            SHOW_TOAST(data?.message ?? '', 'error')
        });
        return () => {
            EventRegister.removeEventListener('subscriptionPaymentCancel')
        }
    }, []);

    // useEffect(() => {
    //     const parseParams = (url: string) => {
    //         const queryString = url.split('?')[1] || '';
    //         const params: Record<string, string> = {};

    //         queryString.split('&').forEach(item => {
    //             if (!item) return;
    //             const [key, value] = item.split('=');
    //             params[key] = decodeURIComponent(value || '');
    //         });

    //         return params;
    //     };

    //     Linking.getInitialURL().then((url: any) => {
    //         if (!url) return;

    //         if (url.includes('payment-success')) {
    //             const params = parseParams(url);
    //             const type = params.type;
    //             const subscriptionId = params.succription_id;
    //             console.log(subscriptionId, params, 'params')
    //             if (type == 'add') {
    //                 Alert.alert('Payment successful');
    //                 fetchProfile()
    //                 setTimeout(() => {
    //                     props.navigation.navigate(SCREENS.SubscriptionSuccessful.identifier, {
    //                         id: subscriptionId
    //                     });
    //                 }, 2000);
    //             } else if (type == 'update') {
    //                 fetchProfile()
    //                 props?.navigation?.dispatch(
    //                     CommonActions.reset({
    //                         index: 0,
    //                         routes: [{ name: SCREENS.BottomBar.identifier }],
    //                     }),
    //                 );
    //             }
    //         }

    //         if (url.includes('payment-cancel')) {
    //             const params = parseParams(url);
    //             const error = params.error || 'Payment cancelled';
    //             const type = params.type;
    //             EventRegister.emit('subscriptionPaymentCancel', {
    //                 message: error,
    //             });
    //         }
    //     });

    //     //coudpouss://payment-success?type=add&succription_id=91fb80cb-0d1a-4640-b908-95fc32d2660d
    //     const handleUrl = ({ url }: { url: string }) => {
    //         console.log('Deep link:', url);
    //         // ✅ PAYMENT SUCCESS
    //         if (url.startsWith('coudpouss://payment-success')) {
    //             const params = parseParams(url);
    //             const type = params.type;
    //             const subscriptionId = params.succription_id;
    //             console.log(subscriptionId, params, 'params')
    //             if (type == 'add') {
    //                 fetchProfile()
    //                 setTimeout(() => {
    //                     props.navigation.navigate(SCREENS.SubscriptionSuccessful.identifier, {
    //                         id: subscriptionId
    //                     });
    //                 }, 2000);
    //             } else if (type == 'update') {
    //                 fetchProfile()
    //                 setTimeout(() => {
    //                     props?.navigation?.dispatch(
    //                         CommonActions.reset({
    //                             index: 0,
    //                             routes: [{ name: SCREENS.BottomBar.identifier }],
    //                         }),
    //                     );
    //                 }, 2000);
    //             }
    //             return;
    //         }
    //         // ❌ PAYMENT CANCEL
    //         if (url.startsWith('coudpouss://payment-cancel')) {
    //             const params = parseParams(url);
    //             const error = params.error || 'Payment cancelled';
    //             const type = params.type;
    //             EventRegister.emit('subscriptionPaymentCancel', {
    //                 message: error,
    //             });
    //             return;
    //         }
    //     };

    //     Linking.addEventListener('url', handleUrl);

    //     return () => {
    //         Linking.removeAllListeners('url')
    //     };
    // }, []);

    async function onPayment() {
        try {
            setLoading(true);
            const params = {
                plan_id: planDetails?.id,
            }
            const result = await API.Instance.post(API.API_ROUTES.subscriptionPayment + `?action=${isFromSubscriptionButton ? 'update' : 'add'}&platform=app`, params);
            if (result.status) {
                setPaymentDetails(result?.data?.data ?? {});
                const STRIPE_URL = result?.data?.data?.checkout_url ?? '';
                openStripeCheckout(STRIPE_URL);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error')
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                // screenName={STRING.payment_method}
                screenName={from ? 'Payment Option' : 'Payment Mode'}
            />
            <KeyBoardAware showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    {from !== "requestDetails" &&
                        (<>
                            <Text size={getScaleSize(16)}
                                font={FONTS.Lato.ExtraBold}
                                color={theme.secondaryText}
                                style={{ marginBottom: getScaleSize(16) }}>
                                {STRING.select_a_quick_and_secure_way_to_complete_your_subscription}
                            </Text>
                            <View style={styles(theme).subscriptionItem}>
                                <View style={{ gap: getScaleSize(8) }}>
                                    <Text
                                        size={getScaleSize(18)}
                                        font={FONTS.Lato.Bold}
                                        color={theme.primaryText}
                                    >
                                        {planDetails?.label ?? ""}
                                    </Text>
                                    <Text
                                        size={getScaleSize(18)}
                                        font={FONTS.Lato.Bold}
                                        color={theme.mainText}>
                                        {`P${planDetails?.price}`}
                                        {isCouponApplied &&
                                            <Text
                                                size={getScaleSize(12)}
                                                color={theme.successText}
                                                font={FONTS.Lato.Medium}
                                                style={{ marginLeft: getScaleSize(10) }}
                                            >{"  20% off with  cupoun “SAVE20”"}</Text>}
                                    </Text>
                                    <Text
                                        size={getScaleSize(12)}
                                        font={FONTS.Lato.Regular}
                                        color={theme.secondaryText}>
                                        {`${planDetails?.billingText}`}
                                    </Text>
                                </View>
                                <View style={styles(theme).divider} />
                                {planDetails?.features && planDetails?.features.map((feature, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={styles(theme).featureContainer}
                                        >
                                            <Image
                                                source={IMAGES.planeVerifyIcon}
                                                style={styles(theme).planeVerifyIcon}
                                            />
                                            <Text
                                                size={getScaleSize(14)}
                                                font={FONTS.Lato.SemiBold}
                                                color={theme._404040}
                                            >{feature}</Text>
                                        </View>
                                    )
                                })}
                            </View>

                            {/* apply coupon */}
                            <View style={styles(theme).applyCouponContainer}>
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.primaryText}
                                >{"Apply Discount"}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: getScaleSize(12),
                                    borderRadius: 10,
                                    borderWidth: 0.5,
                                    borderColor: theme._D9D9D9,
                                    marginTop: getScaleSize(20)
                                }}>
                                    <Image
                                        source={IMAGES.applyCouponIcon}
                                        style={{ height: getScaleSize(40), width: getScaleSize(40) }}
                                    />
                                    <TextInput
                                        placeholder='Enter Code'
                                        placeholderTextColor={theme._8C8C8C}
                                        value={couponCode}
                                        editable={!isCouponApplied}
                                        onChangeText={(text) => setCouponCode(text)}
                                        style={{
                                            height: getScaleSize(48),
                                            width: getScaleSize(187),
                                            borderWidth: 0.5,
                                            borderColor: theme._B3B3B3,
                                            borderRadius: 10,
                                            paddingHorizontal: getScaleSize(12),
                                            fontSize: getScaleSize(12),
                                            fontFamily: FONTS.Lato.Regular,
                                            color: theme.primaryText,
                                            marginLeft: getScaleSize(6)
                                        }}
                                    />
                                    {isCouponApplied ?
                                        (<Pressable
                                            onPress={() => {

                                                // TODO: Apply coupon logic here
                                                setIsCouponApplied(false);
                                                setIsCouponVisible(false);
                                                setCouponCode('')


                                            }}
                                            style={{
                                                paddingVertical: getScaleSize(10),
                                                paddingHorizontal: getScaleSize(20),
                                                borderWidth: 1,
                                                borderColor: theme.primary,
                                                borderRadius: 10,
                                                marginLeft: getScaleSize(30)
                                            }}
                                        >
                                            <Text
                                                size={getScaleSize(12)}
                                                font={FONTS.Lato.SemiBold}
                                                color={theme.mainText}
                                            >{"Remove"}</Text>
                                        </Pressable>) : (<Pressable
                                            onPress={() => {
                                                if (couponCode) {
                                                    // TODO: Apply coupon logic here
                                                    setIsCouponApplied(true);
                                                    setIsCouponVisible(true);
                                                    Keyboard.dismiss();
                                                }
                                            }}
                                            style={{
                                                paddingVertical: getScaleSize(10),
                                                paddingHorizontal: getScaleSize(24),
                                                backgroundColor: theme.primary,
                                                borderRadius: 10,
                                                marginLeft: getScaleSize(30)
                                            }}
                                        >
                                            <Text
                                                size={getScaleSize(12)}
                                                font={FONTS.Lato.SemiBold}
                                                color={theme.white}
                                            >{"Apply"}</Text>
                                        </Pressable>)}
                                </View>
                            </View>

                            <Text
                                size={getScaleSize(16)}
                                font={FONTS.Lato.SemiBold}
                                color={theme.primaryText}
                                style={{ marginTop: getScaleSize(20) }}
                            >
                                {STRING.choose_payment_method}
                            </Text>
                        </>)
                    }
                    <View style={styles(theme).paymentMethodContainer}>
                        {paymentMethods.map((e, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedPayment(e)
                                        props.navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [
                                                    {
                                                        name: SCREENS.BottomBar.identifier,
                                                        params: {
                                                            fromFromSubscription: true,
                                                            userRole: userRoles.Service_Seeker_business,
                                                        },
                                                    },
                                                ],
                                            })
                                        )
                                    }}
                                    style={styles(theme).itemContainer}>
                                    <Image source={e.icon} style={styles(theme).itemIcon} />
                                    <Text
                                        style={{ flex: 1.0 }}
                                        size={getScaleSize(18)}
                                        font={FONTS.Lato.SemiBold}
                                        color={theme._424242}>
                                        {e.title}
                                    </Text>

                                    <View style={selectedPayment?.id !== e.id ? styles(theme).unSelectedCircle : styles(theme).selectedCircle} />

                                    {/* <Image source={IMAGES.ic_right} style={[styles(theme).selectedView, { marginRight: getScaleSize(12) }]} /> */}
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

            </KeyBoardAware>
            {from == 'requestDetails' && (
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate(SCREENS.ServiceConfirmed.identifier, {
                            // serviceId: serviceDetails?.service_id,
                            serviceId: 12
                        });
                    }}
                    style={{
                        backgroundColor: theme.primary, borderRadius: getScaleSize(10), paddingVertical: getScaleSize(14),
                        marginBottom: getScaleSize(20),
                        marginHorizontal: getScaleSize(24),
                        alignItems: 'center'
                    }}
                >
                    <Text
                        size={getScaleSize(20)}
                        color={theme.white}
                        font={FONTS.Lato.SemiBold}
                    >{"Continue to Pay"}</Text>
                </TouchableOpacity>
            )}
            {/* <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }
                    } style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme._214C65}
                        align="center">
                        {STRING.cancel}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={STRING.proceed_to_pay}
                    style={{ flex: 1.0 }}
                    onPress={() => {
                        if (profile?.has_purchased) {
                            SHOW_TOAST(STRING.you_have_already_subscribed_to_a_plan, 'info')
                        } else {
                            onPayment()
                        }
                    }}
                />
            </View> */}
            {
                isCouponVisible && (
                    <CouponSuccessModal
                        visible={isCouponVisible}
                        couponCode={"SAVE20"}
                        discountText={"20% saving with this coupon"}
                        onClose={() => {
                            setIsCouponVisible(false)
                        }}
                    />
                )
            }

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
            marginVertical: getScaleSize(14),
            justifyContent: 'center'
        },
        subscriptionItem: {
            borderColor: theme._D9D9D9,
            borderWidth: 0.5,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(24),
            paddingHorizontal: getScaleSize(20),
            marginBottom: getScaleSize(20),
            backgroundColor: theme.white
        },
        selectedView: {
            width: getScaleSize(24),
            height: getScaleSize(24),
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
        paymentMethodContainer: {
            marginTop: getScaleSize(20)
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getScaleSize(16),
            borderWidth: 0.5,
            borderColor: theme._DFE8ED,
            borderRadius: getScaleSize(16),
            paddingVertical: getScaleSize(8),
            paddingHorizontal: getScaleSize(12),
        },
        itemIcon: {
            width: getScaleSize(60),
            height: getScaleSize(60),
            marginRight: getScaleSize(15)
        },
        divider: {
            marginVertical: getScaleSize(20),
            height: getScaleSize(1),
            backgroundColor: "#CCCCCC73",
            width: '100%'
        },
        featureContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: getScaleSize(16),
            marginBottom: getScaleSize(14)
        },
        planeVerifyIcon: {
            width: getScaleSize(20),
            height: getScaleSize(20)
        },
        applyCouponContainer: {
            marginTop: getScaleSize(20),
        },
        unSelectedCircle: {
            borderWidth: 1,
            borderColor: theme._424242,
            borderRadius: getScaleSize(10),
            width: getScaleSize(18), height: getScaleSize(18)
        },
        selectedCircle: {
            borderRadius: getScaleSize(10),
            width: getScaleSize(18), height: getScaleSize(18),
            borderWidth: 5,
            borderColor: theme.primary
        }
    });
