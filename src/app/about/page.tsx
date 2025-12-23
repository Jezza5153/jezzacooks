
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import PageHeader from "@/components/page-header";
import type React from "react";

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-jezza');

    return (
        <div>
            <PageHeader 
                title="About Jezza"
                subtitle="Chef, consultant, and your partner in hospitality growth."
            />
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            euismod, nisl nec ultricies lacinia, nisl nisl aliquet
                            nunc, nec aliquam nisl nisl sit amet nisl.
                        </p>
                        <p>
                            Donec euismod, nisl nec ultricies lacinia, nisl nisl
                            aliquet nunc, nec aliquam nisl nisl sit amet nisl. Sed
                            euismod, nisl nec ultricies lacinia, nisl nisl aliquet
                            nunc, nec aliquam nisl nisl sit amet nisl.
                        </p>
                    </div>
                    <div>
                        {aboutImage && (
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                width={600}
                                height={800}
                                className="rounded-lg object-cover"
                                data-ai-hint={aboutImage.imageHint}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
