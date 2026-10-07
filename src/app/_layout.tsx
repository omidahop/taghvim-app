import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { initDB } from '../database/db';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, ThemeContext } from '../ThemeContext';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

function TabNavigator() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarStyle: { 
          direction: isRtl ? 'rtl' : 'ltr',
          backgroundColor: colors.card,
          borderTopColor: colors.border
        },
        tabBarLabelStyle: { fontFamily: 'System' }
      }}>
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: t('calendar'),
            tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />
          }} 
        />
        <Tabs.Screen 
          name="tasks" 
          options={{ 
            title: t('tasks'),
            tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />
          }} 
        />
        <Tabs.Screen 
          name="finance" 
          options={{ 
            title: t('finance'),
            tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />
          }} 
        />
        <Tabs.Screen 
          name="settings" 
          options={{ 
            title: t('settings'),
            tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />
          }} 
        />
      </Tabs>
    </View>
  );
}

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <ThemeProvider>
      <TabNavigator />
    </ThemeProvider>
  );
}
