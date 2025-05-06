import { useId } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { AppDemo } from '@/components/themes/pocket/AppDemo'
import { AppStoreLink } from '@/components/themes/pocket/AppStoreLink'
import { Button } from '@/components/themes/pocket/Button'
import { Container } from '@/components/themes/pocket/Container'
import { PhoneFrame } from '@/components/themes/pocket/PhoneFrame'
import logoBbc from '@/images/logos/bbc.svg'
import logoCbs from '@/images/logos/cbs.svg'
import logoCnn from '@/images/logos/cnn.svg'
import logoFastCompany from '@/images/logos/fast-company.svg'
import logoForbes from '@/images/logos/forbes.svg'
import logoHuffpost from '@/images/logos/huffpost.svg'
import logoTechcrunch from '@/images/logos/techcrunch.svg'
import logoWired from '@/images/logos/wired.svg'
import { SectionCards } from '@/components/section-cards'

function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  let id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ef4444" />
            <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ef4444" />
            <stop offset="#ef4444" stopColor="" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

const data = [
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:39:45.675951+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:43:22.528972+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:44:48.139557+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:48:26.570452+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:50:06.869723+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:55:42.13424+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:56:23.051785+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:58:33.183012+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:59:19.408672+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T20:03:17.376575+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T20:03:55.110228+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T20:09:34.593896+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T20:51:00.471285+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:00:00.505862+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:05:23.954459+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:06:20.526687+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:12:57.394597+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:33:02.450697+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:34:18.414998+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:56:07.119733+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T21:57:57.912187+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-17T23:42:40.769007+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-22T00:14:05.608197+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T00:14:24.716451+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T15:48:35.637288+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T15:53:02.286665+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-16T19:37:22.188219+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-24T21:21:03.2434+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-26T02:43:57.898771+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-28T00:37:46.320217+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-28T00:55:54.519094+00:00'
  },
  {
    table_name: 'milestones',
    created_at: '2025-04-30T02:15:19.543953+00:00'
  },
  { table_name: 'milestones', created_at: '2025-05-01T23:31:13+00:00' },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-06T04:21:54.580833+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-11T18:31:40.035711+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-11T18:31:55.65719+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-11T18:35:21.979643+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-15T16:33:07.452986+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-15T16:55:29.888652+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-15T19:06:38.758228+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-19T18:09:07.696901+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-20T23:21:34.289265+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-23T04:15:46.423307+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-23T20:51:47.579424+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-23T20:52:55.169038+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-23T20:54:29.568474+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-23T20:58:32.10368+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-23T20:58:45.112741+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-24T16:09:48.237494+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-24T23:09:45.246569+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-28T00:39:51.435473+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-30T13:59:54.260104+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-30T16:19:03.980835+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-04-30T16:19:10.879002+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-05T16:42:42.327325+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-05T17:32:21.504197+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-05T17:32:41.396284+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-05T17:33:07.650221+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-05T17:33:31.285321+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-05T17:34:01.284117+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-06T00:13:41.924466+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-06T00:13:50.197787+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-06T00:13:58.318801+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-06T00:14:12.886445+00:00'
  },
  {
    table_name: 'pronunciations',
    created_at: '2025-05-06T00:15:19.735736+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-23T18:10:16.048065+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-23T20:01:08.645496+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-23T20:03:47.401375+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-28T00:44:44.728883+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-28T03:33:01.895223+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-30T22:12:55.401006+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-30T22:48:04.410046+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-04-30T22:48:21.085752+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-05-01T19:24:51.110211+00:00'
  },
  {
    table_name: 'cute_quotes',
    created_at: '2025-05-04T15:27:20.378784+00:00'
  },
  {
    table_name: 'favorite_things',
    created_at: '2025-04-23T18:40:32.37117+00:00'
  },
  {
    table_name: 'favorite_things',
    created_at: '2025-04-28T01:04:20.871203+00:00'
  },
  {
    table_name: 'favorite_things',
    created_at: '2025-04-30T20:17:17.508009+00:00'
  },
  {
    table_name: 'precious_moments',
    created_at: '2025-04-23T19:33:13.52894+00:00'
  },
  {
    table_name: 'precious_moments',
    created_at: '2025-04-30T02:55:38.657433+00:00'
  },
  {
    table_name: 'precious_moments',
    created_at: '2025-05-01T19:38:29.752042+00:00'
  },
  {
    table_name: 'tender_traditions',
    created_at: '2025-04-23T19:15:50.368724+00:00'
  },
  {
    table_name: 'tender_traditions',
    created_at: '2025-04-30T02:25:53.897845+00:00'
  }
]

export function Hero() {
  return (
    <div className="overflow-hidden py-16 sm:py-16 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-primary">
              Capture moments that pass too quickly.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              From first smiles to first steps, childhood unfolds in a heartbeat. Create a beautiful digital memory collection of milestones, quotes, and precious moments that you can treasure forever, even as tiny hands grow bigger each day.
            </p>
            {/* <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <AppStoreLink />
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Watch the video</span>
              </Button>
            </div> */}
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute top-4 left-1/2 h-[1026px] w-[1026px] -translate-x-1/3 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] [mask-image:linear-gradient(to_bottom,white_60%,transparent)] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <AppDemo />
                {/* <SectionCards data={data} /> */}
              </PhoneFrame>
            </div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            {/* <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
              As featured in
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ['Forbes', logoForbes],
                ['TechCrunch', logoTechcrunch],
                ['Wired', logoWired],
                ['CNN', logoCnn, 'hidden xl:block'],
                ['BBC', logoBbc],
                ['CBS', logoCbs],
                ['Fast Company', logoFastCompany],
                ['HuffPost', logoHuffpost, 'hidden xl:block'],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx('flex', className)}>
                  <Image src={logo} alt={name} className="h-8" unoptimized />
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </Container>
    </div>
  )
}
