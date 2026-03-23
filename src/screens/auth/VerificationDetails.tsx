import React, { useContext, useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppDropdown, Button, Header, Input, Text, UploadDocumentBox } from '../../components';
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';
import { FONTS } from '../../assets';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
import { serviceProviderBusinessDocs, serviceproviderIndividualDocs, serviceSeekerBusinessDocs, userRoles } from '../../constant/utils';
import { CommonActions } from '@react-navigation/native';
import { SCREENS } from '..';

const docRoleMap = {
  [userRoles.Service_Seeker_business]: serviceSeekerBusinessDocs,
  [userRoles.Service_Provider_business]: serviceProviderBusinessDocs,
  [userRoles.Service_Provider_individual]: serviceproviderIndividualDocs
};

const experienceData = [
  { label: "0-2 (Beginner)", value: "beginner" },
  { label: "2-5 (Moderate)", value: "moderate" },
  { label: "Above 5 (Advanced)", value: "advanced" }
];

const VerificationDetails = (props: any) => {

  const STRING = useString();
  const { theme } = useContext(ThemeContext);
  const { userType } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState<Record<string, any>>({});

  const [experience, setExperience] = useState("");
  const [cohort, setCohort] = useState("");

  const docListingData = useMemo(() => {
    return docRoleMap[userType] || [];
  }, [userType]);

  const validateStepOne = useCallback(() => {

    const hasMissing = docListingData.some(doc => !documents[doc.key]);

    if (hasMissing) {
      SHOW_TOAST("Please upload all required documents", "error");
      return false;
    }

    return true;

  }, [documents, docListingData]);

  const handlePickDocument = useCallback(async (type: string) => {

    try {

      const result = await pick({ type: [types.allFiles] });

      if (isErrorWithCode(result) && result.code === errorCodes.CANCELLED) {
        return;
      }

      setDocuments(prev => ({
        ...prev,
        [type]: result
      }));

    } catch (error) {
      console.log("Document picker error:", error);
    }

  }, []);

  const handleRemoveDocument = useCallback((type: string) => {

    setDocuments(prev => ({
      ...prev,
      [type]: null
    }));

  }, []);

  const handleNext = useCallback(() => {

    if (userType === userRoles.Service_Seeker_business) {

      // props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: SCREENS.Login.identifier }]
      //   })
      // );

        props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier, {
                                  id: ""
                              });

      return;
    }

    if (step === 1) {
      // if (!validateStepOne()) return;
      setStep(2);
      return;
    }

    // if (!experience || !cohort) {
    //     SHOW_TOAST("Please fill all fields", "error");
    //     return;
    // }

    props.navigation.navigate(SCREENS.AddServices.identifier)

    console.log({
      documents,
      experience,
      cohort
    });

  }, [step, experience, cohort, documents, validateStepOne, userType]);

  const dropDownRenderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles(theme).dropdownItem}>
        <Text
          size={getScaleSize(16)}
          color={experience === item?.value ? theme.primary : theme._8C8C8C}
        >
          {item?.label}
        </Text>
        <View
          style={[
            styles(theme).radioCircle,
            experience === item?.value
              ? styles(theme).radioActive
              : styles(theme).radioInactive
          ]}
        />

      </View>
    );
  };

  const renderStep = useMemo(() => {

    if (step === 1) {

      return docListingData.map((doc) => (

        <UploadDocumentBox
          key={doc.key}
          title={doc.title}
          noteText={doc.noteText}
          value={documents[doc.key]}
          onPress={() => handlePickDocument(doc.key)}
          handleCancel={() => handleRemoveDocument(doc.key)}
        />

      ));
    }

    return (

      <View style={styles(theme).stepTwoFields}>

        <AppDropdown
          data={experienceData}
          placeholder="Select experience"
          value={experience}
          onChange={(item: any) => setExperience(item.value)}
          renderItem={(item: any) => dropDownRenderItem({ item })}
          containerStyle={styles(theme).dropdownContainer}
        />

        <Input
          inputTitle={STRING.cohort}
          placeholder={STRING.cohort}
          value={cohort}
          onChangeText={setCohort}
        />

      </View>

    );

  }, [step, docListingData, documents, experience, cohort]);

  return (

    <View style={styles(theme).container}>

      <Header
        onBack={() => {

          if (step === 2) {
            setStep(1);
            return;
          }

          props.navigation.goBack();

        }}
        screenName={STRING.verification_details}
      />

      <View style={styles(theme).contentContainer}>

        {step === 1 ? (

          <Text
            font={FONTS.Lato.SemiBold}
            size={getScaleSize(14)}
            color={theme._8C8C8C}
            style={styles(theme).descriptionText}
          >
            {STRING.upload_the_required_documents_to_complete_your_profile_verification}
          </Text>

        ) : (

          <>
            <Text
              font={FONTS.Lato.SemiBold}
              size={getScaleSize(16)}
              style={styles(theme).experienceTitle}
            >
              {STRING.years_of_experience}
            </Text>
            <Text
              font={FONTS.Lato.Regular}
              size={getScaleSize(16)}
              color={theme._8C8C8C}
              style={styles(theme).experienceDesc}
            >
              {STRING.tell_us_more_about_your_professional_background_Enter_your_years_of_experience_to_showcase_your_expertise}
            </Text>
          </>
        )}

        <ScrollView
          style={styles(theme).scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderStep}
        </ScrollView>

        {step === 1 ? (

          <Button
            title={STRING.next}
            style={styles(theme).btnStyle}
            onPress={handleNext}
          />

        ) : (

          <View style={styles(theme).stepTwoContainer}>

            <Button
              title={STRING.back}
              style={styles(theme).prevBtn}
              titleColor={theme.primary}
              onPress={() => setStep(1)}
            />

            <Button
              title={STRING.next}
              style={styles(theme).nextBtn}
              onPress={handleNext}
            />

          </View>

        )}

      </View>

    </View>

  );
};

export default VerificationDetails;

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({

    container: {
      backgroundColor: theme.white,
      flex: 1
    },

    contentContainer: {
      flex: 1,
      paddingHorizontal: getScaleSize(24),
      paddingVertical: getScaleSize(24)
    },

    scrollContainer: {
      paddingBottom: getScaleSize(50)
    },

    descriptionText: {
      marginBottom: getScaleSize(32)
    },

    experienceTitle: {
      marginBottom: getScaleSize(12)
    },

    experienceDesc: {
      marginBottom: getScaleSize(20)
    },

    btnStyle: {},

    stepTwoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    prevBtn: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.primary,
      width: getScaleSize(183),
      paddingVertical: getScaleSize(14)
    },

    nextBtn: {
      width: getScaleSize(183),
      paddingVertical: getScaleSize(14)
    },

    stepTwoFields: {
      gap: getScaleSize(20)
    },

    dropdownContainer: {
      marginTop: getScaleSize(8),
      paddingVertical: 2,
      borderRadius: getScaleSize(10),
      elevation: 5,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      backgroundColor: theme.white
    },

    dropdownItem: {
      paddingHorizontal: getScaleSize(20),
      paddingVertical: getScaleSize(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    radioCircle: {
      width: 18,
      height: 18,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10
    },

    radioActive: {
      borderWidth: 5,
      borderColor: theme.primary
    },

    radioInactive: {
      borderWidth: 2,
      borderColor: theme._8C8C8C
    }

  });