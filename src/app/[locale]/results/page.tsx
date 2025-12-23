
import PageHeader from "@/components/page-header";

export default function ResultsPage() {

    const results = [
        {
            stat: "+25%",
            description: "Increase in GOPPAR",
            note: "Restaurant A, after menu engineering"
        },
        {
            stat: "-8 hrs",
            description: "Owner's weekly hours",
            note: "Cafe B, after ops streamlining"
        },
        {
            stat: "+300%",
            description: "Direct booking rate",
            note: "Hotel C, after new website launch"
        }
    ]

    return (
        <div>
            <PageHeader
                title="Results"
                subtitle="We focus on what moves the needle for your business."
            />
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {results.map(result => (
                         <div className="p-6 rounded-lg bg-card border border-border">
                            <p className="font-headline text-5xl font-bold text-primary">{result.stat}</p>
                            <p className="mt-2 text-lg text-muted-foreground">{result.description}</p>
                            <p className="text-sm text-muted-foreground/50">{result.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
