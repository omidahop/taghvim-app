import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

const resources = {
  en: {
    translation: {
      calendar: "Calendar",
      tasks: "Tasks",
      finance: "Finance",
      settings: "Settings",
      today_tasks: "Today's Tasks",
      no_tasks: "No tasks for today.",
      task_placeholder: "New task...",
      task_management: "Task Management",
      finance_title: "Finances & Bills",
      bank_loan: "Bank Loan Installment",
      due_date: "Due: Oct 20",
      electricity_bill: "Electricity Bill",
      shift_pattern: "Shift Rotation Pattern",
      current_pattern: "Current pattern: 2 Morning, 2 Evening, 2 Night, 2 Off",
      apply_pattern: "Apply Pattern to Calendar",
      success: "Success",
      pattern_applied: "Shifts for the next 30 days applied successfully.",
      morning: "M",
      evening: "E",
      night: "N",
      off: "Off",
      language: "Language",
      switch_lang: "Switch to Persian (تغییر به فارسی)"
    }
  },
  fa: {
    translation: {
      calendar: "تقویم",
      tasks: "کارها",
      finance: "مالی",
      settings: "تنظیمات",
      today_tasks: "کارهای امروز",
      no_tasks: "هیچ کاری برای امروز ندارید.",
      task_placeholder: "وظیفه جدید...",
      task_management: "مدیریت وظایف",
      finance_title: "امور مالی و قسط‌ها",
      bank_loan: "قسط وام بانکی",
      due_date: "سررسید: ۲۸ مهر",
      electricity_bill: "قبض برق",
      shift_pattern: "الگوی چرخش شیفت کاری",
      current_pattern: "الگوی فعلی: ۲ روز صبح، ۲ روز عصر، ۲ روز شب، ۲ روز آف",
      apply_pattern: "اعمال الگو روی تقویم",
      success: "موفقیت",
      pattern_applied: "شیفت‌های شما برای ۳۰ روز آینده با موفقیت روی تقویم تنظیم شد.",
      morning: "صبح",
      evening: "عصر",
      night: "شب",
      off: "آف",
      language: "زبان",
      switch_lang: "Switch to English"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fa', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
