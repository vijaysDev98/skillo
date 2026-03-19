import React, { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
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
    multiSelect?: boolean;
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
        multiSelect = false,
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
                onChange={onChange}
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
    });