import { AppStoreLink } from '@/components/themes/pocket/AppStoreLink'
import { CircleBackground } from '@/components/themes/pocket/CircleBackground'
import { Container } from '@/components/themes/pocket/Container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#ef4444" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            Start saving the moments you’ll never want to forget
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground">
            From tiny milestones to unforgettable quotes, keep track of your child’s most precious moments — before they become memories. It only takes a minute to begin your journey.
          </p>
          <div className="mt-8 flex justify-center">
            <Button className="h-12" asChild>
              <Link href="/sign-up" className="w-full">
                Get Started Free
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

