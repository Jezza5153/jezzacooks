import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

type ArticlePageProps = {
    article: {
        title: string;
        description: string;
        image: string;
        category: string;
        date: string;
        body: React.ReactNode;
    }
}

export default function ArticlePage({ article }: ArticlePageProps) {
    const articleImage = PlaceHolderImages.find((p) => p.id === article.image);

    return (
        <div>
            {/* HERO */}
            <header className="relative py-24 md:py-32 bg-card">
                <div className="container mx-auto px-4 z-10 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="outline">{article.category}</Badge>

                        <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
                            {article.title}
                        </h1>

                        <p className="mt-4 text-lg text-muted-foreground">
                           {article.description}
                        </p>

                        <p className="mt-4 text-sm text-muted-foreground">
                            Updated: {article.date}
                        </p>
                    </div>
                </div>
            </header>

            {/* ARTICLE */}
            <article className="container mx-auto px-4 py-16 md:py-24">
                <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
                    {articleImage && (
                        <div className="relative aspect-video rounded-lg overflow-hidden not-prose mb-10 border border-border bg-card">
                            <Image
                                src={articleImage.imageUrl}
                                alt={articleImage.description}
                                fill
                                className="object-cover"
                                data-ai-hint={articleImage.imageHint}
                            />
                        </div>
                    )}
                    
                    {article.body}

                    {/* CTA BOX */}
                    <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
                        <h3 className="font-headline text-2xl font-bold">
                            Want a quick diagnosis?
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Book a free 15-minute call. If I can help, I’ll tell you exactly
                            what I’d fix first.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                            <Button asChild size="lg" className="font-semibold">
                                <Link href="/contact">Book Your Free Call</Link>
                            </Button>
                            <Button asChild size="lg" variant="secondary" className="font-semibold">
                                <Link href="/services/consulting">See Consulting</Link>
                            </Button>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                            Prefer DM? Message “SCAN” on Instagram @chefjezz.
                        </p>
                    </div>
                </div>
            </article>
        </div>
    );
}
