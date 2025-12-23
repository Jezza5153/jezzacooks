
import ArticlePage from '@/components/articles/article-page';
import type React from 'react';

const article = {
    title: "Your Website is a Booking Tool",
    description: "How to turn your restaurant's website into a machine that generates direct bookings.",
    image: "blog-booking-site",
    category: "Marketing",
    date: "June 13, 2024",
    body: (
        <>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </>
    )
}

export default function WebsiteBookingToolPage() {
    return <ArticlePage article={article} />
}
