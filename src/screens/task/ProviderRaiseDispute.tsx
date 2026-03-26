import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { getScaleSize, useString } from '../../constant';
import { ThemeContext, ThemeContextType } from '../../context';
import { AccountCreatedModal, AppDropdown, Header, Input, KeyBoardAware, Text, UploadDocumentBox } from '../../components';
import { FONTS, IMAGES } from '../../assets';
import Collapsible from 'react-native-collapsible';
import { SCREENS } from '..';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const disputeReasons = [
    { id: 1, label: "Poor service quality" },
    { id: 2, label: "Service not completed properly" },
    { id: 3, label: "Work does not match description" },
    { id: 4, label: "Issue still not resolved" },
    { id: 5, label: "Low professionalism / behavior issue" },
    { id: 6, label: "Incomplete work" },
    { id: 7, label: "Other" },
];

const disputeRaiseStatusData = [
    {
        id: 0,
        name: "Submitted", // 👈 REQUIRED
        title: "Submitted",
        date: "Fri, 20 Jan’ 2025  -  3:15pm",
        completed: true,
    },
    {
        id: 1,
        name: "Under Review",
        title: "Under Review",
        date: "Fri, 20 Jan’ 2025  -  3:15pm",
        completed: true,
    },
    {
        id: 2,
        name: "Awaiting Response",
        title: "Awaiting Response",
        date: "Fri, 20 Jan’ 2025  -  3:15pm",
        completed: false,
    },
];


export const disputeLifecycle = [
    {
        id: 0,
        name: "Submitted",
        title: "Submitted",
        completed: true,
        time: "2025-01-20T15:15:00Z",
    },
    {
        id: 1,
        name: "Under Review",
        title: "Under Review",
        completed: true,
        time: "2025-01-20T15:15:00Z",
    },
    {
        id: 2,
        name: "Awaiting Provider Response",
        title: "Awaiting Provider Response",
        completed: true,
        time: "2025-01-20T15:15:00Z",
    },
    {
        id: 3,
        name: "Awaiting Customer Response",
        title: "Awaiting Customer Response",
        completed: true,
        time: "2025-01-20T15:15:00Z",
    },
    {
        id: 4,
        name: "Resolved",
        title: "Resolved",
        completed: true,
        time: "2025-01-18T19:07:00Z",
    },
    {
        id: 5,
        name: "Rejected",
        title: "Rejected",
        completed: false,
        isRejected: true, // 👈 IMPORTANT (red line/icon)
        time: "2025-01-20T15:15:00Z",
    },
    {
        id: 6,
        name: "Closed",
        title: "Closed",
        completed: false,
        time: "2025-01-20T15:15:00Z",
    },
];



