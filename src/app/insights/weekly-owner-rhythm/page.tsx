import ArticlePage from "@/components/articles/article-page";

const article = {
    title: "The Weekly Owner Rhythm: 30 Minutes That Saves Your Week",
    description:
        "A simple check-in routine to catch problems early: the handful of numbers and questions that keep you in control.",
    image: "blog-weekly-rhythm",
    category: "Leadership",
    date: "2025",
    body: (
        <>
            <p>
                As a restaurant owner, it's easy to get lost in the day-to-day firefights. The 'Weekly Owner Rhythm' is a simple, 30-minute routine to help you step back, see the bigger picture, and catch small problems before they become big ones.
            </p>
            <p>
                [Full article content will go here...]
            </p>
        </>
    )
};

export default function WeeklyRhythmPage() {
    return <ArticlePage article={article} />;
}
