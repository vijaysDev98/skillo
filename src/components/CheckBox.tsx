import React, { memo, useContext, forwardRef } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    Pressable,
    Image,
} from 'react-native';

// COMPONENTS
import Text from './Text';

// ASSETS & CONSTANT
import { FONTS, IMAGES } from '../assets';
import { getScaleSize } from '../constant';
import { ThemeContext, ThemeContextType } from '../context';

interface CheckBoxProps {
    label?: string;
    checked?: boolean;
    onPress?: () => void;
    onPressInfo?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
}

const CheckBox = forwardRef<any, CheckBoxProps>((props, ref) => {
    const { theme } = useContext<any>(ThemeContext);
    const { label, checked: controlledChecked, onPress, onPressInfo, containerStyle, textStyle, disabled } = props;

    const [internalChecked, setInternalChecked] = React.useState(false);
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (controlledChecked === undefined) {
            setInternalChecked(!internalChecked);
        }
    };

    return (
        <Pressable
            ref={ref}
            disabled={disabled}
            onPress={handlePress}
            style={[styles(theme).container, containerStyle]}
        >
            <View
                style={[
                    styles(theme).checkBox,
                    {
                        backgroundColor: isChecked ? theme.primary : 'transparent',
                        borderColor: isChecked ? theme.primary : theme._B3B3B3,
                    },
                ]}
            >
                {isChecked && (
                    // <View style={styles(theme).innerCheck} />
                    <Text
                    size={getScaleSize(12)}
                    color={theme.white}
                    font={FONTS.Lato.SemiBold}
                    align='center'
                    >{"✓"}</Text>
                )}
            </View>
            {label && (
                <Text
                    size={getScaleSize(16)}
                    lineHeight={getScaleSize(20)}
                    font={FONTS.Lato.Regular}
                    color={theme._939393}
                    style={[styles(theme).label, textStyle]}
                >
                    {label}
                </Text>
            )}
            {onPressInfo && (
                <Pressable
                    onPress={onPressInfo}
                    style={styles(theme).infoContainer}
                >
                    <Image
                        source={IMAGES.ic_terms_info}
                        style={styles(theme).infoIcon}
                        resizeMode="contain"
                    />
                </Pressable>
            )}
        </Pressable>
    );
});

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkBox: {
            width: getScaleSize(20),
            height: getScaleSize(20),
            borderRadius: getScaleSize(4),
            borderWidth: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        innerCheck: {
            width: getScaleSize(10),
            height: getScaleSize(10),
            backgroundColor: theme.white,
            borderRadius: getScaleSize(2),
        },
        label: {
            marginLeft: getScaleSize(10),
        },
        infoContainer: {
            marginLeft: getScaleSize(8),
            padding: getScaleSize(4),
        },
        infoIcon: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            tintColor: theme.primary,
        },
    });

export default memo(CheckBox);
