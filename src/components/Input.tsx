import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, { memo, useContext } from 'react';

//ASSETS & CONSTANT
import { FONTS, IMAGES } from '../assets';
import { getScaleSize } from '../constant';

//CONTEXT
import Text from './Text';
import { ThemeContext, ThemeContextType } from '../context';

interface InputProps {
  continerStyle?: StyleProp<ViewStyle>;
  value?: any;
  icon?: any;
  onChnageIcon?: () => void;
  onPress?: () => void;
  passwordIcon?: boolean;
  secureTextEntry?: boolean;
  searchBox?: any;
  inputContainer?: StyleProp<ViewStyle>;
  isError?: string;
  inputTitle?: string;
  inputColor?: boolean;
  inputTitleSize?: number;
  countryCode?: string;
  countryFlag?: string;
  onPressCountryCode?: () => void;
  quantityIcon?: any;
  onPressQuantityRemove?: () => void;
  onPressQuantityAdd?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  isDropDown?: boolean;
  onDropDownPress?: () => void;
  mainContinerStyle?: StyleProp<ViewStyle>;
  isRightComponent?: any
}

function Input(props: InputProps & TextInputProps) {
  const {
    onChnageIcon,
    icon,
    mainContinerStyle,
    passwordIcon,
    secureTextEntry,
    inputContainer,
    placeholderTextColor,
    searchBox,
    isError,
    inputTitle,
    inputColor,
    countryCode,
    countryFlag,
    onPressCountryCode,
    quantityIcon,
    onPressQuantityRemove,
    onPressQuantityAdd,
    isDropDown,
    onDropDownPress,
    inputTitleSize,
    isRightComponent
  } = props;

  const { theme } = useContext<any>(ThemeContext);

  return (
    <View style={mainContinerStyle}>
      {inputTitle && (
        <Text
          size={inputTitleSize ?? getScaleSize(17)}
          font={FONTS.Lato.Medium}
          color={inputColor ? inputColor : theme._404040}
          style={{ marginBottom: getScaleSize(8) }}>
          {inputTitle}
        </Text>
      )}
      <View style={[styles(theme).flexView]}>
        {countryCode && (
          <Pressable
            onPress={onPressCountryCode}
            style={[styles(theme).container,
            {
              borderColor: isError ? theme._EF5350 : theme._B3B3B3,
              height: Platform.OS == 'ios' ? getScaleSize(56) : getScaleSize(56),
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: getScaleSize(14),
              paddingHorizontal: getScaleSize(10),
            },
            ]}>
            <Text
              size={getScaleSize(20)}
              font={FONTS.Lato.Bold}
              color={theme._8C8C8C}
            >
              {countryFlag}
            </Text>
            <Text
              style={{ marginLeft: getScaleSize(5) }}
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              color={theme._8C8C8C}
            >
              {countryCode}
            </Text>
            <Image
              source={IMAGES.ic_down}
              style={styles(theme).downIcon}
              tintColor={theme._8C8C8C}
              resizeMode={'contain'}
            />
          </Pressable>
        )}
        {props.isDropDown ? (
          <Pressable
            style={[
              styles(theme).container,
              {
                borderColor: isError ? theme._EF5350 : theme._B3B3B3,
                flex: 1.0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: Platform.OS == 'ios' ? getScaleSize(56) : getScaleSize(56),
              },
              // props.containerStyle,
            ]}
            onPress={props.onPress}
          >

            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              color={props.value ? theme._31302F : placeholderTextColor
                ? placeholderTextColor
                : theme._939393}
            >
              {props.value || props.placeholder}
            </Text>
            <Image
              source={IMAGES.down}
              style={{
                width: 16,
                height: 16,
                tintColor: theme._8C8C8C
              }}
            />
          </Pressable>
        ) :
          <Pressable
            onPress={props.onPress}
            style={[
              styles(theme).container,
              {
                borderColor: isError ? theme._EF5350 : theme._B3B3B3,
                flex: 1.0,
              },
              props.containerStyle,
            ]}>
            {searchBox && (
              <View>
                <Image
                  source={searchBox}
                  style={styles(theme).leftIcon}
                  resizeMode={'contain'}
                />
              </View>
            )}


            <TextInput
              {...props}
              style={[styles(theme).input, inputContainer]}
              placeholderTextColor={
                placeholderTextColor
                  ? placeholderTextColor
                  : theme._939393
              }
              multiline={props?.multiline ?? false}
              maxLength={props.maxLength}
              numberOfLines={props?.numberOfLines ?? 1}
              value={props.value}
              secureTextEntry={secureTextEntry}
            />
            {icon && (
              <View>
                <Image
                  source={icon}
                  style={[styles(theme).rightIcon]}
                  resizeMode={'contain'}
                />
              </View>
            )}
            {quantityIcon && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable onPress={onPressQuantityRemove}>
                  <Image
                    source={IMAGES.quantity_remove}
                    style={[styles(theme).rightIcon, { marginHorizontal: getScaleSize(10) }]}
                    resizeMode={'contain'}
                  />
                </Pressable>
                <Pressable onPress={onPressQuantityAdd}>
                  <Image
                    source={IMAGES.quantity_add}
                    style={[styles(theme).rightIcon, { marginHorizontal: getScaleSize(10) }]}
                    resizeMode={'contain'}
                  />
                </Pressable>
              </View>
            )}
            {passwordIcon && (
              <Pressable onPress={onChnageIcon}>
                <Image
                  source={isError ? IMAGES.ic_inputError : secureTextEntry ? IMAGES.ic_hide : IMAGES.ic_show}
                  style={[
                    styles(theme).rightIcon,
                    { tintColor: theme.primary },
                  ]}
                  resizeMode={'contain'}
                />
              </Pressable>
            )}
            {isRightComponent && isRightComponent()}
          </Pressable>
        }

      </View>
      {isError && (
        <Text
          style={{ marginTop: getScaleSize(4) }}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._EF5350}>
          {isError ? isError : ''}
        </Text>
      )}
    </View>
  );
}

export default memo(Input);

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getScaleSize(16),
      borderWidth: 1,
      borderRadius: getScaleSize(12),
    },
    input: {
      fontSize: getScaleSize(16),
      fontFamily: FONTS.Lato.Medium,
      color: theme._31302F,
      flex: 1.0,
      height: Platform.OS == 'ios' ? getScaleSize(56) : getScaleSize(56),
    },
    rightIcon: {
      width: getScaleSize(20),
      height: getScaleSize(20),
    },
    leftIcon: {
      width: getScaleSize(16),
      height: getScaleSize(16),
      marginRight: getScaleSize(10),
    },
    downIcon: {
      width: getScaleSize(20),
      height: getScaleSize(20),
      marginLeft: getScaleSize(5),
      tintColor: theme._8C8C8C
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
