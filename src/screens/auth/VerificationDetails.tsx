import React, { useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { AccountCreatedModal, AppDropdown, Button, CategoryDropdown, Header, Input, Text, UploadDocumentBox } from '../../components';
import { getScaleSize, SHOW_TOAST, Storage, useString } from '../../constant';
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';
import { FONTS } from '../../assets';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
import { serviceProviderBusinessDocs, serviceProviderIndividualDocs, serviceSeekerBusinessDocs, userRoles } from '../../constant/utils';
import { CommonActions } from '@react-navigation/native';
import { SCREENS } from '..';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addProviderPersonalDetailsAction, addProviderVerificationDetails, addProviderVerificationDocAction, addVerificationDocAction, getAllCategoriesAction, updateSelectedCategoriesAction } from '../../actions/auth/authAction';
import NavigationService from '../NavigationService';

const docRoleMap = {
  [userRoles.Service_Seeker_business]: serviceSeekerBusinessDocs,
  [userRoles.Service_Provider_business]: serviceProviderBusinessDocs,
  [userRoles.Service_Provider_individual]: serviceProviderIndividualDocs
};

// const experienceData = [
//   { label: "0", value: "0" },
//   { label: "1", value: "1" },
//   { label: "2", value: "2" },
//   { label: "3", value: "3" },
//   { label: "4", value: "4" },
//   { label: "5", value: "5" },
//   { label: "6", value: "6" },
//   { label: "7", value: "7" },
//   { label: "8", value: "8" },
//   { label: "9", value: "9" },
//   { label: "10", value: "10" },
// ];

const experienceData = [
  { label: "0-2 (Beginner)", value: "2" },
  { label: "2-5 (Moderate)", value: "3" },
  { label: "Above 5 (Advanced)", value: "5" }
];

