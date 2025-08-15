import CreatorApplicationForm from '@/components/creator/forms/application';
import { IconFlower } from '@tabler/icons-react'
import { Container } from '@/components/themes/pocket/Container'

export default function Instagram() {
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
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-2">Creator Application</h1>
                                <p className="text-lg mb-4 font-bold">Turn your content into consistent income.</p>
                                <p className="mb-4">
                                    We're currently welcoming creators who are <b>moms of babies or toddlers (ages 0–4).</b> If you're in the thick of diapers, tantrums, and sweet snuggles—we want you! This helps keep Sassows content authentic, relatable, and true to the season of life we’re celebrating.
                                </p>
                                <div className="mb-4">
                                    <h2 className="font-semibold mb-1">What you’ll be doing:</h2>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>→ Join a collab you're excited about</li>
                                        <li>→ Launch a new social account</li>
                                        <li>→ Receive feedback and support directly from our team</li>
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <h2 className="font-semibold mb-1">What we’re looking for:</h2>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>✔️ Comfortable posting consistently</li>
                                        <li>✔️ Comfortable talking into a camera</li>
                                        <li>✔️ Strategic and creative</li>
                                        <li>✔️ Open to growing a new account from scratch</li>
                                        <li>✔️ Interested in learning what it actually takes to go viral</li>
                                        <li>✔️ Consistently posting on their own account ( approximately once per day )</li>
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <h2 className="font-semibold mb-1">Why creators love this program:</h2>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>💸 You can participate, and earn, as little or as much as you want</li>
                                        <li>🎯 No chasing paid collabs — we handle the deals, payments & logistics</li>
                                        <li>🎬 Access to viral content examples and creative direction</li>
                                        <li>💬 Real-time feedback and strategy tips</li>
                                        <li>👥 Community of like-minded creators</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="font-semibold mb-1">How to get started:</h2>
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>Fill out the application</li>
                                        <li>If it’s a fit, you’ll receive an email with next steps on submitting a test trial video to show off your style</li>
                                        <li>You’ll join a paid campaign with one of our apps</li>
                                    </ol>
                                </div>
                            </div>
                            <CreatorApplicationForm />
                        </div>
                    </div>
                </Container>
            </div>

        </>
    )
}