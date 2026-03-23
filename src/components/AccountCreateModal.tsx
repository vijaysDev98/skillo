import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

import { getScaleSize } from "../constant";
import { FONTS, IMAGES } from "../assets";
import { ThemeContext, ThemeContextType } from "../context";
import Text from "./Text";

const AccountCreatedModal = ({ 
  visible, onPressHome,discription,title, isGoToHome = false,titleSize,titleFont,titleColor,discriptionSize,discriptionFont,discriptionColor }: any) => {
  const { theme } = useContext(ThemeContext)
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles(theme).overlay}>
        <View style={styles(theme).container}>
          <Image
            source={IMAGES.account_created} 
            style={styles(theme).image}
            resizeMode="cover"
          />

        {title &&   <Text
            size={titleSize ? titleSize : getScaleSize(20)}
            font={titleFont ? titleFont : FONTS.Lato.Bold}
            color={titleColor ? titleColor : theme.secondaryText}
            style={{ marginBottom: getScaleSize(12) }}
          >
           {title ? title: "Account Created Successfully!" }
          </Text>
}
          <Text
            size={
              discriptionSize ? discriptionSize : getScaleSize(14)}
            font={discriptionFont ? discriptionFont : FONTS.Lato.Medium}
            color={discriptionColor ? discriptionColor : theme.secondaryText}
            align={"center"}
          >
            {discription ? discription: "Your account is under verification. Please wait while we complete the review process."}
          </Text>
          {isGoToHome &&
            <TouchableOpacity
              style={styles(theme).button}
              onPress={onPressHome}
            >
              <Text
                size={getScaleSize(12)}
                font={FONTS.Lato.SemiBold}
                color={theme.white}
              >
                Go To Home
              </Text>
            </TouchableOpacity>}

        </View>

      </View>
    </Modal>
  );
};

export default AccountCreatedModal;

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme._777777CC,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getScaleSize(20)
  },
  container: {
    width: "100%",
    backgroundColor: theme.white,
    borderRadius: getScaleSize(10),
    paddingHorizontal: getScaleSize(18),
    paddingVertical: getScaleSize(40),
    alignItems: "center",
  },
  image: {
    width: getScaleSize(200),
    height: getScaleSize(180),
    marginBottom: getScaleSize(24)
  },
  button: {
    width: "100%",
    height: getScaleSize(48),
    backgroundColor: theme.primary,
    borderRadius: getScaleSize(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: getScaleSize(32)
  },
});