import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FONTS, IMAGES } from '../../assets';
import { ThemeContext, ThemeContextType } from '../../context';
import { Button, Header, Text } from '../../components';
import { getScaleSize, useString } from '../../constant';
import JobDetailBox from '../service/ui/JobDetailx';
import { RecentSearchCard } from '../home/Search';
import { SCREENS } from '..';

const ProviderServiceCancel = (props: any) => {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const serviceDetails = props?.route?.params?.serviceDetails ?? {};
  const clientDetails = serviceDetails?.client ?? {};

  const jobTitle = serviceDetails?.service_name ?? 'Office Cleaning';
  const jobDescription = serviceDetails?.job_description ?? 'Washroom Cleaning';
  const budgetRange = serviceDetails?.budget_range ?? 'P200 to P500';
  const jobDate = serviceDetails?.job_date ?? '14 Dec';
  const jobTime = serviceDetails?.job_time ?? '18:00 PM';
  const finalizedAmount = serviceDetails?.finalized_quote_amount ?? '300';
  const platformFee = serviceDetails?.platform_fee ?? '30';
  const totalAmount = serviceDetails?.total ?? '337';
  const clientName = clientDetails?.name ?? 'Jhon Doe';
  const clientAvatar = clientDetails?.avatar ?? IMAGES.dummyUser;

  return (
    <SafeAreaView style={styles(theme).safeArea} edges={['bottom', 'left', 'right']}> 
      <View style={styles(theme).container}>
        <Header
          onBack={() => props.navigation.goBack()}
          screenName={'Service Cancel'}
        />
        <ScrollView
          style={styles(theme).scrolledContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getScaleSize(24) }}>
          <View style={styles(theme).statusContainer}>
              <Image source={IMAGES.confirmed_icon} style={styles(theme).statusIcon} resizeMode="contain" />
          
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              align="center"
              color={theme._404040}>
              {'Your service has been successfully cancelled with the client. Here are the payment and service details.'}
            </Text>
          </View>
          {/* <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.Bold}
            color={theme.primaryText}
            style={styles(theme).sectionTitle}>
            {jobTitle}
          </Text>
          <View style={styles(theme).serviceCard}>
            <Image source={serviceDetails?.image ?? IMAGES.furnitureAssemblyImg} style={styles(theme).serviceImage} resizeMode="cover" />
            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme.primaryText}
              align="center"
              style={styles(theme).serviceSubtitle}>
              {jobDescription}
            </Text>
          </View> */}
           <Text
                    size={getScaleSize(20)}
                    color={theme.primaryText}
                    font={FONTS.Lato.Bold}
                  >
                    {"Office Cleaning"}
                  </Text>
                  <RecentSearchCard
                    onPress={() => { }}
                    containerStyle={styles(theme).recentCard}
                    image={IMAGES.furnitureAssemblyImg}
                    title={"Furniture Assembly"}
                  />
           <JobDetailBox
        isTitle={true}
          jobBudgetValue='P200 to P500'
          jobDate='14 Dec'
          jobTime='18:00 Pm'
        />

          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}
            style={styles(theme).subHeading}>
            {STRING?.payment_breakdown ?? 'Payment Breakdown'}
          </Text>
          <View style={styles(theme).paymentCard}>
            <PaymentRow label={STRING?.FinalizedQuoteAmount ?? 'Finalized Quote Amount'} value={`P${finalizedAmount}`} />
            <PaymentRow label={STRING?.Platform_Fee_15 ?? 'Platform Fee (10%)'} value={`P${platformFee}`} />
            <View style={styles(theme).dotView} />
            <PaymentRow label={STRING?.Total ?? 'Total'} value={`P${totalAmount}`} isTotal />
          </View>

          {/* <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}
            style={styles(theme).subHeading}>
            {STRING?.Aboutclient ?? 'About Client'}
          </Text>
          <View style={styles(theme).clientCard}>
            <View style={styles(theme).clientInfo}>
              <Image source={clientAvatar} style={styles(theme).clientAvatar} />
              <Text
                size={getScaleSize(18)}
                font={FONTS.Lato.SemiBold}
                color={theme.primaryText}>
                {clientName}
              </Text>
            </View>
            <Button
              style={styles(theme).chatButton}
              title={STRING?.Chat ?? 'Chat'}
              onPress={() => { }}
              buttonTitleSize={getScaleSize(16)}
            />
          </View> */}

          <View style={styles(theme).clientContainer}>
                    <Text
                      size={getScaleSize(16)}
                      font={FONTS.Lato.SemiBold}
                      color={theme._8C8C8C}
                    >{"About Client"}</Text>
                    <View style={styles(theme).clientRow}>
                      <View style={styles(theme).clientInfoRow}>
                        <Image
                          source={IMAGES.dummyUser}
                          style={styles(theme).clientAvatar}
                        />
                        <Text
                          size={getScaleSize(20)}
                          font={FONTS.Lato.SemiBold}
                          color={theme.primaryText}
                        >{"Jhon Doe"}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate(SCREENS.ChatDetails.identifier, {
                            conversationId: "12",
                            peerUser: {
                              user_id: "12",
                              name: "Joe",
                              email: "Joe@yopmail.com",
                              avatarUrl: "https://via.placeholder.com/150",
                            },
                          });
                        }}
                        style={styles(theme).clientChatButton}>
                        <Text
                          size={getScaleSize(12)}
                          font={FONTS.Lato.SemiBold}
                          color={theme.white}
                        >{"Chat"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
        </ScrollView>
        <View style={styles(theme).ctaContainer}>
        <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate(SCREENS.ChatDetails.identifier, {
                            conversationId: "12",
                            peerUser: {
                              user_id: "12",
                              name: "Joe",
                              email: "Joe@yopmail.com",
                              avatarUrl: "https://via.placeholder.com/150",
                            },
                          });
                        }}
                        style={{paddingVertical:getScaleSize(14),backgroundColor:theme.primary,alignItems:'center',borderRadius:getScaleSize(10)}}>
                        <Text
                          size={getScaleSize(20)}
                          font={FONTS.Lato.SemiBold}
                          color={theme.white}
                        >{"Track Service"}</Text>
                      </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const PaymentRow = ({ label, value, isTotal = false }: { label: string; value: string; isTotal?: boolean; }) => {
  const { theme } = useContext<any>(ThemeContext);
  return (
    <View style={styles(theme).paymentRow}>
      <Text
        size={isTotal ? getScaleSize(18) : getScaleSize(14)}
        font={isTotal ? FONTS.Lato.SemiBold : FONTS.Lato.Medium}
        color={isTotal ? theme.primaryText : theme._8C8C8C}>
        {label}
      </Text>
      <Text
        size={isTotal ? getScaleSize(18) : getScaleSize(14)}
        font={FONTS.Lato.SemiBold}
        color={isTotal ? theme.primary : theme._404040}>
        {value}
      </Text>
    </View>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.white },
    container: { flex: 1, backgroundColor: theme.white },
    scrolledContainer: {
      marginTop: getScaleSize(16),
      marginHorizontal: getScaleSize(24),
    },
    statusContainer: {
      alignItems: 'center',
      gap: getScaleSize(12),
      marginBottom: getScaleSize(12),
    },
    statusIconWrapper: {
      height: getScaleSize(72),
      width: getScaleSize(72),
      borderRadius: getScaleSize(36),
      backgroundColor: '#E8F8EF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusIcon: {
      height: getScaleSize(58),
      width: getScaleSize(58),
    },
    recentCard: {
      marginHorizontal: 0,
      marginTop: getScaleSize(16),
      elevation: 1,
    },
    sectionTitle: {
      marginTop: getScaleSize(12),
      marginBottom: getScaleSize(12),
    },
    serviceCard: {
      borderRadius: getScaleSize(12),
      overflow: 'hidden',
      backgroundColor: theme._F0F0F0,
      elevation: 2,
    },
    serviceImage: {
      height: getScaleSize(180),
      width: '100%',
    },
    serviceSubtitle: {
      paddingVertical: getScaleSize(12),
      backgroundColor: theme.white,
    },
    subHeading: {
      marginTop: getScaleSize(20),
      marginBottom: getScaleSize(12),
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(10),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(18),
      backgroundColor: theme.white,
      elevation: 2,
    },
    verticalDivider: {
      width: getScaleSize(1),
      backgroundColor: theme._D6D6D6,
    },
    detailItem: {
      flex: 1,
      alignItems: 'center',
      gap: getScaleSize(6),
    },
    paymentCard: {
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(12),
      padding: getScaleSize(16),
      backgroundColor: theme.white,
      gap: getScaleSize(12),
      elevation: 2,
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dotView: {
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: theme._D9D9D9,
    },
    clientCard: {
      borderWidth: 1,
      borderColor: theme._E6E6E6,
      borderRadius: getScaleSize(12),
      padding: getScaleSize(16),
      backgroundColor: theme.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
    },
    clientInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getScaleSize(12),
    },
    chatButton: {
      paddingHorizontal: getScaleSize(18),
      paddingVertical: getScaleSize(10),
      borderRadius: getScaleSize(10),
      backgroundColor: '#FFF3E9',
    },
    ctaContainer: {
      paddingHorizontal: getScaleSize(24),
      paddingBottom: getScaleSize(12),
      paddingTop: getScaleSize(8),
      backgroundColor: theme.white,
    },
    clientContainer: {
      padding: getScaleSize(16),
      borderRadius: getScaleSize(10),
      borderWidth: 1,
      borderColor: theme._E6E6E6,
      marginTop: getScaleSize(24),
    },
    clientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getScaleSize(16),
      marginTop: getScaleSize(16),
      justifyContent: 'space-between'
    },
    clientInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getScaleSize(12),
    },
    clientChatButton: {
      width: getScaleSize(77),
      paddingVertical: getScaleSize(10),
      borderRadius: getScaleSize(10),
      backgroundColor: theme.primary,
      alignItems: 'center',
    },
    clientAvatar: {
      height: getScaleSize(48),
      width: getScaleSize(48),
      borderRadius: getScaleSize(24),
      borderWidth: 0.5,
      borderColor: theme._B3B3B3,
    },
  });

export default ProviderServiceCancel;