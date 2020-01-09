import { register, init } from 'svelte-i18n';

register('en', () => import('./translates/en.json'));
register('pl', () => import('./translates/pl.json'));
register('bg', () => import('./translates/bg.json'));

init({
  fallbackLocale: 'en',
  initialLocale: {
    navigator: true,
  },
});