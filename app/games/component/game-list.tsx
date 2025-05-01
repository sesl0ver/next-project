import type {Game, GamePage} from "@/types/Game";
import GameBox from "@/app/games/component/game-box";
import Pagination from "@/component/Pagination";
import {fetch} from "undici";
import {responseVerify} from "@/utils/responseVerify";

export async function getGames(page: string): Promise<any> {
    const res = await fetch(`${process.env.API_URL}/games?page=${page}`);
    return responseVerify(res);
}

export default async function GameList({ page }: { page: string }) {
    page = page ?? "1";
    const data = await getGames(page);
    return (
        <>
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                    {
                        data.games.map((g: Game) => {
                            return (
                                <GameBox key={g.app_id} game={g}/>
                            )
                        })
                    }
                </div>
            </div>
            <Pagination data={data} />
        </>

    )
}