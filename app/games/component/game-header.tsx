import Link from "next/link";
import {RiHeartLine, RiShareLine, RiSteamFill} from "@remixicon/react";
import { Game } from "@/types/Game";
import PostShareButton from "@/component/PostShareButton";


export async function getGame (id: string): Promise<Game> {
    const res = await fetch(`${process.env.API_URL}/games/${id}`, { cache: 'force-cache', next: { revalidate: 86400 } });
    const data = await res.json();
    return data['data'];
}

export default async function GameHeader(params: { id: string }) {
    const { id } = params;
    const { app_id, title, genres, capsule_image } = await getGame(id);
    return (
        <>
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-44 h-16 rounded overflow-hidden" style={{ background: `url(${capsule_image}) no-repeat center center`, backgroundSize: "cover" }}></div>
                    <div>
                        <h2 className="md:text-2xl text-sm font-bold">{title}</h2>
                        <div className="flex items-center space-x-3 mt-1">
                            {
                                genres.map((genre: string, idx: number) => {
                                    return (
                                        <span key={idx} className="px-2 py-1 bg-blue-600 text-xs rounded-full"
                                              title={genre}>{genre}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Link href="#" title="관심등록" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:text-pink-400">
                        <RiHeartLine size={18} />
                    </Link>
                    <PostShareButton title="공유하기" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:text-yellow-400">
                        <RiShareLine size={18} />
                    </PostShareButton>
                    <Link href={`https://store.steampowered.com/app/${app_id}`} target="_blank" title="스팀상점 바로가기" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:text-gray-800">
                        <i className="ri-steam-fill"></i>
                        <RiSteamFill size={18} />
                    </Link>
                </div>
            </div>
        </>
    )
}