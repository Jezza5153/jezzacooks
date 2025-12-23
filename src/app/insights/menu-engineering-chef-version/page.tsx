import ArticlePage from "@/components/articles/article-page";

const article = {
    title: "Menu Engineering: Stars, Puzzles, Plowhorses, Dogs (Chef Version)",
    description:
        "A practical way to rebuild your menu so it sells better and earns more—without killing the food.",
    image: "blog-menu-engineering",
    category: "Menu",
    date: "2025",
    body: (
        <>
            <p>
                Menu engineering sounds like a boring spreadsheet exercise, but for a chef, it's a creative tool. It's about understanding what your guests love and what makes you money, then finding the sweet spot.
            </p>
            <p>
                [Full article content will go here...]
            </p>
        </>
    )
};

export default function MenuEngineeringPage() {
    return <ArticlePage article={article} />;
}
