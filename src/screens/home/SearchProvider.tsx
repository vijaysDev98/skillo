import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Header, SearchComponent, ServiceRequest } from '../../components';
import { getScaleSize, useString } from '../../constant';
import { ThemeContext, ThemeContextType } from '../../context';
import { SCREENS } from '..';
import { FONTS } from '../../assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const servicePreviewDummyData = [
    {
        service_id: "b569286f-da6f-486e-968b-5c1c0cb91186",
        date: "2026-03-24",
        time: "08:26",
        chosen_datetime: "2026-03-24 08:26:00+00:00",
        created_ago: "1 hours ago",
        category_info: {
            category_id: "6c106092-8eb1-4b2d-8eb7-106657373340",
            category_name: {
                name: "DIY",
                logo_url: "https://coudpouss.api-gateway.prometteur.in/home_module/uploads/Category_Logos/DIY.png"
            }
        },
        subcategory_info: {
            sub_category_id: "31721f6b-c8ef-484b-9351-db4c98d6d8c7",
            sub_category_name: {
                name: "Furniture Assembly",
                img_url: "https://coudpouss.api-gateway.prometteur.in/home_module/uploads/DIY/Furniture_Assembly.png"
            }
        },
        estimated_cost: 60,
        service_address: "Udhana, Surat, Gujarat 300034"
    },
    {
        service_id: "b569286f-da6f-486e-968b-5c1c0cb91186",
        date: "2026-03-24",
        time: "08:26",
        chosen_datetime: "2026-03-24 08:26:00+00:00",
        created_ago: "1 hours ago",
        category_info: {
            category_id: "6c106092-8eb1-4b2d-8eb7-106657373340",
            category_name: {
                name: "DIY",
                logo_url: "https://coudpouss.api-gateway.prometteur.in/home_module/uploads/Category_Logos/DIY.png"
            }
        },
        subcategory_info: {
            sub_category_id: "31721f6b-c8ef-484b-9351-db4c98d6d8c7",
            sub_category_name: {
                name: "Furniture Assembly",
                img_url: "https://coudpouss.api-gateway.prometteur.in/home_module/uploads/DIY/Furniture_Assembly.png"
            }
        },
        estimated_cost: 60,
        service_address: "Udhana, Surat, Gujarat 300034"
    },
    {
        service_id: "b569286f-da6f-486e-968b-5c1c0cb91186",
        date: "2026-03-24",
        time: "08:26",
        chosen_datetime: "2026-03-24 08:26:00+00:00",
        created_ago: "1 hours ago",
        category_info: {
            category_id: "6c106092-8eb1-4b2d-8eb7-106657373340",
            category_name: {
                name: "DIY",
                logo_url: "https://coudpouss.api-gateway.prometteur.in/home_module/uploads/Category_Logos/DIY.png"
            }
        },
        subcategory_info: {
            sub_category_id: "31721f6b-c8ef-484b-9351-db4c98d6d8c7",
            sub_category_name: {
                name: "Furniture Assembly",
                img_url: "https://coudpouss.api-gateway.prometteur.in/home_module/uploads/DIY/Furniture_Assembly.png"
            }
        },
        estimated_cost: 60,
        service_address: "Udhana, Surat, Gujarat 300034"
    },
];

const SearchProvider = (props: any) => {

    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);
    const insets = useSafeAreaInsets()

    const [searchText, setSearchText] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState<any>([]);
    const [searchDebouncedText, setSearchDebouncedText] = useState('')

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <ServiceRequest
                key={index}
                data={item}
                onPress={() => {
                    props.navigation.navigate(SCREENS.ServicePreview.identifier, {
                        serviceData: item,
                        isFromHome: true,
                    });
                }}
                onPressAccept={() => {
                    props.navigation.navigate(SCREENS.AddQuote.identifier, {
                        isItem: item,
                        isFromHome: true,
                    });
                }}
            />
        )
    }

    return (
        <View style={[styles(theme).container, { paddingBottom: insets.top }]}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={"Service Preview"}
            />
            <View style={{
                marginHorizontal: getScaleSize(24), marginBottom: getScaleSize(24),
                marginTop: getScaleSize(32)
            }}>
                <SearchComponent
                    value={searchText}
                    onCancelPress={() => {
                        setSearchText('');
                        setSearchDebouncedText('');
                        setSearchData([]);
                    }}
                    onChangeText={(text: any) => {
                        setSearchText(text);

                        const trimmed = text.trim();

                        if (trimmed.length === 0) {
                            setSearchDebouncedText('');
                            setSearchData([]);
                            return;
                        }

                        // debouncedSearch(trimmed);
                    }} />
                <FlatList
                    data={servicePreviewDummyData}
                    contentContainerStyle={styles(theme).listContentContainerStyle}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    renderItem={({ item, index }) => (renderItem({ item, index }))}
                    ListEmptyComponent={() => {
                        if (isLoading) return null;

                        if ((servicePreviewDummyData ?? []).length === 0) {
                            return (
                                <View style={styles(theme).emptyContainer}>
                                    <Text
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.Regular}
                                        color={theme._565656}
                                    >
                                        {STRING.no_results_found}
                                    </Text>
                                </View>
                            );
                        }

                        return null;
                    }}
                />
            </View>
        </View>
    )
}

export default SearchProvider

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.white
        },
        listContentContainerStyle: {
            paddingBottom: getScaleSize(150),
            flexGrow: 1,
            gap: getScaleSize(16),
            marginTop: getScaleSize(40)
        },
    });