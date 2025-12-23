
import ArticlePage from '@/components/articles/article-page';
import type React from 'react';

const article = {
    title: "Prime Cost Explained for Chefs",
    description: "A practical guide to understanding and controlling your restaurant's prime cost.",
    image: "blog-prime-cost",
    category: "Finance",
    date: "June 11, 2024",
    body: (
        <>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </>
    )
}

export default function PrimeCostExplainedPage() {
    return <ArticlePage article={article} />
}
