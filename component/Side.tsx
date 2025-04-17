export default async function Side() {
    return (
        <div className="hidden md:block col-span-3">
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                사이드 컨텐츠
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-4">비슷한 게임 추천</h3>
                <div className="space-y-4">
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-4">최근에 등록된 게시글</h3>
                <div className="space-y-4">
                </div>
            </div>
        </div>
    )
}