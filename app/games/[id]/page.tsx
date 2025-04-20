import React, {Suspense, use} from "react";
import Loading from "@/component/SimpleLoading";
import GamePostButton from "@/app/games/component/game-post-button";
import GamePostList from "@/app/games/component/game-post-list";
import GamePrice from "@/app/games/component/game-price";
import GameHeader from "../component/game-header";
import GameInformation from "../component/game-information";
import {PostPageProps} from "@/types/Post";

export default function GameDetailPage({ params, searchParams }: PostPageProps) {
    const { id } = use(params)
    const { page } = use(searchParams)
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="hidden md:block col-span-3">
                <Suspense fallback={<Loading />}>
                    <GameInformation id={id} />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <GamePrice id={String(id)} />
                </Suspense>
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-4">비슷한 게임 추천</h3>
                    <div className="space-y-4">
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-4">최근 업데이트 게시글</h3>
                    <div className="space-y-4">
                    </div>
                </div>
            </div>
            <div className="col-span-9">
                <div className="rounded-lg p-4 mb-6">
                    <Suspense fallback={<Loading />}>
                        <GameHeader id={id} />
                    </Suspense>
                    <div className="gap-6">
                        <GamePostList gameId={id} page={page} />
                    </div>
                </div>
            </div>
            <GamePostButton id={id} />
        </div>
    )
}