import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  Modal,
} from 'react-native';

//API
import { API } from '../../api';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { arrayIcons, formatDecimalInput, getScaleSize, SHOW_SUCCESS_TOAST, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import {
  Button,
  Header,
  Input,
  ProgressView,
  Text,
} from '../../components';

//PACKAGES
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import { createThumbnail } from 'react-native-create-thumbnail';

//SCREENS
import { SCREENS } from '..';
import { RecentSearchCard } from '../home/Search';
import JobDetailBox from './ui/JobDetailx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddQuote(props: any) {

  const serviceDetails = props?.route?.params?.item
  const isItem = props?.route?.params?.isItem
  const headerTitle = props?.route?.params?.headerTitle

  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);

  const { profile } = useContext(AuthContext)

  const insets = useSafeAreaInsets()

  const [amount, setAmount] = useState('');
  const [desctiption, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [doc1, setDoc1] = useState<any>(null);
  const [doc2, setDoc2] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [doc1Id, setDoc1Id] = useState<string | null>(null);
  const [doc2Id, setDoc2Id] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [isServiceDetails, setServiceDetails] = useState<any>(serviceDetails ?? '')
  const [amountError, setAmountError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [docError, setDocError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [isQuoteSuccessModalVisible, setIsQuoteSuccessModalVisible] = useState(false);

  useEffect(() => {
    if (!isServiceDetails && isItem) {
      getServicesDetails()
    }
  }, [])

  async function getServicesDetails() {
    try {
      setLoading(true)
      const result = await API.Instance.get(API.API_ROUTES.getProfessionalServiceDetails + `/${isItem?.service_id}`);
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

  async function uploadFile(asset: any) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: Platform.OS === 'ios'
          ? asset.uri.replace('file://', '')
          : asset.uri,
        name: asset.fileName || `file_${Date.now()}`,
        type: asset.type || 'image/jpeg',
      } as any);
      setLoading(true);
      const result: any = await API.Instance.post(API.API_ROUTES.fileUploadProfessionalServices, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result.status) {
        SHOW_TOAST(result?.data?.message ?? '', 'success')
        return result?.data?.id;
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error')
        return null;
      }
    }
    catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }

  // return res.data.storage_key;

  const pickDocument = async (index: number) => {
    setDocError('');
    setLoading(true);
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          SHOW_TOAST(response.errorMessage || 'Error', 'error');
          return;
        }

        const asset = response.assets?.[0];
        if (!asset) return;

        try {
          setLoading(true);

          const id = await uploadFile(asset);
          console.log('id==>', id, asset)
          if (id) {
            if (index === 1) {
              setDoc1(asset);
              setDoc1Id(id);
            }
            if (index === 2) {
              setDoc2(asset);
              setDoc2Id(id);
            }

            SHOW_TOAST('Document uploaded successfully', 'success');
          } else {
            SHOW_TOAST('Document upload failed', 'error');
          }
        } catch (e: any) {
          SHOW_TOAST('Document upload failed', 'error');
          if (index === 1) {
            setDoc1(null);
            setDoc1Id(null);
          }
          if (index === 2) {
            setDoc2(null);
            setDoc2Id(null);
          }
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const pickVideo = () => {
    setVideoError('');
    launchImageLibrary(
      {
        mediaType: 'video',
        videoQuality: 'high',
      },
      async response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          SHOW_TOAST(response.errorMessage || 'Error', 'error');
          return;
        }

        const asset = response.assets?.[0];
        console.log('asset==>', asset, response)
        if (!asset) return;

        if (!asset.uri) {
          SHOW_TOAST('Invalid video file', 'error');
          return;
        }

        if (asset.duration && asset.duration > 120) {
          SHOW_TOAST('Video must be less than 2 minutes', 'error');
          return;
        }

        try {
          setLoading(true);

          //  Upload video
          const id = await uploadFile(asset);
          if (id) {
            setVideoId(id);
            setVideo(asset);
            SHOW_TOAST('Video uploaded successfully', 'success');
          } else {
            SHOW_TOAST('Video upload failed', 'error');
            return
          }

          //  Create thumbnail
          const thumbnail = await createThumbnail({
            url: asset.uri,
            timeStamp: 1000,
          });

          setVideoThumbnail(thumbnail.path);

          SHOW_SUCCESS_TOAST('Video uploaded successfully');
        } catch (e: any) {
          SHOW_TOAST(e.message || 'Upload failed', 'error');
        } finally {
          setLoading(false);
        }
      }
    );
  };


  async function sendQuote() {

    const photoIds = [doc1Id, doc2Id].filter(Boolean)
setIsQuoteSuccessModalVisible(true)
    // amount validation only for professional
    // if (profile?.user?.service_provider_type === 'professional' && !amount) {
    //   setAmountError('Please enter amount');
    // } else if (!desctiption) {
    //   setDescriptionError('Please enter short description');
    // } else if (photoIds.length === 0) {
    //   setDocError('Please upload at least one document');
    // } else {
    //   try {
    //     setLoading(true);

    //     let payload: any = {
    //       servicesid: isServiceDetails?.service_id,
    //       description: desctiption,
    //     };

    //     // PROFESSIONAL PAYLOAD
    //     if (profile?.user?.service_provider_type === 'professional') {
    //       payload = {
    //         ...payload,
    //         provider_quote_amount: amount,
    //         offer_photoids: photoIds,
    //         offer_videoids: videoId ? [videoId] : [],
    //       };
    //     }

    //     // NON-PROFESSIONAL PAYLOAD
    //     if (profile?.user?.service_provider_type === 'non_professional') {
    //       payload = {
    //         ...payload,
    //         offer_photos: photoIds.map(key => ({
    //           storage_key: key,
    //         })),
    //         offer_videos: videoId
    //           ? [{ storage_key: videoId }]
    //           : [],
    //       };
    //     }

    //     const result: any = await API.Instance.post(
    //       API.API_ROUTES.sendQuoteRequest,
    //       payload
    //     );

    //     setLoading(false);

    //     if (result?.status) {
    //       props.navigation.navigate(SCREENS.Success.identifier, {
    //         isFromHome: true,
    //       });
    //     } else {
    //       SHOW_TOAST(result?.message || 'Failed to send quote', 'error');
    //     }
    //   } catch (e: any) {
    //     setLoading(false);
    //     SHOW_TOAST(e?.message || 'Something went wrong', 'error');
    //   }
    // }
  }


  return (
    <View style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={headerTitle ? headerTitle : STRING.Addquoteamount}
      />
      <ScrollView
        contentContainerStyle={styles(theme).scrolledContainer}
        showsVerticalScrollIndicator={false}>
        <RecentSearchCard
          image={IMAGES.furnitureAssemblyImg}
          containerStyle={styles(theme).recentSearchCard}
          title="Furniture Assembly"
        />
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

        {profile?.user?.service_provider_type === 'professional' &&
          <Input
            placeholder={`${isServiceDetails?.estimated_cost ? `€${isServiceDetails?.estimated_cost}` : '0'}`}
            placeholderTextColor={theme._D5D5D5}
            inputTitle={STRING.EnterQuoteAmount}
            inputColor={true}
            mainContinerStyle={{ marginTop: getScaleSize(16) }}
            value={amount ? `P${amount}` : ''}
            keyboardType="decimal-pad"
            autoCapitalize="none"
            onChangeText={text => {
              setAmount(formatDecimalInput(text));
              setAmountError('');
            }}
            isError={amountError}
          />
        }
        <Input
          inputTitle={STRING.Addpersonalizedshortmessage}
          placeholder={STRING.Enterdescriptionhere}
          placeholderTextColor={theme._8C8C8C}
          inputColor={true}
          value={desctiption}
          mainContinerStyle={{ marginTop: getScaleSize(16) }}
          inputContainer={styles(theme).inputContainerHeight}
          multiline={true}
          numberOfLines={8}
          onChangeText={text => {
            setDescription(text);
            setDescriptionError('');
          }}
          isError={descriptionError}
        />
        <Text
          style={{ marginTop: getScaleSize(16) }}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._404040}>
          {STRING.Attachsupportingdocuments}
        </Text>
        <View style={styles(theme).imageUploadContent}>
          <TouchableOpacity
            style={[styles(theme).uploadButton, { marginRight: getScaleSize(9), borderColor: docError ? theme._EF5350 : theme._818285 }]}
            activeOpacity={1}
            onPress={() => pickDocument(1)}>
            {doc1 ? (
              <Image source={{ uri: doc1.uri }} style={styles(theme).photosView} />
            ) : (
              <>
                <Image source={IMAGES.upload_attachment} style={styles(theme).attachmentIcon} />
                <Text
                  style={{ marginTop: getScaleSize(8) }}
                  size={getScaleSize(15)}
                  font={FONTS.Lato.Regular}
                  align='center'
                  color={theme._8C8C8C}>
                  {"upload from \ndevice"}
                </Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(theme).uploadButton, { marginLeft: getScaleSize(9), borderColor: docError ? theme._EF5350 : theme._818285 }]}
            activeOpacity={1}
            onPress={() => pickDocument(2)}>
            {doc2 ? (
              <Image source={{ uri: doc2.uri }} style={styles(theme).photosView} />
            ) : (
              <>
                <Image source={IMAGES.upload_attachment} style={styles(theme).attachmentIcon} />
                <Text
                  style={{ marginTop: getScaleSize(8) }}
                  size={getScaleSize(15)}
                  font={FONTS.Lato.Regular}
                  align='center'
                  color={theme._8C8C8C}>
                  {"upload from \ndevice"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        {docError &&
          <Text
            style={{ marginTop: getScaleSize(8) }}
            size={getScaleSize(14)}
            font={FONTS.Lato.Regular}
            color={theme._EF5350}>{docError}
          </Text>
        }
        <Text
          style={{ marginTop: getScaleSize(16) }}
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme._404040}>
          {STRING.Uploadashortvideo}
        </Text>
        <TouchableOpacity
          style={[
            styles(theme).uploadButton,
            { marginRight: getScaleSize(0), marginTop: getScaleSize(12), borderColor: videoError ? theme._EF5350 : theme._818285 },
          ]}
          activeOpacity={1}
          onPress={pickVideo}>
          {videoThumbnail ? (
            <Image
              source={{ uri: videoThumbnail }}
              style={styles(theme).photosView}
            />
          ) :
            <>
              <Image source={IMAGES.upload_attachment} style={styles(theme).attachmentIcon} />
              <Text
                style={{ marginTop: getScaleSize(8) }}
                size={getScaleSize(15)}
                font={FONTS.Lato.Regular}
                align='center'
                color={theme._8C8C8C}>
                {"upload from \ndevice"}
              </Text>
            </>
          }
        </TouchableOpacity>
        {videoError &&
          <Text
            style={{ marginVertical: getScaleSize(8) }}
            size={getScaleSize(14)}
            font={FONTS.Lato.Regular}
            color={theme._EF5350}>
            {videoError}
          </Text>
        }
      </ScrollView>

      <TouchableOpacity style={{
        marginHorizontal: getScaleSize(24),
        paddingVertical: getScaleSize(16),
        alignItems: 'center',
        backgroundColor: theme.primary,
        borderRadius: getScaleSize(10),
        marginBottom: insets.bottom + getScaleSize(16)
      }}
     onPress={sendQuote}
      >
        <Text
          size={getScaleSize(20)}
          font={FONTS.Lato.SemiBold}
          color={theme.white}
        >{STRING.SubmitQuote}</Text>
      </TouchableOpacity>
      {isLoading && <ProgressView />}
      {isQuoteSuccessModalVisible && (
        <QuoteSuccessModal
        visible={isQuoteSuccessModalVisible}
        onGoHome={() => {
          setIsQuoteSuccessModalVisible(false)
          props.navigation.navigate(SCREENS.BottomBar.identifier)
        }}
        onRequestClose={() => {setIsQuoteSuccessModalVisible(false)}}
        theme={theme}
        title="Great job! Your service quote submitted successfully."
        buttonTitle="Go To Home"
        />)
      }
    </View>
  );
}

