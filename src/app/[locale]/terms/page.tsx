
import PageHeader from "@/components/page-header";
import type React from "react";

export default function TermsPage() {
    return (
        <div>
            <PageHeader title="Terms of Service" />
             <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="prose prose-invert prose-lg max-w-none">
                    <p>Terms of service content...</p>
                </div>
            </div>
        </div>
    )
}
