import PageHeader from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Get in Touch"
        subtitle="Ready to grow? Fill out the form below or book a free 15-minute call to discuss your project. I'll get back to you within one business day."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg border border-border">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
