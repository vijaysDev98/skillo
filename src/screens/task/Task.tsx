import React, { useContext, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//COMPONENT
import { Header, SearchComponent, Text } from '../../components';

//PACKAGES
import { SCREENS } from '..';
import JobDetailBox from '../service/ui/JobDetailx';

import { buildThreadId } from '../../services/chat';
import { API } from '../../api';
import { screenWidth } from '../../constant/scaleSize';

export default function Task(props: any) {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const tabs = [
    { id: 'all', title: 'All' },
    { id: 'quote_sent', title: 'Quote Sent' },
    { id: 'accepted', title: 'Accepted' },
    { id: 'completed', title: 'Completed' },
    { id: 'cancelled', title: 'Cancelled' },
  ];

  const [selectedTab, setSelectedTab] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const dummyTasks = useMemo(
    () => [
      {
        id: '1',
        title: 'DIY Service',
        subtitle: 'Furniture assembly',
        budget: 'P300 to P500',
        jobDate: '14 Dec',
        jobTime: '18:00 Pm',
        tab: "quote_sent",
        status: 'quote_sent',
      },
      {
        id: '2',
        title: 'DIY Service',
        subtitle: 'Furniture assembly',
        budget: 'P300 to P500',
        jobDate: '14 Dec',
        jobTime: '18:00 Pm',
        tab: "accepted",
        status: 'ongoing',
      },
      {
        id: '3',
        title: 'DIY Service',
        subtitle: 'Furniture assembly',
        budget: 'P300 to P500',
        jobDate: '14 Dec',
        jobTime: '18:00 Pm',
        tab: "completed",
        status: 'completed',
      },
      {
        id: '4',
        title: 'DIY Service',
        subtitle: 'Furniture assembly',
        budget: 'P300 to P500',
        jobDate: '14 Dec',
        jobTime: '18:00 Pm',
        tab: "cancelled",
        status: 'cancelled',
      },
      {
        id: '5',
        title: 'DIY Service',
        subtitle: 'Furniture assembly',
        budget: 'P300 to P500',
        jobDate: '14 Dec',
        jobTime: '18:00 Pm',
        tab: "quote_sent",
        status: 'quote_sent',
      },
    ],
    [],
  );

  const filteredTasks = useMemo(() => {
    const text = searchValue.trim().toLowerCase();
    return dummyTasks.filter(task => {
      const matchesTab = selectedTab === 'all' ? true : task.tab === selectedTab;
      const matchesSearch = text ? `${task.title} ${task.subtitle}`.toLowerCase().includes(text) : true;
      return matchesTab && matchesSearch;
    });
  }, [dummyTasks, searchValue, selectedTab]);

  const statusLabel = (status: string) => {
    switch (status) {
      case 'quote_sent':
        return 'Quote Sent';
      case 'ongoing':
        return 'Ongoing';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  async function getServiceDetails(serviceRequestId: string) {
    try {
      // const result = await API.Instance.get(
      //   API.API_ROUTES.getTsakDetails + `/quotes/${serviceRequestId}`,
      // );
      // if (result.status) {
      //   console.log(result?.data?.data);
      //   const conversationId = buildThreadId(
      //     result?.data?.data?.elderly_user?.id,
      //     profile?.user?.id,
      //   );
      props.navigation.navigate(SCREENS.ChatDetails.identifier, {
        conversationId: "12",
        peerUser: {
          user_id: "12",
          name: "Joe",
          email: "Joe@yopmail.com",
          avatarUrl: "https://via.placeholder.com/150",
        },
      });
      // } else {
      //   SHOW_TOAST(result?.data?.message ?? '', 'error');
      // }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log(error?.message);
    } finally {
    }
  }

  const handleViewDetails = (item: any) => {
    props.navigation.navigate(SCREENS.ProfessionalTaskDetails.identifier, {
      item: item,
    });
  }

  const handleManageTask = (item:any) => {
    props.navigation.navigate(SCREENS.TaskStatus.identifier, {
      item: item,
    });
  }

  const handleChat = (item: any) => {
    getServiceDetails(item.id)
  }

  const handleRaiseDispute = (item: any) => {

  }

  const renderTaskCard = ({ item }: any) => {
    return (
      <View style={styles(theme).card}>
        <View style={styles(theme).cardHeader}>
          <View style={styles(theme).cardTitleRow}>
            <Image source={IMAGES.furnitureAssemblyImg} style={styles(theme).cardAvatar} />
            <View style={{ flex: 1 }}>
              <Text
                size={getScaleSize(16)}
                font={FONTS.Lato.Bold}
                color={theme._2B2B2B}
              >
                {item.title}
              </Text>
              <Text
                size={getScaleSize(14)}
                font={FONTS.Lato.Medium}
                color={theme._8C8C8C}
                style={{ marginTop: getScaleSize(2) }}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>
          <View style={styles(theme).statusPill}>
            <Text
              size={getScaleSize(12)}
              font={FONTS.Lato.SemiBold}
              color={theme.primary}
            >
              {statusLabel(item?.status)}
            </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: theme._D6D6D6, marginVertical: getScaleSize(20) }} />
        {/* <View style={styles(theme).cardDetailRow}>
          <View style={styles(theme).detailItem}>
            <Text size={getScaleSize(12)} font={FONTS.Lato.Medium} color={theme._8C8C8C}>
              Budget
            </Text>
            <Text size={getScaleSize(14)} font={FONTS.Lato.Bold} color={theme.primary}>
              {item.budget}
            </Text>
          </View>
          <View style={styles(theme).detailItem}>
            <Text size={getScaleSize(12)} font={FONTS.Lato.Medium} color={theme._8C8C8C}>
              Job Date
            </Text>
            <Text size={getScaleSize(14)} font={FONTS.Lato.Bold} color={theme.primary}>
              {item.jobDate}
            </Text>
          </View>
          <View style={styles(theme).detailItem}>
            <Text size={getScaleSize(12)} font={FONTS.Lato.Medium} color={theme._8C8C8C}>
              Job Time
            </Text>
            <Text size={getScaleSize(14)} font={FONTS.Lato.Bold} color={theme.primary}>
              {item.jobTime}
            </Text>
          </View>
        </View> */}
        <JobDetailBox
          jobDetailContainer={{ marginTop: 0, elevation: 0 }}
          isTitle={false}
          jobBudgetValue='P300 to P500'
          jobDate={'14 Dec'}
          jobTime={'10:00 AM'}
        />
        <View style={styles(theme).cardActions}>
          {statusLabel(item?.status) == "Quote Sent" || statusLabel(item?.status) == "Cancelled" ?
            <>
              <TouchableOpacity
                onPress={() => {
                  handleViewDetails(item)
                }}
                style={styles(theme).primaryButton} activeOpacity={0.9}>
                <Text size={getScaleSize(12)} font={FONTS.Lato.SemiBold} color={theme.white}>
                  View Details
                </Text>
              </TouchableOpacity>
            </>
            :
            <>
              <TouchableOpacity
                onPress={() => {
                  if (item.status == 'ongoing') {
                    // TODO: Navigate to chat screen
                    // getServiceDetails(item.id)
                    handleViewDetails(item)
                  }
                  else if (item.status === "completed") {
                    // TODO: Navigate to dispute screen
                    handleRaiseDispute(item)
                  } else {
                    // TODO: Navigate to chat screen
                    handleChat(item)
                  }
                }}
                style={styles(theme).chatButton} activeOpacity={0.9}>
                <Text size={getScaleSize(12)} font={FONTS.Lato.SemiBold} color={theme.primary}>
                  {(item.status == 'ongoing') ? "View Details" : (item.tab === "completed") ? 'Raise Dispute' : 'Chat'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (item.status == 'ongoing') {
                    handleManageTask(item)
                  } else {
                    handleViewDetails(item)
                  }
                }}
                style={styles(theme).primaryButton} activeOpacity={0.9}>
                <Text size={getScaleSize(12)} font={FONTS.Lato.SemiBold} color={theme.white}>
                  {(item.status == 'ongoing') ? "Manage Task Status" : "View Details"}
                </Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles(theme).emptyView}>
      <Image source={IMAGES.empty} style={styles(theme).emptyImage} />
      <Text
        size={getScaleSize(16)}
        font={FONTS.Lato.SemiBold}
        color={theme._939393}
        align="center"
        style={{ marginTop: getScaleSize(20) }}
      >
        {'No service requests yet.\nSubmit one now!'}
      </Text>
    </View>
  );

  return (
    <View style={styles(theme).container}>
      <Header />
      <View style={styles(theme).searchContainer}>
        <SearchComponent
          placeholder="Search for Services"
          placeholderTextColor={theme._404040}
          value={searchValue}
          onChangeText={(text: string) => setSearchValue(text)}
          onPressMicrophone={() => { }}
          searchInputStyle={{
            color: theme._404040,
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.Regular
          }}
          searchViewStyle={{ width: screenWidth - getScaleSize(110) }}
        />
        <TouchableOpacity
          style={styles(theme).filterButton}
        >
          <Image source={IMAGES.filterIcon} style={styles(theme).filterIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={tabs}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).tabList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles(theme).tabPill,
                {
                  marginLeft: index === 0 ? getScaleSize(22) : getScaleSize(12),
                  backgroundColor:
                    selectedTab === item.id ? theme.primary : theme._F0F0F0,
                },
              ]}
              activeOpacity={0.9}
              onPress={() => setSelectedTab(item.id)}
            >
              <Text
                size={getScaleSize(14)}
                font={FONTS.Lato.SemiBold}
                color={selectedTab === item.id ? theme.white : theme._8C8C8C}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={<View style={{ width: getScaleSize(22) }} />}
        />
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={renderTaskCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles(theme).listContent,]}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: getScaleSize(22),
      marginTop: getScaleSize(7),
      // marginBottom: getScaleSize(24),
      gap: getScaleSize(10)
    },
    filterButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.white,
      borderRadius: getScaleSize(10),
      padding: getScaleSize(13),
      elevation: 1
    },
    filterIcon: {
      height: getScaleSize(24),
      width: getScaleSize(24)
    },
    tabList: {
      paddingVertical: getScaleSize(14),
      // height: getScaleSize(70),
    },
    tabPill: {
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(12),
      borderRadius: getScaleSize(12),
    },
    listContent: {
      paddingHorizontal: getScaleSize(22),
      paddingBottom: getScaleSize(30),
    },
    card: {
      backgroundColor: theme.white,
      borderRadius: getScaleSize(14),
      padding: getScaleSize(16),
      marginBottom: getScaleSize(16),
      // shadowColor: '#000',
      // shadowOpacity: 0.08,
      // shadowRadius: 8,
      // shadowOffset: { width: 0, height: 2 },
      // elevation: Platform.OS === 'android' ? 2 : 0,
      borderWidth: 0.5,
      borderColor: theme._D9D9D9,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    cardAvatar: {
      height: getScaleSize(44),
      width: getScaleSize(44),
      borderRadius: getScaleSize(6),
      marginRight: getScaleSize(10),
    },
    statusPill: {
      paddingHorizontal: getScaleSize(10),
      paddingVertical: getScaleSize(6),
      borderRadius: getScaleSize(10),
      backgroundColor: theme._FDEFEC ?? '#FDECEC',
    },
    cardDetailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: getScaleSize(16),
    },
    detailItem: {
      flex: 1,
      gap: getScaleSize(4),
    },
    cardActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getScaleSize(16),
      gap: getScaleSize(12),
    },
    chatButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.primary,
      paddingVertical: getScaleSize(10),
      borderRadius: getScaleSize(10),
      alignItems: 'center',
      backgroundColor: theme.white,
    },
    primaryButton: {
      flex: 1,
      paddingVertical: getScaleSize(10),
      borderRadius: getScaleSize(10),
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    emptyView: {
      alignItems: 'center',
      marginTop: getScaleSize(60),
      paddingHorizontal: getScaleSize(24),
    },
    emptyImage: {
      height: getScaleSize(200),
      width: getScaleSize(200),
      resizeMode: 'contain',
    },
  });

