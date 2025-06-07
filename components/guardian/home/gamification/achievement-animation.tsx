import { motion } from "motion/react";
import { useState } from "react";

// export function BadgeAnimationButton() {
//     const [isAnimating, setIsAnimating] = useState(false);

//     const handleClick = () => {
//         setIsAnimating(true);
//     };

//     return (
//         <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
//             <motion.div
//                 key={isAnimating ? "animating" : "static"}
//                 initial={{ scale: 1 }}
//                 animate={isAnimating ? { scale: [1, 1.5, 1] } : { scale: 1.5 }}
//                 transition={{
//                     duration: 0.4,
//                     repeat: isAnimating ? 5 : 0,
//                     ease: "easeInOut", // Use easing instead of spring
//                 }}
//                 onAnimationComplete={() => setIsAnimating(false)}
//                 className="size-24 bg-center bg-no-repeat bg-contain"
//                 style={{
//                     backgroundImage: `url(/monthlybadges/svgs/badge.svg)`,
//                 }}
//             />

//             <button
//                 onClick={handleClick}
//                 disabled={isAnimating}
//                 className={`px-6 py-3 rounded font-semibold transition-colors ${isAnimating
//                         ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//                         : 'bg-blue-600 text-white hover:bg-blue-700'
//                     }`}
//             >
//                 {isAnimating ? 'Bouncing...' : 'Bounce Badge 10 Times'}
//             </button>
//         </div>
//     );
// }

export default function AchievementAnimation({ icon }: { icon: any }) {
    return (

        <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
                duration: 0.4,
                repeat: 5, // 9 repeats + initial = 10 total bounces
                ease: "easeInOut",
            }}
            className="size-48 w-full bg-center bg-no-repeat bg-contain"
            style={{
                backgroundImage: `url(/achievements/svgs/colored/${icon}.svg)`,
            }}
        />
    );
}