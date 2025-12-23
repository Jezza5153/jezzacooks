
import ArticlePage from '@/components/articles/article-page';
import type React from 'react';

const article = {
    title: "The Calm Service System",
    description: "How to build a service system that runs itself, so you can focus on what matters.",
    image: "blog-service-system",
    category: "Operations",
    date: "June 12, 2024",
    body: (
        <>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </>
    )
}

export default function CalmServiceSystemPage() {
    return <ArticlePage article={article} />
}
