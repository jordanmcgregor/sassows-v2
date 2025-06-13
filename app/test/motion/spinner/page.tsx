// import LoadingCircleSpinner from "@/components/submitting/overlay";

export default function Overlay() {
    return (
        <>
            <div className="absolute w-full h-dvh z-50">
                <div className="absolute w-full h-full bg-white opacity-50">

                </div>
                <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {/* <LoadingCircleSpinner /> */}
                </div>
            </div>
        </>
    )
}