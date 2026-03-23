import React, { useContext, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions,
    Animated,
    Easing,
    TextInput,
} from 'react-native';
import { ThemeContext, ThemeContextType } from '../context';
import { getScaleSize, useString } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';
import { constant } from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from './Button';


interface CancelScheduledServicePopupProps {
    cancelServiceDetails?: any;
    onClose: () => void;
    onCancel: (item: any) => void;
    onRef: any;
    height?: number;
    cancelType?:string | undefined
}

const rejectReasons = [
    { id: 1, label: "Price higher than competitors" },
    { id: 2, label: "Late response" },
    { id: 3, label: "Rejected for another reason" },
];

export const cancelServiceDetails = {
  // 🔑 BASIC INFO
  service_id: 101,
  service_name: "Furniture Assembly",
  provider_name: "Wade Warren",
  provider_profile_image: "https://i.pravatar.cc/150?img=12",

  // 🕒 TIME INFO
  hours_before_service: 24,
  service_date: "2025-01-20",
  service_time: "18:00",

  // 🔁 STATUS FLAGS
  cancellation_allowed: true, // 🔥 MAIN FLAG
  cancellation_window_passed: false,
  show_reject_reason: false,

  // 💰 PAYMENT DETAILS
  currency: "€",
  total_amount: 300,
  deduction_percentage: 10,
  service_fee: 30,
  total_refund: 270,

  // 🧾 BREAKDOWN (future safe)
  breakdown: {
    finalized_amount: 300,
    platform_fee: 30,
    refund_amount: 270,
  },

  // 📜 POLICY / MESSAGE
  message: "",
  cancellation_policy:
    "If you cancel within 24 hours, 10% will be deducted as platform fee.",

  // 🚫 REJECT FLOW (if needed)
  reject_reasons: [
    "Price higher than competitors",
    "Late response",
    "Changed my mind",
  ],

  // 🧠 EXTRA FLAGS (future-proof)
  is_refundable: true,
  is_partial_refund: true,

  // 📊 UI HELPERS (optional but useful)
  status: "pending", // pending | cancelled | completed
};

