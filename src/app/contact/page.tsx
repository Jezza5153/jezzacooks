
import { ContactForm } from "@/components/contact-form";
import PageHeader from "@/components/page-header";
import type React from "react";

export default function ContactPage() {
    return (
        <div>
            <PageHeader
                title="Contact Us"
                subtitle="Have a question or want to work together? Drop us a line."
            />
            <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl">
                <ContactForm />
            </div>
        </div>
    )
}
