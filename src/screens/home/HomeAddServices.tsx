import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../../context'
import { getScaleSize } from '../../constant'
import { Button, Input, KeyBoardAware, Text, UploadDocumentBox } from '../../components'
import { FONTS, IMAGES } from '../../assets'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const HomeAddServices = (props: any) => {
  const insets = useSafeAreaInsets()
  const { theme } = useContext(ThemeContext)

  const [state, setSate] = useState({
    name: "",
    discription: "",
    docuploadFromDevice: "",
    docuploadFromCamera: ""
  })

  const pickImageFromCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back', // or 'front'
      quality: 0.8,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset: any = response.assets[0];

        setSate((prev) => ({
          ...prev,
          docuploadFromCamera: asset,
        }));
      }
    });
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        const asset: any = response.assets[0];
        setSate((prev) => ({
          ...prev,
          docuploadFromDevice: asset,
        }));
        // setProfileImage(asset);
        // uploadProfileImage(asset);
      } else {
        console.log('response', response);
      }
    });
  };

  return (
    <View style={[styles(theme).container, { paddingTop: insets.top }]}>
      <KeyBoardAware style={styles(theme).content}>

        <Text
          size={getScaleSize(20)}
          font={FONTS.Lato.Bold}
          color={theme.primaryText}
        >
          {"Describe About Service"}
        </Text>

        <Text
          size={getScaleSize(14)}
          color={theme._8C8C8C}
          font={FONTS.Lato.SemiBold}
          style={styles(theme).subText}
        >
          {"Great job! You’ve selected your service. Now, please describe what you need so the professional can understand your request better."}
        </Text>

        <Input
          placeholder={"Enter name of service"}
          placeholderTextColor={theme._B3B3B3}
          inputTitle={"Name"}
          mainContinerStyle={styles(theme).inputSpacing}
          value={state?.name}
          maxLength={100}
          onChangeText={text =>
            setSate(prev => ({ ...prev, name: text }))
          }
        />

        <Input
          placeholder="Enter description here..."
          placeholderTextColor={theme._B3B3B3}
          inputTitle="Enter Service description"
          mainContinerStyle={styles(theme).inputSpacing}
          containerStyle={styles(theme).descriptionBox}
          inputContainer={styles(theme).descriptionInput}
          value={state?.discription}
          maxLength={200}
          multiline
          numberOfLines={6}
          onChangeText={text =>
            setSate(prev => ({ ...prev, discription: text }))
          }
        />

        <Text
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme.primaryText}
          style={styles(theme).uploadTitle}
        >
          {"Upload Photos of a Job"}
        </Text>

        <View style={styles(theme).uploadRow}>
          <UploadDocumentBox
            uploadBoxStyle={styles(theme).uploadBox}
            textFont={FONTS.Lato.Regular}
            value={state?.docuploadFromDevice}
            onPress={pickImage}
          />

          <UploadDocumentBox
            uploadBoxStyle={styles(theme).uploadBox}
            textFont={FONTS.Lato.Regular}
            icon={IMAGES.ic_camera}
            value={state?.docuploadFromCamera}
            label="Take Photo"
            onPress={pickImageFromCamera}
          />
        </View>

        <Text
          size={getScaleSize(16)}
          color={theme._8C8C8C}
          font={FONTS.Lato.Regular}
          style={styles(theme).uploadHint}
        >
          {"Please upload photos of the job so the worker can understand the task better.\n (You can also upload a video)"}
        </Text>

        <View style={styles(theme).buttonRow}>
          <Button
            title="Back"
            style={styles(theme).prevBtn}
            titleColor={theme.primary}
            onPress={() => props.navigation.goBack()}
          />

          <Button
            title="Next"
            style={styles(theme).nextBtn}
          />
        </View>

      </KeyBoardAware>
    </View>
  )
}

export default HomeAddServices

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },

    content: {
      flex: 1,
      paddingHorizontal: getScaleSize(24),
      marginTop: getScaleSize(20),
    },

    subText: {
      marginTop: getScaleSize(12),
    },

    inputSpacing: {
      marginTop: getScaleSize(32),
    },

    descriptionBox: {
      height: getScaleSize(240),
    },

    descriptionInput: {
      height: "100%",
    },

    uploadTitle: {
      marginTop: getScaleSize(20),
    },

    uploadRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: getScaleSize(12),
    },

    uploadBox: {
      borderStyle: "solid",
      height: getScaleSize(144),
      width: getScaleSize(184),
    },

    uploadHint: {
      marginTop: getScaleSize(10),
    },

    buttonRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: getScaleSize(92),
      marginBottom: getScaleSize(50),
    },

    prevBtn: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.primary,
      width: getScaleSize(183),
      paddingVertical: getScaleSize(14),
    },

    nextBtn: {
      width: getScaleSize(183),
      paddingVertical: getScaleSize(14),
    },
  });