
import { ContactForm } from "@/components/contact-form";
import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";
import { Suspense } from "react";

function ContactFormSkeleton() {
    return (
        <div className="space-y-8">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
            <Skeleton className="h-40 w-full rounded-3xl" />
        </div>
    )
}

export default function ContactPage() {
    return (
        <div>
            <PageHeader
                title="Contact Us"
                subtitle="Have a question or want to work together? Drop us a line."
            />
            <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl">
                <Suspense fallback={<ContactFormSkeleton />}>
                    <ContactForm />
                </Suspense>
            </div>
        </div>
    )
}
