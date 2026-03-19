import React, { JSX, useContext, useState } from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { IMAGES } from '../assets/images';
import Text from './Text';
import { getScaleSize } from '../constant/scaleSize';
import { FONTS } from '../assets';
import { ThemeContext, ThemeContextType } from '../context/ThemeProvider';
import { arrayIcons, useString } from '../constant';

interface DropdownProps {
    container?: StyleProp<ViewStyle>;
    data?: any;
    selectedItem?: any;
    onChange: (item: any) => void;
    customRenderItem?: JSX.Element
}

const CategoryDropdown = (props: DropdownProps) => {

    const { container, data, selectedItem, onChange } = props;
    const { theme } = useContext<any>(ThemeContext);

    const STRING = useString();

    const [isFocus, setIsFocus] = useState(false);

    const renderItem = (item: any) => {
        const isSelected = item?.id === selectedItem?.id;
        return (
            <View style={styles(theme).item}>
                <View style={styles(theme).iconLabelContainer}>
                    <Image
                        source={arrayIcons[item?.category_name?.toLowerCase() as keyof typeof arrayIcons] ?? arrayIcons['diy'] as any}
                        style={[styles(theme).icon, { tintColor: isSelected ? theme.primary : theme._8C8C8C }]}
                        resizeMode='cover'
                    />
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={isSelected ? theme.primary : theme._8C8C8C}>
                        {item.label}
                    </Text>
                </View>
                <View
                    style={[
                        styles(theme).radioCircle,
                        isSelected
                            ? styles(theme).radioActive
                            : styles(theme).radioInactive
                    ]}
                />
                {/* {isSelected ?
                    <Image source={IMAGES.ic_checkbox_select} style={[styles(theme).radioInner, { height: getScaleSize(24), width: getScaleSize(24) }]} />
                    :
                    <Image source={IMAGES.ic_checkBox_unSelect} style={[styles(theme).radioInner, { tintColor: theme._8C8C8C }]} />
                } */}
            </View>
        );
    };

    const renderLeftIcon = () => {
        return (
            <>
                {selectedItem?.category_name &&
                    <Image
                        source={arrayIcons[selectedItem?.category_name?.toLowerCase() as keyof typeof arrayIcons] ?? arrayIcons['diy'] as any}
                        style={[styles(theme).icon, { tintColor: theme.primary }]}
                        resizeMode='cover' />
                }
            </>
        )
    }

    const renderRightIcon = () => {
        return isFocus ? <Image
            source={IMAGES.ic_up}
            style={styles(theme).rightIcon}
        /> :
            <Image
                source={IMAGES.ic_down}
                style={styles(theme).rightIcon}
            />
    }

    return (
        <View style={container}>
            <Dropdown
                style={[styles(theme).dropdown]}
                placeholderStyle={styles(theme).placeholderStyle}
                selectedTextStyle={styles(theme).selectedTextStyle}
                containerStyle={styles(theme).containerStyle}
                data={data}
                showsVerticalScrollIndicator={false}
                maxHeight={getScaleSize(500)}
                labelField="category_name"
                valueField="category_name"
                placeholder={STRING.select_category}
                value={selectedItem?.category_name ?? "category_name"}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    onChange(item);
                    setIsFocus(false);
                }}
                renderItem={props?.customRenderItem ? props.customRenderItem : renderItem}
                renderLeftIcon={renderLeftIcon}
                renderRightIcon={renderRightIcon}
            />
        </View>
    );
};

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        dropdown: {
            backgroundColor: theme.white,
            borderRadius: getScaleSize(12),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(16),
            borderWidth: 1,
            borderColor: theme._D5D5D5,
            // shadowColor: theme.black,
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.15,
            // shadowRadius: getScaleSize(6),
            // elevation: 4,
        },
        placeholderStyle: {
            fontSize: getScaleSize(18),
            fontFamily: FONTS.Lato.Regular,
            color: theme._939393,
            lineHeight: getScaleSize(32),
        },
        selectedTextStyle: {
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.SemiBold,
            color: theme.primary,
        },
        containerStyle: {
            borderRadius: getScaleSize(20),
            overflow: 'hidden',
            shadowColor: theme.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: getScaleSize(6),
            elevation: 4,
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: getScaleSize(14),
            paddingHorizontal: getScaleSize(20),
        },
        iconLabelContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            marginRight: getScaleSize(14),
            width: getScaleSize(24),
            height: getScaleSize(24),
        },
        radioInner: {
            width: getScaleSize(18),
            height: getScaleSize(18),

        },
        rightIcon: {
            height: getScaleSize(20),
            width: getScaleSize(20),
            tintColor: theme._8C8C8C,
        },
        radioCircle: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            borderRadius: getScaleSize(18),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: getScaleSize(10)
        },

        radioActive: {
            borderWidth: 5,
            borderColor: theme.primary
        },

        radioInactive: {
            borderWidth: 2,
            borderColor: theme._8C8C8C
        }
    });

export default CategoryDropdown;