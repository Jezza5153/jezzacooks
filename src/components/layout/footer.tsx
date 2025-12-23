import Link from "next/link";
import { Logo } from "@/components/logo";
import { WHATSAPP_LINK } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: "/about", label: "About" },
      { href: "/results", label: "Results" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
      { href: "/free-diagnosis", label: "Free Diagnosis" },
    ],
    services: [
      { href: "/services/consulting", label: "Consulting" },
      { href: "/services/catering", label: "Catering" },
      { href: "/services/websites", label: "Websites" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo & social */}
          <div className="md:col-span-4 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Chef-led growth for hospitality. No poeha, just results.
            </p>
            <div className="mt-6 space-x-4">
              <a
                href="mailto:info@jezzacooks.com"
                className="text-muted-foreground hover:text-primary"
              >
                info@jezzacooks.com
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
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
            <h3 className="font-semibold text-foreground">Services</h3>
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
            <h3 className="font-semibold text-foreground">Legal</h3>
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
          <p>© {year} JEZZA COOKS. All rights reserved. KvK: 12345678.</p>
        </div>
      </div>
    </footer>
  );
}
