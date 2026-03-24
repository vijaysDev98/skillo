
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bottom?: boolean;
}

const SafeView = ({ children, style, bottom = true }: SafeViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { flex: 1 },
        style,
        bottom && { paddingBottom: insets.bottom }
      ]}
    >
      {children}
    </View>
  );
};

export default SafeView;
