import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../context';

//CONSTANTS & ASSETS
import { arrayIcons, getScaleSize, useString } from '../constant';
import { FONTS, IMAGES } from '../assets';

//COMPONENTS
import Text from './Text';
import moment from 'moment';

// function RequestItem(props: any) {
//   const STRING = useString();
//   const { theme } = useContext(ThemeContext);

//   const { item, selectedFilter, isFromSearch } = props;

//   function getStatus(status: any) {
//     if (status === 'open') {
//       return 'Open Proposal';
//     } else if (status === 'pending') {
//       return 'Responsed';
//     } else if (status === 'accepted') {
//       return 'Validation';
//     } else if (status === 'completed') {
//       return 'Completed';
//     } else if (status === 'cancelled') {
//       return 'Cancelled';
//     }
//     else if (status === 'expired') {
//       return 'Expired'
//     }
//   }

//   return (
//     <TouchableOpacity
//       style={styles(theme).container}
//       disabled={(item?.status?.toLowerCase() === 'expired') ? true : false}
//       onPress={() => {
//         props.onPress();
//       }}>
//       <View style={styles(theme).horizontalContainer}>
//         <View style={styles(theme).imageContainer}>
//           {item?.category_name ? (
//             <Image
//               source={
//                 arrayIcons[
//                 item?.category_name?.toLowerCase() as keyof typeof arrayIcons
//                 ] ?? (arrayIcons['diy'] as any)
//               }
//               style={[styles(theme).imageIcon, { tintColor: theme.white }]}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles(theme).imageIcon} />
//           )}
//         </View>
//         <Text
//           style={{ marginLeft: getScaleSize(16), alignSelf: 'center' }}
//           size={getScaleSize(24)}
//           font={FONTS.Lato.Bold}
//           color={theme.primary}>
//           {`${item?.category_name} Service`}
//         </Text>
//       </View>
//       <View
//         style={{
//           flex: 1.0,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginTop: getScaleSize(12),
//         }}>
//         <Text
//           style={{ flex: 1.0 }}
//           size={getScaleSize(20)}
//           font={FONTS.Lato.SemiBold}
//           color={theme.primary}>
//           {item?.sub_category_name ?? ''}
//         </Text>
//         {selectedFilter?.title === 'All' && (
//           <View style={styles(theme).statusContainer}>
//             <Text
//               size={getScaleSize(16)}
//               font={FONTS.Lato.SemiBold}
//               color={theme._F0B52C}>
//               {isFromSearch === true ? getStatus(item?.task_status) : getStatus(item?.status)}
//             </Text>
//           </View>
//         )}
//       </View>
//       <View style={styles(theme).detailsView}>
//         <View style={styles(theme).horizontalContainer}>
//           <Text
//             style={{ flex: 1.0 }}
//             size={getScaleSize(18)}
//             font={FONTS.Lato.SemiBold}
//             color={theme._989898}>
//             {STRING.Valuation}
//           </Text>
//           <Text
//             size={getScaleSize(20)}
//             font={FONTS.Lato.SemiBold}
//             color={theme.primary}>
//             {item?.total_renegotiated
//               ? item.total_renegotiated === 'Barter Product'
//                 ? 'Barter Product'
//                 : `€${item.total_renegotiated}`
//               : ''}
//           </Text>
//         </View>
//         <View
//           style={[
//             styles(theme).horizontalContainer,
//             { marginTop: getScaleSize(3) },
//           ]}>
//           <Text
//             style={{ flex: 1.0 }}
//             size={getScaleSize(18)}
//             font={FONTS.Lato.SemiBold}
//             color={theme._989898}>
//             {STRING.JobDate}
//           </Text>
//           <Text
//             size={getScaleSize(20)}
//             font={FONTS.Lato.SemiBold}
//             color={theme.primary}>
//             {moment.utc(item?.chosen_datetime).local().format('DD MMM')}
//           </Text>
//         </View>
//         <View
//           style={[
//             styles(theme).horizontalContainer,
//             { marginTop: getScaleSize(3) },
//           ]}>
//           <Text
//             style={{ flex: 1.0 }}
//             size={getScaleSize(18)}
//             font={FONTS.Lato.SemiBold}
//             color={theme._989898}>
//             {STRING.JobTime}
//           </Text>
//           <Text
//             size={getScaleSize(20)}
//             font={FONTS.Lato.SemiBold}
//             color={theme.primary}>
//             {moment.utc(item?.chosen_datetime).local().format('hh:mm A')}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = (theme: ThemeContextType['theme']) =>
//   StyleSheet.create({
//     container: {
//       marginHorizontal: getScaleSize(24),
//       marginBottom: getScaleSize(18),
//       borderRadius: getScaleSize(16),
//       backgroundColor: theme._EAF0F3,
//       paddingHorizontal: getScaleSize(16),
//       paddingVertical: getScaleSize(16),
//     },
//     horizontalContainer: {
//       flexDirection: 'row',
//     },
//     imageContainer: {
//       height: getScaleSize(44),
//       width: getScaleSize(44),
//       borderRadius: getScaleSize(10),
//       backgroundColor: theme._2C6587,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     imageIcon: {
//       width: getScaleSize(24),
//       height: getScaleSize(24),
//     },
//     detailsView: {
//       backgroundColor: theme.white,
//       borderRadius: getScaleSize(12),
//       paddingVertical: getScaleSize(16),
//       paddingHorizontal: getScaleSize(16),
//       marginTop: getScaleSize(16),
//     },
//     statusContainer: {
//       backgroundColor: theme.white,
//       borderRadius: getScaleSize(16),
//       paddingVertical: getScaleSize(4),
//       paddingHorizontal: getScaleSize(10),
//       marginLeft: getScaleSize(8),
//     },
//   });

