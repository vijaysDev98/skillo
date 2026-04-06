import React, { useContext } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ViewStyle,
    StyleProp
} from "react-native";
import { FONTS, IMAGES } from "../assets";
import Text from "./Text";
import { getScaleSize } from "../constant";
import { ThemeContext, ThemeContextType } from "../context";

interface Props {
    title?: string,
    label?: string,
    value?: any
    onPress: () => void,
    handleCancel?: () => void,
    noteText?: string
    containerStyle?: StyleProp<ViewStyle>;
    uploadBoxStyle?: StyleProp<ViewStyle>;
    textFont?: string;
    icon?: string;
    isError?:string
}

export default function UploadDocumentBox({
    title,
    label,
    value,
    onPress,
    handleCancel,
    noteText,
    containerStyle,
    uploadBoxStyle,
    textFont,
    isError,
    icon
}: Props) {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles(theme).container, containerStyle]}>
            <View >
             {title &&   <Text
                    font={FONTS.Lato.SemiBold}
                    size={16}
                    color={theme.secondaryText}
                >{title}
                </Text>}
                {noteText && (
                    <Text
                        font={FONTS.Lato.Regular}
                        size={12}
                        color={theme._EF4444}
                    >
                        {noteText}
                    </Text>
                )}
            </View>

            <TouchableOpacity
                style={[styles(theme).uploadBox,
                    {
                        borderColor:isError? theme.primary :  "#ddd"
                    },
                    uploadBoxStyle]}
                onPress={onPress}
            >
                {(value && value?.[0]?.uri) &&
                    <TouchableOpacity
                        onPress={handleCancel}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles(theme).cancelIconBtn}
                    >
                        <Image
                            source={IMAGES.ic_cancelled}
                            style={styles(theme).cancelIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>}
                {((value?.length > 0 && value?.[0]?.uri)  || value?.uri) ?
                    <Image
                        source={{ uri: value?.[0]?.uri || value?.uri }}
                        style={styles(theme).documentImage}
                        resizeMode="contain"
                    />
                    :
                    <View style={styles(theme).uploadContainer}>
                        <Image
                            source={ icon ? icon : IMAGES.upload_attachment}
                            style={styles(theme).icon}
                            resizeMode="contain"
                        />
                        <Text
                            font={textFont ? textFont : FONTS.Lato.SemiBold}
                            size={getScaleSize(14)}
                            color={theme._8C8C8C}
                        >{label || "upload from device"}</Text>
                    </View>
                }

            </TouchableOpacity>
           {isError&&
            <Text
            size={getScaleSize(12)}
            font={FONTS.Lato.Regular}
            color={theme.primary}
           >{isError}</Text>
            }
        </View>

    )
}


const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            marginBottom: 20,
            gap: getScaleSize(8)
        },
        uploadBox: {
            height: getScaleSize(140),
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#ddd",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        icon: {
            height: getScaleSize(24),
            width: getScaleSize(24)
        },
        uploadContainer: {
            alignItems: "center",
            justifyContent: 'center',
            gap: getScaleSize(11)
        },
        documentImage: {
            width: '100%',
            height: '90%',
        },
        cancelIconBtn: {
            position: 'absolute',
            top: 0,
            right: 10,
            tintColor: theme.primary
        },
        cancelIcon: {
            height: getScaleSize(16),
            width: getScaleSize(16)
        }
    })
