import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST, openStripeCheckout } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import {
    Header, Text, Button, CategoryDropdown,
    ServiceItem, BottomSheet, ProgressView, AccountCreatedModal,
} from '../../components';
import { API } from '../../api';
import { CommonActions } from '@react-navigation/native';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';

export default function AddServices(props: any) {

    const STRING = useString();

    const isFromManageServices: boolean = props?.route?.params?.isFromManageServices ?? false;
    const isEdit: boolean = props?.route?.params?.isEdit ?? false;
    const categoryId: string = props?.route?.params?.categoryId ?? '';
    const disableServicesIds: string[] = props?.route?.params?.disableServicesIds ?? [];

    const { setSelectedServices, selectedServices, profile } = useContext<any>(AuthContext);
    const { theme } = useContext<any>(ThemeContext);

    const bottomSheetRef = useRef<any>(null);
    const [allCategories, setAllCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [isLoading, setLoading] = useState(false);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [isAccountCreated, setIsAccountCreated] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        if (isEdit && allCategories.length > 0) {
            const found = allCategories.find((item: any) => item.id === categoryId);
            if (found) {
                setSelectedCategory(found);
                setSelectedCategories([found]);
                getSubCategoryData(categoryId);
            }
        }
    }, [isEdit, categoryId, allCategories]);

    async function getAllCategories() {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.allCategories);
            if (result.status) {
                const sortedData: any[] = [...(result?.data?.data || [])].sort(
                    (a: any, b: any) =>
                        a.category_name?.toLowerCase().localeCompare(b.category_name?.toLowerCase())
                );
                setAllCategories(sortedData);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    async function getSubCategoryData(id: string) {
        try {
            setLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getHomeData + `/${id}`);
            if (result.status) {
                setSubCategoryList(result?.data?.data?.subcategories ?? []);
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    function onMultiCategoryChange(items: any[]) {
        setSelectedCategories(items);
        if (items.length > 0) {
            const last = items[items.length - 1];
            setSelectedCategory(last);
            getSubCategoryData(last?.id);
        } else {
            setSelectedCategory(null);
            setSubCategoryList([]);
        }
        // Remove deselected categories from selectedServices
        setSelectedServices((prev: any[]) =>
            (prev ?? []).filter((s: any) =>
                items.some((cat: any) => cat?.id === s?.category?.id)
            )
        );
    }

    const isServiceSelected = (item: any) => {
        if (selectedServices && selectedServices.length > 0) {
            const categoryItem = selectedServices.find(
                (e: any) => e?.category?.id === selectedCategory?.id
            );
            if (categoryItem) {
                return categoryItem?.service?.some((f: any) => f?.id === item?.id);
            }
        }
        return false;
    };

    async function onSelectServices(item: any) {
        if (selectedServices && selectedServices.length > 0) {
            const categoryItem = selectedServices.find(
                (e: any) => e?.category?.id === selectedCategory?.id
            );
            if (categoryItem) {
                const newCategoryItem = { ...categoryItem };
                let services: any[] = newCategoryItem?.service ?? [];
                const serviceItem = services?.find((e: any) => e?.id === item?.id);
                if (serviceItem) {
                    services = services.filter((e: any) => e.id !== item.id);
                } else {
                    services = [...services, item];
                }
                newCategoryItem.service = services;
                const idx = selectedServices.findIndex(
                    (e: any) => e?.category?.id === selectedCategory?.id
                );
                if (newCategoryItem.service.length > 0) {
                    selectedServices.splice(idx, 1, newCategoryItem);
                    setSelectedServices([...selectedServices]);
                } else {
                    selectedServices.splice(idx, 1);
                    setSelectedServices([...selectedServices]);
                }
            } else {
                setSelectedServices([
                    ...selectedServices,
                    { category: selectedCategory, service: [item] },
                ]);
            }
        } else {
            setSelectedServices([{ category: selectedCategory, service: [item] }]);
        }
    }

    function onSelectServicesForManageServices(item: any) {
        const current = selectedServices[0];
        let services =
            current?.category?.id === selectedCategory?.id ? current.service : [];
        const exists = services.some((e: any) => e.id === item.id);
        services = exists
            ? services.filter((e: any) => e.id !== item.id)
            : [...services, item];
        if (services.length === 0) {
            setSelectedServices([]);
            return;
        }
        setSelectedServices([{ category: selectedCategory, service: services }]);
    }

    async function onSelectedCategoriesProfessional() {
        const output = selectedServices.map((item: any) => ({
            category_id: item.category.id,
            sub_category_ids: item.service.map((e: any) => e.id),
        }));
        try {
            setLoading(true);
            const result = await API.Instance.post(
                API.API_ROUTES.onSendCategoryIds + `?action=update`,
                { services: output }
            );
            if (result.status) {
                props.navigation.goBack();
                setSelectedServices([]);
                SHOW_TOAST(result?.data?.message, 'success');
            } else {
                SHOW_TOAST(result?.data?.message, 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    async function onSelectedCategoriesNonProfessional() {
        const output = selectedServices.map((item: any) => ({
            category_id: item.category.id,
            sub_category_ids: item.service.map((e: any) => e.id),
        }));
        try {
            setLoading(true);
            const result = await API.Instance.post(
                API.API_ROUTES.onSelectedCategoriesNonProfessional + `?platform=app&action=update`,
                { categories_subcategory_ids: output }
            );
            if (result.status) {
                if (result?.data?.data?.checkout_url) {
                    openStripeCheckout(result?.data?.data?.checkout_url);
                    setSelectedServices([]);
                    bottomSheetRef.current.close();
                } else {
                    props?.navigation?.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{
                                name: SCREENS.ManageServices.identifier,
                                params: { isFromSelectServices: true },
                            }],
                        }),
                    );
                }
            } else {
                SHOW_TOAST(result?.data?.message, 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.add_services}
            />

            {/* ✅ Removed justifyContent:'center' from mainContainer — it was
                shrinking the layout and causing touch area misalignment */}
            <View style={styles(theme).mainContainer}>
                <Text
                    size={getScaleSize(24)}
                    font={FONTS.Lato.Bold}
                    color={theme.primaryText}
                    style={{ marginBottom: getScaleSize(12) }}>
                    {selectedCategory ? STRING.select_a_service : STRING.select_a_category}
                </Text>
                <Text
                    size={getScaleSize(14)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._939393}
                    style={{ marginBottom: getScaleSize(24) }}>
                    {selectedCategory
                        ? STRING.thank_you_for_choosing_a_category_Now_select_the_services_you_want_to_provide_within_this_category
                        : STRING.choose_a_category_that_best_matches_your_services_This_helps_us_connect_you_with_the_right_clients
                    }
                </Text>

                {/* ✅ zIndex wrapper so the dropdown list floats above the FlatList below */}
                <View style={styles(theme).dropdownWrapper}>
                    <CategoryDropdown
                        isMulti={true}
                        onChangeMulti={onMultiCategoryChange}
                        selectedItems={selectedCategories}
                        onChange={() => { }}
                        data={allCategories}
                    />
                </View>

                {selectedCategory && <View style={styles(theme).divider} />}

                <View style={{ flex: 1 }}>
                    {selectedCategory && (
                        <FlatList
                            data={subCategoryList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(_item: any, index: number) => index.toString()}
                            renderItem={({ item }) => {
                                const isSelected = isServiceSelected(item);
                                const isDisabled = disableServicesIds.includes(item?.id);
                                return (
                                    <ServiceItem
                                        item={item}
                                        itemContainer={styles(theme).itemContainer}
                                        isSelectedBox={true}
                                        isSelected={isSelected}
                                        isDisabled={isDisabled}
                                        onPress={(e: any) => {
                                            if (isFromManageServices) {
                                                onSelectServicesForManageServices(e);
                                            } else {
                                                onSelectServices(e);
                                            }
                                        }}
                                    />
                                );
                            }}
                        />
                    )}
                </View>
            </View>

            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                        setSelectedServices([]);
                    }}
                    style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme.primary}
                        align="center">
                        {STRING.back}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={STRING.next}
                    style={{ flex: 1.0 }}
                    disabled={selectedServices?.length === 0}
                    onPress={() => {
                        if (selectedServices?.length === 0) return;
                        if (isFromManageServices) {
                            if (profile?.user?.service_provider_type === 'professional') {
                                onSelectedCategoriesProfessional();
                            } else {
                                if (selectedServices.length > 1) {
                                    bottomSheetRef.current.open();
                                } else {
                                    onSelectedCategoriesNonProfessional();
                                }
                            }
                        } else {
                            props.navigation.navigate(SCREENS.ReviewServices.identifier);
                        }
                    }}
                />
            </View>

            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                height={getScaleSize(380)}
                type="payment"
                title={STRING.want_to_add_more_service_categories}
                description={STRING.additional_category_you_add_will_incur_a_monthly_fee_of}
                buttonTitle={STRING.proceed_to_pay}
                secondButtonTitle={STRING.cancel}
                onPressButton={() => { onSelectedCategoriesNonProfessional(); }}
                onPressSecondButton={() => { bottomSheetRef.current.close(); }}
            />

            {isAccountCreated && (
                <AccountCreatedModal
                    visible={isAccountCreated}
                    onPressHome={() => {
                        setIsAccountCreated(false);
                        props.navigation.navigate(SCREENS.BottomBar.identifier);
                    }}
                    isGoToHome={true}
                />
            )}

            {isLoading && <ProgressView />}
        </AppSafeAreaView>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.white,
            // ✅ removed justifyContent:'center' — was misaligning touch regions
        },
        mainContainer: {
            flex: 1,
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(14),
            // ✅ No justifyContent here — content flows from top naturally
        },
        // ✅ Gives dropdown its own stacking context so list renders above FlatList
        dropdownWrapper: {
            zIndex: 999,
            elevation: 999,
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: getScaleSize(24),
            marginBottom: getScaleSize(10),
        },
        backButton: {
            flex: 1,
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            borderColor: theme.primary,
            paddingVertical: getScaleSize(18),
            alignItems: 'center',
            justifyContent: 'center',
        },
        itemContainer: {
            marginBottom: getScaleSize(16),
        },
        divider: {
            height: 1,
            backgroundColor: theme._D5D5D5,
            marginVertical: getScaleSize(24),
        },
    });
