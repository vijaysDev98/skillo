
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
  isBottomMargin?:boolean;
  isLight?: boolean;
}

const AppSafeAreaView = ({
  children,
  style,
  isTopMargin = true,
  isBottomMargin = true,
  isLight,
}: AppSafeAreaViewProps) => {

    const {theme}= useContext(ThemeContext)
    const insets= useSafeAreaInsets()

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
    <SafeAreaView style={[{flex:1,
        // paddingTop:isTopMargin ? insets.top : 0,
        // paddingBottom:isBottomMargin? insets.bottom:0
    }, style]}>
      <StatusBar
        translucent
        backgroundColor={theme.white}
        // backgroundColor={
        //   statusColor
        //     ? statusColor
        //     : isSecond
        //     ? colors.transparent
        //     : colors.mainBg
        // }
        barStyle={isLight ? "light-content" : "dark-content"}
      />
     
          {children}
    </SafeAreaView>
  );
};

export { AppSafeAreaView };
