import React, {Suspense} from "react";
import GameHeader from "../component/game-header";
import GameSide from "../component/game-side";
import GameInformation from "../component/game-information";
import Loading from "@/component/Loading";
import GamePostButton from "@/app/games/component/game-post-button";
import {PostPageProps} from "@/types/Post";
import { use } from 'react'

export default function GameDetailPage({ params, searchParams }: PostPageProps) {
    const { id } = use(params)
    const { page } = use(searchParams)
    return (
        <div className="grid grid-cols-12 gap-6">
            <Suspense fallback={<Loading />}>
                <GameSide id={id} />
            </Suspense>
            <div className="col-span-9">
                <div className="rounded-lg p-4 mb-6">
                    <Suspense fallback={<Loading />}>
                        <GameHeader id={id} />
                    </Suspense>
                    <GameInformation id={id} page={page} />
                </div>
            </div>
            <GamePostButton id={id} />
        </div>
    )
}