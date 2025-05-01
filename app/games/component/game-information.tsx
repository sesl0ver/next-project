import {getGame} from "./game-header";

export default async function GameInformation(params: { id: string }) {
    const { title, header_image, developers, publishers, release_date, short_description } = await getGame(params['id']);
    return (
        <div className="col-span-3">
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div>
                    <img src={header_image} alt={title} />
                </div>

                <div className="py-1 text-sm">{ short_description }</div>

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