import GameBox from "./component/game-box";
import Side from "@/component/Side";
import type {GamePage, Game} from "@/types/Game";
import Pagination from "@/component/Pagination";
import { GamePageProps } from "@/types/Game";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Game'
}

async function getGames(page: number = 1): Promise<GamePage> {
    const response = await fetch(`${process.env.API_URL}/games?page=${page}`);
    return response.json();
}

export default async function GamePage({ searchParams }: GamePageProps) {
    const { page } = await searchParams;
    const data: GamePage = await getGames(Number(page) ?? 1);
    return (
        <div className="grid grid-cols-12 gap-6">
            <Side />
            <div className="md:col-span-9 grid-cols-none">
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
            </div>
        </div>
    )
}