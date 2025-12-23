
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from './ui/button';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.replace(newPath);
    });
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectChange('en')}
        disabled={isPending}
      >
        {t('en')}
      </Button>
      <Button
        variant={locale === 'nl' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectChange('nl')}
        disabled={isPending}
      >
        {t('nl')}
      </Button>
    </div>
  );
}
