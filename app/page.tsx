import { CallToAction } from '@/components/themes/pocket/CallToAction'
import { Faqs } from '@/components/themes/pocket/Faqs'
import { Hero } from '@/components/themes/pocket/Hero'
import { Pricing } from '@/components/themes/pocket/Pricing'
import { PrimaryFeatures } from '@/components/themes/pocket/PrimaryFeatures'
import { Reviews } from '@/components/themes/pocket/Reviews'
import { SecondaryFeatures } from '@/components/themes/pocket/SecondaryFeatures'
import { Button } from '@/components/ui/button'
import { IconFlower } from '@tabler/icons-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <IconFlower className="size-4" />
              </div>
              Sassows
            </a>
          </div>
          {/* <div className="flex flex-1 items-center justify-center">
            <div className="w-full">
              <Hero />
              <SecondaryFeatures />
              <Faqs />
              <FloatingComponent />
            </div>
          </div> */}
        </div>
      </div>
      <Hero />
      <SecondaryFeatures />
      <Faqs />
      <FloatingComponent />

    </>
  )
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <IconFlower className="size-4" />
              </div>
              Sassows
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full">
              <Hero />
              {/* <PrimaryFeatures /> */}
              <SecondaryFeatures />
              {/* <CallToAction /> */}
              {/* <Reviews />
      <Pricing /> */}
              <Faqs />
              <FloatingComponent />
            </div>
          </div>
        </div>
        {/* <div className="bg-muted relative hidden lg:block">
          <div className="absolute inset-0 h-full w-full bg-primary">
          </div>
        </div> */}
      </div>

    </>
  )
}


const FloatingComponent: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background text-center shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
      <Button variant={"default"} className="w-full h-12" asChild>
        <Link href="/sign-up">Get Started Free</Link>
      </Button>
    </div>
  );
};


