import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      models: 'Guitar Models',
      searchPlaceholder: 'Search models...',
      allTypes: 'All Types',
      electric: 'Electric',
      acoustic: 'Acoustic',
      classic: 'Classic',
      bass: 'Bass',
      specs: 'Specifications',
      musicians: 'Musicians',
      showMore: 'Show More',
      loading: 'Loading...',
      errorLoading: 'Error loading data.',
      backToBrands: '← Back to Brands',
      backToModels: '← Back to Models',
      selectBrand: 'Select a Guitar Brand',
    },
  },
  mk: {
    translation: {
      models: 'Модели на гитара',
      searchPlaceholder: 'Пребарај модели...',
      allTypes: 'Сите типови',
      electric: 'Електрична',
      acoustic: 'Акустична',
      classic: 'Класична',
      bass: 'Бас',
      specs: 'Спецификации',
      musicians: 'Музичари',
      showMore: 'Прикажи повеќе',
      loading: 'Се вчитува...',
      errorLoading: 'Грешка при вчитување на податоци.',
      backToBrands: '← Назад до брендови',
      backToModels: '← Назад до модели',
      selectBrand: 'Избери бренд на гитара',
    },
  },
  al: {
    translation: {
      models: 'Modelet e Kitarave',
      searchPlaceholder: 'Kërko modelet...',
      allTypes: 'Të gjitha llojet',
      electric: 'Elektrike',
      acoustic: 'Akustike',
      classic: 'Klasike',
      bass: 'Bas',
      specs: 'Specifikat',
      musicians: 'Muzikantë',
      showMore: 'Shfaq më shumë',
      loading: 'Duke u ngarkuar...',
      errorLoading: 'Gabim gjatë ngarkimit të të dhënave.',
      backToBrands: '← Kthehu te brendet',
      backToModels: '← Kthehu te modelet',
      selectBrand: 'Zgjidh një brend të kitarave',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
