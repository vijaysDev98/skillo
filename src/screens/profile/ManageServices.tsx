import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

// CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

// CONSTANTS & ASSETS
import { DummyData, getScaleSize, SHOW_TOAST, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

// COMPONENTS
import {
    Header,
    ProgressView,
    Text,
} from '../../components';
import { SCREENS } from '..';
import { API } from '../../api';
import { CommonActions } from '@react-navigation/native';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../../redux/hooks';


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

    const has_purchased = profile?.has_purchased;

    const [localLoading, setLocalLoading] = useState(false);
    const [services, setServices] = useState<any>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { isLoading } = useAppSelector(state => state.seekerHome)

    // useEffect(() => {
    //     if (isFocused) {
    //         getServices(false);
    //     }
    // }, [isFocused]);

    /* ================= GET SERVICES ================= */
    async function getServices(keepSelection = true) {
        try {
            setLocalLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getAllService);

            if (result.status) {
                const serviceList = result?.data?.data?.services ?? [];

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
            setLocalLoading(false);
        }
    }

    /* ================= REMOVE SERVICE ================= */
    async function removeService(id: any) {
        try {
            setLocalLoading(true);
            const result = await API.Instance.delete(
                `userService/remove-service/${id}`
            );

            if (result.status) {
                SHOW_TOAST(result?.data?.message ?? '', 'success');
                getServices(true);
                setSelectedServiceId(null);
                setShowDeleteModal(false);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error');
                setSelectedServiceId(null);
                setShowDeleteModal(false);
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
            setSelectedServiceId(null);
            setShowDeleteModal(false);
        } finally {
            setLocalLoading(false);
        }
    }

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


    const categoryRenderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
            const isSelected = selectedCategoryId === item?.id;
            return (
                <TouchableOpacity
                    style={[
                        styles(theme).itemContainer,
                        index === 0 ? {
                            marginLeft: 0,
                        } : {
                            marginLeft: 8,
                        },
                        {
                            backgroundColor: isSelected
                                ? theme.activeTabBg
                                : theme.inActiveTabBg,
                        },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (isSelected) return;
                        setSelectedCategoryId(item?.id)
                    }}
                >
                    <Image
                        resizeMode="cover"
                        style={styles(theme).categoryImage}
                        // source={item?.category_logo ? { uri: item?.category_logo } : IMAGES.childCareImg}
                        source={item?.category_logo}
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
                        {item?.category_name}
                    </Text>
                </TouchableOpacity>
            );
        },
        [selectedCategoryId, theme] // 🔥 dependencies
    );


    const subCategoryRenderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
            const imageUri = item?.image;

            return (
                <View
                    style={[
                        styles(theme).cardContainer,
                        {
                            height: getScaleSize(219),
                            marginBottom: getScaleSize(20)
                        },
                    ]}
                >
                    <ImageBackground
                        source={{ uri: item?.image || '' }}
                        style={[styles(theme).imageView, styles(theme).imageBackground]}
                    >
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
                        <Pressable
                            style={styles(theme).deleteBadge}
                            onPress={() => {
                                setSelectedServiceId(item?.id ?? item?.sub_category_id);
                                setShowDeleteModal(true);
                            }}
                        >
                            <Image
                                source={IMAGES.ic_delete2}
                                style={styles(theme).deleteBadgeIcon}
                            />
                        </Pressable>
                    </ImageBackground>
                </View>
            );
        },
        [theme]
    );



    return (
        <AppSafeAreaView style={styles(theme).container}>
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
            <Text
                size={getScaleSize(16)}
                color={theme._939393}
                font={FONTS.Lato.SemiBold}
                style={styles(theme).description}
            >{"All service categories are included in your plan. Add as many as you need, all included in subscription plan."}
            </Text>
            {DummyData?.categoryList.length > 0 &&
                (
                    <View style={styles(theme).categoryListWrapper}>
                        <FlatList
                            data={DummyData?.categoryList}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item: any, index: number) => index.toString()}
                            contentContainerStyle={styles(theme).categoryListContent}
                            renderItem={categoryRenderItem}
                            ListEmptyComponent={() => (
                                <View />
                            )}
                        />
                    </View>
                )}

            {DummyData.filteredSubCategories.length > 0 && (
                <FlatList
                    data={DummyData.filteredSubCategories}
                    numColumns={2}
                    contentContainerStyle={styles(theme).subCategoryContent}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles(theme).subCategoryColumn}
                    scrollEventThrottle={16}
                    ListHeaderComponent={() => {
                        return <View style={styles(theme).subCategoryHeaderSpacer} />;
                    }}
                    ListFooterComponent={() => {
                        return <View style={styles(theme).subCategoryFooterSpacer} />;
                    }}
                    renderItem={subCategoryRenderItem}
                    ListEmptyComponent={() => (
                        <View style={styles(theme).emptyBox}>
                            <Text
                                size={getScaleSize(16)}
                                font={FONTS.Lato.Bold}
                                color={theme._8C8C8C}>
                                {"No Category Available"}
                            </Text>
                        </View>
                    )}
                />)
            }

            {(DummyData.categoryList.length <= 1 && DummyData.filteredSubCategories.length <= 0) && (
               <View style={styles(theme).emptyStateContainer}>
                <Image
                    source={IMAGES.empty}
                    style={styles(theme).emptyStateImage}
                />
                </View>
            )}

            <View
                style={styles(theme).addServiceBar}
            >
                <Pressable
                    style={styles(theme).addServiceButton}
                >
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.Bold}
                        color={theme.white}
                    >{"Add Service"}</Text>
                </Pressable>
            </View>
            <Modal
                transparent
                visible={showDeleteModal}
                animationType="fade"
                onRequestClose={() => {
                    setShowDeleteModal(false);
                    setSelectedServiceId(null);
                }}
            >
                <View style={styles(theme).modalOverlay}>
                    <View style={styles(theme).modalContainer}>
                        <Text
                            size={getScaleSize(20)}
                            font={FONTS.Lato.Bold}
                            color={theme.secondaryText}
                            align='center'
                            style={styles(theme).modalTitle}
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
                                    color={theme._EC613D}
                                    align='center'
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles(theme).removeButton}
                                onPress={() => removeService(selectedServiceId)}
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.white}
                                    align='center'
                                >
                                    Remove Service
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {(isLoading || localLoading) && <ProgressView />}
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
        deleteBadge: {
            position: 'absolute',
            right: getScaleSize(10),
            top: getScaleSize(10),
            width: getScaleSize(30),
            height: getScaleSize(30),
            borderRadius: getScaleSize(8),
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        deleteBadgeIcon: {
            width: getScaleSize(24),
            height: getScaleSize(24),
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
            backgroundColor: '#777777CC',
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
        modalTitle: {
            marginBottom: getScaleSize(24),
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
        imageBackground: {
            overflow: 'hidden',
        },
        description: {
            marginHorizontal: getScaleSize(24),
            marginTop: getScaleSize(10),
        },
        categoryListWrapper: {
            paddingVertical: getScaleSize(10),
            marginTop: getScaleSize(22),
        },
        categoryListContent: {
            paddingHorizontal: getScaleSize(24),
        },
        subCategoryContent: {
            paddingBottom: getScaleSize(16),
            paddingVertical: getScaleSize(16),
        },
        subCategoryColumn: {
            paddingLeft: getScaleSize(8),
        },
        subCategoryHeaderSpacer: {
            height: getScaleSize(8),
        },
        subCategoryFooterSpacer: {
            height: getScaleSize(50),
        },
        emptyBox: {
            height: getScaleSize(200),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme._F0EFF0,
            elevation: 2,
            borderRadius: 10,
            marginHorizontal: getScaleSize(24),
        },
        emptyStateContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyStateImage: {
            width: getScaleSize(187),
            height: getScaleSize(217),
            alignSelf: 'center',
            marginTop: getScaleSize(163),
        },
        addServiceBar: {
            position: 'absolute',
            bottom: getScaleSize(0),
            width: '100%',
            backgroundColor: theme.white,
            paddingHorizontal: getScaleSize(24),
            paddingBottom: getScaleSize(32),
            paddingTop: getScaleSize(5),
        },
        addServiceButton: {
            borderRadius: getScaleSize(10),
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: getScaleSize(14),
        },
    });