export default function CancelScheduledServicePopup(props: CancelScheduledServicePopupProps) {
    const { theme } = useContext<any>(ThemeContext);

    const STRING = useString();
    const { onRef, 
        // cancelServiceDetails,
         onClose, onCancel, height } = props;
    console.log('cancelServiceDetails sdasd==>', cancelServiceDetails?.cancellation_allowed)

    const [selectedId, setSelectedId] = useState(1);
    const [customReason, setCustomReason] = useState("");
    const [sheetHeight, setSheetHeight] = useState(
        Dimensions.get('window').height * 0.7
    );

    const handleSelect = (id: number) => {
        setSelectedId(id);

        const newHeight =
            id === 3
                ? Dimensions.get('window').height * 0.75 // 👈 EXPAND
                : Dimensions.get('window').height * 0.6; // 👈 NORMAL

        setSheetHeight(newHeight);

        // 🔥 CHANGE 3: Force RBSheet re-render
        setTimeout(() => {
            onRef?.current?.close();

            setTimeout(() => {
                onRef?.current?.open();
            }, 200);
        }, 0);
    };



    function getTitle() {
        if (cancelServiceDetails?.hours_before_service) {
            return STRING.cancel_scheduled_service;
        } else {
            return STRING.cancellation_not_possible;
        }
    }




    return (
        <RBSheet
            ref={onRef}
            height={sheetHeight}
            customModalProps={{
                animationType: 'fade',
                statusBarTranslucent: true,
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: theme._77777733,
                },
                container: {
                    // height: cancelServiceDetails?.cancellation_allowed == true ? getScaleSize(640) : getScaleSize(300),
                    borderTopLeftRadius: getScaleSize(24),
                    borderTopRightRadius: getScaleSize(24),
                    backgroundColor: theme.white,
                    paddingHorizontal: getScaleSize(24)
                },
            }}
            draggable={false}
            closeOnPressMask={true}>
            <View style={[styles(theme).content, { flexGrow: 1 }]}>
                {(cancelServiceDetails?.cancellation_allowed && props.cancelType !== "Reject Reason") && (
                    <>
                    <Image
                    source={IMAGES.reject_icon}
                    style={{height:getScaleSize(56),width:getScaleSize(56),marginBottom:getScaleSize(10),alignSelf:'center'}}
                    />
                    <Text
                    align='center'
                    size={getScaleSize(16)}
                    font={FONTS.Lato.Bold}
                    color={theme.primaryText}
                    >{"Cancel Scheduled Service"}</Text>
                        <Text
                            size={getScaleSize(14)}
                            font={FONTS.Lato.Medium}
                            color={theme._404040}
                            align='center'
                            style={{ marginVertical: getScaleSize(16), marginHorizontal: getScaleSize(24) }}>
                            {STRING.are_you_sure_you_want_to_cancel_your_scheduled_service_with_the_expert}
                        </Text>
                        <View style={styles(theme).informationContainer}>
                            <Text
                                size={getScaleSize(16)}
                                font={FONTS.Lato.SemiBold}
                                color={theme.primaryText}
                                style={{ marginBottom: getScaleSize(8) }}>
                                {STRING.payment_breakdown}
                            </Text>
                            <View style={styles(theme).horizontalView}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme._8C8C8C}>
                                    {STRING.FinalizedQuoteAmount}
                                </Text>
                                <Text
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme._404040}>
                                    {`P${cancelServiceDetails?.total_amount ?? '0'}`}
                                </Text>
                            </View>
                            <View style={styles(theme).horizontalView}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme._8C8C8C}>
                                    {"Platform Fee" + ` (${cancelServiceDetails?.deduction_percentage ?? '0'}%)`}
                                </Text>
                                <Text

                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme._404040}>
                                    {`P${cancelServiceDetails?.service_fee ?? '0'}`}
                                </Text>
                            </View>
                            <View style={styles(theme).dotView} />
                            <View style={styles(theme).horizontalView}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={getScaleSize(18)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme._404040}>
                                    {STRING.Total}
                                    {/* <Text
                                        size={getScaleSize(11)}
                                        font={FONTS.Lato.Regular}
                                        color={theme._424242}>
                                        {' (final amount you will get)'}
                                    </Text> */}
                                </Text>
                                <Text
                                    size={getScaleSize(18)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.primary}>
                                    {`P${cancelServiceDetails?.total_refund ?? '0'}`}
                                </Text>
                            </View>
                        </View>
                    </>
                )}
                {(cancelServiceDetails?.cancellation_allowed && props.cancelType !== "Reject Reason") && (
                    <Text
                        size={getScaleSize(12)}
                        font={FONTS.Lato.Regular}
                        color={theme._555555}
                        align='center'
                        style={{ marginTop: getScaleSize(16) }}
                        >
                        {/* {STRING.cancelled_message + ` ${cancelServiceDetails?.deduction_percentage ?? '0'}% ` + STRING.cancellation_message_2} */}
                        {"If you cancel within 48–2 hours before the service time, a 15% cancellation fee will apply, and 85% of the amount will be refunded (the fee will be shown before confirmation)."}
                    </Text>
                )}
                {(cancelServiceDetails?.cancellation_allowed == false && props.cancelType !== "Reject Reason") && (
                    <Text
                        size={getScaleSize(12)}
                        font={FONTS.Lato.Regular}
                        color={theme._555555}
                        align='center'
                        style={{ marginTop: getScaleSize(16), marginHorizontal: getScaleSize(24) }}>
                        {cancelServiceDetails?.message ?? ''}
                    </Text>
                )}
                <View style={{ flex: 1.0 }} />
                {(cancelServiceDetails?.cancellation_allowed == true && props.cancelType !== "Reject Reason") && (
                    <View style={styles(theme).buttonContainer}>
                        <TouchableOpacity
                            style={styles(theme).nextButtonContainer}
                            activeOpacity={1}
                            onPress={() => {
                                onClose()
                            }}>
                            <Text
                                size={getScaleSize(16)}
                                font={FONTS.Lato.Bold}
                                color={theme.white}
                                style={{ alignSelf: 'center' }}>
                                {STRING.keep_booking}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles(theme).backButtonContainer}
                            activeOpacity={1}
                            onPress={() => {
                                onCancel(cancelServiceDetails?.service_id ?? null)
                            }}>
                            <View style={styles(theme).confirmationButtomWrapper}>
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.Bold}
                                    color={theme.primary}
                                    style={{ alignSelf: 'center' }}>
                                    {STRING.confirm_cancellation}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) }
                {props.cancelType == "Reject Reason"?   
                   ( <>
                    <Image style={styles(theme).icon} source={IMAGES.serviceCancelledIcon} />
                <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.Bold}
                    color={theme.primaryText}
                    style={styles(theme).titleStyle}>
                    {/* {getTitle()} */}
                    {"Reject Service request"}
                </Text>

                {rejectReasons.map((item) => {
                    const isSelected = selectedId === item.id;

                    return (
                        <View
                            style={styles(theme).radioButtonContainer}
                        >
                            <TouchableOpacity
                                key={item.id}
                                style={styles(theme).radioButtonRow}
                                onPress={() => handleSelect(item.id)}
                            >
                                <Text
                                    size={getScaleSize(14)}
                                    color={theme._404040}
                                >
                                    {item.label}
                                </Text>

                                <View
                                    style={[
                                        styles(theme).radioButton,
                                        isSelected && styles(theme).activeRadioButton,
                                    ]}
                                />
                            </TouchableOpacity>
                            {/* 👇 ONLY FOR 3rd OPTION */}
                            {isSelected && item.id === 3 && (
                                <TextInput
                                    placeholder="Write your reason here..."
                                    placeholderTextColor={theme._8C8C8C}
                                    value={customReason}
                                    onChangeText={setCustomReason}
                                    multiline
                                    style={styles(theme).rejectReasonInput}
                                />
                            )}
                        </View>
                    );
                })}
                <View style={styles(theme).buttonContainer}>
                    <TouchableOpacity
                        style={styles(theme).cancelBtn}
                    >
                        <Text
                            font={FONTS.Lato.SemiBold}
                            size={getScaleSize(14)}
                            color={theme._EC613D}
                        >{"Cancel"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles(theme).rejectBtn}
                    >
                        <Text
                            font={FONTS.Lato.SemiBold}
                            size={getScaleSize(14)}
                            color={theme.white}
                        >{"Reject"}</Text>
                    </TouchableOpacity>
                </View>
                </>
                )
                    : (
                        <></>
                    // <Button
                    //     title={STRING.back}
                    //     style={{ marginHorizontal: getScaleSize(24) }}
                    //     onPress={() => {
                    //         onClose()
                    //     }}
                    // />
                )}
            </View>
        </RBSheet>
    )
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        content: {
            paddingVertical: getScaleSize(24),
            flex: 1.0,
        },
        icon: {
            height: getScaleSize(60),
            width: getScaleSize(60),
            alignSelf: 'center',
        },
        radioButtonContainer: {
            marginTop: getScaleSize(20),
            // flexDirection: 'row',
            borderWidth: 1,
            borderColor: theme._D5D5D5,
            paddingVertical: getScaleSize(17),
            paddingHorizontal: getScaleSize(17),
            borderRadius: getScaleSize(12),
            // marginHorizontal: getScaleSize(22),
        },
        radioButtonRow: {
            // flex:1,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        radioButton: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            borderRadius: getScaleSize(10),
            borderWidth: getScaleSize(2),
            borderColor: theme._B3B3B3,
        },
        activeRadioButton: {
            borderColor: theme.primary,
            borderWidth: getScaleSize(5),
            backgroundColor: theme.white,
        },
        rejectReasonInput: {
            marginTop: getScaleSize(12),
            borderWidth: 1,
            borderColor: theme._D5D5D5,
            borderRadius: getScaleSize(12),
            padding: getScaleSize(12),
            minHeight: getScaleSize(80),
            textAlignVertical: "top",
        },
        buttonContainer: {
            flex: 1,
            alignItems: 'flex-end',
            flexDirection: 'row',
            marginTop: getScaleSize(24),
            marginBottom: getScaleSize(20),
            gap: getScaleSize(16)
        },
         backButtonContainer: {
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme._C62828,
            borderRadius: getScaleSize(12),
            // paddingVertical: getScaleSize(18),
            alignItems:'center',
            backgroundColor: theme.white,
            // marginLeft: getScaleSize(8),
            height:getScaleSize(56),
        },
        cancelBtn: {
            flex: 1.0,
            borderWidth: 1,
            borderColor: theme.primary,
            alignItems: 'center',
            paddingVertical: getScaleSize(14),
            borderRadius: getScaleSize(10)
        },
        rejectBtn: {
            flex: 1.0,
            alignItems: 'center',
            paddingVertical: getScaleSize(14),
            borderRadius: getScaleSize(10),
            backgroundColor: theme.primary
        },
        // backButtonContainer: {
        //     justifyContent: 'center',
        //     borderWidth: 1,
        //     borderColor: theme._C62828,
        //     borderRadius: getScaleSize(12),
        //     paddingVertical: getScaleSize(18),
        //     backgroundColor: theme.white,
        //     marginLeft: getScaleSize(8),
        // },
        confirmationButtomWrapper: {
            flexShrink: 1,
            paddingHorizontal: getScaleSize(7)
        },
        nextButtonContainer: {
            // flex: 1.0,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.primary,
            borderRadius: getScaleSize(12),
            // paddingVertical: getScaleSize(18),
            height:getScaleSize(56),
            paddingHorizontal: getScaleSize(22),
            backgroundColor: theme.primary,
            marginRight: getScaleSize(8),
        },
        informationContainer: {
            marginTop: getScaleSize(16),
            borderWidth: 1,
            borderColor: '#D5D5D5',
            borderRadius: getScaleSize(16),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(13),
            gap:getScaleSize(16)
            // marginHorizontal: getScaleSize(24),
        },
        horizontalView: {
            flexDirection: 'row',
            // marginTop: getScaleSize(8),
        },
        dotView: {
            // flex:1.0,
            borderStyle: 'dashed',
            borderColor: theme._8C8C8C,
            borderWidth: 1,
            // marginTop: getScaleSize(16),
            // marginBottom: getScaleSize(8),
        },
        titleStyle: {
            alignSelf: 'center',
            marginTop: getScaleSize(16),
            marginBottom: getScaleSize(24)
        }
    });