// export default RequestItem;


function RequestItem(props: any) {
  const {
    serviceImag,
    serviceName,
    serviceSubTitle,
    budgetValue,
    jobDate,
    jobTime,
    handleOnPress,
    status,
    address,
  } = props;

  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={styles(theme).container}
    >
      {/* ================= HEADER ================= */}
      <View style={styles(theme).headerRow}>

        {/* LEFT */}
        <View style={styles(theme).leftRow}>
          <Image source={serviceImag} style={styles(theme).serviceImage} />

          <View style={styles(theme).textContainer}>
            <Text
              font={FONTS.Lato.Bold}
              size={getScaleSize(18)}
              color={theme.primaryText}
            >
              {serviceName}
            </Text>

            <Text
              font={FONTS.Lato.Medium}
              size={getScaleSize(14)}
              color={theme.primaryText}
            >
              {serviceSubTitle}
            </Text>
          </View>
        </View>

        {/* STATUS */}
        <View style={styles(theme).statusContainer}>
          <Text
            font={FONTS.Lato.SemiBold}
            size={getScaleSize(10)}
            color={theme.primary}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* ================= DIVIDER ================= */}
      <View style={styles(theme).divider} />

      {/* ================= DETAILS ================= */}
      <View style={styles(theme).detailsContainer}>

        {/* Budget */}
        <View style={styles(theme).detailItem}>
          <Text
            font={FONTS.Lato.SemiBold}
            color={theme._8C8C8C}
            size={getScaleSize(14)}
          >Budget</Text>
          <Text
            font={FONTS.Lato.Bold}
            color={theme.primary}
            size={getScaleSize(16)}
          >{budgetValue}</Text>
        </View>

        <View style={styles(theme).verticalDivider} />

        {/* Date */}
        <View style={styles(theme).detailItem}>
          <Text font={FONTS.Lato.SemiBold}
            color={theme._8C8C8C}
            size={getScaleSize(14)}>Job Date</Text>
          <Text
            font={FONTS.Lato.Bold}
            color={theme.primary}
            size={getScaleSize(16)}
          >{jobDate}</Text>
        </View>

        <View style={styles(theme).verticalDivider} />

        {/* Time */}
        <View style={styles(theme).detailItem}>
          <Text font={FONTS.Lato.SemiBold}
            color={theme._8C8C8C}
            size={getScaleSize(14)}>Job Time</Text>
          <Text
            font={FONTS.Lato.Bold}
            color={theme.primary}
            size={getScaleSize(16)}
          >{jobTime}</Text>
        </View>
      </View>

      {/* ================= ADDRESS ================= */}
      <View style={styles(theme).addressContainer}>
        <Image
          source={IMAGES.home_unselected}
          style={styles(theme).addressIcon}
        />

        <Text
          font={FONTS.Lato.Medium}
          size={getScaleSize(16)}
          color={theme._2B2B2B}
        >
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default RequestItem;


const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      borderRadius: getScaleSize(10),
      padding: getScaleSize(16),
      borderWidth: 0.5,
      borderColor: theme._D9D9D9,
    },

    /* HEADER */
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    leftRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: getScaleSize(12),
    },

    serviceImage: {
      height: getScaleSize(54),
      width: getScaleSize(54),
      borderRadius: getScaleSize(6),
    },

    textContainer: {
      alignSelf: "flex-start",
      gap: getScaleSize(6),
    },

    statusContainer: {
      paddingHorizontal: getScaleSize(8),
      paddingVertical: getScaleSize(4),
      borderRadius: getScaleSize(6),
      backgroundColor: "#FDEFEC",
      alignSelf: "flex-start",
    },

    /* DIVIDER */
    divider: {
      height: 1,
      backgroundColor: theme._D9D9D9,
      marginVertical: getScaleSize(20),
    },

    /* DETAILS */
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:'space-between',
      borderWidth: 0.5,
      borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(6),
      padding: getScaleSize(8),
      gap: getScaleSize(10),
    },

    detailItem: {
      alignItems: "center",
      gap: getScaleSize(6),
    },

    label: {
      fontFamily: FONTS.Lato.SemiBold,
      color: theme._8C8C8C,
      fontSize: getScaleSize(14),
    },

    value: {
      fontFamily: FONTS.Lato.Bold,
      color: theme.primary,
      fontSize: getScaleSize(16),
    },

    verticalDivider: {
      height: "100%",
      width: getScaleSize(1),
      backgroundColor: theme._D6D6D6,
    },

    /* ADDRESS */
    addressContainer: {
      marginTop: getScaleSize(20),
      flexDirection: "row",
      alignItems: "center",
      gap: getScaleSize(12),
    },

    addressIcon: {
      height: getScaleSize(30),
      width: getScaleSize(24),
      tintColor: theme.primary,
    },
  });