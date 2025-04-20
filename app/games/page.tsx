import {GamePageProps} from "@/types/Game";
import GameList from "@/app/games/component/game-list";
import {Suspense} from "react";
import SimpleLoading from "@/component/SimpleLoading";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Game'
}

export default async function GamePage({ searchParams }: GamePageProps) {
    const { page } = await searchParams;
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="hidden md:block col-span-3">
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    사이드 컨텐츠
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-4">최근에 등록된 게임</h3>
                    <div className="space-y-4">
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-4">오늘의 추천 게임</h3>
                    <div className="space-y-4">
                    </div>
                </div>
            </div>
            <div className="md:col-span-9 grid-cols-12">
                <Suspense fallback={<SimpleLoading />}>
                    <GameList page={page} />
                </Suspense>
            </div>
        </div>
    )
}