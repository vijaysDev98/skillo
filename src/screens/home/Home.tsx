import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { AuthContext, ThemeContext, ThemeContextType } from '../../context';
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';
import {
  Text,
  HomeHeader,
  RequestItem,
  FavouritesItem,
  ProgressView,
  Button,
} from '../../components';
import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import { SCREENS, TABS } from '..';
import { API } from '../../api';
import { userRoles } from '../../constant/utils';
import SubscriptionSuccessModal from '../../components/SubcriptionSuccessModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSeekerHomeService, getServiceCategoryData } from '../../actions/seekerHome/seekerHomeAction';
import NavigationService from '../NavigationService';

export default function Home(props: any) {
  const STRING = useString();
  const dispatch = useAppDispatch();
  const { theme } = useContext<any>(ThemeContext);

  const { userType } = useContext<any>(AuthContext);
  const {userData}=useAppSelector(state => state?.auth)
  const { services = {} as any, serviceCategoryData, isLoading, serviceCategoryList = [] } = useAppSelector((state: any) => state.seekerHome)

  const {fromFromSubscription,userRole} = props.route?.params || {};

  const acceptRef = useRef<any>(null);

  const [allServices, setAllServices] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [favoriteProfessionals, setFavoriteProfessionals] = useState([]);
  const [professionalConnectedCount, setProfessionalConnectedCount] =
    useState(0);
    const [subscriptionSuccessModalVisible,setSubscriptionSuccessModalVisible] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          StatusBar.setBackgroundColor(theme.primary);
          StatusBar.setBarStyle('light-content');
        }, 600);
      }
    }, []),
  );

  useEffect(() => {
    if (fromFromSubscription && userRole === userRoles.Service_Seeker_business) {
      setSubscriptionSuccessModalVisible(true);
    }
  }, [fromFromSubscription, userRole]);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     getHomeData();
  //     getFavoriteProfessionals();
  //     getAllRequests();
  //   }
  // }, [isFocused]);

  useEffect(()=>{
    dispatch(getServiceCategoryData())
  },[isFocused])

  async function getHomeData() {
    try {
      setLoading(true);
      const result = await API.Instance.get(API.API_ROUTES.getHomeData);
      if (result.status) {
        setProfessionalConnectedCount(
          result?.data?.data?.professional_connected_count,
        );
        setAllServices(result?.data?.data?.services);
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function getFavoriteProfessionals() {
    try {
      setLoading(true);
      const result = await API.Instance.get(
        API.API_ROUTES.getFavoriteProfessionals + `?page=${1}&limit=${2}`,
      );
      if (result.status) {
        console.log('favoriteProfessionals==', result?.data?.data?.results);
        setFavoriteProfessionals(result?.data?.data?.results ?? []);
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

  async function removeFavoriteProfessional(id: any) {
    try {
      setLoading(true);
      const result = await API.Instance.delete(
        API.API_ROUTES.removeFavoriteProfessional + `/${id}`,
      );
      if (result.status) {
        SHOW_TOAST(result?.data?.message ?? '', 'success');
        getFavoriteProfessionals();
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    }
  }

  async function getAllRequests() {
    try {
      const result: any = await API.Instance.get(
        API.API_ROUTES.getAllRequests + `?page=${1}&limit=${2}&status=all`,
      );
      if (result.status) {
        const newData: any = result?.data?.data?.recent_requests?.items ?? [];
        setRecentRequests(newData);
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

  const handleHomeServiceViewAll = () =>{
    dispatch(getServiceCategoryData("home services",(data:any)=>{
      NavigationService.navigate(SCREENS.Assistance.identifier, {
                service: "All Services",
                id:data?.id
              });
    }))
  }

const handleCategoryOnPress = (item:any) =>{
  dispatch(getServiceCategoryData("home services",(data:any)=>{
      NavigationService.navigate(SCREENS.Assistance.identifier, {
                service: item?.category_name,
                id:item?.id
              });
    }))
  // NavigationService.navigate(SCREENS.Assistance.identifier, {
  //               service: item?.category_name,
  //               id:item?.id
  //             });
}

  return (
    <View style={styles(theme).container}>
      <StatusBar
        translucent={true}
        animated
        backgroundColor={theme.primary}
        barStyle={"dark-content"}
      />
      {/* HEADER */}
      <HomeHeader
      userImage={userData?.profile.profile_photo?.url}
        bannerImg={IMAGES.homeBanner}
        userName={userData?.profile?.full_name || userData?.profile?.business_name}
        professionalConnectedCount={professionalConnectedCount}
        onSearchPress={() => {
          NavigationService.navigate(SCREENS.Search.identifier);
        }}
        onPressNotification={() => {
          NavigationService.navigate(SCREENS.Notification.identifier);
        }}
        onPressUserProfile={() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: SCREENS.BottomBar.identifier,
                  params: { isProfile: true },
                },
              ],
            }),
          );
        }}
      />
      <ScrollView
        contentContainerStyle={styles(theme).scrollContent}
        showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <Image
          source={IMAGES.homeBanner}
          style={styles(theme).homeBanner}
          resizeMode="contain"
        />
        {/* <View
          style={{
            marginTop: 0 - getScaleSize(70),
            backgroundColor: theme.primary,
            paddingTop: StatusBar.currentHeight,
            borderBottomLeftRadius: getScaleSize(60),
            borderBottomRightRadius: getScaleSize(60),
            overflow: 'hidden',
          }}>
          <View style={styles(theme).bottomText}>
            <View style={styles(theme).userImage}>
              <Image style={styles(theme).workerImage} source={IMAGES.worker} />
            </View>
            <View style={styles(theme).textView}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  size={getScaleSize(48)}
                  font={FONTS.Lato.Bold}
                  color={theme.white}>
                  {professionalConnectedCount ?? '0'}{' '}
                </Text>
                <Text
                  size={getScaleSize(20)}
                  font={FONTS.Lato.SemiBold}
                  color={theme.white}>
                  {'Professionals\nConnected Today'}
                </Text>
              </View>
              <Text
                style={{marginTop: getScaleSize(8)}}
                size={getScaleSize(12)}
                font={FONTS.Lato.Regular}
                color={theme.white}>
                {'Verified professionals ready to\nhelp you today'}
              </Text>
            </View>
          </View>
        </View> */}
       {services && services?.home_services?.length>0 && (<>
        <View style={styles(theme).sectionHeader}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}>
            {userType == userRoles.Service_Seeker_individual ?  STRING.home_services : "Business Service"}
          </Text>
          <TouchableOpacity
            onPress={() => handleHomeServiceViewAll()}
          >
            <Text
              size={getScaleSize(12)}
              font={FONTS.Lato.SemiBold}
              color={theme.secondaryText}>
              {STRING.Viewall}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles(theme).serviceListContainer}>
          {services?.home_services?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles(theme).serviceCard}
                activeOpacity={1}
                onPress={() => handleCategoryOnPress(item)}>
                <Image
                  style={styles(theme).serviceIcon}
                  source={{uri:item?.category_logo}}
                />
                <Text
                  // style={{flex: 1.0, alignSelf: 'center'}}
                  size={getScaleSize(14)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._404040}>
                  {item?.category_name}
                </Text>
              </TouchableOpacity>
            )
          })

          }
        </ScrollView>
        </>
        )}

       {services && services.other_services?.length >0 &&
         (
         <>
         <View style={styles(theme).otherSectionHeader}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}>
            {STRING.other_services}
          </Text>
        </View>
         <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles(theme).otherServiceListContainer}>
          {services?.other_services?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles(theme).serviceCard}
                activeOpacity={1}
                onPress={() => item.onPress(props.navigation)}>
                <Image
                  style={styles(theme).serviceIcon}
                  source={item.icon}
                />
                <Text
                  // style={{flex: 1.0, alignSelf: 'center'}}
                  size={getScaleSize(14)}
                  font={FONTS.Lato.SemiBold}
                  color={theme._404040}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )
          })
          }
        </ScrollView>
        </>
        )}

        {/* <Button
          title='Add Other'
          style={{ marginTop: getScaleSize(24), marginBottom: getScaleSize(12) }}
          onPress={() => {
            // Add other service
            props.navigation.navigate(SCREENS.HomeAddServices.identifier);
          }}
        />
        <Text
          font={FONTS.Lato.SemiBold}
          size={getScaleSize(12)}
          color={theme._8C8C8C}
        >{"Can't find what you're looking for? Suggest a new service or category."}</Text> */}

        {/* <View style={styles(theme).deviderView} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: getScaleSize(31),
            marginBottom: getScaleSize(18),
            marginHorizontal: getScaleSize(22),
          }}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            style={{ flex: 1.0 }}
            color={theme._323232}>
            {STRING.ResentRequests}
          </Text>
          {recentRequests?.length >= 2 && (
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Regular}
              onPress={() => {
                props.navigation.navigate(TABS.Request.identifier);
              }}
              style={{ alignSelf: 'center' }}
              color={theme._999999}>
              {STRING.Viewall}
            </Text>
          )}
        </View> */}
        {/* {recentRequests.length > 0 ? (
          <>
            {recentRequests.map((item: any, index: number) => {
              return (
                <RequestItem
                  key={index}
                  item={item}
                  onPress={() => {
                    if (item?.task_status?.toLowerCase() === 'expired') {
                    } else {
                      props.navigation.navigate(
                        SCREENS.RequestDetails.identifier,
                        {
                          item: item,
                        },
                      );
                    }
                  }}
                />
              );
            })}
            {favoriteProfessionals?.length > 0 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: getScaleSize(13),
                    marginHorizontal: getScaleSize(22),
                  }}>
                  <Text
                    size={getScaleSize(20)}
                    font={FONTS.Lato.SemiBold}
                    style={{flex: 1.0}}
                    color={theme._323232}>
                    {STRING.FavoriteProfessionals}
                  </Text>
                  {favoriteProfessionals?.length > 1 && (
                    <Text
                      onPress={() => {
                        props.navigation.navigate(
                          SCREENS.Favourites.identifier,
                        );
                      }}
                      size={getScaleSize(16)}
                      font={FONTS.Lato.Regular}
                      style={{alignSelf: 'center'}}
                      color={theme._999999}>
                      {STRING.ViewAll}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    marginHorizontal: getScaleSize(24),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {favoriteProfessionals?.length > 0 &&
                    favoriteProfessionals.map((item: any, index: number) => {
                      return (
                        <View key={index} style={{marginTop: getScaleSize(26)}}>
                          <FavouritesItem
                            item={item}
                            itemContainer={{}}
                            onPressFavorite={(item: any) => {
                              removeFavoriteProfessional(item?.provider?.id);
                            }}
                            onPressItem={(item: any) => {
                              props.navigation.navigate(
                                SCREENS.OtherUserProfile.identifier,
                                {
                                  item: item?.provider ?? '',
                                },
                              );
                            }}
                          />
                        </View>
                      );
                    })}
                </View>
              </>
            )}
          </>
        ) : (
          <View style={styles(theme).emptyView}>
            <Image style={styles(theme).emptyImage} source={IMAGES.empty} />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Regular}
              align="center"
              color={theme._939393}
              style={{
                marginTop: getScaleSize(20),
              }}>
              {STRING.Youhavenotcreatedanyrequest}
            </Text>
          </View>
        )} */}
        {/* <View style={{ height: TABBAR_HEIGHT }} /> */}
      </ScrollView>
      {isLoading && <ProgressView />}
     { subscriptionSuccessModalVisible &&<SubscriptionSuccessModal
        visible={true}
        onClose={() => setSubscriptionSuccessModalVisible(false)}
        // data={subscriptionSuccessData}
      />}
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    scrollContent: {
      paddingBottom: getScaleSize(50),
    },
    homeBanner: {
      width: '100%',
      height: getScaleSize(200),
    },
    bannerContainer: {
      height: getScaleSize(161),
      flex: 1,
      backgroundColor: theme.primary,
      borderBottomLeftRadius: getScaleSize(40),
      borderTopRightRadius: getScaleSize(40),
      borderBottomRightRadius: getScaleSize(12),
      borderTopLeftRadius: getScaleSize(12),
      marginTop: getScaleSize(26),
      paddingHorizontal: getScaleSize(22),
      justifyContent: 'center',
      flexDirection: 'row',
      marginHorizontal: getScaleSize(22),
    },
    sectionHeader: {
      marginTop: getScaleSize(24),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: getScaleSize(24),
    },
    serviceListContainer: {
      paddingVertical: 10,
      marginTop: getScaleSize(24),
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      justifyContent: 'center',
      marginHorizontal: getScaleSize(24),
      paddingRight: 50,
    },
    serviceCard: {
      paddingVertical: getScaleSize(12),
      backgroundColor: theme.white,
      minWidth: getScaleSize(116),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: getScaleSize(10),
      elevation: 1,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      paddingHorizontal: getScaleSize(6),
    },
    serviceIcon: {
      height: getScaleSize(48),
      width: getScaleSize(48),
      marginBottom: getScaleSize(10),
    },
    otherSectionHeader: {
      marginTop: getScaleSize(24),
      marginHorizontal: getScaleSize(24),
    },
    otherServiceListContainer: {
      paddingVertical: 10,
      marginTop: getScaleSize(24),
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      justifyContent: 'center',
      marginHorizontal: getScaleSize(24),
      paddingRight: 50,
    },
    bannerImage: {
      height: getScaleSize(74),
      width: getScaleSize(86),
      alignSelf: 'center',
    },
    optionView: {
      marginHorizontal: getScaleSize(16),
      flexDirection: 'row',
      marginTop: getScaleSize(16),
    },
    imageContainer: {
      flex: 1.0,
      backgroundColor: '#F8F8F8',
      borderRadius: getScaleSize(12),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: getScaleSize(16),
    },
    iconImage: {
      height: getScaleSize(60),
      width: getScaleSize(60),
    },
    deviderView: {
      marginTop: getScaleSize(35),
      height: getScaleSize(6),
      backgroundColor: '#F8F8F8',
    },
    emptyView: {
      flex: 1.0,
      alignSelf: 'center',
      marginTop: getScaleSize(26),
    },
    emptyImage: {
      height: getScaleSize(140),
      width: getScaleSize(119),
      alignSelf: 'center',
    },
    statusBar: {
      height: StatusBar.currentHeight,
    },
    userImage: {
      overflow: 'visible',
      width: getScaleSize(240),
      height: getScaleSize(225),
      marginTop: getScaleSize(32),
      backgroundColor: '#1E4A5D',
      borderRadius: 112,
      left: -56,
      top: 26,
    },
    workerImage: {
      height: getScaleSize(250),
      width: getScaleSize(151),
      position: 'absolute',
      resizeMode: 'cover',
      left: 50,
      top: -45,
    },
    bottomText: {
      flexDirection: 'row',
      marginLeft: getScaleSize(16),
    },
    textView: {
      justifyContent: 'center',
      marginTop: getScaleSize(32),
      marginLeft: getScaleSize(-40),
    },
  });
