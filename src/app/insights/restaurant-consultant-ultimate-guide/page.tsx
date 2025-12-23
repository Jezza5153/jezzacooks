
import ArticlePage from '@/components/articles/article-page';

const article = {
    title: "The Ultimate Guide to Hiring a Restaurant Consultant",
    description: "Everything you need to know before, during, and after hiring a restaurant consultant to ensure you get the best ROI.",
    image: "blog-pillar",
    category: "Consulting 101",
    date: "June 10, 2024",
    body: (
        <>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </>
    )
}

export default function UltimateGuidePage() {
    return <ArticlePage article={article} />
}
