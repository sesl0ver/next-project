import {Suspense, use} from "react";
import GamePostList from "@/app/games/component/game-post-list";
import GamePrice from "@/app/games/component/game-price";
import Loading from "@/component/Loading";
import {PostPageProps} from "@/types/Post";

export default function GameInformation(params: { id: string, page: string }) {
    const { id, page } = params;
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
                <Suspense fallback={<Loading />}>
                    <GamePostList gameId={id} page={page} />
                </Suspense>
            </div>

            <div className="rounded-lg col-span-3 mb-6 space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold mb-4">스팀 상점 가격 정보</h3>
                    <div className="space-y-2 text-sm">
                        <Suspense fallback={<Loading />}>
                            <GamePrice id={String(id)} />
                        </Suspense>
                    </div>
                </div>
            </div>

        </div>
    )
}