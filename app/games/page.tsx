import GameBox from "./component/game-box";
import Side from "@/component/Side";
import {Game} from "@/types/Game";
import Loading from "@/component/Loading";

export const metadata = {
    title: 'Game'
}

async function getGames(): Promise<Game[]> {
    const response = await fetch('http://localhost:3333/games');
    return response.json();
}

export default async function GamePage() {
    const games: Game[] = await getGames();
    return (
        <div className="grid grid-cols-12 gap-6">
            <Side />
            <div className="md:col-span-9 grid-cols-none">
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                        {
                            games.map((g: Game) => {
                                return (
                                    <GameBox key={g.app_id} game={g} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}