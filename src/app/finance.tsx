import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function FinanceScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  return (
    <View style={[styles.container, { direction: isRtl ? 'rtl' : 'ltr' }]}>
      <Text style={[styles.header, { textAlign: isRtl ? 'right' : 'left' }]}>{t('finance_title')}</Text>
      
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { textAlign: isRtl ? 'right' : 'left' }]}>{t('bank_loan')}</Text>
        <Text style={[styles.cardSubtitle, { textAlign: isRtl ? 'right' : 'left' }]}>{t('due_date')}</Text>
        <Text style={[styles.cardAmount, { textAlign: isRtl ? 'left' : 'right' }]}>
          {isRtl ? '۴,۵۰۰,۰۰۰ تومان' : '$150.00'}
        </Text>
      </View>
      
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { textAlign: isRtl ? 'right' : 'left' }]}>{t('electricity_bill')}</Text>
        <Text style={[styles.cardSubtitle, { textAlign: isRtl ? 'right' : 'left' }]}>
          {isRtl ? 'سررسید: ۳۰ مهر' : 'Due: Oct 22'}
        </Text>
        <Text style={[styles.cardAmount, { textAlign: isRtl ? 'left' : 'right' }]}>
          {isRtl ? '۱۲۰,۰۰۰ تومان' : '$45.00'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0f172a' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  cardSubtitle: { fontSize: 14, color: '#ef4444', marginTop: 5 },
  cardAmount: { fontSize: 20, fontWeight: 'bold', color: '#2563eb', marginTop: 10 }
});
