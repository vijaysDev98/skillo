import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../context';
import { getScaleSize } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';
import Input from './Input';

interface GenderSelectionProps {
  inputTitle: string;
  placeholder: string;
  value: string;
  onSelect: (value: string) => void;
  isError?:string;
}

const GenderSelection = ({ inputTitle, placeholder, value, onSelect,isError }: GenderSelectionProps) => {
  const { theme } = useContext<any>(ThemeContext);
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleSelect = (val: string) => {
    onSelect(val);
    setShowOptions(false);
  };

  const RadioItem = ({ itemLabel, itemValue, selected, onPress }: any) => (
    <TouchableOpacity
      style={styles(theme).radioItem}
      onPress={() => onPress(itemValue)}
    >
      <View
        style={[
          styles(theme).radioOuter,
          { borderColor: selected === itemValue ? theme.primary : theme._8C8C8C, borderWidth: selected === itemValue ? 5 : 2 }
        ]}
      />
      <Text
        size={getScaleSize(16)}
        font={FONTS.Lato.Regular}
        color={selected === itemValue ? theme.primary : theme._8C8C8C}
      >
        {itemLabel}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles(theme).container}>
      <Input
        inputTitle={inputTitle}
        placeholder={placeholder}
        value={value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}
        editable={false}
        isDropDown={true}
        onPress={() => setShowOptions(!showOptions)}
        isError={isError}
      />
      {showOptions && (
        <View style={styles(theme).optionsContainer}>
          {options.map((opt) => (
            <RadioItem
              key={opt.value}
              itemLabel={opt.label}
              itemValue={opt.value}
              selected={value}
              onPress={handleSelect}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    optionsContainer: {
      flexDirection: 'row',
      marginTop: getScaleSize(8),
      paddingHorizontal: getScaleSize(16),
      gap: getScaleSize(24),
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: getScaleSize(8),
    },
    radioOuter: {
      width: 18,
      height: 18,
      borderRadius: 9,
      marginRight: getScaleSize(12),
    },
  });

export default GenderSelection;
