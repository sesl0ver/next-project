import GameSide from "@/app/games/component/game-side";
import GamePostWrite from "@/app/games/component/game-post-write";
import {Suspense} from "react";

export default function GamePostWritePage({ params }) {
    const { id } = params;
    return (
        <div className="grid grid-cols-12 gap-6">
            <Suspense>
                <GameSide id={id} />
            </Suspense>
            <div className="md:col-span-9 grid-cols-none">
                <div className="py-4 mb-6">
                    <GamePostWrite id={id} />
                </div>
            </div>
        </div>
    )
}