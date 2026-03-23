import React, { useContext } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Text from './Text';
import { ThemeContext, ThemeContextType } from '../context';
import { FONTS, IMAGES } from '../assets';
import { getScaleSize } from '../constant';

interface Props {
  visible: boolean;
  onClose: () => void;
  data?: any;
}

export default function SubscriptionSuccessModal({
  visible,
  onClose,
  data,
}: Props) {
  const details = data || {
    plan: "Professional Monthly",
    paymentMode: "Mobile Money",
    transactionId: "TXN-20250926-784531",
    startDate: "26 July 2025",
    billingCycle: "Monthly",
    firstChargeDate: "26 Sept 2025",
  };

  const {theme} = useContext(ThemeContext)


// 🔥 REUSABLE ROW
const renderRow = (label: string, value: string) => (
  <View style={styles(theme).row}>
    <Text 
    size={getScaleSize(10)}
    color={theme.secondaryText}
    font={FONTS.Lato.Medium}
    >{label}</Text>
    <Text
    size={getScaleSize(12)}
    color={theme.secondaryText}
    font={FONTS.Lato.SemiBold}
    >{value}</Text>
  </View>
);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles(theme).overlay}>
        <View style={styles(theme).container}>

          {/* ICON */}
          <View style={styles(theme).iconWrapper}>
            <Image
              source={IMAGES.congratulationIcon} // fallback
              style={styles(theme).icon}
            />
          </View>

          {/* TITLE */}
          <Text
          size={getScaleSize(16)}
          font={FONTS.Lato.ExtraBold}
          color={theme._404040}
          align='center'
          >
            Welcome aboard! Your subscription is now active. You can start exploring all features immediately.
          </Text>

          {/* DETAILS CARD */}
          <View style={styles(theme).detailsCard}>
            <Text 
            size={getScaleSize(16)}
            color={theme.primaryText}
            font={FONTS.Lato.Bold}
            style={{marginBottom:getScaleSize(16)}}
            >
              Subscription Details
            </Text>

            {renderRow("Plan", details.plan)}
            {renderRow("Mode of Payment", details.paymentMode)}
            {renderRow("Transaction ID", details.transactionId)}
            {renderRow("Start Date", details.startDate)}
            {renderRow("Billing Cycle", details.billingCycle)}
            {renderRow("First Charge Date", details.firstChargeDate)}
          </View>

          {/* BUTTON
          <TouchableOpacity style={styles(theme).button} onPress={onClose}>
            <Text 
            size={getScaleSize()}
            >Continue</Text>
          </TouchableOpacity> */}

        </View>
      </View>
    </Modal>
  );
}



const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: getScaleSize(24),
  },

  container: {
    backgroundColor: '#fff',
    borderRadius: getScaleSize(20),
    paddingVertical: getScaleSize(24),
    paddingHorizontal: getScaleSize(18),
  },

  iconWrapper: {
    alignItems: 'center',
    marginBottom: getScaleSize(16),
  },

  icon: {
    height: getScaleSize(120),
    width: getScaleSize(120),
    resizeMode: 'contain',
  },

  title: {
    textAlign: 'center',
    fontSize: getScaleSize(16),
    fontFamily: FONTS.Lato.SemiBold,
    color: '#333',
    marginBottom: getScaleSize(20),
    lineHeight: getScaleSize(22),
  },

  detailsCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: getScaleSize(16),
    padding: getScaleSize(16),
    marginVertical: getScaleSize(20),
  },

  detailsTitle: {
    fontSize: getScaleSize(16),
    fontFamily: FONTS.Lato.Bold,
    marginBottom: getScaleSize(12),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getScaleSize(10),
  },

  label: {
    fontSize: getScaleSize(13),
    fontFamily: FONTS.Lato.Regular,
    color: '#666',
  },

  value: {
    fontSize: getScaleSize(13),
    fontFamily: FONTS.Lato.SemiBold,
    color: '#333',
  },

  button: {
    backgroundColor: '#E85D3F',
    paddingVertical: getScaleSize(14),
    borderRadius: getScaleSize(12),
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: getScaleSize(14),
    fontFamily: FONTS.Lato.Bold,
  },
});