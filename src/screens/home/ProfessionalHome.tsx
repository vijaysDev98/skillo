import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  Linking,
  Platform,
  PermissionsAndroid,
  AppState,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//API
import { API } from '../../api';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import {
  getScaleSize,
  openStripeCheckout,
  requestLocationPermission,
  SHOW_TOAST,
  useString,
} from '../../constant';

//COMPONENT
import {
  EmptyView,
  Header,
  HomeHeader,
  ProgressView,
  RequestItem,
  SearchComponent,
  ServiceRequest,
  TaskItem,
  Text,
} from '../../components';

//PACKAGES
import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';

//SCREENS
import { SCREENS } from '..';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { EventRegister } from 'react-native-event-listeners';
import { buildThreadId } from '../../services/chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VerificationModal from '../../components/VerificationModal';
import { useAppSelector } from '../../redux/hooks';

export default function ProfessionalHome(props: any) {
  const skipSubscription = props?.route?.params?.skipSubscription;

  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);

  const { profile, fetchProfile, userType } = useContext(AuthContext);

  const { userData } = useAppSelector((state) => state?.auth)

  console.log("userData", userData)

  const [isLoading, setLoading] = useState(false);
  const [serviceList, setServiceList] = useState<any>([]);
  const [locationDenied, setLocationDenied] = useState(false);

  const [isVerificationPending, setIsVerificationPending] = useState(false)

  const isFocused = useIsFocused();

  let currentState = AppState.currentState;

  const insets = useSafeAreaInsets()

  // useEffect(() => {
  //   const sub = AppState.addEventListener('change', nextState => {
  //     if (currentState === 'active' && nextState === 'background') {
  //       onUpdateProfile();
  //     }

  //     if (currentState === 'background' && nextState === 'active') {
  //       onUpdateProfile();
  //     }

  //     currentState = nextState;
  //   });

  //   return () => sub.remove();
  // }, []);

  // useEffect(() => {
  //   EventRegister.addEventListener('onAccountSuccess', (data: any) => {
  //     onUpdateProfile();
  //   });
  // }, []);

  // const onUpdateProfile = async () => {
  //   setLoading(true);
  //   await fetchProfile();
  //   setLoading(false);
  // };

  useEffect(() => {
    console.log('onAccountCancel');
    EventRegister.addEventListener('onAccountCancel', (data: any) => {
      // onUpdateProfile();
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      // onUpdateProfile();
      requestPermissions();
      getLocation();
    }
  }, [isFocused]);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await request(PERMISSIONS.IOS.CAMERA);
      if (status === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  async function getLocation() {
    const permission = await hasLocationPermission();
    if (!permission) return;

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLoading(false);
        // getAllServices({ latitude, longitude });
      },
      error => {
        setLoading(false);
        console.log('Error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  // const getLocation = () => {

  //   let resolved = false;

  //   const watchId = Geolocation.watchPosition(
  //     pos => {
  //       if (!resolved) {
  //         resolved = true;
  //         Geolocation.clearWatch(watchId);
  //         console.log('LOCATION 👉', pos);
  //         const { latitude, longitude } = pos.coords;
  //         setLoading(false);
  //         getAllServices({ latitude, longitude });
  //       }
  //     },
  //     err => {
  //       console.log('WATCH ERROR 👉', err);
  //     },
  //     { enableHighAccuracy: false }
  //   );

  //   setTimeout(() => {
  //     if (!resolved) {
  //       Geolocation.clearWatch(watchId);
  //       console.log('Location timeout fallback');
  //     }
  //   }, 35000);
  // };

  // async function getLocation() {
  //   const permission = await hasLocationPermission();
  //   if (!permission) return;

  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setLoading(false);
  //       getAllServices({ latitude, longitude });
  //     },
  //     error => console.log('Error:', error),
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 10000,
  //     },
  //   );
  // }

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    } else {
      await request(PERMISSIONS.IOS.CAMERA);
    }
  };

  async function getAllServices(location: any) {
    try {
      const page = 1;
      const limit = 2;
      setLoading(true);
      const result: any = await API.Instance.get(
        `${API.API_ROUTES.getProfessionalAllServices}?provider_lat=${location?.latitude}&provider_lon=${location?.longitude}&page=${page}&limit=${limit}&platform=app`,
      );
      setLoading(false);
      if (result?.status) {
        console.log('resulcounttvgvt==>', result?.data?.data?.status?.verified_providers_today?.count);
        setServiceList(result.data.data ?? []);
        if (result?.data?.detail) {
          SHOW_TOAST(result?.data?.detail, 'success')
        }
      } else {
        setLoading(false);
        SHOW_TOAST(result?.data?.detail, 'error');
        console.log('error==>', result?.data?.detail);
      }
    } catch (error: any) {
      setLoading(false);
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log('error==>', error?.message);
    } finally {
      setLoading(false);
    }
  }

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  async function getServiceDetails(serviceRequestId: string) {
    try {
      const result = await API.Instance.get(
        API.API_ROUTES.getTsakDetails + `/quotes/${serviceRequestId}`,
      );
      if (result.status) {
        const conversationId = buildThreadId(
          result?.data?.data?.elderly_user?.id,
          profile?.user?.id,
        );
        props.navigation.navigate(SCREENS.ChatDetails.identifier, {
          conversationId: conversationId,
          peerUser: {
            user_id: result?.data?.data?.elderly_user?.id,
            name: result?.data?.data?.elderly_user?.first_name,
            email: result?.data?.data?.elderly_user?.email,
            avatarUrl: result?.data?.data?.elderly_user?.profile_photo_url,
          },
        });
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log(error?.message);
    } finally {
    }
  }

  const renderServiceRequestListView = () => {
    return (
      <View>
        {/* Instant Request */}
        <View>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}
            style={{
              marginTop: getScaleSize(28),
              marginBottom: getScaleSize(24)
            }}>
            {"Instant Requests"}
          </Text>
          {serviceList?.recent_tasks?.data?.length > 0 && (
            <>
              {(serviceList?.recent_tasks?.data?.length > 0
                ? serviceList?.recent_tasks?.data
                : []
              )?.map((item: any, index: number) => {
                return (
                  <TaskItem
                    key={index}
                    item={item}
                    status={"instant"}
                    cardContainerStyle={{ backgroundColor: theme._FDEFEC, borderColor: theme._EC613D, borderWidth: 0.5 }}
                    onPressItem={() => {
                      // if (item?.task_status === 'pending') {
                      //   props.navigation.navigate(
                      //     SCREENS.OpenRequestDetails.identifier,
                      //     {
                      //       item: item,
                      //     },
                      //   );
                      // } else if (item?.task_status === 'accepted') {
                      //   props.navigation.navigate(
                      //     SCREENS.CompletedTaskDetails.identifier,
                      //     {
                      //       item: item,
                      //     },
                      //   );
                      // }
                      props.navigation.navigate(
                        SCREENS.ProfessionalTaskDetails.identifier,
                        {
                          item: item,
                        },
                      );
                    }}
                    onPressStatus={() => {
                      props.navigation.navigate(SCREENS.TaskStatus.identifier, {
                        item: item,
                      });
                    }}
                    onPressChat={() => {
                      getServiceDetails(item?.service_request_id);
                    }}
                  />
                );
              })}
            </>
          )}
        </View>
        {/* Ongoing Task */}
        <View>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}
            style={{
              marginTop: getScaleSize(28),
              marginBottom: getScaleSize(24)
            }}>
            {"Ongoing Task"}
          </Text>
          {serviceList?.recent_tasks?.data?.length > 0 && (
            <>
              {(serviceList?.recent_tasks?.data?.length > 0
                ? serviceList?.recent_tasks?.data
                : []
              )?.map((item: any, index: number) => {
                return (
                  <TaskItem
                    key={index}
                    item={item}
                    onPressItem={() => {
                      // if (item?.task_status === 'pending') {
                      //   props.navigation.navigate(
                      //     SCREENS.OpenRequestDetails.identifier,
                      //     {
                      //       item: item,
                      //     },
                      //   );
                      // } else if (item?.task_status === 'accepted') {
                      //   props.navigation.navigate(
                      //     SCREENS.CompletedTaskDetails.identifier,
                      //     {
                      //       item: item,
                      //     },
                      //   );
                      // }
                      props.navigation.navigate(
                        SCREENS.ProfessionalTaskDetails.identifier,
                        {
                          item: item,
                        },
                      );
                    }}
                    onPressStatus={() => {
                      props.navigation.navigate(SCREENS.TaskStatus.identifier, {
                        item: item,
                      });
                    }}
                    onPressChat={() => {
                      getServiceDetails(item?.service_request_id);
                    }}
                  />
                );
              })}
            </>
          )}
        </View>
        {/* Explore Quotes */}
        <View
          style={[
            styles(theme).directionView,
            { marginBottom: getScaleSize(24) },
          ]}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}
            style={{
              marginTop: getScaleSize(28),
            }}>
            {"Explore Quotes"}
          </Text>
          <View style={{ flex: 1 }}></View>
          {serviceList?.open_services?.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(
                  SCREENS.ExploreServiceRequest.identifier,
                );
              }}>
              <Text
                size={getScaleSize(12)}
                font={FONTS.Lato.Bold}
                align="center"
                color={theme._404040
                }
                style={{
                  marginTop: getScaleSize(28),
                }}>
                {STRING.Viewall}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {(serviceList?.open_services?.length > 0
          ? serviceList?.open_services
          : []
        )?.map((item: any, index: number) => (
          <ServiceRequest
            key={index}
            data={item}
            onPress={() => {
              props.navigation.navigate(SCREENS.ServicePreview.identifier, {
                serviceData: item,
                isFromHome: true,
              });
            }}
            onPressAccept={() => {
              props.navigation.navigate(SCREENS.AddQuote.identifier, {
                isItem: item,
                isFromHome: true,
              });
            }}
          />
        ))}
        <View style={[styles(theme).horizontalContainer, { marginBottom: getScaleSize(24) }]}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}
            style={{
              flex: 1.0,
            }}>
            {STRING.RecentTasks}
          </Text>
          {serviceList?.recent_tasks?.data?.length > 0 && (
            <TouchableOpacity
              style={{ paddingVertical: getScaleSize(8) }}
              onPress={() => {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: SCREENS.BottomBar.identifier,
                        params: { isTask: true },
                      },
                    ],
                  }),
                );
              }}>
              <Text
                size={getScaleSize(12)}
                font={FONTS.Lato.Bold}
                color={theme._404040}>
                {STRING.Viewall}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {serviceList?.recent_tasks?.data?.length > 0 ? (
          <>
            {(serviceList?.recent_tasks?.data?.length > 0
              ? serviceList?.recent_tasks?.data
              : []
            )?.map((item: any, index: number) => {
              return (
                <TaskItem
                  key={index}
                  item={item}
                  onPressItem={() => {
                    // if (item?.task_status === 'pending') {
                    //   props.navigation.navigate(
                    //     SCREENS.OpenRequestDetails.identifier,
                    //     {
                    //       item: item,
                    //     },
                    //   );
                    // } else if (item?.task_status === 'accepted') {
                    //   props.navigation.navigate(
                    //     SCREENS.CompletedTaskDetails.identifier,
                    //     {
                    //       item: item,
                    //     },
                    //   );
                    // }
                    props.navigation.navigate(
                      SCREENS.ProfessionalTaskDetails.identifier,
                      {
                        item: item,
                      },
                    );
                  }}
                  onPressStatus={() => {
                    props.navigation.navigate(SCREENS.TaskStatus.identifier, {
                      item: item,
                    });
                  }}
                  onPressChat={() => {
                    getServiceDetails(item?.service_request_id);
                  }}
                />
              );
            })}
          </>
        ) : (
          <View style={styles(theme).emptyView}>
            <Image style={styles(theme).emptyImage} source={IMAGES.empty} />
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.SemiBold}
              align="center"
              color={theme._404040}
              style={{
                marginTop: getScaleSize(20),
              }}>
              {STRING.you_have_not_accepted_any_request_please_accept_a_request}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderServiceRequestView = () => {
    if (profile?.has_purchased === true) {
      if (profile?.user?.service_provider_type === 'professional') {
        if (profile?.onboarding_status === true) {
          return renderServiceRequestListView();
        } else {
          return (
            <EmptyView
              title={STRING.you_have_not_completed_your_onboarding}
              style={styles(theme).emptyContainer}
              buttonTitle={STRING.onboarding_process}
              onPressButton={() => {
                openStripeCheckout(profile?.onboarding_redirect_url ?? '');
              }}
            />
          );
        }
      } else {
        return renderServiceRequestListView();
      }
    } else {
      return (
        <EmptyView
          title={STRING.you_have_not_subscribed_to_any_plan}
          style={styles(theme).emptyContainer}
          onPressButton={() => {
            props.navigation.navigate(
              SCREENS.ChooseYourSubscription.identifier,
              {
                isFromSubscriptionButton: true,
              },
            );
          }}
        />
      );
    }
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar
        translucent={true}
        backgroundColor={theme.white}
        barStyle={'dark-content'}
      />
      <HomeHeader
        bannerImg={IMAGES.homeBanner}
        userImage={userData?.profile?.url}
        userName={userData?.profile.full_name || userData?.profile?.business_name}
        onSearchPress={() => {
          props.navigation.navigate(SCREENS.SearchProvider.identifier);
        }}
        onPressNotification={() => {
          props.navigation.navigate(SCREENS.Notification.identifier);
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
      {locationDenied ? (
        <EmptyView
          title={STRING.location_permission_required}
          style={styles(theme).emptyContainer}
          onPressButton={() => {
            openAppSettings();
          }}
          buttonTitle={STRING.open_settings}
        />
      ) : (
        <ScrollView
          style={styles(theme).scrolledContainer}
          showsVerticalScrollIndicator={false}>
          <Image
            source={IMAGES.homeBanner}
            style={{
              width: '100%',
              height: getScaleSize(200),
            }}
            resizeMode="contain"
          />
          {/* {renderServiceRequestView()} */}
          {renderServiceRequestListView()}
        </ScrollView>
      )}
      {isLoading && <ProgressView />}
      <VerificationModal
        visible={isVerificationPending}
        onPressStatus={() => { }}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1.0, backgroundColor: theme.white },

    scrolledContainer: {
      // marginTop: getScaleSize(28),
      marginHorizontal: getScaleSize(22),
    },
    horizontalContainer: {
      marginTop: getScaleSize(3),
      flexDirection: 'row',
      alignItems: 'center',
    },
    directionView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptyView: {
      flex: 1.0,
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical: getScaleSize(26),
    },
    emptyImage: {
      height: getScaleSize(217),
      width: getScaleSize(184),
      alignSelf: 'center',
    },
    emptyContainer: {
      marginHorizontal: getScaleSize(24),
      marginVertical: getScaleSize(24),
      flex: 1,
    },
  });
