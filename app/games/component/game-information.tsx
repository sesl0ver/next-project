import {Suspense} from "react";
import GamePostList from "@/app/games/component/game-post-list";
import GamePrice from "@/app/games/component/game-price";
import Loading from "@/component/Loading";

export default async function GameInformation(params: { id: number }) {
    const { id } = await params;
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
                <div className="rounded-lg p-1 mb-6">
                    <Suspense fallback={<Loading />}>
                        <GamePostList gameId={id} />
                    </Suspense>
                </div>
                {
                    /*
                    <span className="text-2xl">게임 스크린샷</span>
                <hr className="mb-4"/>
                <div className="flex flex-wrap gap-2">
                    {
                        screenshots.map((img: string, idx: number) => {
                            return <img key={idx} src={img} alt={String(idx)}
                                        style={{width: "230px"}}/>;
                        })
                    }
                </div>
                    */
                }
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