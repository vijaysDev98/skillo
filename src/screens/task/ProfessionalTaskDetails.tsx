import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { arrayIcons, DummyData, getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import { Header, ProgressView, StatusItem, Text } from '../../components';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import { SCREENS } from '..';
import { API } from '../../api';
import moment from 'moment';
import Video from 'react-native-video';
import { buildThreadId } from '../../services/chat';
import { RecentSearchCard } from '../home/Search';
import JobDetailBox from '../service/ui/JobDetailx';


export default function ProfessionalTaskDetails(props: any) {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const item = props?.route?.params?.item ?? {};
  const serviceId = props?.route?.params?.serviceId ?? '';
  const { profile } = useContext<any>(AuthContext);
  const [isStatus, setIsStatus] = useState(false);
  const [visibleTaskDetails, setVisibleTaskDetails] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState<any>({});
  const [attachments, setAttachments] = useState<any>([]);

  // useEffect(() => {
  //   if (item) {
  //     getServiceDetails();
  //   }
  // }, []);

  // function getItemUrl() {
  //   if (item?.status === 'send') {
  //     return '/quotes'
  //   } else if (item?.status === 'accepted') {
  //     return '/accepted'
  //   } else if (item?.status === 'completed') {
  //     return '/completed'
  //   }
  // }

  async function getServiceDetails() {
    try {
      setLoading(true);
      const result = await API.Instance.get(
        API.API_ROUTES.getTsakDetails +
        `/quotes/${serviceId ? serviceId : item?.service_request_id}`,
      );
      if (result.status) {
        setTaskDetails(result?.data?.data ?? {});
        setAttachments(normalizeAttachments(result?.data?.data?.task));
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme.white);
        StatusBar.setBarStyle('dark-content');
      }
    }, []),
  );

  const normalizeAttachments = (data: any) => {
    const photos = (data?.supporting_photos || []).map((url: any) => ({
      id: url,
      type: 'photo',
      url,
    }));

    const videos = (data?.supporting_videos || []).map((url: any) => ({
      id: url,
      type: 'video',
      url,
    }));

    return [...photos, ...videos];
  };

  const AttachmentItem = ({ item }: any) => {
    switch (item.type) {
      case 'photo':
        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(SCREENS.WebViewScreen.identifier, {
                url: item?.url ?? '',
              });
            }}>
            <Image
              style={[styles(theme).photosView]}
              // source={{ uri: item?.url ?? '' }}
              source={item?.url}
            />
          </TouchableOpacity>
        );

      case 'video':
        return (
          <View style={styles(theme).photosView}>
            <Video
              source={{ uri: item.url }}
              resizeMode="cover"
              pointerEvents="none"
              controls
              paused={false}
              fullscreen={false}
              playInBackground={false}
              playWhenInactive={false}
              style={styles(theme).videoPreview}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const statusData = item?.tab == "accepted" ? DummyData?.taskDetailsOngoingDummyData.task_status : DummyData.taskDetailsDummyData?.task_status

  return (
    <View style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.TaskDetails}
      />
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
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
          jobBudgetValue={"P100 to P500"}
          jobDate={"2025-10-15"}
          jobTime={"10:00 AM"}
        />
        {item?.tab === 'accepted' && (
          <>
            <Text
              style={styles(theme).finalQuoteLabel}
              size={getScaleSize(16)}
              font={FONTS.Lato.SemiBold}
              color={theme.primaryText}

            >
              {"Final Quote Amount"}
            </Text>

            <View style={styles(theme).amountContainer}>

              <Text
                size={getScaleSize(18)}
                font={FONTS.Lato.SemiBold}
                color={theme.primaryText}>
                {`P${taskDetails?.quote?.amount ?? 0}`}
              </Text>
            </View>
          </>
        )}

        {item?.tab === 'accepted' && (
          <View style={styles(theme).securityContainer}>
            <Text
              style={styles(theme).flexFill}
              size={getScaleSize(18)}
              font={FONTS.Lato.Medium}
              color={theme._323232}>
              {STRING.SecurityCode}
            </Text>
            <View style={styles(theme).codeViewDirection}>
              {taskDetails?.task?.displayed_service_code
                ?.toString()
                ?.split('')
                ?.map((digit: string, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles(theme).securityItemContainer,
                      index !== 0 && styles(theme).securityItemSpacing,
                    ]}>
                    <Text
                      size={getScaleSize(18)}
                      font={FONTS.Lato.Medium}
                      color={theme._323232}>
                      {digit}
                    </Text>
                  </View>
                ))}
            </View>
            <Text
              style={styles(theme).securityNote}
              size={getScaleSize(11)}
              font={FONTS.Lato.Regular}
              color={theme._8C8C8C}>
              {STRING.security_note}
            </Text>
          </View>
        )}

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
        {item?.tab === 'accepted' && (
          <>
            <Text
              style={styles(theme).addressLabel}
              size={getScaleSize(16)}
              font={FONTS.Lato.SemiBold}
              color={theme._404040}
            >{"Address"}</Text>
            <View style={styles(theme).addressBox}>
              <Image
                source={IMAGES.homeIcon}
                style={styles(theme).addressIcon}
              />
              <Text
                size={getScaleSize(16)}
                font={FONTS.Lato.Medium}
                color={theme._2B2B2B}
              >{"Plot 1234, Gaborone West Industrial, Gaborone, Botswana"}</Text>
            </View>
          </>
        )}

        {item?.tab === 'accepted' && (
          <>
            <Text
              style={styles(theme).paymentTitle}
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={theme._323232}
            >
              {"Payment Breakdown"}
            </Text>

            <View style={styles(theme).informationContainer}>

              <View style={styles(theme).newHorizontalView}>
                <Text
                  style={styles(theme).flexFill}
                  size={getScaleSize(14)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._8C8C8C}>
                  {STRING.FinalizedQuoteAmount}
                </Text>
                <Text
                  size={getScaleSize(14)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._404040}>
                  {`P${taskDetails?.quote?.amount ?? 0}`}
                </Text>
              </View>
              <View style={styles(theme).newHorizontalView}>
                <Text
                  style={styles(theme).flexFill}
                  size={getScaleSize(14)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._8C8C8C}>
                  {`${STRING.PlatformFee} (${taskDetails?.quote?.platform_fee_percentage ?? 0}%)`}
                </Text>
                <Text
                  size={getScaleSize(14)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._404040}>
                  {`P${taskDetails?.quote?.platform_fee ?? 0}`}
                </Text>
              </View>
              <View style={styles(theme).dotView} />
              <View style={styles(theme).newHorizontalView}>
                <Text
                  style={styles(theme).flexFill}
                  size={getScaleSize(20)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._primaryText}>
                  {STRING.Total}
                </Text>
                <Text
                  size={getScaleSize(20)}
                  font={FONTS.Lato.SemiBold}
                  color={theme.primary}>
                  {`P${taskDetails?.quote?.total ?? 0}`}
                </Text>
              </View>
            </View>
          </>
        )}


        <TouchableOpacity
          style={styles(theme).profileContainer}
          activeOpacity={1}
          onPress={() => {
            setIsStatus(!isStatus);
          }}>
          <Text
            style={styles(theme).flexFill}
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={theme._8C8C8C}>
            {"Task Status"}
          </Text>
          <Image
            style={styles(theme).accordionArrow}
            source={isStatus ? IMAGES.up : IMAGES.down}
          />

        </TouchableOpacity>
        {
          isStatus && (
            <View style={styles(theme).statusContainer}>
              {statusData.map(
                (item: any, index: number) => (
                  <StatusItem
                    statusItemContainer={styles(theme).statusItemSpacing}
                    key={index}
                    item={item}
                    index={index}
                    isLast={
                      index === taskDetails?.task_lifecycle?.length - 1
                    }
                  />
                ),
              )}
            </View>
          )
        }

        <TouchableOpacity
          style={styles(theme).profileContainer}
          activeOpacity={1}
          onPress={() => {
            setVisibleTaskDetails(!visibleTaskDetails);
          }}>
          <Text
            style={styles(theme).flexFill}
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={theme._8C8C8C}>
            {"Task Details"}
          </Text>
          <Image
            style={styles(theme).accordionArrow}
            source={isStatus ? IMAGES.up : IMAGES.down}
          />

        </TouchableOpacity>
        {visibleTaskDetails && (
          <View style={styles(theme).taskDetailsCard}>
            <Text
              style={styles(theme).flexFill}
              size={getScaleSize(18)}
              font={FONTS.Lato.SemiBold}
              color={'#424242'}>
              {STRING.Servicedescription}
            </Text>
            <Text
              style={styles(theme).taskDescription}
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme._404040}>
              {/* {taskDetails?.task?.description ?? '-'} */}
              {DummyData.taskDetailsDummyData?.description ?? '-'}
            </Text>
            {
              DummyData?.taskDetailsDummyData?.job_photos.length > 0 && (
                <>
                  <Text
                    style={styles(theme).jobPhotosLabel}
                    size={getScaleSize(18)}
                    font={FONTS.Lato.SemiBold}
                    color={'#424242'}>
                    {STRING.Jobphotos}
                  </Text>
                  <FlatList
                    data={DummyData?.taskDetailsDummyData?.job_photos ?? []}
                    numColumns={2}
                    columnWrapperStyle={styles(theme).jobPhotosWrapper}
                    contentContainerStyle={styles(theme).jobPhotosContent}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <AttachmentItem item={item} />}
                  />
                </>
              )}
          </View>
        )}

        <View style={styles(theme).spacerLarge} />
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
    },
    recentCard: {
      marginHorizontal: 0,
      marginTop: getScaleSize(16),
      elevation: 1,
    },
    flexFill: {
      flex: 1,
    },
    imageContainer: {
      paddingVertical: getScaleSize(12),
      paddingHorizontal: getScaleSize(12),
      borderRadius: getScaleSize(20),
      backgroundColor: '#EAF0F3',
    },
    imageView: {
      height: getScaleSize(172),
      borderRadius: getScaleSize(20),
      flex: 1.0,
    },
    informationView: {
      paddingVertical: getScaleSize(16),
      backgroundColor: theme.white,
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
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
    amountContainer: {
      // marginTop: getScaleSize(32),
      paddingVertical: getScaleSize(15),
      borderWidth: 1,
      borderColor: theme._B3B3B3,
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
    },
    negociateButton: {
      paddingVertical: getScaleSize(10),
      paddingHorizontal: getScaleSize(20),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getScaleSize(8),
      backgroundColor: theme.primary,
    },
    profileContainer: {
      borderColor: theme._D9D9D9,
      paddingVertical: getScaleSize(17),
      paddingHorizontal: getScaleSize(16),
      borderWidth: 1,
      borderRadius: getScaleSize(16),
      marginTop: getScaleSize(24),
      flexDirection: 'row'
    },
    likeIcon: {
      height: getScaleSize(28),
      width: getScaleSize(28),
      alignSelf: 'center',
    },
    profilePicView: {
      height: getScaleSize(56),
      width: getScaleSize(56),
      borderRadius: getScaleSize(28),
    },
    newButton: {
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(8),
      paddingHorizontal: getScaleSize(28),
      paddingVertical: getScaleSize(10),
    },
    serviceDescriptionView: {
      marginTop: getScaleSize(12),
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    imageUploadContent: {
      marginTop: getScaleSize(12),
      flexDirection: 'row',
    },
    uploadButton: {
      flex: 1.0,
      borderWidth: 1,
      borderColor: theme._818285,
      borderStyle: 'dashed',
      borderRadius: getScaleSize(8),
      justifyContent: 'center',
      alignItems: 'center',
      height: getScaleSize(160),
    },
    attachmentIcon: {
      height: getScaleSize(40),
      width: getScaleSize(40),
      alignSelf: 'center',
    },
    photosView: {
      height: getScaleSize(144),
      width: (Dimensions.get('window').width - getScaleSize(110)) / 2,
      borderRadius: getScaleSize(8),
      overflow: 'hidden',
      backgroundColor: theme._EAF0F3,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
      marginBottom: getScaleSize(17),
    },
    backButtonContainer: {
      flex: 1.0,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(18),
      backgroundColor: theme.white,
      marginRight: getScaleSize(8),
    },
    nextButtonContainer: {
      flex: 1.0,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: getScaleSize(12),
      paddingVertical: getScaleSize(18),
      backgroundColor: theme.primary,
      marginLeft: getScaleSize(8),
    },
    securityItemContainer: {
      paddingVertical: getScaleSize(5),
      paddingHorizontal: getScaleSize(10),
      borderRadius: getScaleSize(12),
      borderColor: '#D5D5D5',
      borderWidth: 1,
      marginTop: getScaleSize(16),
    },
    devider: {
      backgroundColor: '#E6E6E6',
      height: 1,
      marginTop: getScaleSize(18),
    },
    dotView: {
      // flex:1.0,
      borderStyle: 'dashed',
      borderColor: theme._D9D9D9,
      borderWidth: 1,
      marginVertical: getScaleSize(16),
    },
    informationContainer: {
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(12),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(13),
    },
    newHorizontalView: {
      flexDirection: 'row',
      marginTop: getScaleSize(8),
    },
    codeViewDirection: {
      flexDirection: 'row',
      marginTop: getScaleSize(16),
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
    addressLabel: {
      marginTop: getScaleSize(24),
      marginBottom: getScaleSize(8),
    },
    addressBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(14),
      borderRadius: getScaleSize(10),
      gap: getScaleSize(14),
    },
    addressIcon: {
      height: getScaleSize(30),
      width: getScaleSize(24),
    },
    paymentTitle: {
      marginTop: getScaleSize(24),
      marginBottom: getScaleSize(16),
    },
    accordionArrow: {
      height: getScaleSize(25),
      width: getScaleSize(24),
      tintColor: theme._8C8C8C,
    },
    statusContainer: {
      backgroundColor: theme.white,
      padding: getScaleSize(20),
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(10),
      marginTop: getScaleSize(8),
    },
    statusItemSpacing: {
      marginVertical: getScaleSize(20),
    },
    taskDetailsCard: {
      backgroundColor: theme.white,
      padding: getScaleSize(20),
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(10),
      marginTop: getScaleSize(8),
    },
    taskDescription: {
      flex: 1,
      marginTop: getScaleSize(16),
    },
    jobPhotosLabel: {
      flex: 1,
      marginTop: getScaleSize(40),
      marginBottom: getScaleSize(20),
    },
    jobPhotosWrapper: {
      gap: getScaleSize(12),
    },
    jobPhotosContent: {
      gap: getScaleSize(12),
    },
    spacerLarge: {
      height: getScaleSize(100),
    },
    videoPreview: {
      width: '100%',
      height: '100%',
    },
    securityItemSpacing: {
      marginLeft: getScaleSize(3),
    },
    finalQuoteLabel: {
      marginTop: getScaleSize(24),
      marginBottom: getScaleSize(16),
    },
    securityContainer: {
      marginTop: getScaleSize(24),
      paddingVertical: getScaleSize(13),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(16),
    },
    securityListContent: {
      gap: getScaleSize(6),
    },
    securityNote: {
      flex: 1,
      marginTop: getScaleSize(12),
    },
  });
