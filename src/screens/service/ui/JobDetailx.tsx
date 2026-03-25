import React, { useContext } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from '../../../components';
import { FONTS } from '../../../assets';
import { getScaleSize } from '../../../constant';
import { ThemeContext, ThemeContextType } from '../../../context';

 const JobDetailBox = ({
  jobBudgetValue, jobDate, jobTime,isTitle = true, jobDetailContainer}: {jobBudgetValue: string, jobDate: string, jobTime: string, isTitle?: boolean, jobDetailContainer?: ViewStyle}) => {
      const { theme } = useContext<any>(ThemeContext);

  const JobItem = ({ title, value }: { title: string, value: string }) => {
    return (
      <View style={styles(theme).detailItem}>
        <Text
          font={FONTS.Lato.SemiBold}
          color={theme._8C8C8C}
          size={getScaleSize(14)}
        >{title}</Text>
        <Text
          font={FONTS.Lato.Bold}
          color={theme.primary}
          size={getScaleSize(16)}
        >{value}</Text>
      </View>
    )
  }


  return (
    <>
     {isTitle && (
      <Text
          font={FONTS.Lato.SemiBold}
          size={getScaleSize(16)}
          color={theme.primaryText}
          style={styles(theme).jobDetailTitle}>Job Details</Text>
          )}
        <View style={[styles(theme).detailsContainer,jobDetailContainer]}>
          <JobItem
            title='Budget'
            value={jobBudgetValue}
          />
          <View style={styles(theme).verticalDivider} />
          <JobItem
            title='Job Date'
            value={jobDate}
          />
          <View style={styles(theme).verticalDivider} />
          <JobItem
            title='Job Time'
            value={jobTime}
          />
        </View>
        </>
  )
}

export default JobDetailBox

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
   
    detailsContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      borderWidth: 0.5,
      borderColor: theme._D9D9D9,
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
    jobDetailTitle: {
      marginTop: getScaleSize(24),
    },
  
  });