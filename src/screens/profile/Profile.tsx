import React, { useContext, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, Storage, useString } from '../../constant';

//COMPONENTS
import { Text, Header, BottomSheet, ProgressView } from '../../components';
import { SCREENS } from '..';
import { userRoles } from '../../constant/utils';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import NavigationService from '../NavigationService';
import { logoutAction } from '../../actions/auth/authAction';


export default function Profile(props: any) {

  const STRING = useString();
  const dispatch = useAppDispatch()

  const { theme } = useContext<any>(ThemeContext);
  const { userType, profile } = useContext<any>(AuthContext);
  const { isLoading,userData } = useAppSelector(state => state.auth)

  // const [isLoading, setLoading] = useState(false);
  const bottomSheetRef = useRef<any>(null);

  const profileSeekerIndividualItems = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: () => { NavigationService.navigate(SCREENS.MyProfile.identifier) } },
    { id: 2, title: STRING.transactions, icon: IMAGES.ic_transactions, onPress: () => { NavigationService.navigate(SCREENS.TransactionsElder.identifier) } },
    { id: 3, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: () => { NavigationService.navigate(SCREENS.RatingsReviews.identifier) } },
    { id: 4, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: () => { NavigationService.navigate(SCREENS.Notification.identifier) } },
    // { id: 5, title: STRING.prefered_language, icon: IMAGES.ic_language, onPress: ()=>{NavigationService.navigate(SCREENS.Language.identifier)} }
    { id: 5, title: STRING.logout, icon: IMAGES.ic_logout, onPress: () => { bottomSheetRef.current.open() } }
  ]

  const profieItemsProfessional = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: () => { NavigationService.navigate(SCREENS.MyProfileProfessional.identifier) } },
    { id: 2, title: STRING.my_earnings, icon: IMAGES.ic_my_earnings, onPress: () => { NavigationService.navigate(SCREENS.MyEarnings.identifier) } },
    { id: 3, title: STRING.manage_services, icon: IMAGES.ic_manage_services, onPress: () => { NavigationService.navigate(SCREENS.ManageServices.identifier) } },
    { id: 4, title: STRING.manage_subscription, icon: IMAGES.ic_manage_subscription, onPress: () => { NavigationService.navigate(SCREENS.ManageSubscription.identifier) }, isRightIcon: false },
    { id: 5, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: () => { NavigationService.navigate(SCREENS.RatingsReviews.identifier) } },
    { id: 6, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: () => { NavigationService.navigate(SCREENS.Notification.identifier) } },
    // { id: 7, title: STRING.prefered_language, icon: IMAGES.ic_language, onPress: SCREENS.Language.identifier }
    { id: 7, title: STRING.logout, icon: IMAGES.ic_logout, onPress: () => { bottomSheetRef.current.open() } }
  ]

  const profileSeekerBusiness = [
    { id: 1, title: STRING.my_profile, icon: IMAGES.ic_my_profile, onPress: () => { NavigationService.navigate(SCREENS.MyProfile.identifier) } },
    { id: 2, title: STRING.transactions, icon: IMAGES.ic_transactions, onPress: () => { NavigationService.navigate(SCREENS.TransactionsElder.identifier) } },
    { id: 3, title: STRING.ratings_reviews, icon: IMAGES.ic_ratings_reviews, onPress: () => { NavigationService.navigate(SCREENS.RatingsReviews.identifier) } },
    {
      id: 4, title: STRING.manage_subscription, icon: IMAGES.ic_manage_subscription,
      isRightIcon: false,
      onPress: () => { NavigationService.navigate(SCREENS.ManageSubscription.identifier) }
    },
    { id: 5, title: STRING.notifications, icon: IMAGES.ic_notifications, onPress: () => { NavigationService.navigate(SCREENS.Notification.identifier) } },
    // { id: 5, title: STRING.prefered_language, icon: IMAGES.ic_language, onPress: ()=>{NavigationService.navigate(SCREENS.Language.identifier)} }
    { id: 6, title: STRING.logout, icon: IMAGES.ic_logout, onPress: () => { bottomSheetRef.current.open() } }
  ]

  function getProfileItems() {
    if (userType === userRoles.Service_Provider_business || userType === userRoles.Service_Provider_individual) {
      return profieItemsProfessional;
    }
    else if (userType == userRoles.Service_Seeker_business) {
      return profileSeekerBusiness;
    }
    else {
      return profileSeekerIndividualItems;
    }
  }

  async function logout() {
    const userData: any = await Storage.get(Storage.USER_DETAILS);
    const user = JSON.parse(userData);
    const refreshToken = user?.tokens?.refresh_token || user?.refresh_token;
    let data = {
      refresh_token: refreshToken
    }
    dispatch(logoutAction(data))
    bottomSheetRef.current.close();
  }

  console.log("userData===>>",userData?.profile?.profile_photo?.url)

  return (
    <AppSafeAreaView style={styles(theme).container}>
      <Header
        type="profile"
        // rightIcon={{ icon: IMAGES.ic_logout, title: STRING.logout }}
        // onPress={() => {
        //   bottomSheetRef.current.open();
        // }}
        screenName={STRING.my_account}
      />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: getScaleSize(20)
        }}>
        <View style={styles(theme).mainContainer}>
          {userData?.profile?.profile_photo?.url ? (
            <Image source={{ uri: userData?.profile?.profile_photo?.url }} resizeMode='cover' style={styles(theme).profileContainer} />
          ) : (
            <View style={styles(theme).EmptyProfileContainer}>
              <Text
                size={getScaleSize(24)}
                font={FONTS.Lato.Regular}
                align="center"
                color={theme._262B43E5}>
                {(userData?.profile?.full_name?.charAt(0) ?? '').toUpperCase() }
                  {/* // (profile?.user?.last_name?.charAt(0) ?? '').toUpperCase()} */}
              </Text>
            </View>
          )}
          <Text
            size={getScaleSize(22)}
            font={FONTS.Lato.SemiBold}
            align="center"
            numberOfLines={1}
            color={theme.primaryText}>
              {userData?.profile?.full_name || ''}
            {/* {(userData?.profile?.full_name ?? "") + " " + (profile?.user?.last_name ?? "")} */}
          </Text>
          {userType !== userRoles.Service_Seeker_individual
            // userType === 'service_provider' 
            && (
              <>
                {/* {(profile?.provider_info?.is_docs_verified === false ||
                profile?.onboarding_status === false) && ( */}
                <View style={styles(theme).checkStatusContainer}>
                  <Image source={IMAGES.ic_alart} style={styles(theme).alartIcon} />
                  <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.Bold}
                    align="center"
                    color={theme.primaryText}>
                    {STRING.account_under_verification}
                  </Text>
                  {/* {profile?.provider_info?.is_docs_verified === false && ( */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate(SCREENS.ApplicationStatus.identifier);
                    }}
                    style={[styles(theme).checkStatusButton, { backgroundColor: theme.primary }]}>
                    <Text
                      size={getScaleSize(16)}
                      font={FONTS.Lato.SemiBold}
                      align="center"
                      color={theme.white}>
                      {STRING.check_status}
                    </Text>
                  </TouchableOpacity>
                  {/* )} */}
                  {/* {profile?.onboarding_status === false && ( */}
                  {/* <TouchableOpacity
                        onPress={() => {
                          openStripeCheckout(profile?.onboarding_redirect_url ?? '')
                        }}
                        style={[styles(theme).checkStatusButton, { backgroundColor: theme._F0B52C }]}>
                        <Text
                          size={getScaleSize(16)}
                          font={FONTS.Lato.SemiBold}
                          align="center"
                          color={theme.white}>
                          {STRING.onboarding_process}
                        </Text>
                      </TouchableOpacity> */}
                  {/* )} */}
                </View>
                {/* )} */}
              </>
            )}
          <View style={{ marginTop: userType === 'service_provider' ? getScaleSize(20) : getScaleSize(40) }}>
            {getProfileItems().map((item: any, index: number) => {
              return (
                <TouchableOpacity key={index}
                  // onPress={() => { NavigationService.navigate(item.onPress) }}
                  onPress={() => { item?.onPress() }}
                  style={styles(theme).profileItemContainer}>
                  <Image
                    source={item.icon}
                    style={styles(theme).profileItemIcon}
                  />
                  <Text
                    style={{ flex: 1.0 }}
                    size={getScaleSize(20)}
                    font={FONTS.Lato.SemiBold}
                    color={theme.primaryText}>
                    {item.title}
                  </Text>
                  {item.isRightIcon !== false && <Image source={IMAGES.ic_right} style={styles(theme).profileItemRightIcon} />}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        height={getScaleSize(330)}
        isInfo={true}
        title={STRING.are_you_sure_you_want_to_logout}
        buttonTitle={STRING.logout}
        secondButtonTitle={STRING.cancel}
        onPressSecondButton={() => {
          bottomSheetRef.current.close();
        }}
        onPressButton={() => {
          logout()
        }}
      />
      {isLoading && <ProgressView />}
    </AppSafeAreaView>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.white
    },
    mainContainer: {
      flex: 1,
      marginHorizontal: getScaleSize(24),
      marginTop: getScaleSize(42),
      marginBottom: getScaleSize(20),
    },
    profileContainer: {
      width: getScaleSize(126),
      height: getScaleSize(126),
      borderWidth: 1,
      borderColor: theme._F0EFF0,
      borderRadius: getScaleSize(126),
      alignSelf: 'center',
      marginBottom: getScaleSize(12),
    },
    EmptyProfileContainer: {
      width: getScaleSize(126),
      height: getScaleSize(126),
      backgroundColor: theme._F0EFF0,
      borderRadius: getScaleSize(126),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: getScaleSize(12),
      elevation:2
    },
    profileItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getScaleSize(16),
    },
    profileItemIcon: {
      width: getScaleSize(56),
      height: getScaleSize(56),
      marginRight: getScaleSize(20),
    },
    profileItemRightIcon: {
      width: getScaleSize(24),
      height: getScaleSize(24),
      marginHorizontal: getScaleSize(12),
    },
    checkStatusContainer: {
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: getScaleSize(12),
      paddingHorizontal: getScaleSize(66),
      paddingVertical: getScaleSize(24),
      marginTop: getScaleSize(10),
    },
    alartIcon: {
      width: getScaleSize(58),
      height: getScaleSize(58),
      alignSelf: 'center',
      marginBottom: getScaleSize(12),
    },
    checkStatusButton: {

      borderRadius: getScaleSize(12),
      alignItems: 'center',
      paddingVertical: getScaleSize(10),
      marginTop: getScaleSize(20),
    }
  });
