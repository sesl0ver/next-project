import GameInformation from "@/app/games/component/game-information";
import GamePostWrite from "@/app/games/component/game-post-write";
import React, {Suspense} from "react";
import Loading from "@/component/SimpleLoading";
import GamePrice from "@/app/games/component/game-price";
import {PostPageProps} from "@/types/Post";
import {getGamePostRead} from "@/app/games/[game_id]/read/[post_id]/page";
import {GameRead} from "@/types/Game";

export default async function GamePostModifyPage({ params }: PostPageProps) {
    const { game_id, post_id } = await params;
    const post_data: GameRead = await getGamePostRead(game_id, post_id);
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-3 ">
                <Suspense>
                    <GameInformation id={game_id} />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <GamePrice id={String(game_id)} />
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
            <div className="lg:col-span-9 col-span-12">
                <div className="py-4 mb-6">
                    <GamePostWrite game_id={game_id} modify_data={post_data} />
                </div>
            </div>
        </div>
    )
}