const ProviderRaiseDispute = (props: any) => {
    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);
    const { isDisputed } = props?.route?.params ?? ""

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [customReason, setCustomReason] = useState("");
    const [isDisputeStatus, setIsDisputeStatus] = useState(isDisputed);
    const [isDisputeStatusOpen, setIsDisputeStatusOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [docUploadFromCamera, setDocUploadFromCamera] = useState(null)
    const [docUploadFromDevice, setDocUploadFromDevice] = useState(null)
    const [filled, setFilled] = useState(false)

    const selectedLabel =
        disputeReasons.find(i => i.id === selectedId)?.label || "Select Reason";

    function getImage(item: any) {
        if (item?.name === 'Submitted ') {
            if (item?.completed) {
                return IMAGES.service_running;
            }
        }

        if (item?.name === 'Under Review ') {
            //   if (isProcessing) {
            return IMAGES.service_running;
            //   }
        }
        // IMAGES.status_green
        if (item?.completed) {
            return IMAGES.status_green;
        }

        if (item?.name === 'Awaiting Response ') {
            return IMAGES.ic_cancelled;
        }

        // 4️⃣ Default / empty state
        return IMAGES.empty_view;
    }

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

                setDocUploadFromCamera(asset);
            }
        });
    };

    const pickImage = async () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (!response.didCancel && !response.errorCode && response.assets) {
                const asset: any = response.assets[0];
                setDocUploadFromDevice(asset);
                // setProfileImage(asset);
                // uploadProfileImage(asset);
            } else {
                console.log('response', response);
            }
        });
    };



    return (
        <View style={styles(theme).mainContainer}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={"Raise Dispute"}
            />
            <KeyBoardAware
                contentContainerStyle={styles(theme).container}
            >
                <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._404040}
                    style={{ marginBottom: getScaleSize(8) }}
                >
                    Dispute Reason
                </Text>

                {/* DROPDOWN BUTTON */}
                <TouchableOpacity
                    style={styles(theme).dropdownHeader}
                    onPress={() => {
                        setIsOpen(!isOpen)
                        setIsDisputeStatusOpen(false)
                    }}
                >
                    <Text
                        size={getScaleSize(16)}
                        font={selectedId ? FONTS.Lato.SemiBold : FONTS.Lato.Regular}
                        color={selectedId ? theme.primaryText : theme._8C8C8C}
                    >
                        {selectedLabel}
                    </Text>
                    <Image
                        source={IMAGES.ic_down}
                        style={[styles(theme).iconStyle, {
                            transform: [{ rotate: isOpen ? "180deg" : "0deg" }]
                        }]}
                    />
                </TouchableOpacity>
                <Collapsible collapsed={!isOpen} style={styles(theme).dropdownContainer}>
                    {disputeReasons.map((item) => {
                        const isSelected = selectedId === item.id;
                        return (
                            <View key={item.id}>
                                <TouchableOpacity
                                    style={styles(theme).itemRow}
                                    onPress={() => {
                                        setSelectedId(item.id)
                                        if (item.id === 7) {
                                            setCustomReason("")
                                        } else {
                                            setIsOpen(false)
                                        }
                                    }}
                                >
                                    <Text
                                        size={getScaleSize(14)}
                                        color={isSelected ? theme.primary : theme._8C8C8C}
                                        style={{
                                            color: isSelected
                                                ? theme.primary
                                                : theme._8C8C8C,
                                        }}
                                    >
                                        {item.label}
                                    </Text>

                                    <View
                                        style={[
                                            styles(theme).radio,
                                            isSelected && styles(theme).radioActive,
                                        ]}
                                    />
                                </TouchableOpacity>

                                {/* OTHER INPUT */}
                                {item.id === 7 && (
                                    <TextInput
                                        placeholder="Enter Reason Here If Selecting Other"
                                        placeholderTextColor={theme._8C8C8C}
                                        value={customReason}
                                        onChangeText={setCustomReason}
                                        style={styles(theme).input}
                                    />
                                )}
                            </View>
                        );
                    })}
                </Collapsible>

                <View
                    style={{
                        marginTop: getScaleSize(24),
                    }}
                >
                    {/* TITLE */}
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._404040}
                    >
                        {"Describe the issue"}
                    </Text>

                    {/* TEXT INPUT */}
                    <TextInput
                        placeholder="Enter description here..."
                        placeholderTextColor={theme._8C8C8C}
                        multiline
                        style={styles(theme).descriptionInput}
                    />

                    {/* UPLOAD TITLE */}
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._404040}
                        style={{ marginTop: getScaleSize(20) }}
                    >
                        {"Upload Photos of a Job"}
                    </Text>

                    {/* UPLOAD OPTIONS */}
                    <View
                        style={styles(theme).uploadOptions}
                    >
                        <UploadDocumentBox
                            onPress={() => { pickImage() }}
                            uploadBoxStyle={styles(theme).uploadBoxStyle}
                            icon={IMAGES.upload_attachment}
                            value={docUploadFromDevice}
                        />
                        <UploadDocumentBox
                            onPress={() => { pickImageFromCamera() }}
                            uploadBoxStyle={styles(theme).uploadBoxStyle}
                            icon={IMAGES.ic_camera}
                            label={"Take Photo"}
                            value={docUploadFromCamera}
                        />
                    </View>

                    {/* INFO TEXT */}
                    <Text
                        size={getScaleSize(14)}
                        color={theme._8C8C8C}
                        font={FONTS.Lato.Regular}
                        style={styles(theme).infoText}
                    >
                        {"Please upload photos of the job so the worker can understand the task better.\n(You can also upload a video)"}
                    </Text>
                    {
                        (!isDisputeStatus && !filled) && (
                            <>
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme._404040}
                                    style={{marginTop:getScaleSize(40)}}
                                >{"Dispute Status"}</Text>
                                 <View style={styles(theme).disputeContainer}>
                                    {disputeRaiseStatusData.map((item, index) => {
                                        const isLast = index === disputeRaiseStatusData.length - 1;
                                        return (
                                            <View key={item.id} style={styles(theme).disputeStatusRow}>

                                                {/* LEFT ICON + LINE */}
                                                <View style={styles(theme).leftContainer}>
                                                    <Image
                                                        style={{
                                                            height: getScaleSize(24),
                                                            width: getScaleSize(24),
                                                            resizeMode: 'contain',
                                                        }}
                                                        source={getImage(item)}
                                                    />
                                                    {!item?.completed && item?.id && getImage(item) !== IMAGES.service_running && getImage(item) !== IMAGES.ic_cancelled && (
                                                        <Text
                                                            style={{ position: 'absolute', top: getScaleSize(1.5) }}
                                                            size={getScaleSize(12)}
                                                            font={FONTS.Lato.Medium}
                                                            color={theme.white}
                                                        >
                                                            {String(item?.id != null ? item.id + 1 : 0)}
                                                        </Text>
                                                    )}

                                                    {/* LINE */}
                                                    {/* {!isLast && <View style={styles(theme).line} />} */}
                                                </View>

                                                {/* RIGHT CONTENT */}
                                                <View style={styles(theme).content}>
                                                    <Text
                                                        size={getScaleSize(14)}
                                                        font={FONTS.Lato.SemiBold}
                                                        color={theme.primaryText}
                                                    >
                                                        {item.title}
                                                    </Text>

                                                    <Text
                                                        size={getScaleSize(12)}
                                                        font={FONTS.Lato.Medium}
                                                        color={theme._8C8C8C}
                                                        style={styles(theme).date}
                                                    >
                                                        {item.date}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </>
                        )
                    }
                    {/* {isDisputeStatus && (
                        <>
                            <TouchableOpacity
                                style={[styles(theme).dropdownHeader, { marginTop: getScaleSize(40) }]}
                                onPress={() => {
                                    setIsDisputeStatusOpen(!isDisputeStatusOpen)
                                    setIsOpen(false)
                                }
                                }
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.primaryText}
                                >{"Dispute Status"}</Text>
                                <Image
                                    source={IMAGES.ic_down}
                                    style={[styles(theme).iconStyle, {
                                        transform: [{ rotate: isDisputeStatusOpen ? "180deg" : "0deg" }]
                                    }]}
                                />
                            </TouchableOpacity>
                            <Collapsible
                                collapsed={!isDisputeStatusOpen}
                            >
                                <View style={styles(theme).disputeContainer}>
                                    {disputeLifecycle.map((item, index) => {
                                        const isLast = index === disputeLifecycle.length - 1;
                                        return (
                                            <View key={item.id} style={styles(theme).disputeStatusRow}>

                                                <View style={styles(theme).leftContainer}>
                                                    <Image
                                                        style={{
                                                            height: getScaleSize(24),
                                                            width: getScaleSize(24),
                                                            resizeMode: 'contain',
                                                        }}
                                                        source={getImage(item)}
                                                    />
                                                    {!item?.completed && item?.id && getImage(item) !== IMAGES.service_running && getImage(item) !== IMAGES.ic_cancelled && (
                                                        <Text
                                                            style={{ position: 'absolute', top: getScaleSize(1.5) }}
                                                            size={getScaleSize(12)}
                                                            font={FONTS.Lato.Medium}
                                                            color={theme.white}
                                                        >
                                                            {String(item?.id != null ? item.id + 1 : 0)}
                                                        </Text>
                                                    )}

                                                </View>

                                                <View style={styles(theme).content}>
                                                    <Text
                                                        size={getScaleSize(14)}
                                                        font={FONTS.Lato.SemiBold}
                                                        color={theme.primaryText}
                                                    >
                                                        {item?.title}
                                                    </Text>

                                                    <Text
                                                        size={getScaleSize(12)}
                                                        font={FONTS.Lato.Medium}
                                                        color={theme._8C8C8C}
                                                        style={styles(theme).date}
                                                    >
                                                        {item.date}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </Collapsible>
                        </>
                    )
                    } */}

                    {/* BUTTONS */}
                    {/* {!isDisputeStatus && ( */}
                        
                        {/* )} */}

                </View>
            </KeyBoardAware>
            <View
                            style={styles(theme).buttonContainer}
                        >
                            {/* BACK */}
                            <TouchableOpacity
                                style={[styles(theme).nextButton, {
                                    backgroundColor: theme.white,
                                    borderWidth: 1,
                                    borderColor: theme.primary,
                                }]}
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.primary}
                                >
                                    {"Back"}
                                </Text>
                            </TouchableOpacity>

                            {/* NEXT */}
                            <TouchableOpacity
                                style={styles(theme).nextButton}
                                onPress={() => {
                                    // setIsVisible(true)
                                    if (!filled) {
                                        setFilled(true)
                                        setIsDisputeStatus(true)
                                    } else {
                                        setIsVisible(true)
                                    }
                                }}
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.white}
                                >
                                    {"Next"}
                                </Text>
                            </TouchableOpacity>
                        </View>
            {
                isVisible && <AccountCreatedModal
                    visible={isVisible}
                    isGoToHome
                    onPressHome={() => {
                        setIsVisible(false)
                        setTimeout(() => {
                            props.navigation.navigate(SCREENS.BottomBar.identifier)
                        }, 100)
                    }}
                    discriptionSize={getScaleSize(18)}
                    discriptionFont={FONTS.Lato.Bold}
                    discriptionColor={theme.secondaryText}
                    discription={"We have received your dispute request. Our support team will carefully review the matter and update you soon."}
                />}
        </View >
    )
}

