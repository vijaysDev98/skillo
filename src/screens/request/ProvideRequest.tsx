import React, { useContext } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemeContext, ThemeContextType } from '../../context'
import { Header, Text } from '../../components'
import { FONTS, IMAGES } from '../../assets'
import { getScaleSize } from '../../constant'
import { RecentSearchCard } from '../home/Search'
import { SCREENS } from '..'

const professionalsData = [
    {
        id: 1,
        name: "Bessie Cooper",
        profileImage: IMAGES.dummyUser,
        quoteAmount: "P 300",
        currency: "P",
        canNegotiate: false,
    },
    {
        id: 2,
        name: "Robert Fox",
        profileImage: IMAGES.dummyUser,
        quoteAmount: "P 450",
        currency: "P",
        canNegotiate: true,
    },
];

const ProvideRequest = (props: any) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => props.navigation.goBack()}
                screenName="Quote and Request"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles(theme).scroll}
                contentContainerStyle={styles(theme).content}
            >
                {/* ================= TITLE ================= */}
                <Text
                    font={FONTS.Lato.Bold}
                    size={getScaleSize(20)}
                    color={theme.primaryText}
                    >DIY Service</Text>

                <RecentSearchCard
                    image={IMAGES.furnitureAssemblyImg}
                    title="Furniture Assembly"
                    containerStyle={styles(theme).recentCard}
                />

                {/* ================= JOB PHOTOS ================= */}
                <Text
                    font={FONTS.Lato.Bold}
                    size={getScaleSize(16)}
                    color={theme.primaryText}
                    style={styles(theme).sectionTitle}>Job photos</Text>

                <View style={styles(theme).imageRow}>
                    <Image source={IMAGES.furnitureAssemblyImg} style={styles(theme).image} />
                    <Image source={IMAGES.furnitureAssemblyImg} style={styles(theme).image} />
                </View>

                {/* ================= DETAILS ================= */}
                <Text
                    font={FONTS.Lato.Bold}
                    size={getScaleSize(16)}
                    color={theme.primaryText}
                    style={styles(theme).sectionTitle}>Job Details</Text>

                <View style={styles(theme).detailsContainer}>
                    <View style={styles(theme).detailItem}>
                        <Text
                            font={FONTS.Lato.SemiBold}
                            color={theme._8C8C8C}
                            size={getScaleSize(14)}
                        >Budget</Text>
                        <Text
                            font={FONTS.Lato.Bold}
                            color={theme.primary}
                            size={getScaleSize(16)}
                        >P200 to P500</Text>
                    </View>

                    <View style={styles(theme).verticalDivider} />

                    <View style={styles(theme).detailItem}>
                        <Text
                            font={FONTS.Lato.SemiBold}
                            color={theme._8C8C8C}
                            size={getScaleSize(14)}
                        >Job Date</Text>
                        <Text
                            font={FONTS.Lato.Bold}
                            color={theme.primary}
                            size={getScaleSize(16)}
                        >14 Dec</Text>
                    </View>

                    <View style={styles(theme).verticalDivider} />

                    <View style={styles(theme).detailItem}>
                        <Text
                            font={FONTS.Lato.SemiBold}
                            color={theme._8C8C8C}
                            size={getScaleSize(14)}
                        >Job Time</Text>
                        <Text
                            font={FONTS.Lato.Bold}
                            color={theme.primary}
                            size={getScaleSize(16)}
                        >18:00 Pm</Text>
                    </View>
                </View>

                {/* ================= ADDRESS ================= */}
                <Text
                    font={FONTS.Lato.Bold}
                    size={getScaleSize(16)}
                    color={theme.primaryText}
                    style={styles(theme).sectionTitle}>Address</Text>

                <View style={styles(theme).addressContainer}>
                    <Image source={IMAGES.home_unselected} style={styles(theme).addressIcon} />
                    <Text
                        font={FONTS.Lato.Medium}
                        size={getScaleSize(16)}
                        color={theme._2B2B2B}
                        style={styles(theme).addressText}>
                        Plot 1234, Gaborone West Industrial, Gaborone, Botswana
                    </Text>
                </View>

                {/* ================= REQUEST RECEIVED ================= */}
                <Text
                    font={FONTS.Lato.Bold}
                    size={getScaleSize(16)}
                    color={theme.primaryText}
                    style={styles(theme).sectionTitle}>Request Received</Text>

                {professionalsData.map((item, index) => (
                    <View key={item.id} style={styles(theme).card}>

                        <Text
                            font={FONTS.Lato.SemiBold}
                            size={getScaleSize(16)}
                            color={theme._8C8C8C}
                        >About professional</Text>

                        <View style={styles(theme).profileRow}>
                            <Image source={item.profileImage} style={styles(theme).profileImage} />
                            <Text
                                font={FONTS.Lato.SemiBold}
                                size={getScaleSize(20)}
                                color={theme.primaryText}
                            >{item.name}</Text>
                        </View>

                       {item?.canNegotiate == true ? <> <Text
                            font={FONTS.Lato.Medium}
                            size={getScaleSize(16)}
                            color={theme._404040}
                        >Quote Amount</Text>

                        <View style={styles(theme).quoteBox}>
                            <Text
                                font={FONTS.Lato.SemiBold}
                                size={getScaleSize(18)}
                                color={theme.primaryText}
                            >{item.quoteAmount}</Text>

                            <TouchableOpacity style={styles(theme).negotiateBtn}>
                                <Text

                                    font={FONTS.Lato.SemiBold}
                                    size={getScaleSize(12)}
                                    color={theme.white}
                                >Negotiate</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate(SCREENS.RequestDetails.identifier, {
                                    item,
                                });
                            }}
                            style={styles(theme).detailBtn}
                        >
                            <Text
                                font={FONTS.Lato.SemiBold}
                                size={getScaleSize(12)}
                                color={theme.primary}
                            >
                                View Detail Quote
                            </Text>
                        </TouchableOpacity>
                        </>:
                        <>
                          <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate(SCREENS.RequestDetails.identifier, {
                                    item,
                                });
                            }}
                            style={[styles(theme).detailBtn,{
                                backgroundColor:theme.primary
                            }]}
                        >
                            <Text
                                font={FONTS.Lato.SemiBold}
                                size={getScaleSize(12)}
                                color={theme.white}
                            >
                                View Quote
                            </Text>
                        </TouchableOpacity>
                        </>
                        }
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
export default ProvideRequest


