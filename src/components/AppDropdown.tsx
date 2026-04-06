import React, { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text as RNText } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { getScaleSize } from "../constant";
import { ThemeContext, ThemeContextType } from "../context";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { IMAGES } from "../assets";

interface AppDropDownProps {
    data: any[];
    labelField?: string;
    valueField?: string;
    placeholder?: string;
    value?: any;
    onChange: (item: any) => void;
    onChangeMulti?: (items: any[]) => void;
    multiSelect?: boolean;
    renderSelectedItem?: (item: any, unSelect?: (item: any) => void) => JSX.Element;
    selectedTagStyle?: any;
    selectedTextStyle?: any;
    renderItem?: (item: any) => JSX.Element;
    containerStyle?: any;
    maxHeight?: number;
    search?: boolean;
}

const AppDropdown = (props: DropdownProps<any> & AppDropDownProps) => {

    const {
        data,
        labelField = "label",
        valueField = "value",
        placeholder,
        value,
        onChange,
        onChangeMulti,
        multiSelect = false,
        renderSelectedItem,
        selectedTagStyle,
        selectedTextStyle,
        renderItem,
        containerStyle,
        maxHeight = 250,
        search = false
    } = props

    const { theme } = useContext(ThemeContext);
    const [isFocus, setIsFocus] = useState(false);

    if (multiSelect) {
        return (
            <MultiSelect
                style={[styles(theme).dropdown,
                    // isFocus && styles(theme).focus
                ]}
                data={data}
                labelField={labelField}
                valueField={valueField}
                placeholder={placeholder}
                placeholderStyle={{ color: theme._8C8C8C }}
                value={value}
                search={search}
                maxHeight={maxHeight}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(selected: any[] | string[]) => {
                    // Normalize to ids, then map back to full items for consumer
                    const ids = (selected ?? []).map((item: any) =>
                        typeof item === 'object' ? item?.[valueField] : item
                    );
                    const normalized = data.filter((item: any) =>
                        ids.includes(item?.[valueField])
                    );
                    onChangeMulti?.(normalized);
                    if (!onChangeMulti) {
                        onChange(normalized);
                    }
                }}
                renderItem={renderItem}
                renderSelectedItem={renderSelectedItem ?? ((item: any, unSelect?: (item: any) => void) => (
                    <View style={[styles(theme).selectedTag, selectedTagStyle]}>
                        <RNText style={[styles(theme).selectedText, selectedTextStyle]}>
                            {item?.[labelField] ?? ''}
                        </RNText>
                        <TouchableOpacity
                            onPress={() => unSelect?.(item)}
                            style={styles(theme).removeBtn}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                            <RNText style={styles(theme).removeText}>×</RNText>
                        </TouchableOpacity>
                    </View>
                ))}
                // selectedStyle={[styles(theme).selectedTag, selectedTagStyle]}
                // selectedTextStyle={[styles(theme).selectedText, selectedTextStyle]}
                containerStyle={containerStyle}
                renderRightIcon={() => {
                    return isFocus ? <Image
                        source={IMAGES.ic_up}
                        style={styles(theme).rightIcon}
                    /> :
                        <Image
                            source={IMAGES.ic_down}
                            style={styles(theme).rightIcon}
                        />
                }}
            />
        );
    }

    return (
        <Dropdown
            style={[styles(theme).dropdown,
                //  isFocus && styles(theme).focus
            ]}
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            placeholderStyle={{ color: theme._8C8C8C }}
            value={value}
            search={search}
            maxHeight={maxHeight}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
                onChange(item);
                setIsFocus(false);
            }}
            renderItem={renderItem}
            containerStyle={containerStyle}
            renderRightIcon={() => {
                return isFocus ? <Image
                    source={IMAGES.ic_up}
                    style={styles(theme).rightIcon}
                /> :
                    <Image
                        source={IMAGES.ic_down}
                        style={styles(theme).rightIcon}
                    />
            }}
        />
    );
};

export default AppDropdown;

const styles = (theme: ThemeContextType["theme"]) =>
    StyleSheet.create({
        dropdown: {
            height: getScaleSize(56),
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            paddingHorizontal: getScaleSize(16),
            borderColor: theme._D5D5D5,
            backgroundColor: theme.white,
        },
        focus: {
            borderColor: theme.primary,
        },
        rightIcon: {
            height: getScaleSize(20),
            width: getScaleSize(20),
            tintColor: theme._8C8C8C,
        },
        selectedTag: {
            backgroundColor: theme.primary ,
            borderColor: theme.primary,
            borderWidth: 1,
            borderRadius: getScaleSize(10),
            paddingHorizontal: getScaleSize(10),
            paddingVertical: getScaleSize(6),
            flexDirection: 'row',
            alignItems: 'center',
            gap: getScaleSize(6),
            marginTop:10,
            marginRight:10
        },
        selectedText: {
            color: theme.white,
            fontSize: getScaleSize(14),
        },
        removeBtn: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            borderRadius: getScaleSize(9),
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        removeText: {
            color: theme.white,
            fontSize: getScaleSize(12),
            marginTop: -1,
        }
    });