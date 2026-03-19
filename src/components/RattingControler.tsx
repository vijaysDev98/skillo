import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {getScaleSize} from '../constant';
import {ThemeContext, ThemeContextType} from '../context';
import Text from './Text';
import {FONTS} from '../assets';

interface ProgressProps {
  fillCount: number;
  totalCount: number;
  title?: string;
  value?: string;
}

function RattingControler(props: ProgressProps) {
  const {theme} = useContext<any>(ThemeContext);

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{flex: 1.0}}
          size={getScaleSize(16)}
          font={FONTS.Lato.Medium}
          color={theme._323232}>
          {props?.title}
        </Text>
        <Text
          size={getScaleSize(16)}
          font={FONTS.Lato.Medium}
          color={theme.primary}>
          {props?.value}
        </Text>
      </View>
      <View style={{marginTop: getScaleSize(6)}}>
        <View style={styles(theme).sliderUnfill}>
          <View
            style={[
              styles(theme).fillProgress,
              {
                width: `${(props?.fillCount * 100) / props?.totalCount}%`,
              },
            ]}></View>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    sliderUnfill: {
      backgroundColor: '#EAF0F3',
      height: getScaleSize(3),
      borderRadius: getScaleSize(12),
    },
    fillProgress: {
      height: getScaleSize(3),
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(12),
    },
  });

export default RattingControler;
