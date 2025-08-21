import { BoltIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid";
import { IconFlower } from "@tabler/icons-react";

export default function Example() {
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
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl sm:px-6 pt-8 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 dark:bg-gray-800 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:inset-ring dark:after:inset-ring-white/10 dark:after:sm:rounded-3xl">
                        <svg
                            viewBox="0 0 1024 1024"
                            aria-hidden="true"
                            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        >
                            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#981515ff" />
                                    <stop offset={1} stopColor="#cd2c2cff" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl">
                                Profitably Grow Your Following 10x Faster
                            </h2>
                            <p className="mt-6 text-sm text-pretty text-left text-secondary-foreground">
                                Take the 1-minute quiz to unlock your potential.
                            </p>
                            <div className="mt-3 flex items-center justify-center gap-x-6 lg:justify-start w-full">
                                <a
                                    href="/creator/application/quiz"
                                    className="w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-gray-700 dark:text-white dark:shadow-none dark:inset-ring dark:inset-ring-white/5 dark:hover:bg-gray-600 dark:focus-visible:outline-white"
                                >
                                    {' '}
                                    Take The Quiz{' '}
                                </a>
                            </div>
                        </div>
                        <ul role="list" className="mt-8 space-y-4 text-secondary-foreground">
                            <li className="flex gap-x-3">
                                <BoltIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-primary"
                                />
                                <span>
                                    Get personalized insights based on your goals, content style, and platform.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <BoltIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-primary"
                                />
                                <span>
                                    Discover how to go viral without a big following.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <BoltIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-primary"
                                />
                                <span>
                                    Grow faster with step-by-step creator lessons.
                                </span>
                            </li>
                        </ul>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            {/* <img
              alt="App screenshot"
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              width={1824}
              height={1080}
              className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" */}
                            {/* /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
