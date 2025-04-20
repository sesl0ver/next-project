export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center pointer-events-auto">
            <div className="flex flex-col items-center justify-center h-full text-white text-2xl space-y-4">
                <div className="w-32 h-auto">
                    <img src="/bouncing-circles.svg" alt="spinner" />
                </div>
            </div>
        </div>
    )
}