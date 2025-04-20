import {getGame} from "./game-header";

async function checkImageExists(url: string): Promise<boolean> {
    try {
        const res = await fetch(url, { method: 'HEAD', cache: 'force-cache', next: { revalidate: 86400 } });
        return res.ok;
    } catch (err) {
        return false;
    }
}

export default async function GameInformation(params: { id: string }) {
    const { app_id, title, header_image, developers, publishers, release_date, short_description } = await getGame(params['id']);
    const imageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${app_id}/library_600x900_2x.jpg`;
    const exists = await checkImageExists(imageUrl);
    return (
        <div className="col-span-3">
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div>
                    <img src={(exists) ? imageUrl : header_image} alt={title} />
                </div>

                <div className="py-1 text-sm" dangerouslySetInnerHTML={ {__html: short_description}}></div>

                <div className="my-3 space-y-2 text-sm">
                    <div>
                        <p className="text-gray-400 text-xs">🔸개발사</p>
                        <p>{developers.join(', ')}</p>
                    </div>
                    {
                        (publishers) ? (
                            <div>
                                <p className="text-gray-400 text-xs">🔹배급사</p>
                                <p>{publishers.join(', ')}</p>
                            </div>
                        ) : null
                    }
                    <div>
                        <p className="text-gray-400 text-xs">▫️출시일</p>
                        <p>{release_date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}