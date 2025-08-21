"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/utils/supabase/client';
import { z } from "zod";
import { sendSlackMessageViaApi } from "@/app/actions/slack/send-message";
import * as pixel from "@/components/lib/mpixel";

// https://fametonic.com/main/v11-fb-up10/quiz

// data/questions.ts
// export const questions = [
//     {
//         id: 17,
//         question: "For a personalized analysis, please enter your TikTok or Instagram profile URL:",
//         options: [],
//         column: 'social',
//         type: "socialUrl",
//         answer: "https://www.instagram.com/yo", // default value for testing
//     },
//     {
//         id: 18,
//         question: "To receive your results, please enter your email address:",
//         options: [],
//         column: 'email',
//         type: "email",
//         answer: "jo@gmail.com",
//     },
// ];

const questions = [
    {
        id: 2,
        question: "What social media platform do you use the most?",
        options: ["TikTok", "Instagram", "Facebook", "YouTube", "Other", "None"],
        answer: "",
        column: "platform",
    },
    {
        id: 3,
        question: "How many followers does your main social media account have?",
        options: [
            "I don't have a social media account yet",
            "1,000 - 5,000",
            "5,000 - 10,000",
            "10,000 - 50,000",
            "50,000 - 100,000",
            "100,000+"
        ],
        answer: "",
        column: "followers",
    },
    {
        id: 5,
        question: "What type of content do you share most often?",
        options: [
            "Toddler life & parenting (0–4 years)",
            "Fitness & workouts",
            "Lifestyle & routines",
            "Beauty & fashion",
            "Food & recipes",
            "Travel & adventures",
            "Other"
        ],
        answer: "",
        column: "mom",
    },
    {
        id: 4,
        question: "How would you describe your current progress as a creator?",
        options: [
            "Just starting out",
            "Posting content occasionally",
            "Posting regularly but not seeing much growth",
            "Gaining traction and looking to scale"
        ],
        answer: "",
        column: "progress",
    },
    {
        id: 6,
        question: "How many minutes per day do you have for creating content?",
        options: ["5 - 10 min", "11 - 20 min", "20 - 30 min", "30 - 59 min", "60+ min"],
        answer: "",
        column: "commitment",
    },
    {
        id: 8,
        question: "What do you think makes a post go viral?",
        options: [
            "Luck! It’s random",
            "Posting at the right time",
            "Using the right hashtags",
            "Following trends",
            "Making high-quality content"
        ],
        answer: "",
        column: "belief",
    },
    {
        id: 10,
        question: "What’s your income goal from social media?",
        options: ["Up to $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $50,000", "Over $50,000"],
        answer: "",
        column: "goal",
    },
    {
        id: 11,
        question: "What's holding you back most?",
        options: [
            "I just haven't started yet",
            "I don’t want to show my face",
            "I’m not sure what kind of content to make",
            "I don’t know how to make money from my posts",
            "It’s hard to stay consistent and motivated",
            "I don’t really get how trends work",
            "I’m struggling to grow my followers",
            "I have followers but don’t know how to make money from them"
        ],
        answer: "",
        column: "challenge",
    },
    {
        id: 12,
        question: "Are you willing to learn and grow your skills as a creator?",
        options: ["Yes, I’m eager to learn!", "Maybe, if the tools are easy to use", "No, I want results with minimal effort"],
        answer: "",
        column: "willingness",
    },
    {
        id: 13,
        question: "How do you prefer to learn and improve?",
        options: [
            "Quick, actionable video tutorials",
            "Step-by-step courses",
            "Real-life case studies",
            "Community discussions and feedback"
        ],
        answer: "",
        column: "preference",
    },
    {
        id: 16,
        question: "What would motivate you to stay consistent with content creation?",
        options: [
            "A structured content plan with daily/weekly tasks",
            "A community of creators for support and feedback",
            "Seeing faster growth and engagement",
            "Monetization opportunities and brand deals"
        ],
        answer: "",
        column: "motivation",
    },
    {
        id: 17,
        question: "For a personalized analysis, please enter your TikTok or Instagram profile URL:",
        options: [],
        answer: "",
        column: "social",
        type: "socialUrl",
    },
    {
        id: 18,
        question: "To receive your results, please enter your email address:",
        options: [],
        answer: "",
        column: "email",
        type: "email",
    },
];

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<{ [column: string]: string }>({});
    const [completed, setCompleted] = useState(false);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const [error, setError] = useState("");

    const handleAnswer = async (option: string) => {
        const column = questions[step].column;
        const updatedAnswers = {
            ...answers,
            [column]: option,
        };
        setAnswers(updatedAnswers);
        // alert(JSON.stringify(updatedAnswers, null, 2));

        if (step < questions.length - 1) {
            setDirection(1);
            setStep(step + 1);
            setError("");
        } else {
            // Submit to Supabase
            const supabase = await createClient();
            const { data: recordData, error: recordError } = await supabase
                .schema('creators')
                .from('applications')
                .insert([updatedAnswers]); // send answers object
            if (recordError) {
                alert("Error submitting form! " + recordError.message);
                return;
            }
            else {
                if (updatedAnswers.mom === "Toddler life & parenting (0–4 years)") {
                    const waitForFbq = (): Promise<void> => {
                        return new Promise((resolve, reject) => {
                            const maxAttempts = 20;
                            let attempts = 0;

                            const check = () => {
                                if (typeof window !== "undefined" && typeof window.fbq === "function") {
                                    resolve();
                                } else if (attempts < maxAttempts) {
                                    attempts++;
                                    setTimeout(check, 250); // check every 250ms
                                } else {
                                    reject(new Error("window.fbq not initialized"));
                                }
                            };

                            check();
                        });
                    };
                    const setMetaLead = async () => {
                        const generateEventId = () => {
                            return Array.from({ length: 20 }, () =>
                                Math.random().toString(36).charAt(2)
                            ).join('');
                        };

                        const eventObject = { eventId: generateEventId() };
                        // sendSlackMessageViaApi(
                        //   process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                        //   `Generated eventId: ${eventObject.eventId}`
                        // );

                        try {
                            await waitForFbq();
                            pixel.event("Lead", {}, eventObject);
                        } catch (error) {
                            sendSlackMessageViaApi(
                                process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                                `FBQ error: ${String(error)}`
                            );
                        }
                        try {
                            const response = await fetch(`/api/meta/capi/lead?eventId=${eventObject.eventId}`);
                            // sendSlackMessageViaApi(
                            //   process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                            //   `API response: ${response.json()}`
                            // );
                        }
                        catch (error) {
                            sendSlackMessageViaApi(
                                process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                                `API error: ${String(error)}`
                            );
                        }
                    }
                    await setMetaLead();
                    window.location.href = "/creator/application/mom/yes";
                } else {
                    window.location.href = "/creator/application/mom/no";
                }
            }
            setCompleted(true);
        }
    };

    const handleInputNext = (input: string, type?: string) => {
        if (type === "socialUrl") {
            const socialSchema = z.string().refine(
                (val) =>
                    /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/.test(val) ||
                    /^https?:\/\/(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/?$/.test(val),
                { message: "Please enter a valid TikTok or Instagram URL." }
            );

            const parsed = socialSchema.safeParse(input);
            if (!parsed.success) {
                setError(parsed.error.errors[0].message);
                return;
            }
        }

        if (type === "email") {
            const emailSchema = z.string().email();
            const parsed = emailSchema.safeParse(input);
            if (!parsed.success) {
                setError("Please enter a valid email address.");
                return;
            }
        }

        handleAnswer(input);
    };

    const goBack = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(step - 1);
            setError("");
        }
    };

    const progress = ((step + 1) / questions.length) * 100;

    return (
        <div className="flex flex-col items-center min-h-screen p-8 overflow-hidden">
            {!completed ? (
                <div className="relative max-w-lg w-full bg-white rounded-2xl">
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-16 left-0 w-full"
                        >
                            <h2 className="mb-4">Question {step + 1} of {questions.length}</h2>
                            <p className="mb-6 text-xl font-bold">{questions[step].question}</p>

                            {(questions[step].type === "input" || questions[step].type === "email" || questions[step].type === "socialUrl") ? (
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        value={answers[questions[step].column] || ""}
                                        onChange={(e) => {
                                            setAnswers((prev) => ({
                                                ...prev,
                                                [questions[step].column]: e.target.value,
                                            }));
                                        }}
                                        className="px-4 py-2 border rounded-lg w-full"
                                        placeholder="Type your answer here..."
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <button
                                        onClick={() =>
                                            handleInputNext(answers[questions[step].column] || "", questions[step].type)
                                        }
                                        className="px-4 py-2 bg-primary hover:bg-primary hover:opacity-90 text-white rounded-xl"
                                    >
                                        {step === questions.length - 1 ? "Submit" : "Next"}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {questions[step].options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(option)}
                                            className="px-4 py-2 bg-primary hover:bg-primary hover:opacity-90 text-white rounded-xl"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step > 0 && (
                                <button
                                    onClick={goBack}
                                    className="my-6 px-4 py-2 bg-secondary hover:bg-tertiary text-tertiary rounded-xl w-full"
                                >
                                    Back
                                </button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6 text-center"
                >
                    <h2 className="text-2xl font-bold mb-4">Thank you for completing the quiz! 🎉</h2>
                    <p className="mb-4">
                        A team member will review your answers and analyze your social media profile.
                    </p>
                    <p className="mb-6">
                        You will receive a customized email with personalized insights and recommendations based on your responses.
                    </p>
                </motion.div>
            )}
        </div>
    );
}