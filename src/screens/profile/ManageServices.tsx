import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

// CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

// CONSTANTS & ASSETS
import { arrayIcons, getScaleSize, SHOW_TOAST, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

// COMPONENTS
import {
    BottomSheet,
    Button,
    EmptyView,
    Header,
    ProgressView,
    ServiceItem,
    Text,
} from '../../components';
import { SCREENS } from '..';
import { API } from '../../api';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import LinearGradient from 'react-native-linear-gradient';

// DUMMY DATA
import { manageServicesData } from '../../constant/dummyData';


const { width } = Dimensions.get('window');

interface SubCategoryProps {
    item: any;
    index: number;
    theme: any;
    selectedCategoryId: any;
    services: any;
    navigation: any;
    setSelectedServiceId: (id: any) => void;
    setShowDeleteModal: (show: boolean) => void;
}

const SubCategoryGridItem = ({ item, index, theme, selectedCategoryId, services, navigation, setSelectedServiceId, setShowDeleteModal }: SubCategoryProps) => {
    const height = getScaleSize(188);
    const imageUri = item?.image;

    return (
        <Pressable
            style={[
                styles(theme).cardContainer,
                {
                    height: height,
                    marginTop: getScaleSize(20),
                },
            ]}
        >
            <ImageBackground
                source={{ uri: imageUri }}
                style={[styles(theme).imageView, { overflow: "hidden", }]}
            >
                <TouchableOpacity
                    style={styles(theme).deleteButton}
                    onPress={() => {
                        setSelectedServiceId(item.sub_category_id);
                        setShowDeleteModal(true);
                    }}
                >
                    <View style={styles(theme).deleteIconContainer}>
                        <Image source={IMAGES.trash2} style={styles(theme).deleteIcon} />
                    </View>
                </TouchableOpacity>
                <LinearGradient
                    colors={["transparent", "#ffffff", "#ffffff"]}
                    locations={[0.6, 0.9, 1]}
                    style={styles(theme).listItemLinearContainer}
                >
                    <Text
                        size={getScaleSize(12)}
                        font={FONTS.Lato.Bold}
                        align='center'
                        color={theme.primaryText}
                    >{item?.subcategory_name}</Text>
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    )
}

export default function ManageServices(props: any) {

    const isFromSelectServices: boolean = props?.route?.params?.isFromSelectServices ?? false;
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();
    const bottomSheetRef = useRef<any>(null);
    const { profile } = useContext<any>(AuthContext);

    // Use dummy profile data for demo
    const dummyProfile = manageServicesData.profile;
    const has_purchased = dummyProfile?.has_purchased;

    const [isLoading, setLoading] = useState(false);
    const [services, setServices] = useState<any>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        // Initialize with dummy data for demo
        setServices(manageServicesData);
        setSelectedCategoryId(manageServicesData.services[0]?.category_id ?? null);
    }, []);

    /* ================= GET SERVICES ================= */
    async function getServices(keepSelection = true) {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getAllService);

            if (result.status) {
                const serviceList = result?.data?.data?.services ?? [];

                console.log('serviceList==>', JSON.stringify(result?.data?.data))
                setServices(result?.data?.data ?? []);

                if (!keepSelection || !selectedCategoryId) {
                    setSelectedCategoryId(serviceList?.[0]?.category_id ?? null);
                } else {
                    const exists = serviceList.find(
                        (i: any) => i.category_id === selectedCategoryId
                    );

                    setSelectedCategoryId(
                        exists
                            ? exists.category_id
                            : serviceList?.[0]?.category_id ?? null
                    );
                }
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    /* ================= REMOVE SERVICE ================= */
    // async function removeService(id: any) {
    //     try {
    //         setLoading(true);
    //         const result = await API.Instance.delete(
    //             API.API_ROUTES.removeService + `/${id}`
    //         );

    //         if (result.status) {
    //             SHOW_TOAST(result?.data?.message ?? '', 'success');
    //             getServices(true);
    //             setSelectedServiceId(null);
    //             setShowDeleteModal(false);
    //         } else {
    //             SHOW_TOAST(result?.data?.message ?? '', 'error');
    //             setSelectedServiceId(null);
    //             setShowDeleteModal(false);
    //         }
    //     } catch (error: any) {
    //         SHOW_TOAST(error?.message ?? '', 'error');
    //         setSelectedServiceId(null);
    //         setShowDeleteModal(false);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    /* ================= SELECTED SERVICE ================= */
    const selectedService = services?.services?.find(
        (i: any) => i.category_id === selectedCategoryId
    );

    function renderSubCategories() {
        if (selectedService?.subcategories?.length > 0) {
            return (
                <FlatList
                    data={selectedService?.subcategories ?? []}
                    numColumns={2}
                    keyExtractor={(item) => item.sub_category_id.toString()}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ paddingLeft: getScaleSize(8) }}
                    renderItem={({ item, index }) => (
                        <SubCategoryGridItem
                            item={item}
                            index={index}
                            theme={theme}
                            selectedCategoryId={selectedCategoryId}
                            services={services}
                            navigation={props.navigation}
                            setSelectedServiceId={setSelectedServiceId}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    )}
                />
            )
        } else if (isLoading) {
            return (
                <View style={styles(theme).emptyView}>
                    <ActivityIndicator size="large" color={theme.primary} style={{ margin: 20 }} />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={IMAGES.empty} style={styles(theme).emptyImage} />
                </View>
            )
        }
    }

    return (
        <AppSafeAreaView 
        style={styles(theme).container}>
            <Header
                onBack={() => {
                    if (isFromSelectServices) {
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{
                                    name: SCREENS.BottomBar.identifier,
                                    params: { isProfessionalProfile: true }
                                }],
                            }),
                        );
                    } else {
                        props.navigation.goBack();
                    }
                }}
                screenName={STRING.manage_services}
            />
            {has_purchased ? (
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.Medium}
                        color={theme._737373}
                        style={{ marginHorizontal: getScaleSize(24), marginBottom: getScaleSize(16) }}>
                        {dummyProfile?.user?.service_provider_type === 'professional' ?
                            STRING.all_service_categories_are_included_in_your_plan_Add_as_many_as_you_need_all_included_in_subscription_plan
                            : STRING.here_you_can_easily_manage_your_service_categories_each_additional_category_you_add_will_incur_a_monthly_fee_of}
                    </Text>
                    {services?.services?.length > 0 && (
                        <>
                            {/* <View style={styles(theme).divider} /> */}
                            <View style={styles(theme).serviceContainer}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {(services?.services ?? []).map((item: any, index: number) => {
                                        const isSelected = selectedCategoryId === item.category_id;
                                        const isLast = index === services?.services.length - 1;
                                        return (
                                            <TouchableOpacity
                                                key={item.category_id}
                                                onPress={() =>
                                                    setSelectedCategoryId(
                                                        item.category_id
                                                    )
                                                }
                                                style={[
                                                    styles(theme).itemContainer,
                                                    {
                                                        marginLeft: index === 0 ? getScaleSize(24) : getScaleSize(8),
                                                        backgroundColor: isSelected
                                                            ? theme.activeTabBg
                                                            : theme.inActiveTabBg,
                                                    },
                                                ]}
                                                activeOpacity={0.8}
                                            >
                                                <Image
                                                    source={item?.category_logo ? { uri: item.category_logo } : (arrayIcons[item?.category_name?.toLowerCase() as keyof typeof arrayIcons] ?? arrayIcons['diy'] as any)}
                                                    resizeMode="cover"
                                                    style={styles(theme).categoryImage}
                                                />
                                                <Text
                                                    style={{
                                                        marginLeft: getScaleSize(14),
                                                        alignSelf: 'center',
                                                    }}
                                                    size={getScaleSize(16)}
                                                    font={FONTS.Lato.Regular}
                                                    color={isSelected ? theme.primary : theme._8C8C8C}
                                                >
                                                    {item?.category_name ?? ''}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                    )}
                                </ScrollView>
                            </View>
                        </>
                    )}
                    <View style={{ marginVertical: getScaleSize(24), flex: 1 }}>
                        {renderSubCategories()}
                    </View>
                </View>
            ) : (
                <EmptyView
                    title={STRING.you_have_not_subscribed_to_any_plan}
                    style={styles(theme).emptyContainer}
                    onPressButton={() => {
                        props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier, {
                            isFromSubscriptionButton: true,
                        });
                    }}
                />
            )}
            {has_purchased && (
                <Button
                    title={services?.services?.length > 0 ? STRING.add_more_services : STRING.add_service}
                    style={{
                        marginHorizontal: getScaleSize(24),
                        marginBottom: getScaleSize(10),
                    }}
                    onPress={() => {
                        if (dummyProfile?.user?.service_provider_type === 'professional') {
                            const subCategoryIds = services?.services?.flatMap((service: any) =>
                                service.subcategories.map((sub: any) => sub.sub_category_id)
                            ) || [];

                            props.navigation.navigate(
                                SCREENS.AddServices.identifier,
                                { isFromManageServices: true, disableServicesIds: subCategoryIds }
                            );
                        } else {
                            if (services?.services?.length > 0) {
                                bottomSheetRef.current.open();
                            } else {

                                const subCategoryIds = services?.services?.flatMap((service: any) =>
                                    service.subcategories.map((sub: any) => sub.sub_category_id)
                                ) || [];

                                props.navigation.navigate(
                                    SCREENS.AddServices.identifier,
                                    { isFromManageServices: true, disableServicesIds: subCategoryIds }
                                );
                            }
                        }
                    }}
                />
            )}
            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                height={getScaleSize(330)}
                addMoreServices={true}
                title={
                    STRING.additional_category_you_add_will_incur_a_monthly_fee_of
                }
                description={
                    STRING.you_are_on_Non_professional_plan_that_s_why_you_need_to_pay_to_add_more_category_of_services
                }
                buttonTitle={STRING.proceed}
                secondButtonTitle={STRING.cancel}
                onPressButton={() => {

                    const subCategoryIds = services?.services?.flatMap((service: any) =>
                        service.subcategories.map((sub: any) => sub.sub_category_id)
                    ) || [];

                    props.navigation.navigate(SCREENS.AddServices.identifier,
                        { isFromManageServices: true, disableServicesIds: subCategoryIds }
                    );
                    bottomSheetRef.current.close();
                }}
            />
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setShowDeleteModal(false);
                    setSelectedServiceId(null);
                }}
            >
                <View style={styles(theme).modalOverlay}>
                    <View style={styles(theme).modalContainer}>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.Bold}
                            color={theme.primaryText}
                            align='center'
                            style={{ marginBottom: getScaleSize(24) }}
                        >
                            Are you sure you want to remove this service?
                        </Text>
                        <View style={styles(theme).modalButtonRow}>
                            <TouchableOpacity
                                style={styles(theme).cancelButton}
                                onPress={() => {
                                    setShowDeleteModal(false);
                                    setSelectedServiceId(null);
                                }}
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.primary}
                                    align='center'
                                >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles(theme).removeButton}
                                // onPress={() => removeService(selectedServiceId)}
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.white}
                                    align='center'
                                >Remove Service</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {isLoading && <ProgressView />}
        </AppSafeAreaView>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.white },
        mainContainer: { flex: 1 },
        divider: {
            height: 1,
            backgroundColor: theme._D5D5D5,
            marginBottom: getScaleSize(24),
            marginTop: getScaleSize(18),
            marginHorizontal: getScaleSize(24),
        },
        itemContainer: {
            height: getScaleSize(44),
            paddingHorizontal: getScaleSize(20),
            borderRadius: getScaleSize(10),
            flexDirection: 'row',
        },
        serviceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        categoryImage: {
            height: getScaleSize(24),
            width: getScaleSize(24),
            alignSelf: 'center',
        },
        cardContainer: {
            borderRadius: getScaleSize(20),
            backgroundColor: theme._EAF0F3,
            width: (width - getScaleSize(64)) / 2,
            marginLeft: getScaleSize(16),
            elevation: 1
        },
        imageView: {
            flex: 1.0,
            borderRadius: getScaleSize(20),
        },
        listItemLinearContainer: {
            borderRadius: getScaleSize(20), flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: getScaleSize(16)
        },
        deleteButton: {
            position: 'absolute',
            top: getScaleSize(8),
            right: getScaleSize(8),
            zIndex: 10,
        },
        deleteIconContainer: {
            width: getScaleSize(30),
            height: getScaleSize(30),
            borderRadius: getScaleSize(8),
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        deleteIcon: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            tintColor: '#E74C3C',
        },
        emptyImage: {
            height: getScaleSize(217),
            width: getScaleSize(184),
            alignSelf: 'center',
        },
        emptyView: {
            flex: 1.0,
            alignSelf: 'center',
            marginTop: getScaleSize(41),
        },
        emptyContainer: {
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(24),
            flex: 1,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: getScaleSize(30),
        },
        modalContainer: {
            backgroundColor: theme.white,
            borderRadius: getScaleSize(16),
            paddingHorizontal: getScaleSize(24),
            paddingVertical: getScaleSize(30),
            width: '100%',
            alignItems: 'center',
        },
        modalButtonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: getScaleSize(12),
        },
        cancelButton: {
            flex: 1,
            height: getScaleSize(48),
            borderRadius: getScaleSize(10),
            borderWidth: 1,
            borderColor: theme.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        removeButton: {
            flex: 1,
            height: getScaleSize(48),
            borderRadius: getScaleSize(10),
            backgroundColor: theme.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
