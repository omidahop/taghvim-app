import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { setShiftForDate } from '../database/db';
import jalaliMoment from 'jalali-moment';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const pattern = [t('morning'), t('morning'), t('evening'), t('evening'), t('night'), t('night'), t('off'), t('off')];

  const generateShifts = () => {
    let currentDate = isRtl ? jalaliMoment() : moment();
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.format('YYYY-MM-DD');
      const shift = pattern[i % pattern.length];
      setShiftForDate(dateStr, shift);
      currentDate.add(1, 'day');
    }
    Alert.alert(t('success'), t('pattern_applied'));
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(isRtl ? 'en' : 'fa');
  };

  return (
    <View style={[styles.container, { direction: isRtl ? 'rtl' : 'ltr' }]}>
      <Text style={[styles.header, { textAlign: isRtl ? 'right' : 'left' }]}>{t('settings')}</Text>
      
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { textAlign: isRtl ? 'right' : 'left' }]}>{t('shift_pattern')}</Text>
        <Text style={[styles.cardDesc, { textAlign: isRtl ? 'right' : 'left' }]}>{t('current_pattern')}</Text>
        
        <TouchableOpacity style={styles.button} onPress={generateShifts}>
          <Text style={styles.buttonText}>{t('apply_pattern')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { marginTop: 20 }]}>
        <Text style={[styles.cardTitle, { textAlign: isRtl ? 'right' : 'left' }]}>{t('language')}</Text>
        <TouchableOpacity style={[styles.button, { marginTop: 15, backgroundColor: '#64748b' }]} onPress={toggleLanguage}>
          <Text style={styles.buttonText}>{t('switch_lang')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0f172a' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  cardDesc: { fontSize: 14, color: '#64748b', marginTop: 10, marginBottom: 20 },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
