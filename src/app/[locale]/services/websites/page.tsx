
import type React from 'react';
import { getRequestConfig } from 'next-intl/server';
 
// A list of all locales that are supported
export const locales = ['en', 'nl'] as const;
export type AppLocale = (typeof locales)[number];
 
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const safeLocale: AppLocale = locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : 'en';
 
  return {
    locale: safeLocale,
    messages: (await import(`../../../messages/${safeLocale}.json`)).default
  };
});
