import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Chef-led growth for hospitality. No poeha, just results.
            </p>
            <div className="mt-6 text-sm text-muted-foreground space-y-2">
              <p>KVK: [Your KVK Number]</p>
              <p>BTW: [Your BTW Number]</p>
              <p>Email: hello@jezzacooks.com</p>
              <p>Region: Amsterdam, NL</p>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="font-headline text-lg font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-headline text-lg font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {year} JEZZA COOKS. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {FOOTER_LINKS.legal.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
