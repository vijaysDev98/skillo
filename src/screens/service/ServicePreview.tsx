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
  Platform,
} from 'react-native';

//API
import { API } from '../../api';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { arrayIcons, getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  AcceptBottomPopup,
  Button,
  Header,
  PaymentBottomPopup,
  ProgressView,
  RejectBottomPopup,
  RequestItem,
  SearchComponent,
  StatusItem,
  Text,
} from '../../components';

//PACKAGES
import { useFocusEffect } from '@react-navigation/native'; import moment from 'moment';

//SCREENS
import { SCREENS } from '..';
import { RecentSearchCard } from '../home/Search';
import JobDetailBox from './ui/JobDetailx';

const JobPhotosdata = [
  { id: 1, image: IMAGES.furnitureAssemblyImg },
  { id: 2, image: IMAGES.furnitureAssemblyImg },
  { id: 3, image: IMAGES.furnitureAssemblyImg },
]

export default function ServicePreview(props: any) {

  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);

  const { profile } = useContext(AuthContext)

  const serviceData = props?.route?.params?.serviceData
  const isFromHome = props?.route?.params?.isFromHome ?? false;

  const [isStatus, setIsStatus] = useState(false);
  const [visibleTaskDetails, setVisibleTaskDetails] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<any>("")

  useEffect(() => {
    getServicesDetails()
  }, [])

  async function getServicesDetails() {
    try {
      setLoading(true)
      const result = await API.Instance.get(API.API_ROUTES.getProfessionalServiceDetails + `/${serviceData?.service_id}`);
      setLoading(false)

      if (result?.status) {
        setServiceDetails(result?.data)
      }
      else {
        SHOW_TOAST(result?.data?.message, 'error')
      }
    }
    catch (error: any) {
      setLoading(false);
      SHOW_TOAST(error?.message ?? '', 'error');
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
  return (
    <View style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.ServicePreview}
      />
      <ScrollView
        style={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <RecentSearchCard
          image={IMAGES.furnitureAssemblyImg}
          containerStyle={styles(theme).recentSearchCard}
          title="Furniture Assembly"
        />
        {/* <JobDetails /> */}
        {/* <Text
          font={FONTS.Lato.SemiBold}
          size={getScaleSize(16)}
          color={theme.primaryText}
          style={styles(theme).jobDetailTitle}>Job Details</Text>
        <View style={styles(theme).detailsContainer}>
          <JobItem
            title='Budget'
            value='P200 to P500'
          />
          <View style={styles(theme).verticalDivider} />
          <JobItem
            title='Job Date'
            value='14 Dec'
          />
          <View style={styles(theme).verticalDivider} />
          <JobItem
            title='Job Time'
            value='18:00 Pm'
          /> */}
        {/* </View> */}
        <JobDetailBox
        isTitle={true}
        jobBudgetValue='P200 to P500'
        jobDate='14 Dec'
        jobTime='18:00 Pm'
        />
        <View style={styles(theme).clientContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme._8C8C8C}
          >{"About Client"}</Text>
          <View style={styles(theme).clientRow}>
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
        </View>

        <View style={styles(theme).addressContainer}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme._8C8C8C}
          >{"Address"}</Text>
          <View style={styles(theme).addressRow}>
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
        </View>

        <Text
          style={styles(theme).serviceDescriptionTitle}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme.primaryText}>
          {STRING.Servicedescription}
        </Text>
        <View style={styles(theme).serviceDescriptionView}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Regular}
            color={theme._404040}>
            {"I need professional washroom cleaning service for my home/office. The washroom requires deep cleaning including toilet, sink, floor, and tiles. Stain removal and proper sanitization are required.Looking for a reliable service provider with cleaning equipment and materials."}
          </Text>
        </View>
        <Text
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme.primaryText}
          style={styles(theme).jobPhotosTitle}
        >{"Job Photos"}</Text>
        <FlatList
          // data={serviceDetails?.job_photos}
          data={JobPhotosdata}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).photosListContent}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => {
                props.navigation.navigate(SCREENS.WebViewScreen.identifier, {
                  url: item,
                })
              }}>
                <Image
                  style={styles(theme).photosView}
                  resizeMode='cover'
                  // source={{ uri: item }}
                  source={item?.image}
                />
              </TouchableOpacity>

            );
          }}
        />
      </ScrollView>
      <View
        style={[
          styles(theme).horizontalView,
          styles(theme).actionBarContainer,
        ]}>
        <View style={styles(theme).flexOne}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}>
            {"Budget"}
          </Text>
          <Text
            style={styles(theme).budgetValue}
            size={getScaleSize(27)}
            font={FONTS.Lato.ExtraBold}
            color={theme.primary}>
            {/* {`P${serviceDetails?.estimated_cost === null ? "" : serviceDetails?.estimated_cost}`} */}
            {`P 300 to P500`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles(theme).quateContainer}
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate(SCREENS.AddQuote.identifier, {
              item: serviceDetails,
              isFromHome: isFromHome,
              headerTitle:"Service Preview"
            })
          }}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.SemiBold}
            color={theme.white}>
            {STRING.Quote}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ProgressView />}
    </View >
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    scrolledContainer: {
      marginTop: getScaleSize(19),
      marginHorizontal: getScaleSize(24),
    },
    jobDetailTitle: {
      marginTop: getScaleSize(24),
    },
    recentSearchCard: {
      marginHorizontal: getScaleSize(0),
      elevation: 2,
    },
    detailsContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      borderWidth: 0.5,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(10),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(21),
      marginTop: getScaleSize(16),
      backgroundColor: theme.white,
      elevation: 2,
    },
    detailItem: {
      alignItems: "center",
      gap: getScaleSize(6),
    },
    verticalDivider: {
      width: getScaleSize(1),
      backgroundColor: theme._D6D6D6,
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
    },
    clientAvatar: {
      height: getScaleSize(48),
      width: getScaleSize(48),
      borderRadius: getScaleSize(24),
      borderWidth: 0.5,
      borderColor: theme._B3B3B3,
    },
    addressContainer: {
      padding: getScaleSize(16),
      borderRadius: getScaleSize(10),
      borderWidth: 1,
      borderColor: theme._E6E6E6,
      marginTop: getScaleSize(24),
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getScaleSize(12),
      marginTop: getScaleSize(16),
    },
    addressIcon: {
      height: getScaleSize(30),
      width: getScaleSize(24),
    },
    serviceDescriptionTitle: {
      marginTop: getScaleSize(24),
    },
    horizontalView: {
      flexDirection: 'row',
    },
    jobPhotosTitle: {
      marginTop: getScaleSize(24),
    },
    serviceDescriptionView: {
      marginTop: getScaleSize(12),
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    photosListContent: {
      gap: getScaleSize(16),
      marginBottom: getScaleSize(24),
      marginTop: getScaleSize(12),
    },
    photosView: {
      height: getScaleSize(144),
      width: (Dimensions.get('window').width - getScaleSize(66)) / 2,
      borderRadius: getScaleSize(10),
      resizeMode: 'cover',
      backgroundColor: theme._EAF0F3,
    },
    actionBarContainer: {
      marginTop: getScaleSize(24),
      marginHorizontal: getScaleSize(22),
      marginBottom: getScaleSize(16),
    },
    flexOne: {
      flex: 1,
    },
    budgetValue: {
      marginTop: getScaleSize(2),
    },
    quateContainer: {
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(30),
      borderRadius: getScaleSize(12),
      backgroundColor: theme.primary,
    },
  });