export default ProviderRaiseDispute

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: 'white'
        },
        container: {
            paddingHorizontal: getScaleSize(24),
            paddingVertical: getScaleSize(32)
        },
        dropdownHeader: {
            borderWidth: 1,
            borderColor: theme._D9D9D9,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(14),
            paddingHorizontal: getScaleSize(16),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        dropdownContainer: {
            marginBottom: getScaleSize(10),
            backgroundColor: theme.white,
            // backgroundColor:'red',
            borderRadius: getScaleSize(10),
            paddingVertical: getScaleSize(14),
            paddingHorizontal: getScaleSize(16),
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            overflow: 'hidden'
        },
        itemRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: getScaleSize(15),

        },
        radio: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            borderRadius: getScaleSize(10),
            borderWidth: 2,
            borderColor: theme._B3B3B3,
        },

        radioActive: {
            borderColor: theme.primary,
            borderWidth: getScaleSize(5),
            backgroundColor: theme.white,
        },

        input: {
            borderWidth: 1,
            borderColor: theme._D9D9D9,
            borderRadius: getScaleSize(10),
            padding: getScaleSize(12),
            marginTop: getScaleSize(10),
        },
        iconStyle: {
            width: getScaleSize(28),
            height: getScaleSize(28),
        },
        descriptionInput: {
            marginTop: getScaleSize(10),
            borderWidth: 1,
            borderColor: theme._D9D9D9,
            borderRadius: getScaleSize(12),
            padding: getScaleSize(16),
            height: getScaleSize(140),
            textAlignVertical: "top",
        },
        infoText: {
            //   marginTop: getScaleSize(12),
            lineHeight: getScaleSize(18),
        },
        uploadBoxStyle: {
            width: getScaleSize(182),
            height: getScaleSize(144)
        },
        nextButton: {
            flex: 1,
            backgroundColor: theme.primary,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(14),
            alignItems: "center",
        },
        uploadOptions: {
            flexDirection: "row",
            gap: getScaleSize(16),
            marginTop: getScaleSize(12),
        },
        buttonContainer: {
            flexDirection: "row",
            gap: getScaleSize(16),
            marginTop: getScaleSize(100),
            marginBottom: getScaleSize(50),
            marginHorizontal:getScaleSize(24)
        },
        dropDownContainer: {
            marginHorizontal: getScaleSize(2),
            marginVertical: getScaleSize(10)
        },
        disputeContainer: {
            backgroundColor: theme.white,
            borderRadius: getScaleSize(16),
            paddingHorizontal: getScaleSize(16),
            marginTop: getScaleSize(12),
            borderWidth: 0.5,
            borderColor: theme._D9D9D9,
            elevation: 1,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 6,
        },
        disputeStatusRow: {
            flexDirection: "row",
            // alignItems: 'center',
            marginVertical: getScaleSize(20),
        },
        leftContainer: {
            alignItems: "center",
            marginRight: getScaleSize(12),
        },
        circle: {
            width: getScaleSize(28),
            height: getScaleSize(28),
            borderRadius: getScaleSize(20),
            backgroundColor: "#1BAA6F",
            alignItems: "center",
            justifyContent: "center",
        },
        line: {
            width: 2,
            flex: 1,
            backgroundColor: "#E0E0E0",
            marginTop: getScaleSize(4),
        },
        content: {
            flex: 1,
        },
        date: {
            marginTop: getScaleSize(4),
        },
    })