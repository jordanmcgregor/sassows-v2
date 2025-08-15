import { IconFlower } from '@tabler/icons-react'
import { Container } from '@/components/themes/pocket/Container'

export default function No() {
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
                </div>
            </div>
            <div className="overflow-hidden py-16 sm:py-16 lg:pb-32 xl:pb-36">
                <Container>
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
                        <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
                        <div className="rounded-lg bg-muted p-8 text-center shadow">
                            <h2 className="mb-4 text-2xl font-semibold">Thank you for your submission!</h2>
                            <p className="text-muted-foreground">
                                We appreciate your interest. Our team will review your application and be in touch soon.
                            </p>
                        </div>
                        </div>
                    </div>
                </Container>
            </div>

        </>
    )
}