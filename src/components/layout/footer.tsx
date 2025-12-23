import Link from "next-intl/link";
import { Logo } from "@/components/logo";
import { WHATSAPP_LINK } from "@/lib/config";
import { useTranslations } from "next-intl";

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('Footer');

  const footerLinks = {
    company: [
        { href: "/about", label: t('about') },
        { href: "/results", label: t('results') },
        { href: "/insights", label: t('insights') },
        { href: "/contact", label: t('contact') },
        { href: "/free-diagnosis", label: t('freeDiagnosis') },
    ],
    services: [
        { href: "/services/consulting", label: t('consulting') },
        { href: "/services/catering", label: t('catering') },
        { href: "/services/websites", label: t('websites') },
    ],
    legal: [
        { href: "/privacy", label: t('privacyPolicy') },
        { href: "/terms", label: t('termsOfService') },
    ]
}

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo & social */}
          <div className="md:col-span-4 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {t('tagline')}
            </p>
            <div className="mt-6 space-x-4">
              <a href="mailto:info@jezzacooks.com" className="text-muted-foreground hover:text-primary">info@jezzacooks.com</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">WhatsApp</a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-semibold text-foreground">{t('company')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-semibold text-foreground">{t('services')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold text-foreground">{t('legal')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            {t('copyright', {year})}
          </p>
        </div>
      </div>
    </footer>
  );
}