const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme._fafafa,
        },

        scroll: {
            flex: 1,
        },

        content: {
            paddingHorizontal: getScaleSize(24),
            marginTop: getScaleSize(32),
            paddingBottom: getScaleSize(150),
        },

        sectionTitle: {
            marginTop: getScaleSize(24),
        },

        recentCard: {
            marginHorizontal: 0,
            marginTop: getScaleSize(16),
        },

        /* IMAGE */
        imageRow: {
            flexDirection: 'row',
            gap: getScaleSize(16),
            marginTop: getScaleSize(12),
        },

        image: {
            flex: 1,
            height: getScaleSize(144),
            borderRadius: getScaleSize(10),
        },

        /* DETAILS */
        detailsContainer: {
            flexDirection: "row",
            justifyContent: 'space-between',
            borderWidth: 0.5,
            borderColor: theme._D9D9D9,
            borderRadius: getScaleSize(6),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(21),
            marginTop: getScaleSize(16),
            backgroundColor: theme.white,
            elevation: 1,
        },

        detailItem: {
            alignItems: "center",
            gap: getScaleSize(6),
        },

        verticalDivider: {
            width: getScaleSize(1),
            backgroundColor: theme._D6D6D6,
        },

        /* ADDRESS */
        addressContainer: {
            marginTop: getScaleSize(20),
            flexDirection: "row",
            alignItems: "center",
            gap: getScaleSize(12),
            borderWidth: 1,
            borderColor: theme._D9D9D9,
            borderRadius: getScaleSize(10),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(14),
        },

        addressIcon: {
            height: getScaleSize(24),
            width: getScaleSize(24),
            tintColor: theme.primary,
        },

        addressText: {
            flex: 1,
        },

        /* CARD */
        card: {
            backgroundColor: theme.white,
            borderRadius: getScaleSize(10),
            padding: getScaleSize(16),
            marginTop: getScaleSize(16),
            elevation: 2,
        },

        profileRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: getScaleSize(16),
            marginVertical: getScaleSize(16),
        },

        profileImage: {
            height: getScaleSize(56),
            width: getScaleSize(56),
            borderRadius: getScaleSize(50),
        },



        quoteBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme._B3B3B3,
            borderRadius: getScaleSize(10),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(10),
            marginVertical: getScaleSize(8),
        },
        negotiateBtn: {
            backgroundColor: theme.primary,
            borderRadius: getScaleSize(10),
            paddingHorizontal: getScaleSize(24),
            paddingVertical: getScaleSize(10),
        },
        detailBtn: {
            marginTop: getScaleSize(8),
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.primary,
            borderRadius: getScaleSize(10),
            paddingVertical: getScaleSize(10),
        },
    });