import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useContext } from 'react';

//COMPONENTS
import Text from './Text';

//ASSETS & CONSTANT
import { FONTS } from '../assets';
import { getScaleSize } from '../constant';
import { ThemeContext, ThemeContextType } from '../context';


interface ButtonProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  titleColor?: string;
  buttonTitleFont?: string;
  buttonTitleSize?: number;
  loading?:boolean;
}

const Button = (props: ButtonProps) => {
  const { theme } = useContext<any>(ThemeContext)
  const { style, title, onPress, disabled, titleColor, buttonTitleFont, buttonTitleSize,loading } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles(theme).gradient, { backgroundColor: disabled ? theme.primary : theme.primary }, style]} activeOpacity={0.8}>
     {loading ? (
      <ActivityIndicator size="small" color={theme.white}/>
     ):
(
      <Text
        align="center"
        font={buttonTitleFont ? buttonTitleFont : FONTS.Lato.Bold}
        size={buttonTitleSize ? buttonTitleSize : getScaleSize(19)}
        lineHeight={getScaleSize(24)}
        color={
          disabled ? theme.white : titleColor ? titleColor : theme.white}
      >
        {title}
      </Text>)}
    </TouchableOpacity>
  );
};

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
  gradient: {
    borderRadius: getScaleSize(12),
    paddingVertical: getScaleSize(18),
  }
});

export default Button;
