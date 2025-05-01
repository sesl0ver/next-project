import { FileListProps } from "@/types/Post";
import { RiDeleteBinLine, RiImageLine } from "@remixicon/react";
import { filesize } from "filesize";

const GamePostFileList: React.FC<FileListProps> = ({ files, handleRemoveFiles }) => {
    return (
        <div className="mt-4 space-y-2">
            {files.map((file, idx) => (
                <div key={idx} className="file-item flex items-center justify-between p-3 rounded">
                    <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded mr-3">
                            <RiImageLine />
                        </div>
                        <div>
                            <p className="text-sm text-white">{file.filename}</p>
                            <p className="text-xs text-gray-400">{filesize(file.size, { standard: "jedec" })}</p>
                        </div>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-red-400"
                            onClick={() => handleRemoveFiles(idx)}>
                        <div className="w-6 h-6 flex items-center justify-center">
                            <RiDeleteBinLine />
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default GamePostFileList;