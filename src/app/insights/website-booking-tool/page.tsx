import ArticlePage from "@/components/articles/article-page";

const article = {
    title: "Your Website Should Be a Booking Tool (Not a Brochure)",
    description:
        "The few things that actually increase bookings: menu page UX, CTA clarity, speed, and local trust signals.",
    image: "blog-booking-site",
    category: "Bookings",
    date: "2025",
    body: (
        <>
            <p>
                Too many restaurant websites are treated like digital brochures: pretty but useless. Your website has one primary job: to convert a visitor into a guest. This guide covers the essential elements to make that happen.
            </p>
            <p>
                [Full article content will go here...]
            </p>
        </>
    )
};

export default function WebsiteBookingToolPage() {
    return <ArticlePage article={article} />;
}
