
import PageHeader from "@/components/page-header";
import ArticleCard from "@/components/articles/article-card";

export default function InsightsPage() {

    const articles = [
        {
            title: "The Ultimate Guide to Hiring a Restaurant Consultant",
            description: "Everything you need to know before, during, and after hiring a restaurant consultant to ensure you get the best ROI.",
            image: "blog-pillar",
            category: "Consulting 101",
            date: "June 10, 2024",
            href: "/insights/restaurant-consultant-ultimate-guide",
        },
    ]

    return (
        <div>
            <PageHeader
                title="Insights"
                subtitle="Actionable advice for hospitality professionals."
            />
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map(article => (
                        <ArticleCard key={article.href} article={article} />
                    ))}
                </div>
            </div>
        </div>
    )
}
