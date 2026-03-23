import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

//COMPONENTS
import { BottomSheet, Button, DocumentStatusItem, EmptyView, Header, StatusItem, Text, UploadDocumentsSheet } from '../../components';
import { SCREENS } from '..';
import { API } from '../../api';
import { useIsFocused } from '@react-navigation/native';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';

const dummyApplicationStatus = {
    subscription: true,

    // change this to test UI:
    doc_status: "rejected",
    // "under_review" | "approved" | "rejected",
};

export const documentUploadData = [
  {
    id: "certificate",
    title: "Certificate of incorporation",
    key: "certificate",
    required: true,
  },
  {
    id: "cipa",
    title: "CIPA extract",
    key: "cipa",
    required: true,
  },
  {
    id: "tax",
    title: "Tax Clearance",
    key: "tax",
    required: true,
  },
  {
    id: "address",
    title: "Proof of residence",
    key: "address",
    required: true,
    errorText: "less than 3 months old (e.g., water or electricity bill)",
  },
  {
    id: "directors",
    title: "Directors Identity Documents",
    key: "directors",
    required: true,
  },
  {
    id: "company",
    title: "Company Profile",
    key: "company",
    required: true,
  },
];


export default function ApplicationStatus(props: any) {
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const bottomSheetRef = useRef<any>(null);
    const successBottomSheetRef = useRef<any>(null);

    const [isLoading, setLoading] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<any>(null);
    const [statsData, setStatsData] = useState<any>(null);
    // const [certificate, setCertificate] = useState<any>([]);
    // const [kbisExtract, setKbisExtract] = useState<any>([]);
    // const [addressProof, setAddressProof] = useState<any>([]);

    const [documents, setDocuments] = useState<any>({});
    const isFocused = useIsFocused();

    // useEffect(() => {
    //     if (isFocused) {
    //         getApplicationStatus();
    //     }
    // }, [isFocused]);

    useEffect(() => {
        setApplicationStatus(dummyApplicationStatus);
    }, []);

    async function getApplicationStatus() {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getApplicationStatus);
            if (result.status) {
                console.log('applicationStatus==>', result?.data?.data);
                setApplicationStatus(result?.data?.data ?? {});
            } else {
                SHOW_TOAST(result?.data?.message, 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     getStatsData();
    // }, [applicationStatus]);

    // function getStatsData() {

    //     const status = []

    //     if (applicationStatus?.subscription) {
    //         status.push({
    //             id: 1,
    //             name: "Subscribed",
    //             description: "You are successfully subscribed.",
    //             completed: true,
    //         });
    //     }

    //     if (applicationStatus?.subscription && !applicationStatus?.doc_status || applicationStatus?.doc_status == 'null') {
    //         status.push({
    //             id: 2,
    //             name: "Upload Documents",
    //             description: "Upload your documents to get verified.",
    //             completed: false,
    //         });
    //     }

    //     if (applicationStatus?.subscription && applicationStatus?.doc_status == 'uploaded') {
    //         status.push({
    //             id: 2,
    //             name: "Documents Uploaded",
    //             description: "Your documents have been received and are being processed.",
    //             completed: true,
    //         });

    //         status.push({
    //             id: 3,
    //             name: "Under Review",
    //             description: "Your profile is in review and will be assessed by a system administrator within 72 hours. After approval, you can begin sending quotes for service requests.",
    //             serviceRunning: true,
    //         });
    //     }

    //     if (applicationStatus?.subscription && applicationStatus?.doc_status == 'accepted') {
    //         status.push({
    //             id: 2,
    //             name: "Documents Uploaded",
    //             description: "All documents verified.",
    //             completed: true,
    //         });

    //         status.push({
    //             id: 4,
    //             name: "Accepted",
    //             description: "Your profile is active.",
    //             completed: true,
    //         });
    //     }

    //     if (applicationStatus?.subscription && applicationStatus?.doc_status == 'rejected') {
    //         status.push({
    //             id: 2,
    //             name: "Documents Uploaded",
    //             description: "Documents verified.",
    //             completed: true,
    //         });
    //         status.push({
    //             id: 5,
    //             name: "Rejected",
    //             description: "Some documents are currently missing. Please upload the required documents within the next 15 days to avoid account deletion and a €30 fee charged to your registered card.",
    //             isRejected: true,
    //         });
    //     }
    //     setStatsData(status);
    // }

    useEffect(() => {
        if (!applicationStatus) return;

        const status: any[] = [];

        // ⏳ UNDER REVIEW (uploaded)
        if (applicationStatus.doc_status === "under_review") {
            status.push(
                {
                    id: 1,
                    name: "Your documents have been received and are being processed.",
                    description:
                        "Your documents have been received and are being processed.",
                    completed: true,
                },
                {
                    id: 2,
                    name: "Under Review",
                    description:
                        "Your profile is in review and will be assessed by a system administrator within 72 hours. After approval, you can begin sending quotes for service requests.",
                    serviceRunning: true,
                },
                {
                    id: 3,
                    name: "Approved",
                    description: "Pending.",
                }
            );
        }

        // ✅ APPROVED
        if (applicationStatus.doc_status === "approved") {
            status.push(
                {
                    id: 1,
                    name: "Documents Uploaded",
                    description: "All documents verified.",
                    completed: true,
                },
                {
                    id: 2,
                    name: "Approved",
                    description: "Your profile is active.",
                    completed: true,
                }
            );
        }

        // ❌ REJECTED
        if (applicationStatus.doc_status === "rejected") {
            status.push(
                 {
                    id: 1,
                    name: "Subscribed",
                    description: "Subscription confirmed.",
                    completed: true,
                },
                {
                    id: 2,
                    name: "Documents Uploaded",
                    description: "Documents submitted.",
                    completed: true,
                },
                {
                    id: 2,
                    name: "Rejected",
                    description:
                        "The provided documents do not meet our verification standards. Please upload your document again.",
                    isRejected: true,
                }
            );
        }

        setStatsData(status);
    }, [applicationStatus]);
    // const pickDocument = async (type: string) => {
    //     try {
    //         const result = await pick({
    //             type: [types.allFiles],
    //         });

    //         if (type === 'id') {
    //             setCertificate(result);
    //         } else if (type === 'kbis') {
    //             setKbisExtract(result);
    //         } else if (type === 'address_proof') {
    //             setAddressProof(result);
    //         }
    //     } catch (err) {
    //         if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
    //             console.log('User cancelled');
    //         } else {
    //             console.log('Error:', err);
    //         }
    //     }
    // };


    const pickDocument = async (key: string) => {
  try {
    const result = await pick({
      type: [types.allFiles],
    });

    setDocuments((prev: any) => ({
      ...prev,
      [key]: result,
    }));

  } catch (err) {
    if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
      return;
    }
  }
};

   async function uploadDocuments() {
  if (!validateDocuments()) return;

  const formData = new FormData();

  documentUploadData.forEach((item) => {
    const file = documents[item.key]?.[0];

    if (file) {
      formData.append(item.key, {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    }
  });

  try {
    setLoading(true);

    const result = await API.Instance.post(
      API.API_ROUTES.uploadDocuments,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    if (result.status) {
      bottomSheetRef.current?.close();
      successBottomSheetRef.current?.open();
    } else {
      SHOW_TOAST(result?.data?.message, 'error');
    }
  } catch (error: any) {
    SHOW_TOAST(error?.message, 'error');
  } finally {
    setLoading(false);
  }
}
    const validateDocuments = () => {
  let isValid = true;
  let updatedDocs = { ...documents };

  documentUploadData.forEach((item) => {
    if (!updatedDocs[item.key]) {
      updatedDocs[item.key] = {
        error: "This document is required",
      };
      isValid = false;
    } else {
      updatedDocs[item.key].error = "";
    }
  });

  setDocuments(updatedDocs);
  return isValid;
};

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={"Verification Status"}
            />
            {isLoading ? (
                <View style={{ marginTop: getScaleSize(100), alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={theme.primary} />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles(theme).scrolledContainer}>
                    <Text
                        size={11}
                        font={FONTS.Lato.Regular}
                        color={theme.secondaryText}>
                        {applicationStatus?.doc_status === "under_review" &&
                            "Your profile is currently under review by our system administrators. This process may take up to 72 hours. Once approved, you will be able to start sending quotes for service requests."}

                        {applicationStatus?.doc_status === "approved" &&
                            "Congratulations! Your profile has been successfully verified and approved. You can now begin sending quotes for service requests."}

                        {applicationStatus?.doc_status === "rejected" &&
                            "Unfortunately, your application could not be approved due to missing or invalid documents."}
                    </Text>

                    <View style={styles(theme).statusContainer}>
                        {statsData && statsData.map((item: any, index: number) => (
                            <DocumentStatusItem
                                key={item.id}
                                item={item}
                                index={index}
                                isLast={index === statsData.length - 1}
                            />
                        ))}
                        {(!applicationStatus?.doc_status || applicationStatus?.doc_status == 'null') && (
                            <TouchableOpacity
                                onPress={() => {
                                    bottomSheetRef.current?.open();
                                }}
                                style={styles(theme).uploadDocumentsButton}>
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    align="center"
                                    color={theme.white}>
                                    {STRING.upload_documents}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {applicationStatus?.doc_status == 'rejected' && (
                            <TouchableOpacity
                                onPress={() => {
                                    bottomSheetRef.current?.open();
                                }}
                                style={styles(theme).uploadDocumentsButton}>
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    align="center"
                                    color={theme.white}>
                                    {STRING.upload_documents}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            )}
            <UploadDocumentsSheet
  bottomSheetRef={bottomSheetRef}
  height={700}
  buttonTitle={"Upload Documents"}
  onPressDocument={pickDocument}
  uploadDocData={documentUploadData}
  documents={documents}
  onPressButton={
    // uploadDocuments
    () => {
        setTimeout(()=>{
            bottomSheetRef.current?.close();
            successBottomSheetRef.current?.open()
        },100)
    }
    }
/>
            <BottomSheet
                bottomSheetRef={successBottomSheetRef}
                height={350}
                isStatus={true}
                title={STRING.documents_uploaded_successfully_your_documents_will_be_reviewed_within_72_hours}
                buttonTitle={STRING.proceed}
                onPressButton={() => {
                    successBottomSheetRef.current?.close();
                    props.navigation.goBack();
                }}
            />
        </View>
    )

}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.white },
        scrolledContainer: {
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(24),
        },
        statusContainer: {
            marginTop: getScaleSize(24),
            borderWidth: 1,
            borderColor: theme._E6E6E6,
            borderRadius: getScaleSize(12),
            padding: getScaleSize(24),
        },
        uploadDocumentsButton: {
            backgroundColor: theme.primary,
            borderRadius: getScaleSize(8),
            padding: getScaleSize(12),
            // alignSelf: 'flex-end',
        },
        emptyView: {
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(24),
            flex: 1,
        },
    })

