import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../context/ThemeProvider';
import { getScaleSize, useString } from '../constant';
import Text from './Text';
import { FONTS, IMAGES } from '../assets';
import moment from 'moment';

export default function TaskItem(props: any) {
  const { theme } = useContext<any>(ThemeContext);
  const STRING = useString();

  const { item,cardContainerStyle,status } = props;

  function getMessage() {
    if (item?.quote_status === 'send') {
      return 'Quote Submitted';
    } else if (item?.quote_status === 'accepted') {
      return 'Quote Accepted';
    } else if (item?.quote_status === 'complete') {
      return 'Task Completed'
    }
  }

  function getStatus(status: string) {
    if (status == "ongoing") {
      return {
        label: "Ongoing",
        textColor: theme.primary,
        backgroundColor: theme._FDEFEC
      }
    }
    else if (status === "complete") {
      return {
        label: "Complete",
        textColor: theme.successText,
        backgroundColor: theme._10B98133
      }
    }else if (status === "instant") {
      return {
        label: "Instant",
        textColor: theme.mainText,
        backgroundColor: theme.white
      }
    }
  }

  console.log("item",item)
  return (
    // <TouchableOpacity
    //   style={styles(theme).container}
    //   activeOpacity={1}
    //   onPress={() => {
    //     props?.onPressItem();
    //   }}>
    //   <View style={styles(theme).headerContainer}>
    //     <Text
    //       size={getScaleSize(16)}
    //       font={FONTS.Lato.Bold}
    //       color={theme._214C65}
    //       style={{}}>
    //       {getMessage()}
    //     </Text>
    //   </View>
    //   <View style={styles(theme).horizontalContainer}>
    //     <View style={{ flex: 1.0 }}>
    //       <Text
    //         style={{ flex: 1.0 }}
    //         size={getScaleSize(24)}
    //         font={FONTS.Lato.Bold}
    //         color={theme._2C6587}>
    //         {item?.service_details?.subcategory?.name ?? ''}
    //       </Text>
    //       <View style={styles(theme).itemView}>
    //         <Image
    //           style={styles(theme).informationIcon}
    //           source={IMAGES.calender}
    //         />
    //         <Text
    //           style={{
    //             marginHorizontal: getScaleSize(8),
    //             alignSelf: 'center',
    //           }}
    //           size={getScaleSize(14)}
    //           font={FONTS.Lato.Medium}
    //           color={theme._2C6587}>
    //           {item?.chosen_date_time ? moment.utc(item?.chosen_date_time).local().format('DD MMM, YYYY') : ''}
    //         </Text>
    //       </View>
    //       <View style={styles(theme).itemView}>
    //         <Image
    //           style={styles(theme).informationIcon}
    //           source={IMAGES.clock}
    //         />
    //         <Text
    //           style={{
    //             marginHorizontal: getScaleSize(8),
    //             alignSelf: 'center',
    //           }}
    //           size={getScaleSize(14)}
    //           font={FONTS.Lato.Medium}
    //           color={theme._2C6587}>
    //           {item?.chosen_date_time ? moment.utc(item?.chosen_date_time).local().format('hh:mm A') : ''}
    //         </Text>
    //       </View>
    //     </View>
    //     {item?.service_details?.subcategory?.icon ? (
    //       <Image
    //         style={styles(theme).imageView}
    //         resizeMode='cover'
    //         source={{ uri: item?.service_details?.subcategory?.icon }}
    //       />
    //     ) : (
    //       <View style={[styles(theme).imageView, { backgroundColor: theme._EAF0F3 }]} />  
    //     )}
    //   </View>
    //   <View style={styles(theme).deviderView} />
    //   <View style={{ flexDirection: 'row' }}>
    //     <TouchableOpacity
    //       style={styles(theme).buttonView}
    //       activeOpacity={1}
    //       onPress={() => {
    //         props?.onPressStatus();
    //       }}>
    //       <Text
    //         style={{}}
    //         size={getScaleSize(14)}
    //         font={FONTS.Lato.SemiBold}
    //         color={theme._2C6587}>
    //         {STRING.TaskStatus}
    //       </Text>
    //     </TouchableOpacity>
    //     <View style={styles(theme).verticalDevicer} />
    //     <TouchableOpacity
    //       style={styles(theme).buttonView}
    //       activeOpacity={1}
    //       onPress={() => {
    //         props?.onPressChat();
    //       }}>
    //       <Text
    //         style={{}}
    //         size={getScaleSize(14)}
    //         font={FONTS.Lato.SemiBold}
    //         color={theme._2C6587}>
    //         {STRING.Chat}
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props?.onPressItem();
      }}
      style={[styles(theme).cardContainer,cardContainerStyle]}>

      {/* TOP ROW */}
      <View style={styles(theme).topRow}>

        {/* LEFT SIDE */}
        <View style={styles(theme).leftSection}>
          <Image
            // source={{ uri: item?.service_details?.subcategory?.icon }}
            source={{uri:item?.service_image}}
            style={styles(theme).serviceImage}
          />

          <View style={[styles(theme).textContainer]}>
            <Text
              size={getScaleSize(18)}
              font={FONTS.Lato.Bold}
              numberOfLines={2}
              color={theme.primaryText}
            >
              {/* {item?.service_details?.subcategory?.name} */}
              {item?.service_category}
            </Text>

            <Text
              size={getScaleSize(14)}
              font={FONTS.Lato.Medium}
              color={theme._404040}>
              {/* {item?.service_details?.subcategory?.description} */}
              {"Furniture assembly"}
            </Text>
          </View>
        </View>

        {/* STATUS */}
        <View
          style={[
            styles(theme).statusContainer,
            {
              backgroundColor: getStatus(status)?.backgroundColor,
            },
          ]}>
          <Text
            size={getScaleSize(10)}
            color={getStatus(status)?.textColor}
            font={FONTS.Lato.SemiBold}>
            {getStatus(status)?.label}
          </Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles(theme).divider} />

      {/* BUTTON */}
      <TouchableOpacity style={styles(theme).button}>
        <Text
          size={getScaleSize(14)}
          font={FONTS.Lato.SemiBold}
          color={theme.white}>
          View Details
        </Text>
      </TouchableOpacity>

    </TouchableOpacity>
  );
}


const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    cardContainer: {
      padding: getScaleSize(16),
      backgroundColor: theme.white,
      borderRadius: getScaleSize(12),
      borderWidth: 1,
      borderColor: theme._D9D9D9,
      marginBottom: getScaleSize(16),
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    leftSection: {
      flexDirection: 'row',
      // flex: 1,
    },
    serviceImage: {
      height: getScaleSize(54),
      width: getScaleSize(54),
      borderRadius: getScaleSize(8),
    },
    textContainer: {
      marginLeft: getScaleSize(12),
      // flex: 1,
      gap: getScaleSize(6),
    },
    statusContainer: {
      paddingVertical: getScaleSize(4),
      paddingHorizontal: getScaleSize(10),
      borderRadius: getScaleSize(6),
      alignSelf: 'flex-start',
    },
    divider: {
      height: 1,
      backgroundColor: theme._D9D9D9,
      marginVertical: getScaleSize(16),
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: getScaleSize(10),
      borderRadius: getScaleSize(10),
      alignItems: 'center',
    },
  });