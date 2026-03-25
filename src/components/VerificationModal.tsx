import React, { useContext } from "react";
import {
    Modal,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import { Text } from "../components";
import { getScaleSize } from "../constant";
import { FONTS, IMAGES } from "../assets";
import { ThemeContext, ThemeContextType } from "../context";

interface Props {
    visible: boolean;
    onPressStatus: () => void;
}

export default function VerificationModal({
    visible,
    onPressStatus,
}: Props) {


    const { theme } = useContext<any>(ThemeContext);

    return (
        <Modal transparent visible={visible} animationType="fade">

            {/* BACKDROP */}
            <View style={styles(theme).overlay}>

                {/* CARD */}
                <View style={styles(theme).container}>

                    {/* IMAGE */}
                    <Image
                        source={IMAGES.verificationImg}
                        style={styles(theme).image}
                    />

                    {/* TITLE */}
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.Bold}
                        color={theme._404040}
                        style={styles(theme).title}
                    >
                        Account Under Verification
                    </Text>

                    {/* DESCRIPTION */}
                    <Text
                        align="center"
                        size={getScaleSize(12)}
                        font={FONTS.Manrope.Medium}
                        color={theme._404040}
                    >
                        We’re reviewing your details. You’ll be notified once your account is approved.
                    </Text>

                    {/* BUTTON */}
                    <TouchableOpacity style={styles(theme).button} onPress={onPressStatus}>
                        <Text
                            size={getScaleSize(12)}
                            color={theme.white}
                            font={FONTS.Manrope.SemiBold}
                        >
                            View Status
                        </Text>
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
            backgroundColor: "#777777CC", // dim background
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: getScaleSize(24),
        },

        container: {
            width: "100%",
            backgroundColor: theme.white,
            borderRadius: getScaleSize(16),
            paddingVertical: getScaleSize(40),
            paddingHorizontal: getScaleSize(18),
            alignItems: "center",
        },

        image: {
            width: getScaleSize(200),
            height: getScaleSize(200),
            resizeMode: "contain",
            marginBottom: getScaleSize(16),
        },

        title: { marginTop: getScaleSize(24), marginBottom: getScaleSize(12) },
        button: {
            backgroundColor: theme.primary,
            paddingVertical: getScaleSize(14),
            borderRadius: getScaleSize(10),
            width: "100%",
            alignItems: "center",
            marginTop: getScaleSize(24)
        },
    });