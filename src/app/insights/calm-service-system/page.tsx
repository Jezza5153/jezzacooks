import ArticlePage from "@/components/articles/article-page";

const article = {
    title: "The Calm Service System: Prep, Roles, Pace",
    description:
        "How to remove bottlenecks and reduce stress: station flow, prep structure, and role clarity that holds up on busy nights.",
    image: "blog-service-system",
    category: "Systems",
    date: "2025",
    body: (
        <>
            <p>
                A chaotic service isn't a sign of a busy restaurant; it's a sign of a broken system. This guide will show you how to build a 'calm service system' that makes your team more efficient and less stressed.
            </p>
            <p>
                [Full article content will go here...]
            </p>
        </>
    )
};

export default function CalmServiceSystemPage() {
    return <ArticlePage article={article} />;
}
