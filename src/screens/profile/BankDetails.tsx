import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Button, Header, Text } from '../../components'
import { getScaleSize, useString } from '../../constant'
import { ThemeContext, ThemeContextType } from '../../context';
import { FONTS } from '../../assets';
import { SCREENS } from '..';


export default function BankDetails(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.bank_details}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={{ marginTop: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                    size={getScaleSize(17)}
                    font={FONTS.Lato.Medium}
                    color={theme._424242}>
                    {STRING.primary_bank_account_details}
                </Text>
                <View style={styles(theme).mainContainer}>
                    <View style={styles(theme).flexView}>
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Medium}
                            color={theme._424242}>
                            {STRING.account_holder_name}
                        </Text>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._424242}>
                            {'John Doe'}
                        </Text>
                    </View>
                    <View style={styles(theme).flexView}>
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Medium}
                            color={theme._424242}>
                            {STRING.account_number}
                        </Text>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._424242}>
                            {'1234567890'}
                        </Text>
                    </View>
                    <View style={styles(theme).flexView}>
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Medium}
                            color={theme._424242}>
                            {STRING.ifsc_code}
                        </Text>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._424242}>
                            {'GB29 NW 9268 19'}
                        </Text>
                    </View>
                    <View style={styles(theme).flexView}>
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Medium}
                            color={theme._424242}>
                            {STRING.bank_name}
                        </Text>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._424242}>
                            {'Global Trust Bank'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <Button
                style={{ marginHorizontal: getScaleSize(24), marginBottom: getScaleSize(24) }}
                title={STRING.edit_bank_details}
                onPress={() => {
                    props.navigation.navigate(SCREENS.AddBankDetails.identifier, {
                        isEdit: true,
                        isProfile: true
                    });
                }}
            />
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white,
    },
    mainContainer: {
        marginHorizontal: getScaleSize(24),
        marginVertical: getScaleSize(16),
        borderWidth: 1,
        borderColor: theme._DBE0E5,
        borderRadius: getScaleSize(12),
        paddingTop: getScaleSize(16),
        paddingHorizontal: getScaleSize(16),
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: getScaleSize(16),
    },

})