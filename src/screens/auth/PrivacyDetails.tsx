
import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';

//CONTEXT
import { ThemeContext } from '../../context';

//CONSTANT & ASSETS
import { FONTS } from '../../assets';
import { getScaleSize, useString } from '../../constant';

//COMPONENTS
import {
  Header,
  Text,
  KeyBoardAware,
  SafeView,
} from '../../components';

const PrivacySection = ({ title, desc, theme }: { title: string, desc: string, theme: any }) => (
  <View style={styles(theme).sectionContainer}>
    <Text
      size={getScaleSize(16)}
      font={FONTS.Lato.Bold}
      color={theme.secondaryText}
      style={styles(theme).sectionTitle}
    >
      {title}
    </Text>
    <Text
      size={getScaleSize(14)}
      font={FONTS.Lato.Regular}
      color={theme._8C8C8C}
      style={styles(theme).sectionDesc}
    >
      {desc}
    </Text>
  </View>
);

export default function PrivacyDetails(props: any) {
  const STRING = useString();
  const { theme } = useContext<any>(ThemeContext);

  const sections = [
    { title: STRING.privacyDetails.what_data_we_collect_title, desc: STRING.privacyDetails.what_data_we_collect_desc },
    { title: STRING.privacyDetails.why_we_collect_it_title, desc: STRING.privacyDetails.why_we_collect_it_desc },
    { title: STRING.privacyDetails.legal_basis_title, desc: STRING.privacyDetails.legal_basis_desc },
    { title: STRING.privacyDetails.data_sharing_title, desc: STRING.privacyDetails.data_sharing_desc },
    { title: STRING.privacyDetails.data_retention_title, desc: STRING.privacyDetails.data_retention_desc },
    { title: STRING.privacyDetails.security_title, desc: STRING.privacyDetails.security_desc },
    { title: STRING.privacyDetails.your_rights_title, desc: STRING.privacyDetails.your_rights_desc },
    { title: STRING.privacyDetails.if_you_dont_provide_data_title, desc: STRING.privacyDetails.if_you_dont_provide_data_desc },
    { title: STRING.privacyDetails.cross_border_transfers_title, desc: STRING.privacyDetails.cross_border_transfers_desc },
    { title: STRING.privacyDetails.updates_title, desc: STRING.privacyDetails.updates_desc },
  ];

  return (
    <SafeView style={styles(theme).mainContainer}>
      <Header
        screenName={STRING.privacyDetails.title}
        onBack={() => props.navigation.goBack()}
      />
      <KeyBoardAware contentContainerStyle={styles(theme).contentContainer}>
        <Text
          size={getScaleSize(18)}
          font={FONTS.Lato.Bold}
          color={theme.secondaryText}
          style={styles(theme).introText}
        >
          {STRING.privacyDetails.intro}
        </Text>

        {sections.map((section, index) => (
          <PrivacySection
            key={index}
            title={section.title}
            desc={section.desc}
            theme={theme}
          />
        ))}

        <Text
          size={getScaleSize(16)}
          font={FONTS.Lato.SemiBold}
          color={theme.secondaryText}
          style={styles(theme).agreeText}
        >
          {STRING.privacyDetails.agree_to_privacy_notice}
        </Text>
      </KeyBoardAware>
    </SafeView>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.white,
    },
    contentContainer: {
      paddingHorizontal: getScaleSize(20),
      paddingBottom: getScaleSize(30),
    },
    introText: {
      marginTop: getScaleSize(20),
      marginBottom: getScaleSize(24),
      lineHeight: getScaleSize(24),
    },
    sectionContainer: {
      marginBottom: getScaleSize(20),
    },
    sectionTitle: {
      marginBottom: getScaleSize(8),
    },
    sectionDesc: {
      lineHeight: getScaleSize(20),
    },
    agreeText: {
      marginTop: getScaleSize(10),
      marginBottom: getScaleSize(30),
    },
  });
