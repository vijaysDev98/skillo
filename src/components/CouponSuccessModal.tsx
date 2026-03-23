import React, { useContext } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { ThemeContext, ThemeContextType } from '../context';
import Text from './Text';
import { getScaleSize } from '../constant';
import { FONTS } from '../assets';

interface Props {
    visible: boolean;
    onClose: () => void;
    couponCode?: string;
    discountText?: string;
}

export default function CouponSuccessModal({
    visible,
    onClose,
    couponCode = "SAVE20",
    discountText = "20% saving with this coupon",
}: Props) {
    const { theme } = useContext<any>(ThemeContext);
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles(theme).overlay}>
                <View style={styles(theme).container}>

                    {/* CLOSE */}
                    <TouchableOpacity style={styles(theme).closeBtn} onPress={onClose}>
                        <Text style={styles(theme).closeText}>✕</Text>
                    </TouchableOpacity>

                    {/* TITLE */}
                    <Text 
                      size={getScaleSize(16)}
                        font={FONTS.Lato.Medium}
                        color={theme.primaryText}
                    >
                        <Text 
                        size={getScaleSize(16)}
                        font={FONTS.Lato.Medium}
                        color={theme.mainText}
                        >
                            "{couponCode}"
                        </Text>{" "}
                        Applied Successfully
                    </Text>

                    {/* SUBTITLE */}
                    <Text
                    size={getScaleSize(20)}
                    color={theme.secondaryText}
                    font={FONTS.Lato.Bold}
                    style={{marginTop:getScaleSize(12),marginBottom:getScaleSize(32)}}
                    >
                        {discountText}
                    </Text>

                    {/* BUTTON */}
                    <TouchableOpacity style={styles(theme).button} onPress={onClose}>
                        <Text 
                        size={getScaleSize(12)}
                        color={theme.white}
                        font={FONTS.Lato.SemiBold}
                        >YAY</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            paddingHorizontal: getScaleSize(24),
        },

        container: {
            backgroundColor: '#fff',
            borderRadius: getScaleSize(16),
            paddingVertical: getScaleSize(40),
            paddingHorizontal: getScaleSize(18),
        },

        closeBtn: {
            position: 'absolute',
            right: getScaleSize(12),
            top: getScaleSize(12),
            padding: getScaleSize(6),
            zIndex: 1,
        },

        closeText: {
            fontSize: getScaleSize(16),
        },

        title: {
            fontSize: getScaleSize(16),
            fontFamily: FONTS
                .Manrope.SemiBold,
            color: '#333',
            textAlign: 'center',
            marginBottom: getScaleSize(12),
        },

        highlight: {
            color: '#E85D3F',
            fontFamily: FONTS.Lato.Bold,
        },

        subtitle: {
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.Bold,
            textAlign: 'center',
            marginBottom: getScaleSize(20),
        },

        button: {
            backgroundColor: '#E85D3F',
            paddingVertical: getScaleSize(14),
            borderRadius: getScaleSize(10),
            alignItems: 'center',
        },

        buttonText: {
            color: '#fff',
            fontFamily: FONTS.Lato.Bold,
            fontSize: getScaleSize(14),
        },
    });