'use client'

import { useId, useRef, useState } from 'react'
import clsx from 'clsx'
import { motion, useInView, useMotionValue } from 'framer-motion'

import { AppScreen } from '@/components/themes/pocket/AppScreen'
import { SectionCards } from '@/components/section-cards'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'

const prices = [
  997.56, 944.34, 972.25, 832.4, 888.76, 834.8, 805.56, 767.38, 861.21, 669.6,
  694.39, 721.32, 694.03, 610.1, 502.2, 549.56, 611.03, 583.4, 610.14, 660.6,
  752.11, 721.19, 638.89, 661.7, 694.51, 580.3, 638.0, 613.3, 651.64, 560.51,
  611.45, 670.68, 752.56,
]
const maxPrice = Math.max(...prices)
const minPrice = Math.min(...prices)

function Chart({
  className,
  activePointIndex,
  onChangeActivePointIndex,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
  gridLines = 6,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  activePointIndex: number | null
  onChangeActivePointIndex: (index: number | null) => void
  width: number
  height: number
  paddingX?: number
  paddingY?: number
  gridLines?: number
}) {
  let width = totalWidth - paddingX * 2
  let height = totalHeight - paddingY * 2

  let id = useId()
  let svgRef = useRef<React.ElementRef<'svg'>>(null)
  let pathRef = useRef<React.ElementRef<'path'>>(null)
  let isInView = useInView(svgRef, { amount: 0.5, once: true })
  let pathWidth = useMotionValue(0)
  let [interactionEnabled, setInteractionEnabled] = useState(false)

  let path = ''
  let points: Array<{ x: number; y: number }> = []

  for (let index = 0; index < prices.length; index++) {
    let x = paddingX + (index / (prices.length - 1)) * width
    let y =
      paddingY +
      (1 - (prices[index] - minPrice) / (maxPrice - minPrice)) * height
    points.push({ x, y })
    path += `${index === 0 ? 'M' : 'L'} ${x.toFixed(4)} ${y.toFixed(4)}`
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={clsx(className, 'overflow-visible')}
      {...(interactionEnabled
        ? {
          onPointerLeave: () => onChangeActivePointIndex(null),
          onPointerMove: (event) => {
            let x = event.nativeEvent.offsetX
            let closestPointIndex: number | null = null
            let closestDistance = Infinity
            for (
              let pointIndex = 0;
              pointIndex < points.length;
              pointIndex++
            ) {
              let point = points[pointIndex]
              let distance = Math.abs(point.x - x)
              if (distance < closestDistance) {
                closestDistance = distance
                closestPointIndex = pointIndex
              } else {
                break
              }
            }
            onChangeActivePointIndex(closestPointIndex)
          },
        }
        : {})}
      {...props}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={`${path} V ${height + paddingY} H ${paddingX} Z`} />
        </clipPath>
        <linearGradient id={`${id}-gradient`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#13B5C8" />
          <stop offset="100%" stopColor="#13B5C8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: gridLines - 1 }, (_, index) => (
        <line
          key={index}
          stroke="#a3a3a3"
          opacity="0.1"
          x1="0"
          y1={(totalHeight / gridLines) * (index + 1)}
          x2={totalWidth}
          y2={(totalHeight / gridLines) * (index + 1)}
        />
      ))}
      <motion.rect
        y={paddingY}
        width={pathWidth}
        height={height}
        fill={`url(#${id}-gradient)`}
        clipPath={`url(#${id}-clip)`}
        opacity="0.5"
      />
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        transition={{ duration: 1 }}
        {...(isInView ? { stroke: '#06b6d4', animate: { pathLength: 1 } } : {})}
        onUpdate={({ pathLength }) => {
          if (pathRef.current && typeof pathLength === 'number') {
            pathWidth.set(
              pathRef.current.getPointAtLength(
                pathLength * pathRef.current.getTotalLength(),
              ).x,
            )
          }
        }}
        onAnimationComplete={() => setInteractionEnabled(true)}
      />
      {activePointIndex !== null && (
        <>
          <line
            x1="0"
            y1={points[activePointIndex].y}
            x2={totalWidth}
            y2={points[activePointIndex].y}
            stroke="#06b6d4"
            strokeDasharray="1 3"
          />
          <circle
            r="4"
            cx={points[activePointIndex].x}
            cy={points[activePointIndex].y}
            fill="#fff"
            strokeWidth="2"
            stroke="#06b6d4"
          />
        </>
      )}
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

export function AppDemo() {
  let [activePointIndex, setActivePointIndex] = useState<number | null>(null)
  let activePriceIndex = activePointIndex ?? prices.length - 1
  let activeValue = prices[activePriceIndex]
  let previousValue = prices[activePriceIndex - 1]
  let percentageChange =
    activePriceIndex === 0
      ? null
      : ((activeValue - previousValue) / previousValue) * 100

  return (
    <AppScreen>
      <AppScreen.Body className='mt-0'>
        {/* <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
          defaultOpen={false}
          key={Math.random()}
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6"> */}
        <SectionCards data={data} />
        {/* </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider> */}
      </AppScreen.Body>
    </AppScreen >
  )
}
