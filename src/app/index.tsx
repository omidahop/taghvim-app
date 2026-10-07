import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import jalaliMoment from 'jalali-moment';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { getShiftForDate, getTasksForDate } from '../database/db';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  // State handles both Jalali and Gregorian
  const [currentDate, setCurrentDate] = useState(isRtl ? jalaliMoment() : moment());
  const [calendarData, setCalendarData] = useState<Record<number, { shift: string; dots: string[] }>>({});
  const [todayTasks, setTodayTasks] = useState<any[]>([]);

  // If language switches, update date object type
  useEffect(() => {
    setCurrentDate(isRtl ? jalaliMoment() : moment());
  }, [isRtl]);

  const isJalali = isRtl;
  const daysInMonth = isJalali ? (currentDate as any).jDaysInMonth() : currentDate.daysInMonth();
  const firstDayOfWeek = currentDate.clone().startOf(isJalali ? 'jMonth' : 'month').day();
  
  // Persian calendar starts on Saturday (6 in moment, but we want it as index 0)
  // English calendar starts on Sunday (0)
  const startDayOffset = isJalali ? (firstDayOfWeek + 1) % 7 : firstDayOfWeek;
  const weekDays = isJalali ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const loadMonthData = () => {
    let newCalendarData: any = {};
    for (let d = 1; d <= daysInMonth; d++) {
      let dateObj = currentDate.clone();
      dateObj = isJalali ? (dateObj as any).jDate(d) : dateObj.date(d);
      const dateStr = dateObj.format('YYYY-MM-DD');
      
      const shift = getShiftForDate(dateStr);
      const tasks = getTasksForDate(dateStr) as any[];
      const dots = tasks.map(t => t.color_dot);
      newCalendarData[d] = { shift, dots };
    }
    setCalendarData(newCalendarData);

    const todayObj = isJalali ? jalaliMoment() : moment();
    const todayStr = todayObj.format('YYYY-MM-DD');
    setTodayTasks(getTasksForDate(todayStr) as any[]);
  };

  useFocusEffect(
    useCallback(() => {
      loadMonthData();
    }, [currentDate, i18n.language])
  );

  const renderCalendar = () => {
    let days = [];
    for (let i = 0; i < startDayOffset; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    const todayNum = isJalali ? (jalaliMoment() as any).jDate() : moment().date();
    const todayMonth = isJalali ? (jalaliMoment() as any).jMonth() : moment().month();
    const currentMonth = isJalali ? (currentDate as any).jMonth() : currentDate.month();

    for (let d = 1; d <= daysInMonth; d++) {
      const dayData = calendarData[d] || { shift: '', dots: [] };
      const isToday = d === todayNum && currentMonth === todayMonth;

      days.push(
        <TouchableOpacity key={d} style={[styles.calendarDay, isToday && styles.todayDay]}>
          <Text style={[styles.dayText, isToday && styles.todayText]}>{d}</Text>
          <View style={styles.shiftBadge}>
            {dayData.shift && <Text style={styles.shiftText}>{dayData.shift}</Text>}
          </View>
          <View style={[styles.dotsContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            {dayData.dots.slice(0,3).map((color: string, idx: number) => (
              <View key={idx} style={[styles.dot, { backgroundColor: color }]} />
            ))}
          </View>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const prevMonth = () => setCurrentDate(currentDate.clone().subtract(1, isJalali ? 'jMonth' : 'month'));
  const nextMonth = () => setCurrentDate(currentDate.clone().add(1, isJalali ? 'jMonth' : 'month'));
  const titleFormat = isJalali ? 'jMMMM jYYYY' : 'MMMM YYYY';
  const todayFormat = isJalali ? 'jD jMMMM' : 'MMMM D';

  return (
    <View style={[styles.container, { direction: isRtl ? 'rtl' : 'ltr' }]}>
      <View style={[styles.header, { flexDirection: isRtl ? 'row' : 'row-reverse' }]}>
        <TouchableOpacity onPress={prevMonth}><Ionicons name="chevron-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{currentDate.locale(isRtl ? 'fa' : 'en').format(titleFormat)}</Text>
        <TouchableOpacity onPress={nextMonth}><Ionicons name="chevron-forward" size={24} color="#333" /></TouchableOpacity>
      </View>

      <View style={[styles.weekDaysContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        {weekDays.map((day, index) => <Text key={index} style={styles.weekDayText}>{day}</Text>)}
      </View>

      <View style={[styles.calendarGrid, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>{renderCalendar()}</View>

      <ScrollView style={styles.tasksContainer}>
        <Text style={[styles.tasksTitle, { textAlign: isRtl ? 'right' : 'left' }]}>
          {t('today_tasks')} ({isRtl ? jalaliMoment().locale('fa').format(todayFormat) : moment().locale('en').format(todayFormat)})
        </Text>
        {todayTasks.length === 0 && <Text style={{textAlign: isRtl ? 'right' : 'left', color: '#94a3b8'}}>{t('no_tasks')}</Text>}
        {todayTasks.map(t => (
          <View key={t.id} style={[styles.taskItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <Ionicons name="ellipse" size={16} color={t.color_dot} style={isRtl ? {marginLeft: 10} : {marginRight: 10}} />
            <Text style={styles.taskText}>{t.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="mic" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', paddingTop: 50 },
  header: { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  weekDaysContainer: { justifyContent: 'space-around', paddingHorizontal: 10, marginBottom: 10 },
  weekDayText: { fontSize: 16, fontWeight: 'bold', color: '#64748b', width: 40, textAlign: 'center' },
  calendarGrid: { flexWrap: 'wrap', paddingHorizontal: 10 },
  calendarDay: { width: '14.28%', aspectRatio: 0.8, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 5, borderWidth: 0.5, borderColor: '#e2e8f0', backgroundColor: '#fff' },
  todayDay: { backgroundColor: '#eff6ff' },
  dayText: { fontSize: 16, color: '#334155' },
  todayText: { fontWeight: 'bold', color: '#2563eb' },
  shiftBadge: { marginTop: 2, height: 16, justifyContent: 'center' },
  shiftText: { fontSize: 10, color: '#64748b', fontWeight: 'bold' },
  dotsContainer: { marginTop: 4, height: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 1 },
  tasksContainer: { flex: 1, padding: 20 },
  tasksTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 15 },
  taskItem: { alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1 },
  taskText: { fontSize: 16, color: '#334155' },
  fabContainer: { position: 'absolute', bottom: 30, alignSelf: 'center' },
  fab: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', elevation: 5 }
});