type QuoteSuccessModalProps = {
  visible: boolean;
  onGoHome: () => void;
  onRequestClose?: () => void;
  theme: ThemeContextType['theme'];
  title?: string;
  description?: string;
  buttonTitle?: string;
};

export const QuoteSuccessModal: React.FC<QuoteSuccessModalProps> = ({
  visible,
  onGoHome,
  onRequestClose,
  theme,
  title = 'Great job! Your service quote submitted successfully.',
  buttonTitle = 'Go To Home',
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles(theme).modalOverlay}>
        <View style={styles(theme).modalCard}>
          <Image
            source={IMAGES.addQuoteSuccessImg}
            style={styles(theme).modalImage}
            resizeMode='contain'
          />
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.Bold}
            color={theme._0F232F}
            align='center'
          >
            {title}
          </Text>
          <TouchableOpacity
            style={styles(theme).modalButton}
            activeOpacity={0.9}
            onPress={onGoHome}
          >
            <Text
              size={getScaleSize(12)}
              font={FONTS.Lato.SemiBold}
              color={theme.white}
            >
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    scrolledContainer: {
      marginTop: getScaleSize(19),
      marginHorizontal: getScaleSize(24),
      paddingBottom: getScaleSize(100)
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
      marginTop: getScaleSize(32),
      paddingVertical: getScaleSize(9),
      borderWidth: 1,
      borderColor: '#D5D5D5',
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
      borderColor: '#D5D5D5',
      paddingVertical: getScaleSize(13),
      paddingHorizontal: getScaleSize(16),
      borderWidth: 1,
      borderRadius: getScaleSize(16),
      marginTop: getScaleSize(24),
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
      flex: 1.0,
      backgroundColor: theme.primary,
      borderRadius: 8,
      height: getScaleSize(38),
      justifyContent: 'center',
      alignItems: 'center',
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
      borderColor: theme._D9D9D9,
      borderStyle: 'dashed',
      borderRadius: getScaleSize(8),
      justifyContent: 'center',
      alignItems: 'center',
      height: getScaleSize(160),
      overflow: 'hidden',
      // backgroundColor:'red'
    },
    attachmentIcon: {
      height: getScaleSize(40),
      width: getScaleSize(40),
      alignSelf: 'center',
      tintColor: '#ACADAD',
    },
    photosView: {
      height: getScaleSize(144),
      width: getScaleSize(180),
      borderRadius: 8,
      resizeMode: 'cover',
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
      paddingVertical: getScaleSize(8),
      paddingHorizontal: getScaleSize(12),
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
      borderColor: theme.primary,
      borderWidth: 1,
      marginTop: getScaleSize(8),
    },
    informationContainer: {
      marginTop: getScaleSize(24),
      borderWidth: 1,
      borderColor: '#D5D5D5',
      borderRadius: getScaleSize(16),
      paddingHorizontal: getScaleSize(24),
      paddingVertical: getScaleSize(24),
    },
    newHorizontalView: {
      flexDirection: 'row',
      marginTop: getScaleSize(8),
    },
    quateContainer: {
      paddingVertical: getScaleSize(16),
      paddingHorizontal: getScaleSize(62),
      borderRadius: getScaleSize(12),
      backgroundColor: theme._214C65,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme._D5D5D5,
      borderRadius: getScaleSize(12),
      marginTop: getScaleSize(12),
    },
    textInput: {
      fontSize: getScaleSize(18),
      color: theme._323232,
      padding: getScaleSize(16),
      minHeight: getScaleSize(240),
      textAlignVertical: 'top',
      fontFamily: FONTS.Lato.Regular,
    },
    inputContainerHeight: {
      minHeight: getScaleSize(190),
      textAlignVertical: 'top',
      fontFamily: FONTS.Lato.Regular
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
    modalOverlay: {
      flex: 1,
      backgroundColor: '#777777CC',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getScaleSize(20),
    },
    modalCard: {
      width: '100%',
      borderRadius: getScaleSize(14),
      backgroundColor: theme.white,
      paddingHorizontal: getScaleSize(20),
      paddingVertical: getScaleSize(24),
      alignItems: 'center',
    },
    modalImage: {
      height: getScaleSize(220),
      width: getScaleSize(200),
      marginBottom: getScaleSize(16),
    },
    modalSubtitle: {
      marginTop: getScaleSize(4),
      marginBottom: getScaleSize(24),
    },
    modalButton: {
      width: '100%',
      paddingVertical: getScaleSize(10),
      borderRadius: getScaleSize(10),
      backgroundColor: theme.primary,
      alignItems: 'center',
      marginTop:getScaleSize(32)
    },
  });
