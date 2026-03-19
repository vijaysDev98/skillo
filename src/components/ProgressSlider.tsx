import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {getScaleSize} from '../constant';
import {ThemeContext, ThemeContextType} from '../context';

interface ProgressProps {
  fillCount?: number;
  totalCount?: number;
}

function ProgressSlider(props: ProgressProps) {
  const {theme} = useContext<any>(ThemeContext);

  return (
    <View style={styles(theme).sliderUnfill}>
      <View
        style={[
          styles(theme).fillProgress,
          {
            width: `${(props?.fillCount * 100) / props?.totalCount}%`,
          },
        ]}></View>
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    sliderUnfill: {
      backgroundColor: '#EAF0F3',
      height: getScaleSize(8),
      borderRadius: getScaleSize(12),
    },
    fillProgress: {
      height: getScaleSize(8),
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(12),
    },
  });

export default ProgressSlider;
