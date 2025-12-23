import { Link } from 'next-intl'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/page-header'

export default function NotFound() {
  return (
    <div>
        <PageHeader 
            title='404 - Page Not Found'
            subtitle="Oops! Looks like you've tried to access a page that doesn't exist."
        />
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <p className="text-lg text-muted-foreground mb-8">Let's get you back on track.</p>
            <Button asChild size="lg">
                <Link href="/">Return to Homepage</Link>
            </Button>
        </div>
    </div>
  )
}
