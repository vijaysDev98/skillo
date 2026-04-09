import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

//ASSETS
import { FONTS } from '../../assets';

//API
import { API } from '../../api';

//COMPONENTS
import { Header, ProgressView, RatingsReviewsItem, Text } from '../../components';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANTS
import { DummyData, getScaleSize, SHOW_TOAST, useString } from '../../constant';
import NavigationService from '../NavigationService';

export default function RatingsReviews(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();
    const { userType, profile } = useContext<any>(AuthContext);

    const PAGE_SIZE = 10;

    const [showMore, setShowMore] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [ratingsReviews, setRatingsReviews] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showMoreId, setShowMoreId] = useState("")

    // useEffect(() => {
    //     getRatingReviews()
    // }, [])

    async function getRatingReviews() {
        try {
            setLoading(true)
            const result: any = await API.Instance.get(API.API_ROUTES.fetchTransactions + `?section=ratings_reviews&page=${page}&limit=${PAGE_SIZE}`);
            if (result?.status) {
                const newData = result?.data?.data?.results ?? [];
                if (newData?.length < PAGE_SIZE) {
                    setHasMore(false);
                    setRatingsReviews((prev: any) => [...prev, ...newData]);
                }
                else {
                    setRatingsReviews((prev: any) => [...prev, ...newData]);
                }
            }
            else {
                SHOW_TOAST(result?.data?.message, 'error')
                console.log('ERR', result?.data?.message)
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    function loadMore() {
        if (hasMore) {
            setPage(page + 1);
            getRatingReviews();
        }
    }

    useEffect(() => {
        setRatingsReviews(DummyData.dummyRatingsReviews);
    }, []);

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    NavigationService.goBack();
                }}
                screenName={STRING.ratings_reviews}
            />
            <View style={styles(theme).mainContainer}>
                <Text
                    style={styles(theme).headingTextStyle}
                    size={getScaleSize(22)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._2B2B2B}>
                    {STRING.recent_works_reviews}
                </Text>
                {ratingsReviews?.length > 0 ?
                    <FlatList
                        data={ratingsReviews}
                        contentContainerStyle={styles(theme).listContainer}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item: any, index: number) => index.toString()}
                        // onEndReached={loadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={
                            isLoading ?
                                <ActivityIndicator size="large" color={theme.primary} style={{ margin: 20 }} />
                                : null
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <RatingsReviewsItem
                                    key={index}
                                    item={item}
                                    itemContainer={styles(theme).ratingItemContainer}
                                    onPressShowMore={() => {
                                        setShowMore(!showMore);
                                        setShowMoreId(item?.id);
                                    }}
                                    showMore={item?.id == showMoreId ? showMore : false}
                                />
                            )
                        }}
                    />
                    :
                    <View style={styles(theme).emptyListContainer}>
                        <Text
                            style={styles(theme).emptyTextStyle}
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Medium}
                            color={theme._2B2B2B}
                        >
                            {STRING.no_data_found}
                        </Text>
                    </View>
                }
            </View>
            {isLoading && <ProgressView />}
        </View >
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white,
    },
    mainContainer: {
        flex: 1.0,
        marginHorizontal: getScaleSize(24),
    },
    headingTextStyle: {
        marginVertical: getScaleSize(16)
    },
    listContainer: {
        paddingBottom: getScaleSize(50)
    },
    emptyListContainer: {
        flex: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyTextStyle: {
        marginTop: getScaleSize(24)
    },
    ratingItemContainer: {
        marginBottom: getScaleSize(24)
    }
})