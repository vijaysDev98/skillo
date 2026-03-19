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
}

const rejectReasons = [
    { id: 1, label: "Price higher than competitors" },
    { id: 2, label: "Late response" },
    { id: 3, label: "Rejected for another reason" },
];

export default function CancelScheduledServicePopup(props: CancelScheduledServicePopupProps) {
    const { theme } = useContext<any>(ThemeContext);

    const STRING = useString();
    const { onRef, cancelServiceDetails, onClose, onCancel, height } = props;
    console.log('cancelServiceDetails sdasd==>', cancelServiceDetails?.cancellation_allowed)

    const [selectedId, setSelectedId] = useState(1);
    const [customReason, setCustomReason] = useState("");
    const [sheetHeight, setSheetHeight] = useState(
        Dimensions.get('window').height * 0.6
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


                {/* {cancelServiceDetails?.cancellation_allowed && (
                    <>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._323232}
                            align='center'
                            style={{ marginVertical: getScaleSize(16), marginHorizontal: getScaleSize(24) }}>
                            {STRING.are_you_sure_you_want_to_cancel_your_scheduled_service_with_the_expert}
                        </Text>
                        <View style={styles(theme).informationContainer}>
                            <Text
                                size={getScaleSize(18)}
                                font={FONTS.Lato.SemiBold}
                                color={theme._323232}
                                style={{ marginBottom: getScaleSize(8) }}>
                                {STRING.payment_breakdown}
                            </Text>
                            <View style={styles(theme).horizontalView}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={'#595959'}>
                                    {STRING.FinalizedQuoteAmount}
                                </Text>
                                <Text
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={'#595959'}>
                                    {`€${cancelServiceDetails?.total_amount ?? '0'}`}
                                </Text>
                            </View>
                            <View style={styles(theme).horizontalView}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={'#595959'}>
                                    {STRING.service_fee_cancelled + ` (${cancelServiceDetails?.deduction_percentage ?? '0'}%)`}
                                </Text>
                                <Text

                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.SemiBold}
                                    color={'#595959'}>
                                    {`€${cancelServiceDetails?.service_fee ?? '0'}`}
                                </Text>
                            </View>
                            <View style={styles(theme).dotView} />
                            <View style={styles(theme).horizontalView}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={getScaleSize(20)}
                                    font={FONTS.Lato.SemiBold}
                                    color={'#0F232F'}>
                                    {STRING.Total}
                                    <Text
                                        size={getScaleSize(11)}
                                        font={FONTS.Lato.Regular}
                                        color={theme._424242}>
                                        {'  (final amount you will get)'}
                                    </Text>
                                </Text>
                                <Text
                                    size={getScaleSize(20)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.primary}>
                                    {`€${cancelServiceDetails?.total_refund ?? '0'}`}
                                </Text>
                            </View>
                        </View>
                    </>
                )}
                {cancelServiceDetails?.cancellation_allowed && (
                    <Text
                        size={getScaleSize(12)}
                        font={FONTS.Lato.Regular}
                        color={theme._555555}
                        align='center'
                        style={{ marginTop: getScaleSize(16), marginHorizontal: getScaleSize(24) }}>
                        {STRING.cancelled_message + ` ${cancelServiceDetails?.deduction_percentage ?? '0'}% ` + STRING.cancellation_message_2}
                    </Text>
                )}
                {cancelServiceDetails?.cancellation_allowed == false && (
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
                {cancelServiceDetails?.cancellation_allowed == true ? (
                    <View style={styles(theme).buttonContainer}>
                        <TouchableOpacity
                            style={styles(theme).nextButtonContainer}
                            activeOpacity={1}
                            onPress={() => {
                                onClose()
                            }}>
                            <Text
                                size={getScaleSize(19)}
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
                                    size={getScaleSize(19)}
                                    font={FONTS.Lato.Bold}
                                    color={theme._C62828}
                                    style={{ alignSelf: 'center' }}>
                                    {STRING.confirm_cancellation}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Button
                        title={STRING.back}
                        style={{ marginHorizontal: getScaleSize(24) }}
                        onPress={() => {
                            onClose()
                        }}
                    />

                )} */}
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
            paddingVertical: getScaleSize(18),
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
            paddingVertical: getScaleSize(28),
            marginHorizontal: getScaleSize(24),
        },
        horizontalView: {
            flexDirection: 'row',
            marginTop: getScaleSize(8),
        },
        dotView: {
            // flex:1.0,
            borderStyle: 'dashed',
            borderColor: theme.primary,
            borderWidth: 1,
            marginTop: getScaleSize(16),
            marginBottom: getScaleSize(8),
        },
        titleStyle: {
            alignSelf: 'center',
            marginTop: getScaleSize(16),
            marginBottom: getScaleSize(24)
        }
    });