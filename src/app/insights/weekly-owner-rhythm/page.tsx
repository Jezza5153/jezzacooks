
import ArticlePage from '@/components/articles/article-page';
import type React from 'react';

const article = {
    title: "The Weekly Owner's Rhythm",
    description: "A simple weekly schedule to stay in control of your restaurant without losing your mind.",
    image: "blog-weekly-rhythm",
    category: "Productivity",
    date: "June 14, 2024",
    body: (
        <>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </>
    )
}

export default function WeeklyOwnerRhythmPage() {
    return <ArticlePage article={article} />
}
