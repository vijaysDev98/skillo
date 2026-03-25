import { Dimensions, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, ThemeContextType } from '../../context'
import { Button, EarningsChart, Header, Text, TransactionItem } from '../../components'
import { getScaleSize, SHOW_TOAST, useString } from '../../constant'
import { FONTS, IMAGES } from '../../assets'
import { SCREENS } from '..'

//PACKAGES
import { API } from '../../api'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyEarnings(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const [activities, setActivities] = useState<any>([]);
    const [isLoading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [earningsData, setEarningsData] = useState<any>(null);

    const itemData = [
        { id: 1, title: 'Transaction History', onPress: SCREENS.Transactions.identifier },
        { id: 2, title: 'Bank Account Information', onPress: SCREENS.BankDetails.identifier },
    ]

    const amountDetails = [
        { title: 'Online Amount', value: `P${earningsData?.online_amount ?? '1500'}` },
        { title: 'Cash Amount', value: `P${earningsData?.cash_amount ?? '1500'}` },
        { title: 'Commission Deducted', value: `P${earningsData?.commission_deducted ?? '200'}` },
        { title: 'Commission Due', value: `P${earningsData?.commission_due ?? '300'}` },
    ]

    useEffect(() => {
        fetchActivities(new Date().toISOString().slice(0, 7));
    }, []);

    const onChange = (_: any, date?: Date) => {
        setShowPicker(false);
        if (date) {

            setSelectedDate(date);
            // Call API with new month
            const month = date.toISOString().slice(0, 7); // YYYY-MM
            fetchActivities(month);
        }
    };

    async function fetchActivities(month: string) {
        try {
            setLoading(true);
            const result: any = await API.Instance.get(API.API_ROUTES.getEarningsDashboard + `?month=${month}&transaction_page=1&transaction_limit=1`);
            if (result?.status) {
                setActivities(result?.data?.data?.activities ?? []);
                setEarningsData(result?.data?.data ?? null);
            }
            else {
                SHOW_TOAST(result?.data?.message, 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.my_earnings}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles(theme).mainContainer, { marginTop: getScaleSize(24) }]}>
                    <View style={styles(theme).balanceCard}>
                        <Text
                            size={getScaleSize(17)}
                            font={FONTS.Lato.Medium}
                            align='center'
                            color={theme._404040}>
                            {STRING.available_balance}
                        </Text>
                        <Text
                            style={{ marginTop: getScaleSize(8) }}
                            size={getScaleSize(42)}
                            font={FONTS.Lato.Bold}
                            align='center'
                            color={theme._111111}>
                            {`P${earningsData?.wallet?.total_balance ?? '3000'}`}
                        </Text>
                        <Text
                            style={{ marginTop: getScaleSize(4), marginBottom: getScaleSize(18) }}
                            size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            align='center'
                            color={theme._404040}>
                            {"You can Withdraw Available Balance"}
                        </Text>

                        <Button
                            title={STRING.request_withdrawal}
                            style={styles(theme).requestButtonInside}
                            buttonTitleSize={getScaleSize(14)}
                            onPress={() => {
                                props.navigation.navigate(SCREENS.MoneyWithdrawal.identifier);
                            }} />
                    </View>

                    <View style={styles(theme).amountDetailContainer}>
                        {amountDetails.map((item, index) => (
                            <View key={index} style={styles(theme).amountCard}>
                                <Text size={getScaleSize(16)} font={FONTS.Lato.Medium} color={theme._404040}>{item.title}</Text>
                                <Text size={getScaleSize(18)} font={FONTS.Lato.Bold} color={theme._111111}>{item.value}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles(theme).chartCard}>
                        <EarningsChart
                            data={activities}
                            onMonthPress={() => setShowPicker(true)}
                        />
                    </View>
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._323232}
                        style={{ marginBottom: getScaleSize(24) }}>
                        {STRING.latest_transactions}
                    </Text>
                    {earningsData?.latest_transactions?.items?.length > 0 ? (
                        <>
                            {earningsData?.latest_transactions?.items?.map((item: any, index: number) => (
                                <TransactionItem
                                    itemContainer={{ marginBottom: getScaleSize(16) }}
                                    key={index} item={item} />
                            ))}
                        </>
                    ) : (
                        <Text
                            style={{ marginBottom: getScaleSize(24) }}
                            size={getScaleSize(16)}
                            align='center'
                            font={FONTS.Lato.Medium}
                            color={theme._818285}>
                            {STRING.no_transactions_data_found ?? ''}
                        </Text>
                    )}
                    <View style={{ marginBottom: getScaleSize(24) }}>
                        {itemData.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles(theme).navItemCard}
                                    onPress={() => { props.navigation.navigate(item.onPress) }}>
                                    <Text
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.Medium}
                                        color={theme._111111}>
                                        {item.title}
                                    </Text>
                                    <Image source={IMAGES.ic_right} style={styles(theme).rightIcon} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            {showPicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode='date'
                    display='spinner'
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white
    },
    mainContainer: {
        marginHorizontal: getScaleSize(24),
    },
    balanceCard: {
        backgroundColor: theme._FDEFEC,
        borderRadius: getScaleSize(16),
        padding: getScaleSize(24),
        borderWidth: 1,
        borderColor: '#E6E6E6',
        marginBottom: getScaleSize(16),
    },
    requestButtonInside: {
        borderRadius: getScaleSize(12),
        paddingVertical: getScaleSize(14),
    },
    amountDetailContainer: {
        marginBottom: getScaleSize(6),
    },
    amountCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: getScaleSize(12),
        paddingVertical: getScaleSize(16),
        paddingHorizontal: getScaleSize(16),
        marginBottom: getScaleSize(10),
    },
    chartCard: {
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: getScaleSize(16),
        marginBottom: getScaleSize(24),
        overflow: 'hidden',
    },
    navItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: getScaleSize(12),
        paddingVertical: getScaleSize(18),
        paddingHorizontal: getScaleSize(16),
        marginBottom: getScaleSize(10),
    },
    rightIcon: {
        width: getScaleSize(20),
        height: getScaleSize(20),
        tintColor: theme._111111,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionItemImage: {
        width: getScaleSize(48),
        height: getScaleSize(48),
        borderRadius: getScaleSize(24)
    },
    transactionItemDetails: {
        flex: 1.0,
        marginHorizontal: getScaleSize(12),
    },
    transactionStatusContainer: {
        alignItems: 'flex-end',
    }
})