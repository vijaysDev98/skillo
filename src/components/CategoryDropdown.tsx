import React, { JSX, useContext } from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Text from './Text';
import { getScaleSize } from '../constant/scaleSize';
import { FONTS } from '../assets';
import { ThemeContext, ThemeContextType } from '../context/ThemeProvider';
import { arrayIcons, useString } from '../constant';

interface DropdownProps {
    container?: StyleProp<ViewStyle>;
    data?: any[];
    selectedItem?: any;
    selectedItems?: any[];
    onChange: (item: any) => void;
    onChangeMulti?: (items: any[]) => void;
    isMulti?: boolean;
    customRenderItem?: (item: any) => JSX.Element;
}

const CategoryDropdown = (props: DropdownProps) => {

    const {
        container,
        data = [],
        selectedItem,
        selectedItems = [],
        onChange,
        onChangeMulti,
        isMulti,
    } = props;

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const renderItem = (item: any) => {
        const isSelected = isMulti
            ? selectedItems?.some((s: any) => s?.id === item?.id)
            : item?.id === selectedItem?.id;

        return (
            <View style={styles(theme).item}>
                <View style={styles(theme).iconLabelContainer}>
                    <Image
                        source={
                            arrayIcons[item?.category_name?.toLowerCase() as keyof typeof arrayIcons]
                            ?? arrayIcons['diy'] as any
                        }
                        style={[
                            styles(theme).icon,
                            { tintColor: isSelected ? theme.primary : theme._8C8C8C },
                        ]}
                        resizeMode="contain"
                    />
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={isSelected ? theme.primary : theme._8C8C8C}>
                        {item.label ?? item.category_name}
                    </Text>
                </View>
                <View
                    style={[
                        styles(theme).radioCircle,
                        isSelected ? styles(theme).radioActive : styles(theme).radioInactive,
                    ]}
                />
            </View>
        );
    };

    // ✅ Return null when nothing selected — no empty <> fragment that breaks touch area
    const renderLeftIcon = () => {
        const activeItem = isMulti ? selectedItems?.[0] : selectedItem;
        if (!activeItem?.category_name) return null;
        return (
            <Image
                source={
                    arrayIcons[activeItem.category_name.toLowerCase() as keyof typeof arrayIcons]
                    ?? arrayIcons['diy'] as any
                }
                style={[styles(theme).icon, { tintColor: theme.primary }]}
                resizeMode="contain"
            />
        );
    };

    if (isMulti) {
        return (
            // ✅ zIndex on wrapper ensures dropdown list renders above sibling views
            <View style={[styles(theme).wrapper, container as any]}>
                <MultiSelect
                    style={styles(theme).dropdown}
                    placeholderStyle={styles(theme).placeholderStyle}
                    selectedTextStyle={styles(theme).selectedTextStyle}
                    containerStyle={styles(theme).containerStyle}
                    iconStyle={styles(theme).iconStyle}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    maxHeight={getScaleSize(400)}
                    labelField="category_name"
                    valueField="id"
                    placeholder={STRING.select_category}
                    value={selectedItems.map((i: any) => i?.id)}
                    onChange={(selectedIds: string[]) => {
                        const selected = data.filter((item: any) =>
                            selectedIds.includes(item?.id)
                        );
                        onChangeMulti?.(selected);
                    }}
                    renderItem={props.customRenderItem ?? renderItem}
                    renderLeftIcon={renderLeftIcon}
                    selectedStyle={styles(theme).selectedTagStyle}
                    activeColor={theme.primary + '20'}
                    visibleSelectedItem
                />
            </View>
        );
    }

    return (
        <View style={[styles(theme).wrapper, container as any]}>
            <Dropdown
                style={styles(theme).dropdown}
                placeholderStyle={styles(theme).placeholderStyle}
                selectedTextStyle={styles(theme).selectedTextStyle}
                containerStyle={styles(theme).containerStyle}
                iconStyle={styles(theme).iconStyle}
                data={data}
                showsVerticalScrollIndicator={false}
                maxHeight={getScaleSize(400)}
                labelField="category_name"
                valueField="id"
                placeholder={STRING.select_category}
                value={selectedItem?.id ?? null}
                onChange={(item) => {
                    onChange(item);
                }}
                renderItem={props.customRenderItem ?? renderItem}
                renderLeftIcon={renderLeftIcon}
            />
        </View>
    );
};

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        wrapper: {
            zIndex: 999,
        },
        dropdown: {
            backgroundColor: theme.white,
            borderRadius: getScaleSize(12),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(14),
            borderWidth: 1,
            borderColor: theme._D5D5D5,
            minHeight: getScaleSize(56),
        },
        placeholderStyle: {
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.Regular,
            color: theme._939393,
        },
        selectedTextStyle: {
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.SemiBold,
            color: theme.primary,
        },
        // ✅ No overflow:hidden — it clips the list on Android
        // ✅ elevation:8 ensures list renders above other elements
        containerStyle: {
            borderRadius: getScaleSize(12),
            backgroundColor: theme.white,
            shadowColor: theme.black,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: getScaleSize(8),
            elevation: 8,
            marginTop: getScaleSize(2),
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: getScaleSize(14),
            paddingHorizontal: getScaleSize(16),
            backgroundColor: theme.white,
        },
        iconLabelContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        icon: {
            marginRight: getScaleSize(12),
            width: getScaleSize(22),
            height: getScaleSize(22),
        },
        iconStyle: {
            width: getScaleSize(20),
            height: getScaleSize(20),
            tintColor: theme._8C8C8C,
        },
        radioCircle: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            borderRadius: getScaleSize(9),
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioActive: {
            borderWidth: 5,
            borderColor: theme.primary,
        },
        radioInactive: {
            borderWidth: 2,
            borderColor: theme._8C8C8C,
        },
        selectedTagStyle: {
            borderRadius: getScaleSize(8),
            backgroundColor: theme.primary + '20',
            borderColor: theme.primary,
            borderWidth: 1,
            marginTop: getScaleSize(4),
            marginRight: getScaleSize(4),
            paddingHorizontal: getScaleSize(8),
        },
    });

export default CategoryDropdown;
