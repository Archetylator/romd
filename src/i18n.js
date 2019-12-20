import { register } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('en-US', () => import('./en-US.json'));
register('pt', () => import('./pt.json'));

init({
  fallbackLocale: 'en',
  initialLocale: {
    navigator: true, // i.e 'en-US'
  },
});