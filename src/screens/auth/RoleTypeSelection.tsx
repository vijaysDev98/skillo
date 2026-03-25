import React, { useContext, useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS, IMAGES } from "../../assets";
import { getScaleSize, useString } from "../../constant";
import { screenHeight, screenWidth } from "../../constant/scaleSize";
import { AuthContext, ThemeContext, ThemeContextType } from "../../context";
import { Button, Text } from "../../components";
import { SCREENS } from "..";
import { userRoles } from "../../constant/utils";
import { AppSafeAreaView } from "../../components/AppSafeAreaView";


export default function RoleTypeSelection(props: any) {

    const { isFromSignup } = props.route.params || "";

    const STRING = useString();

    const { theme } = useContext(ThemeContext)
    const { setUserType, setUserRole, userType } =
        useContext<any>(AuthContext);

    const [usertype, setUsertype] = useState("service_seeker");
    const [type, setType] = useState("individual");


    const handleContinue = () => {
        if (isFromSignup) {
            props.navigation.navigate(SCREENS.Signup.identifier,
                {
                    userRole: usertype,
                    usertype: type
                })
        } else {
            props.navigation.navigate(SCREENS.Login.identifier, {
                userRole: usertype,
                usertype: type
            })
        }
    }

    return (
        <AppSafeAreaView isFullScreen={true} style={styles(theme).container}>
            <View style={styles(theme).imageContainer}>
                <Image
                    source={IMAGES.role_selection_bgImg}
                    style={styles(theme).image}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={["#FAFAFA00", "#FAFAFA"]}
                    style={styles(theme).fade}
                />
            </View>
            <View
                style={styles(theme).secondContainer}
            >
                <Text
                    font={FONTS.Lato.Bold}
                    align={"center"}
                    size={getScaleSize(28)}
                >Choose Your Role</Text>

                <View style={styles(theme).roleContainer}>

                    <TouchableOpacity
                        style={[
                            styles(theme).roleButton,
                            usertype === "service_seeker" && styles(theme).activeRole,
                        ]}
                        onPress={() => {
                            setUsertype("service_seeker")
                            setType("individual")
                            setUserType(userRoles.Service_Seeker_individual)
                        }}
                    >
                        <Text
                            size={getScaleSize(14)}
                            font={FONTS.Lato.Bold}
                            color={usertype === "service_seeker" ? theme.white : theme._404040}
                        >
                            Customer
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles(theme).roleButton,
                            usertype === "service_provider" && styles(theme).activeRole,
                        ]}
                        onPress={() => {
                            setUsertype("service_provider")
                            setType("individual")
                            setUserType(userRoles.Service_Provider_individual)
                        }}
                    >
                        <Text
                            size={getScaleSize(14)}
                            font={FONTS.Lato.Bold}
                            color={usertype === "service_provider" ? theme.white : theme._404040}
                        >
                            Service Provider
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles(theme).cardRow}>

                    <TouchableOpacity
                        style={[
                            styles(theme).card,
                            type === "individual" && styles(theme).selectedCard,
                        ]}
                        onPress={() => {
                            setType("individual")
                            if (usertype === "service_provider") {
                                setUserType(userRoles.Service_Provider_individual)
                            } else {
                                setUserType(userRoles.Service_Seeker_individual)
                            }
                        }}
                    >
                        <Image
                            source={IMAGES.ic_individualService}
                            style={styles(theme).icon}
                        />
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.SemiBold}
                        >Individual</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles(theme).card,
                            type === "business" && styles(theme).selectedCard,
                        ]}
                        onPress={() => {
                            setType("business")
                            if (usertype === "service_provider") {
                                setUserType(userRoles.Service_Provider_business)
                            } else {
                                setUserType(userRoles.Service_Seeker_business)
                            }
                        }}
                    >
                        <Image
                            source={IMAGES.ic_bussinessService}
                            style={styles(theme).icon}
                        />
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.SemiBold}
                        >Business</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <Button
                title={STRING.continue}
                style={styles(theme).button}
                onPress={handleContinue}
            />
            {/* <TouchableOpacity
                onPress={handleContinue}
                style={styles(theme).button}>
                <Text
                    font={FONTS.Lato.SemiBold}
                    size={getScaleSize(20)}
                    color={theme.white}
                >Continue</Text>
            </TouchableOpacity> */}
        </AppSafeAreaView>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.white,
        },
        secondContainer: {
            paddingHorizontal: getScaleSize(24),
            position: "absolute",
            top: screenHeight * 0.45,
        },
        imageContainer: {
            height: screenHeight * 0.65,
            marginBottom: 20,
        },
        image: {
            width: screenWidth,
            height: "100%",
            borderBottomLeftRadius: getScaleSize(20),
            borderBottomRightRadius: getScaleSize(20),
        },
        fade: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: getScaleSize(120),
        },
        roleContainer: {
            flexDirection: "row",
            backgroundColor: theme._F0F0F0,
            borderRadius: 12,
            paddingHorizontal: 6,
            paddingVertical: 3,
            marginBottom: getScaleSize(30),
            marginTop: getScaleSize(20),
        },
        roleButton: {
            flex: 1,
            paddingVertical: getScaleSize(12),
            alignItems: "center",
            borderRadius: 10,
        },
        activeRole: {
            backgroundColor: theme.primary,
        },
        cardRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: getScaleSize(20)
        },
        card: {
            width: getScaleSize(180),
            height: getScaleSize(146),
            backgroundColor: theme._F0F0F0,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        selectedCard: {
            borderWidth: 0.5,
            borderColor: theme._EC613D,
            backgroundColor: theme._FDEFEC,
        },
        icon: {
            width: getScaleSize(56),
            height: getScaleSize(49),
            marginBottom: getScaleSize(10),
        },
        button: {
            marginTop: 'auto',
            marginBottom: getScaleSize(24),
            marginHorizontal: getScaleSize(24),
            backgroundColor: theme.primary,
            paddingVertical: getScaleSize(18),
            borderRadius: getScaleSize(10),
            alignItems: "center",
        },
    });