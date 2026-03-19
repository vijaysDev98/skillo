import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  View,
} from 'react-native';
import React, {useContext} from 'react';

//COMPONENTS
import Text from './Text';

//ASSETS & CONSTANT
import {FONTS} from '../assets';
import {getScaleSize} from '../constant';
import {ThemeContext, ThemeContextType} from '../context';

interface AssistanceItems {
  item?: any;
  index?: number;
}

const AssistanceItems = (props: AssistanceItems) => {
  const {theme} = useContext<any>(ThemeContext);

  return (
    <View style={[styles(theme).container, {marginTop: getScaleSize(20)}]}>
      <View style={{flex: 1.0}}>
        <View
          style={[
            styles(theme).itemContainer,
            {marginRight: getScaleSize(10)},
          ]}>
          <Image
            style={styles(theme).smallImage}
            source={{uri: 'https://picsum.photos/id/1/200/300'}}
          />
          <Text
            style={{
              marginVertical: getScaleSize(14),
              marginHorizontal: getScaleSize(14),
            }}
            size={getScaleSize(16)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {'Installation of Lamps'}
          </Text>
        </View>
        <View
          style={[
            styles(theme).seconViewContainer,
            {marginRight: getScaleSize(10)},
          ]}>
          <Image
            style={styles(theme).bigImage}
            source={{uri: 'https://picsum.photos/id/1/200/300'}}
          />
          <Text
            style={{
              marginVertical: getScaleSize(14),
              marginHorizontal: getScaleSize(14),
            }}
            size={getScaleSize(16)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {'Installation of Lamps'}
          </Text>
        </View>
      </View>
      <View style={{flex: 1.0}}>
        <View
          style={[
            styles(theme).seconViewContainer,
            {marginTop: getScaleSize(0), marginLeft: getScaleSize(10)},
          ]}>
          <Image
            style={styles(theme).bigImage}
            source={{uri: 'https://picsum.photos/id/1/200/300'}}
          />
          <Text
            style={{
              marginVertical: getScaleSize(14),
              marginHorizontal: getScaleSize(14),
            }}
            size={getScaleSize(16)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {'Installation of Lamps'}
          </Text>
        </View>
        <View
          style={[
            styles(theme).itemContainer,
            {marginTop: getScaleSize(20), marginLeft: getScaleSize(10)},
          ]}>
          <Image
            style={styles(theme).smallImage}
            source={{uri: 'https://picsum.photos/id/1/200/300'}}
          />
          <Text
            style={{
              marginVertical: getScaleSize(14),
              marginHorizontal: getScaleSize(14),
            }}
            size={getScaleSize(16)}
            font={FONTS.Lato.Bold}
            color={theme.primary}>
            {'Installation of Lamps'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1.0,
      flexDirection: 'row',
    },
    itemContainer: {
      flex: 1.0,
      borderRadius: getScaleSize(20),
      height: getScaleSize(188),
      backgroundColor: theme._EAF0F370,

    },
    seconViewContainer: {
      flex: 1.0,
      borderRadius: getScaleSize(20),
      height: getScaleSize(233),
      backgroundColor: theme._EAF0F370,
      marginTop: getScaleSize(20),

    },
    smallImage: {
      flex: 1.0,
      height: getScaleSize(146),
      borderRadius: getScaleSize(20),
    },
    bigImage: {
      flex: 1.0,
      height: getScaleSize(191),
      borderRadius: getScaleSize(20),
    },
  });

export default AssistanceItems;
