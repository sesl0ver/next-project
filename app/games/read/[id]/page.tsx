export const metadata = {
    title: 'Game'
}

export default async function GameReadPage() {
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="md:col-span-9 grid-cols-none">
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                    </div>
                </div>
            </div>
        </div>
    )
}