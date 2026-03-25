
import React, { ReactNode, useContext } from "react";
import {
  ImageBackground,
  ImageBackgroundProps,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../context";

interface AppSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  isTopMargin?: boolean;
  isBottomMargin?: boolean;
  isLight?: boolean;
  isFullScreen?: boolean;
}

const AppSafeAreaView = ({
  children,
  style,
  isTopMargin = true,
  isBottomMargin = true,
  isFullScreen = false,
  isLight,
}: AppSafeAreaViewProps) => {

  const { theme } = useContext(ThemeContext)
  const insets = useSafeAreaInsets()

  return Platform.OS === "ios" ? (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      style={[
        {
          flex: 1,
          // paddingTop: 40,
          //   paddingTop: 10,
        },
        style,
      ]}
    >
      <StatusBar translucent={false} />
      {children}
    </SafeAreaView>
  ) : (

    isFullScreen ? (
      <View style={[
        {
          flex: 1,
        },
        style,
      ]}>
        {children}
      </View>
    ) : (
      <SafeAreaView
        style={[
          {
            flex: 1,
          },
          style,
        ]}
      >
        <StatusBar
          translucent
          backgroundColor={theme.white}
          barStyle={isLight ? "light-content" : "dark-content"}
        />
        {children}
      </SafeAreaView>
    )
  );
};

export { AppSafeAreaView };
