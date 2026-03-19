import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext, ThemeContextType } from '../../context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, Text } from '../../components';
import { getScaleSize, useString } from '../../constant';
import { RecentSearchCard } from '../home/Search';
import { FONTS, IMAGES } from '../../assets';

const TrackDetails = (props:any) => {
  const {serviceId}= props.route.params ?? ""
  const {theme} = useContext(ThemeContext)
  const STRING = useString();

  const insets = useSafeAreaInsets()

  return (
    <View style={styles(theme).mainContainer}>
     <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.TaskDetails}
      />
      <ScrollView
      contentContainerStyle={{paddingHorizontal:getScaleSize(24)}}
      >
        <Text
        style={{marginTop:getScaleSize(20),marginBottom:getScaleSize(16)}}
        font={FONTS.Lato.SemiBold}
        size={getScaleSize(20)}
        color={theme.primaryText}
        >{"DIY Service"}</Text>
        <RecentSearchCard
          image={IMAGES.furnitureAssemblyImg}
          containerStyle={{ marginHorizontal: getScaleSize(0) }}
          title="Furniture Assembly"
        />

 <Text
          font={FONTS.Lato.SemiBold}
          size={getScaleSize(16)}
          color={theme.primaryText}
          style={styles(theme).jobDetailTitle}>Job Details</Text>

        <View style={styles(theme).detailsContainer}>
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
            >P200 to P500</Text>
          </View>

          <View style={styles(theme).verticalDivider} />

          <View style={styles(theme).detailItem}>
            <Text
              font={FONTS.Lato.SemiBold}
              color={theme._8C8C8C}
              size={getScaleSize(14)}
            >Job Date</Text>
            <Text
              font={FONTS.Lato.Bold}
              color={theme.primary}
              size={getScaleSize(16)}
            >14 Dec</Text>
          </View>

          <View style={styles(theme).verticalDivider} />

          <View style={styles(theme).detailItem}>
            <Text
              font={FONTS.Lato.SemiBold}
              color={theme._8C8C8C}
              size={getScaleSize(14)}
            >Job Time</Text>
            <Text
              font={FONTS.Lato.Bold}
              color={theme.primary}
              size={getScaleSize(16)}
            >18:00 Pm</Text>
          </View>
        </View>

         <Text
                  font={FONTS.Lato.Medium}
                  size={getScaleSize(16)}
                  color={theme._404040}
                  style={{ marginTop: getScaleSize(24), marginBottom: getScaleSize(8) }}
                >Quote Amount</Text>
        
                <View style={styles(theme).quoteBox}>
                  <Text
                    font={FONTS.Lato.SemiBold}
                    size={getScaleSize(18)}
                    color={theme.primaryText}
                  >{`P350`}</Text>
        
                  <TouchableOpacity style={styles(theme).negotiateBtn}>
                    <Text
        
                      font={FONTS.Lato.SemiBold}
                      size={getScaleSize(12)}
                      color={theme.white}
                    >Negotiate</Text>
                  </TouchableOpacity>
                </View>
        
        

      </ScrollView>
    </View>
  );
};

export default TrackDetails;

const styles = (theme: ThemeContextType['theme']) =>
   StyleSheet.create({
  mainContainer:{ 
    flex: 1, 
    backgroundColor: theme.white,
    // paddingTop:insets.top
  },
   jobDetailTitle: {
      marginTop: getScaleSize(24),
    },
     detailsContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      // borderWidth: 0.5,
      // borderColor: theme._D9D9D9,
      borderRadius: getScaleSize(10),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(21),
      marginTop: getScaleSize(16),
      backgroundColor: theme.white,
      elevation: 2,
    },

    detailItem: {
      alignItems: "center",
      gap: getScaleSize(6),
    },

    verticalDivider: {
      width: getScaleSize(1),
      backgroundColor: theme._D6D6D6,
    },
    quoteBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme._B3B3B3,
      borderRadius: getScaleSize(10),
      paddingHorizontal: getScaleSize(16),
      paddingVertical: getScaleSize(10),
      marginVertical: getScaleSize(8),
    },
    negotiateBtn: {
      backgroundColor: theme.primary,
      borderRadius: getScaleSize(10),
      paddingHorizontal: getScaleSize(24),
      paddingVertical: getScaleSize(10),
    },
})