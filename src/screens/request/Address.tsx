import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext, ThemeContextType } from '../../context/ThemeProvider';
import { getScaleSize } from '../../constant/scaleSize';
import { Button, Header, Text } from '../../components';
import { useString } from '../../constant/string';
import { API } from '../../api';
import { SHOW_TOAST } from '../../constant';
import { FONTS, IMAGES } from '../../assets';
import { AuthContext } from '../../context';
import { SCREENS } from '..';
import { useIsFocused } from '@react-navigation/native';
import { AppSafeAreaView } from '../../components/AppSafeAreaView';

const dummysavedAddresses = [
    {
        id: 1,
        banglo: "Plot 1234",
        city: "Gaborone West Industrial",
        state: "Gaborone",
        postal_code: "00001",
    },
    {
        id: 2,
        banglo: "Plot 5438",
        city: "Broadhurst Industrial",
        state: "Gaborone",
        postal_code: "00002",
    },
];

export default function Address(props: any) {
    const { theme } = useContext<any>(ThemeContext);
    const { profile, setSelectedAddress, selectedAddress } = useContext<any>(AuthContext);
    const STRING = useString();

    const [savedAddresses, setSavedAddresses] = useState<any>(dummysavedAddresses || []);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<any>(null);

    const isFocused = useIsFocused();

    // useEffect(() => {
    //     if (isFocused) {
    //         getSavedAddresses();
    //     }
    // }, [isFocused]);

    async function getSavedAddresses() {
        try {
            setIsLoading(true);
            const result = await API.Instance.get(API.API_ROUTES.getSavedAddresses);
            if (result.status) {
                setSavedAddresses(result.data.data);
            } else {
                SHOW_TOAST(result.data.message, 'error');
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteAddress(id: any) {
        try {
            setIsLoading(true);
            // TODO: Replace with actual API call
            // const result = await API.Instance.delete(API.API_ROUTES.deleteAddress + `/${id}`);
            setSavedAddresses((prev: any) => prev.filter((addr: any) => addr.id !== id));
            SHOW_TOAST('Address deleted successfully', 'success');
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Failed to delete address', 'error');
        } finally {
            setIsLoading(false);
            setShowDeleteModal(false);
            setSelectedDeleteId(null);
        }
    }

    return (
        <AppSafeAreaView style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.saved_addresses}
            />
            <View style={{ height: getScaleSize(20) }} />
            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={theme.primary} />
                </View>
            ) : (
                savedAddresses.length > 0 ?
                    <FlatList
                        data={savedAddresses}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles(theme).itemContainer}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        setSelectedAddress(item);
                                    }}
                                >
                                    {/* <Image source={selectedAddress?.id === item?.id ? IMAGES.ic_radio_select : IMAGES.ic_radio_unselect} style={[styles(theme).radioSelectIcon,
                                    {
                                       tintColor: selectedAddress?.id === item?.id ? theme.primary : undefined  
                                    }
                                ]} /> */}
                                    <View style={[{
                                        width: getScaleSize(24),
                                        height: getScaleSize(24),
                                        marginRight: getScaleSize(8),
                                        borderRadius: getScaleSize(40),
                                        borderWidth: 2,
                                        borderColor: theme._B3B3B3,
                                    }, selectedAddress?.id === item?.id && {
                                        backgroundColor: theme.white,
                                        borderColor: theme.primary,
                                        borderWidth: getScaleSize(5)
                                    }]} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.Bold}
                                        color={theme.primary}>
                                        {/* {profile?.user?.first_name} {profile?.user?.last_name ?? ''} */}
                                        {"Bessie Cooper"}
                                    </Text>
                                    <Text
                                        style={{ marginTop: getScaleSize(16), marginBottom: getScaleSize(12), }}
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.Medium}
                                        color={theme._8C8C8C}>
                                        {`${item.banglo}, ${item.city}, ${item.state}, ${item.postal_code}`}
                                    </Text>
                                    <Text
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.Bold}
                                        color={theme._2B2B2B}>
                                        {/* {profile?.user?.phone_number} */}
                                        {"(480) 555-0103"}
                                    </Text>
                                </View>
                                <View style={styles(theme).actionButtons}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            props.navigation.navigate(SCREENS.EditAddress.identifier, {
                                                addressData: item
                                            });
                                        }}
                                    >
                                        <Image source={IMAGES.edit} style={styles(theme).editIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            setSelectedDeleteId(item.id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <Image source={IMAGES.trash2} style={styles(theme).deleteIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text size={getScaleSize(16)} font={FONTS.Lato.Regular} color={theme._555555}>No addresses found</Text>
                    </View>
            )}
            <Button
                title={STRING.add_new_address}
                style={{ marginHorizontal: getScaleSize(24), marginBottom: getScaleSize(10) }}
                onPress={() => {
                    props.navigation.navigate(SCREENS.AddAdress.identifier, {
                        fromChangeAddress: true,
                        title:"Add New Address"
                    });
                }}
            />
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setShowDeleteModal(false);
                    setSelectedDeleteId(null);
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
                            Are you sure you want to delete this address?
                        </Text>
                        <View style={styles(theme).modalButtonRow}>
                            <TouchableOpacity
                                style={styles(theme).cancelButton}
                                onPress={() => {
                                    setShowDeleteModal(false);
                                    setSelectedDeleteId(null);
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
                                onPress={() => deleteAddress(selectedDeleteId)}
                            >
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.SemiBold}
                                    color={theme.white}
                                    align='center'
                                >Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </AppSafeAreaView>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: theme._D9D9D9,
        flexDirection: 'row',
        marginHorizontal: getScaleSize(24),
        borderRadius: getScaleSize(12),
        marginBottom: getScaleSize(20),
        paddingRight: getScaleSize(12),
        paddingLeft: getScaleSize(10),
        paddingVertical: getScaleSize(12),
    },
    radioSelectIcon: {
        width: getScaleSize(40),
        height: getScaleSize(40),
        marginRight: getScaleSize(8),
    },
    editIcon: {
        width: getScaleSize(20),
        height: getScaleSize(20),
        tintColor: theme.primary
    },
    deleteIcon: {
        width: getScaleSize(20),
        height: getScaleSize(20),
        tintColor: '#E74C3C',
    },
    actionButtons: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        gap: getScaleSize(12),
        marginLeft: getScaleSize(10),
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
})