const VerificationDetails = (props: any) => {

  const STRING = useString();
  const { theme } = useContext(ThemeContext);
  const { userType } = useContext(AuthContext);
  const { isLoading, allCategoriesData } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState<Record<string, any>>({});
  const [docErrors, setDocErrors] = useState<Record<string, string>>({});

  const [experience, setExperience] = useState("");
  const [cohort, setCohort] = useState("");
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [isAccountCreated, setIsAccountCreated] = useState(false)

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [isSelectCategoryError,setIsSelectCategoryError]=useState("")
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  console.log("allCategoriesData", allCategoriesData)
  useEffect(() => {
    if (step == 3) {
      dispatch(getAllCategoriesAction({}))
    }
  }, [step])

  const docListingData = useMemo(() => {
    return docRoleMap[userType] || [];
  }, [userType]);

  const validateStepOne = useCallback(() => {
    const errors: Record<string, string> = {};

    docListingData.forEach(doc => {
      if (!documents[doc.key]) {
        errors[doc.key] = `${doc.title} is required`;
      }
    });
console.log("errors",errors)
    setDocErrors(errors);

    if (Object.keys(errors).length) {
      // SHOW_TOAST("Please upload all required documents", "error");
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
      setDocErrors(prev => {
        const next = { ...prev };
        delete next[type];
        return next;
      });
    } catch (error) {
      console.log("Document picker error:", error);
    }
  }, []);

  const handleRemoveDocument = useCallback((type: string) => {
    setDocuments(prev => ({
      ...prev,
      [type]: null
    }));
    setDocErrors(prev => {
      const next = { ...prev };
      delete next[type];
      return next;
    });

  }, []);

  function onMultiCategoryChange(items: any[]) {
    setIsSelectCategoryError("")
    setSelectedCategories(items);
    if (items.length > 0) {
      const last = items[items.length - 1];
      setSelectedCategory(last);
    } else {
      setSelectedCategory(null);
    }
  }

  const handleNext = useCallback(async () => {
    const formData = new FormData();
    const appendDoc = (key: string, doc: any) => {
      const file = Array.isArray(doc) ? doc[0] : doc;
      if (!file) return;
      const uri = file?.uri || file?.fileCopyUri || file?.path;
      if (!uri) return;
      const name = file?.name || file?.fileName || 'document';
      const type = file?.type || 'application/octet-stream';
      formData.append(key, { uri, name, type } as any);
    };

    if (userType === userRoles.Service_Seeker_business) {
      if (!validateStepOne()) return;

      appendDoc('certificate_of_incorporation', documents['certificate_of_incorporation']);
      appendDoc('directors_identity_documents', documents['directors_identity_documents']);
      appendDoc('cipa_extract', documents['cipa_extract']);
      appendDoc('tax_clearance', documents['tax_clearance']);
      appendDoc('proof_of_residence', documents['proof_of_residence']);
      appendDoc('company_profile', documents['company_profile']);

      dispatch(addVerificationDocAction(formData, () => {
        NavigationService.reset(SCREENS.BottomBar.identifier);
      }));

      return;
    }
    else {
      if (step === 1) {
        const isValid = validateStepOne();
        if (!isValid) return;
        if (userType === userRoles.Service_Provider_individual) {
          appendDoc('proof_of_residence', documents['proof_of_residence']);
          appendDoc('residence_permit', documents['residence_permit']);
          appendDoc('work_permit', documents['work_permit']);
          appendDoc('certificate_of_qualification', documents['certificate_of_qualification']);

          dispatch(addProviderVerificationDocAction(formData, () => setStep(2)))
          return;
        } else {
          appendDoc('certificate_of_incorporation', documents['certificate_of_incorporation']);
          appendDoc('cipa_extract', documents['cipa_extract']);
          appendDoc('tax_clearance', documents['tax_clearance']);
          appendDoc('directors_identity_documents', documents['directors_identity_documents']);
          appendDoc('proof_of_residence', documents['proof_of_residence']);
          appendDoc('company_profile', documents['company_profile']);
          dispatch(addProviderVerificationDocAction(formData, () => setStep(2)))
        }
      }
      else if (step == 2) {
        if (!experience || !cohort) {
          SHOW_TOAST("Please fill all fields", "error");
          return;
        }
        let apiData = {
          years_of_experience: experience,
          cohort: cohort
        }
        dispatch(addProviderVerificationDetails(apiData, () => { setStep(3) }))
        
        return;
      }
      else {
       if(selectedCategories.length<1){
        SHOW_TOAST("Please select at least one category", "error");
        setIsSelectCategoryError("Please select at least one category")
        return;
       }
        let data = {
          category_ids: selectedCategories.map((item: any) => item.id)
        }
        dispatch(updateSelectedCategoriesAction(data, (res) => {
          setIsAccountCreated(true)
        }))
      }
    }

    // props.navigation.navigate(SCREENS.AddServices.identifier

  }, [step, experience, cohort, documents, validateStepOne, userType, selectedCategories]);

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
          isError={docErrors[doc.key]}
        />
      ));
    }
    if (step == 2) {
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
    }

    return (
      // <View style={styles(theme).dropdownWrapper}>
      <>
        <AppDropdown
          data={allCategoriesData}
          labelField="category_name"
          valueField="id"
          multiSelect
          placeholder={STRING.select_category}
          value={selectedCategories.map((c: any) => c?.id)}
          onChangeMulti={onMultiCategoryChange}
          renderItem={(item: any) => {
            const isSelected = selectedCategories.some((c: any) => c?.id === item?.id);
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: getScaleSize(14), paddingHorizontal: getScaleSize(20) }}>
                <Image source={{ uri: item?.category_logo }} style={{ width: getScaleSize(24), height: getScaleSize(24), marginRight: getScaleSize(12) }} />
                <Text
                  size={getScaleSize(16)}
                  font={FONTS.Lato.SemiBold}
                  color={isSelected ? theme.primary : theme._8C8C8C}
                  style={{ flex: 1 }}
                >
                  {item?.category_name}
                </Text>
                <View
                  style={{
                    width: getScaleSize(20),
                    height: getScaleSize(20),
                    borderRadius: getScaleSize(6),
                    borderWidth: 2,
                    borderColor: isSelected ? theme.primary : theme._D5D5D5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected ? theme.primary : 'transparent'
                  }}
                >
                  {isSelected && (
                    <Text
                      size={getScaleSize(12)}
                      color={theme.white}
                      font={FONTS.Lato.SemiBold}
                      align='center'
                    >{"✓"}</Text>
                  )}
                </View>
              </View>
            );
          }}
          containerStyle={styles(theme).dropdownContainer}
        />
        {isSelectCategoryError && <Text
        size={getScaleSize(12)}
        color={theme.primary}
        font={FONTS.Lato.Regular}
        >{isSelectCategoryError}</Text>}
        </>
      // </View>
    )


  }, [step, docListingData, documents, experience, cohort, selectedCategories, allCategoriesData,docErrors,isSelectCategoryError]);

  return (

    <AppSafeAreaView style={styles(theme).container}>

      <Header
        onBack={() => {

          if (step === 2) {
            setStep(1);
            return;
          }
          else if (step == 3) {
            setStep(2)
            return
          }

          props.navigation.goBack();

        }}
        screenName={step == 3 ? "Add Services" : STRING.verification_details}
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

        ) :
          step == 2 ?
            (

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
            )
            :
            (<>
              <Text
                size={getScaleSize(16)}
                font={FONTS.Lato.SemiBold}
                color={theme.primaryText}
                style={{ marginBottom: getScaleSize(12) }}>
                {STRING.select_a_category}
              </Text>
              <Text
                size={getScaleSize(14)}
                font={FONTS.Lato.SemiBold}
                color={theme._939393}
                style={{ marginBottom: getScaleSize(24) }}>

                {STRING.thank_you_for_choosing_a_category_Now_select_the_services_you_want_to_provide_within_this_category}

              </Text>
            </>
            )
        }

        <ScrollView
          style={styles(theme).scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderStep}
        </ScrollView>

        {step === 1 ? (

          <Button
            loading={isLoading}
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
              onPress={() => {
                if (step !== 1) {
                  setStep(step - 1)
                }
              }}
            />

            <Button
              title={STRING.next}
              style={styles(theme).nextBtn}
              onPress={handleNext}
            />

          </View>

        )}

      </View>
      {isAccountCreated && (
        <AccountCreatedModal
          visible={isAccountCreated}
          onPressHome={() => {
            setIsAccountCreated(false);
            NavigationService.navigate(SCREENS.BottomBar.identifier);
          }}
          isGoToHome={true}
        />
      )}
    </AppSafeAreaView>

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
      paddingTop: getScaleSize(24),
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

    btnStyle: {
      marginBottom: getScaleSize(10),
      paddingVertical: getScaleSize(18)
    },

    stepTwoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: getScaleSize(10),
    },

    prevBtn: {
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.primary,
      width: getScaleSize(183),
      paddingVertical: getScaleSize(18)
    },

    nextBtn: {
      width: getScaleSize(183),
      paddingVertical: getScaleSize(18)
    },

    stepTwoFields: {
      gap: getScaleSize(20)
    },

    dropdownContainer: {
      marginTop: getScaleSize(8),
      marginBottom:getScaleSize(6),
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