import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
    Button,
    Header,
    ProgressView,
    Text,
} from '../../components';
import { API } from '../../api';
import moment from 'moment';
import { RecentSearchCard } from '../home/Search';

export const arrayIcons = {
    pets: IMAGES.pets,
    homecare: IMAGES.homecare,
    housekeeping: IMAGES.housekeeping,
    childcare: IMAGES.childcare,
    diy: IMAGES.diy,
    transport: IMAGES.transportIcon,
    'personal care': IMAGES.personalCareIcon,
    'tech support': IMAGES.it,
    gardening: IMAGES.gardening,
};

export default function ServiceCancelled(props: any) {
    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);

    const item = props?.route?.params?.item ?? {};
    const serviceItem = props?.route?.params?.serviceItem ?? {};

    console.log('ITEM==>', JSON.stringify(item))

    const [isLoading, setLoading] = useState(false);
    // async function cancelService(serviceId: any) {
    //     try {
    //         setLoading(true);
    //         const result = await API.Instance.post(API.API_ROUTES.onCancelService + `/${serviceId}`);
    //         if (result.status) {
    //             SHOW_TOAST(result?.data?.message ?? '', 'success')
    //             // props?.navigation.navigate(SCREENS.ServiceCancelled.identifier, {
    //             //     item: result?.data?.data
    //             // });
    //         } else {
    //             SHOW_TOAST(result?.data?.message ?? '', 'error')
    //         }
    //     } catch (error: any) {
    //         SHOW_TOAST(error?.message ?? '', 'error');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.service_cancelled}
            />
            <ScrollView
                contentContainerStyle={styles(theme).scrolledContainer}
                showsVerticalScrollIndicator={false}>
                {/* <Image style={styles(theme).doneIcon} source={IMAGES.serviceCancelledIcon} />
                <Text
                    style={{ marginTop: getScaleSize(24) }}
                    size={getScaleSize(19)}
                    align="center"
                    font={FONTS.Lato.Medium}
                    color={theme._424242}>
                    {STRING.service_cancelled_message}
                </Text> */}
                 <Image style={styles(theme).doneIcon} source={IMAGES.confirmed_icon} />
                        <Text
                          style={{ marginVertical: getScaleSize(24) }}
                          size={getScaleSize(16)}
                          align="center"
                          font={FONTS.Lato.Medium}
                          color={theme._404040}>
                         {STRING.service_cancelled_message}
                        </Text>
                {/* <View style={styles(theme).informationContainer}>
                    <Text
                        style={{}}
                        size={getScaleSize(16)}
                        font={FONTS.Lato.Bold}
                        color={theme.primary}>
                        {serviceItem?.sub_category_name ?? ''}
                    </Text>
                    <View style={styles(theme).informationView}>
                        <View style={styles(theme).horizontalView}>
                            <View style={styles(theme).itemView}>
                                <Image
                                    style={styles(theme).informationIcon}
                                    source={IMAGES.calender}
                                />
                                <Text
                                    style={{
                                        marginHorizontal: getScaleSize(8),
                                        alignSelf: 'center',
                                    }}
                                    size={getScaleSize(12)}
                                    font={FONTS.Lato.Medium}
                                    color={theme.primary}>
                                    {serviceItem?.chosen_datetime
                                        ? moment.utc(serviceItem?.chosen_datetime).local().format(
                                            'DD MMM, YYYY',
                                        )
                                        : '-'}
                                </Text>
                            </View>
                            <View style={styles(theme).itemView}>
                                <Image
                                    style={styles(theme).informationIcon}
                                    source={IMAGES.clock}
                                />
                                <Text
                                    style={{
                                        marginHorizontal: getScaleSize(8),
                                        alignSelf: 'center',
                                    }}
                                    size={getScaleSize(12)}
                                    font={FONTS.Lato.Medium}
                                    color={theme.primary}>
                                    {serviceItem?.chosen_datetime
                                        ? moment.utc(serviceItem?.chosen_datetime).local().format('hh:mm A')
                                        : '-'}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles(theme).horizontalView,
                                { marginTop: getScaleSize(12) },
                            ]}>
                            <View style={styles(theme).itemView}>
                                {serviceItem?.category_name ? (
                                    <Image
                                        style={[
                                            styles(theme).informationIcon,
                                            { tintColor: theme._1A3D51 },
                                        ]}
                                        source={
                                            arrayIcons[
                                            serviceItem?.category_name?.toLowerCase() as keyof typeof arrayIcons
                                            ] ?? (arrayIcons['diy'] as any)
                                        }
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={[styles(theme).informationIcon]} />
                                )}
                                <Text
                                    style={{
                                        marginHorizontal: getScaleSize(8),
                                        alignSelf: 'center',
                                    }}
                                    size={getScaleSize(12)}
                                    font={FONTS.Lato.Medium}
                                    color={theme.primary}>
                                    {serviceItem?.category_name ?? ''}
                                </Text>
                            </View>
                            <View style={styles(theme).itemView}>
                                <Image
                                    style={styles(theme).informationIcon}
                                    source={IMAGES.pin}
                                />
                                <Text
                                    style={{
                                        marginHorizontal: getScaleSize(8),
                                        alignSelf: 'center',
                                    }}
                                    size={getScaleSize(12)}
                                    numberOfLines={4}
                                    font={FONTS.Lato.Medium}
                                    color={theme.primary}>
                                    {serviceItem?.service_address ?? '-'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> */}

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

                             <Text
                                      font={FONTS.Lato.SemiBold}
                                      color={theme.primaryText}
                                      size={getScaleSize(16)}
                                      style={{ marginTop: getScaleSize(16) }}
                                    >
                                      {"Payment Breakdown"}
                                    </Text>
                                    <View style={styles(theme).informationContainer}>
                                      <View style={styles(theme).newhorizontalView}>
                                        <Text
                                          style={{ flex: 1.0 }}
                                          size={getScaleSize(14)}
                                          font={FONTS.Lato.SemiBold}
                                          color={theme._8C8C8C}>
                                          {STRING.FinalizedQuoteAmount}
                                        </Text>
                                        <Text
                                          size={getScaleSize(14)}
                                          font={FONTS.Lato.SemiBold}
                                          color={theme._404040}>
                                          {/* {`P${paymentDetails?.finalize_quote_amount ?? 0}`} */}
                                          {`P${item?.payment_breakdown?.total_amount ?? '0'}`}
                                        </Text>
                                      </View>
                                      <View style={styles(theme).newhorizontalView}>
                                        <Text
                                          style={{ flex: 1.0 }}
                                          size={getScaleSize(14)}
                                          font={FONTS.Lato.SemiBold}
                                          color={theme._8C8C8C}>
                                          {`${STRING.PlatformFee} (10%)`}
                                        </Text>
                                        <Text
                                          size={getScaleSize(14)}
                                          font={FONTS.Lato.SemiBold}
                                          color={theme._404040}>
                                          {`P${item?.payment_breakdown?.service_fee ?? '0'}`}
                                        </Text>
                                      </View>
                                      {/* <View style={styles(theme).newhorizontalView}>
                                        <Text
                                          style={{ flex: 1.0 }}
                                          size={getScaleSize(14)}
                                          font={FONTS.Lato.SemiBold}
                                          color={'#595959'}>
                                          {STRING.Taxes}
                                        </Text>
                                        <Text
                                          size={getScaleSize(14)}
                                          font={FONTS.Lato.SemiBold}
                                          color={'#595959'}>
                                          {`€${paymentDetails?.tax ?? 0}`}
                                        </Text>
                                      </View> */}
                                      <View style={styles(theme).dotView} />
                                      <View style={styles(theme).newhorizontalView}>
                                        <Text
                                          style={{ flex: 1.0 }}
                                          size={getScaleSize(18)}
                                          font={FONTS.Lato.Bold}
                                          color={theme.primaryText}>
                                          {STRING.Total}
                                        </Text>
                                        <Text
                                          size={getScaleSize(20)}
                                          font={FONTS.Lato.SemiBold}
                                          color={theme.primary}>
                                          {`P${item?.payment_breakdown?.total_refund ?? '0'}`}
                                        </Text>
                                      </View>
                                    </View>

               <View style={styles(theme).aboutContainer}>
                         <Text
                           style={{}}
                           size={getScaleSize(16)}
                           font={FONTS.Lato.SemiBold}
                           color={theme._8C8C8C}>
                           {STRING.Aboutprofessional}
                         </Text>
                         <View
                           style={[
                             styles(theme).horizontalView,
                           ]}>
                           {/* {paymentDetails?.provider_profile_url ? */}
                             <Image
                               style={styles(theme).profilePicView}
                            //    source={{ uri: paymentDetails?.provider_profile_url }}
                            source={IMAGES.dummyProfile}
                             />
                             {/* :
                             <Image
                               style={styles(theme).profilePicView}
                               source={IMAGES.user_placeholder}
                             />
                           } */}
                           <View style={{ flex: 1.0, }}>
                             <View style={[styles(theme).flexRow, { flex: 1.0, maxWidth: '85%' }]}>
                               <Text
                                 style={{ alignSelf: 'center', }}
                                 size={getScaleSize(18)}
                                 numberOfLines={1}
                                 font={FONTS.Lato.SemiBold}
                                 color={theme.primaryText}>
                                 {
                                //  paymentDetails?.provider_name ?? 
                                 'Wade Warren'
                                 }
                               </Text>
                               
                             </View>
                             <View style={[styles(theme).flexRow, { marginTop: getScaleSize(4) }]}>
                               <Image source={IMAGES.ic_phone} style={styles(theme).phoneIcon} />
                               <Text
                                 style={{}}
                                 size={getScaleSize(12)}
                                 font={FONTS.Lato.SemiBold}
                                 color={theme._8C8C8C}>
                                 {
                                //  paymentDetails?.provider_phone ?? 
                                 '+91751111111'
                                 }
                               </Text>
                             </View>
                           </View>
                           <Pressable
                             style={[styles(theme).newButton, { marginLeft: getScaleSize(6) }]}
                             onPress={() => {
                               props.navigation.goBack();
                             }}>
                             <Text
                               size={getScaleSize(12)}
                               font={FONTS.Lato.Medium}
                               color={theme.white}>
                               {STRING.ViewProfile}
                             </Text>
                           </Pressable>
                         </View>
                       </View>
                {/* <Text
                    style={{ marginTop: getScaleSize(20) }}
                    size={getScaleSize(12)}
                    font={FONTS.Lato.Regular}
                    color={theme._555555}>
                    {STRING.cancelled_message + ` ${item?.payment_breakdown?.deduction_percentage ?? '0'}% ` + STRING.cancellation_message_2}
                </Text>
                <View style={{ height: getScaleSize(32) }}></View> */}

            </ScrollView>
            {isLoading && <ProgressView />}
        </View>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.white },
        scrolledContainer: {
            marginTop: getScaleSize(19),
            marginHorizontal: getScaleSize(24),
            paddingBottom:getScaleSize(50)
        },
        doneIcon: {
            height: getScaleSize(60),
            width: getScaleSize(60),
            alignSelf: 'center',
            resizeMode: 'contain',
        },
        informationContainer: {
            marginTop: getScaleSize(20),
            borderWidth: 1,
            borderColor: '#D5D5D5',
            borderRadius: getScaleSize(16),
            paddingHorizontal: getScaleSize(16),
            paddingVertical: getScaleSize(20),
        },
        informationView: {
            paddingVertical: getScaleSize(16),
            backgroundColor: '#EAF0F3',
            borderRadius: getScaleSize(16),
            paddingHorizontal: getScaleSize(16),
            marginTop: getScaleSize(16),
        },
        horizontalView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemView: {
            flexDirection: 'row',
            flex: 1.0,
        },
        informationIcon: {
            height: getScaleSize(25),
            width: getScaleSize(25),
            alignSelf: 'center',
        },
        dotView: {
            // flex:1.0,
            borderStyle: 'dashed',
            borderColor: theme._8C8C8C,
            borderWidth: 1,
            marginTop: getScaleSize(8),
        },
        newhorizontalView: {
            flexDirection: 'row',
            marginTop: getScaleSize(16),
        },
        newButton: {
            // flex: 1.0,
            backgroundColor: theme.primary,
            borderRadius: 8,
            height: getScaleSize(38),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: getScaleSize(24),
        },
        flexRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        recentCard: {
            marginHorizontal: 0,
            marginTop: getScaleSize(16),
        },
        sectionTitle: {
      marginTop: getScaleSize(24),
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
     aboutContainer: {
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(13),
      backgroundColor: theme.white,
      borderRadius: getScaleSize(16),
      marginTop: getScaleSize(16),
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      gap: getScaleSize(16)
    },
    profilePicView: {
      height: getScaleSize(56),
      width: getScaleSize(56),
      borderRadius: getScaleSize(28),
      marginRight: getScaleSize(12)
    },
     phoneIcon: {
      height: getScaleSize(20),
      width: getScaleSize(20),
      marginRight: getScaleSize(6),
    },
    });

