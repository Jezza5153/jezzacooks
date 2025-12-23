import ArticlePage from "@/components/articles/article-page";

const article = {
    title: "Prime Cost Explained (Without the Spreadsheet Pain)",
    description:
        "What prime cost is, why it matters, and the simple weekly rhythm to stop guessing where your money goes.",
    image: "blog-prime-cost",
    category: "Margins",
    date: "2025",
    body: (
        <>
            <p>
                Prime cost is one of the most important numbers in your restaurant, but it's often misunderstood or ignored because it feels complicated. This guide will break it down in simple terms.
            </p>
            <p>
                [Full article content will go here...]
            </p>
        </>
    )
};

export default function PrimeCostPage() {
    return <ArticlePage article={article} />;
}
