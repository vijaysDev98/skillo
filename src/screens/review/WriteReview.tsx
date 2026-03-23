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
  TextInput,
  Keyboard,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  AcceptBottomPopup,
  BottomSheet,
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
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

import { SCREENS } from '..';
import { API } from '../../api';

export default function WriteReview(props: any) {

  const serviceId = props?.route?.params?.serviceId ?? '';
  const professionalName = props?.route?.params?.professionalName ?? '';

  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const [overallRatting, setOverallRatting] = useState(0);
  const [reliabilityRatting, setReliabilityRatting] = useState(0);
  const [punctualityRatting, setPunctualityRatting] = useState(0);
  const [solutionRatting, setSolutionRatting] = useState(0);
  const [payoutRatting, setPayoutRatting] = useState(0);
  const [review, setReview] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLoadingRating, setIsLoadingRating] = useState(true);

  const successBottomSheetRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingRating(false);
    }, 500);
    getReviewData();
  }, [])

  async function onWriteReview() {
    if (overallRatting === 0 || reliabilityRatting === 0 || punctualityRatting === 0 || solutionRatting === 0 || payoutRatting === 0) {
      SHOW_TOAST('Please fill all fields', 'error');
      return;
    }
    try {
      let params = {};
      if (!review) {
        params = {
          rating: {
            service_id: serviceId,
            // work_quality: overallRatting,
            reliability: reliabilityRatting,
            punctuality: punctualityRatting,
            solution: solutionRatting,
            payout: payoutRatting,
            overall: overallRatting,
          }
        }
      } else {
        params = {
          rating: {
            service_id: serviceId,
            // work_quality: overallRatting,
            reliability: reliabilityRatting,
            punctuality: punctualityRatting,
            solution: solutionRatting,
            payout: payoutRatting,
            overall: overallRatting,
          },
          review: {
            service_id: serviceId,
            review_description: review,
          }
        }
      }
      setLoading(true);
      const result = await API.Instance.post(API.API_ROUTES.onWriteReview + `?type=${review ? `both` : `rating`}`, params);
      if (result.status) {
        SHOW_TOAST(result?.data?.message ?? '', 'success')
        successBottomSheetRef.current?.open();
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function getReviewData() {
    try {
      const result: any = await API.Instance.get(API.API_ROUTES.getReviewData + `/${serviceId}?type=both`);
      if (result.status) {
        console.log('reviewData==>', result?.data?.data);
        const reviewData = result?.data?.data ?? '';
        setReview(reviewData?.review?.review_description ?? '');
        setOverallRatting(reviewData?.rating?.overall ?? 0);
        setReliabilityRatting(reviewData?.rating?.reliability ?? 0);
        setPunctualityRatting(reviewData?.rating?.punctuality ?? 0);
        setSolutionRatting(reviewData?.rating?.solution ?? 0);
        setPayoutRatting(reviewData?.rating?.payout ?? 0);
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }


  const ratingQuestingData = [
    {
      id:1,
      label:STRING.OverallService,
      value:overallRatting
    },
    {
      id:2,
      label:STRING.Reliability,
      value:reliabilityRatting
    },
    {
      id:3,
      label:STRING.Punctuality,
      value:punctualityRatting
    },
    {
      id:4,
      label:STRING.Solution,
      value:solutionRatting
    },
    {
      id:5,
      label:STRING.Payout,
      value:payoutRatting
    }
  ]


  const isReview= overallRatting && reliabilityRatting && punctualityRatting && solutionRatting && payoutRatting && review

  return (
    <View style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.LeaveaReview}
      />
      <ScrollView style={{ flex: 1.0 }}>
        <View style={styles(theme).serviceProviderCotainer}>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.SemiBold}
            color={theme.primaryText}>
            {STRING.reviewMessage}
          </Text>
          <Text
            style={{ marginTop: getScaleSize(8) }}
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={theme._8C8C8C}>
            {STRING.reviewQuestion}
          </Text>
            {
              ratingQuestingData?.map((item,index)=>{
                return(
                  <View style={styles(theme).ratingContainer}>
                    <Text
                      size={getScaleSize(18)}
                      font={FONTS.Lato.Medium}
                      color={theme._404}>
                      {item.label}
                    </Text>
                    {!isLoadingRating &&
                      <Rating
                        type="custom"
                        ratingBackgroundColor="#B3B3B3"
                        tintColor="#fff" // background color, useful for layout
                        ratingCount={5}
                        ratingColor={'#F0B52C'} // grey color
                        startingValue={item.value}
                        imageSize={30}
                        onFinishRating={(value: any) => {
                          // Update the corresponding rating state based on the question
                          switch(item.id) {
                            case 1:
                              setOverallRatting(value);
                              break;
                            case 2:
                              setReliabilityRatting(value);
                              break;
                            case 3:
                              setPunctualityRatting(value);
                              break;
                            case 4:
                              setSolutionRatting(value);
                              break;
                            case 5:
                              setPayoutRatting(value);
                              break;
                          }
                        }}
                      />
                    }
                  </View>
                )
              })
            }

          <Text
            style={{ marginTop: getScaleSize(20) }}
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={'#323232'}>
            {STRING.Pleaseshareyourexperience}
          </Text>
          <View style={styles(theme).inputContainer}>
            <TextInput
              style={styles(theme).textInput}
              value={review}
              onChangeText={setReview}
              placeholder={STRING.Writeyourreviewhere}
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              returnKeyType="default"
            />
          </View>
        </View>
      </ScrollView >
      {
        isReview && (
        <Button
        title={STRING.submit_review}
        style={{
          marginHorizontal: getScaleSize(22),
          marginBottom: getScaleSize(16),
        }}
        onPress={() => {
          Keyboard.dismiss();
          // onWriteReview();
          successBottomSheetRef.current?.open();
        }}
      />)}
      <BottomSheet
        bottomSheetRef={successBottomSheetRef}
        height={330}
        type="review"
        title={STRING.thank_you_for_your_review}
        description={STRING.we_appreciated_you_taking_the_time_to_reflect_on_your_experience}
        buttonTitle={STRING.back_to_home}
        onPressButton={() => {
          successBottomSheetRef.current?.close();
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: SCREENS.BottomBar.identifier
                },
              ],
            }),
          );
        }}
      />
      {isLoading || isLoadingRating && <ProgressView />}
    </View >
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    serviceProviderCotainer: {
      marginTop: getScaleSize(24),
      flexDirection: 'column',
      marginHorizontal: getScaleSize(22),
    },
    textInput: {
      fontSize: getScaleSize(18),
      color: theme._323232,
      padding: getScaleSize(16),
      minHeight: getScaleSize(240),
      textAlignVertical: 'top',
      fontFamily: FONTS.Lato.Regular,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(12),
      marginBottom: getScaleSize(24),
    },
    ratingContainer: {
      marginTop: getScaleSize(22),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  });
