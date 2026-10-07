import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { getTasksForDate, addTask } from '../database/db';
import jalaliMoment from 'jalali-moment';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function TasksScreen() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const todayDate = isRtl ? jalaliMoment().format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

  const loadTasks = () => {
    const loadedTasks = getTasksForDate(todayDate);
    setTasks(loadedTasks as any[]);
  };

  useEffect(() => {
    loadTasks();
  }, [i18n.language]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, 'personal', todayDate, '#4ade80');
      setNewTaskTitle('');
      loadTasks();
    }
  };

  return (
    <View style={[styles.container, { direction: isRtl ? 'rtl' : 'ltr' }]}>
      <Text style={[styles.header, { textAlign: isRtl ? 'right' : 'left' }]}>{t('task_management')}</Text>
      
      <View style={[styles.inputContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TextInput 
          style={[styles.input, isRtl ? { marginLeft: 10 } : { marginRight: 10 }]} 
          placeholder={t('task_placeholder')}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          textAlign={isRtl ? 'right' : 'left'}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <View style={[styles.dot, { backgroundColor: item.color_dot, marginRight: isRtl ? 0 : 10, marginLeft: isRtl ? 10 : 0 }]} />
            <Text style={styles.taskTitle}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>{t('no_tasks')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0f172a' },
  inputContainer: { marginBottom: 20 },
  input: { flex: 1, backgroundColor: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  addButton: { backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', width: 50, borderRadius: 10 },
  taskItem: { alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  taskTitle: { fontSize: 16, color: '#334155', flex: 1 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 20 }
});
