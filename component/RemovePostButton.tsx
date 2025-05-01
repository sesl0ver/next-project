'use client';

import { toast } from "sonner";
import { useAtom } from "jotai";
import { loadingAtom } from "@/atoms/loadingAtom";
import { ButtonHTMLAttributes } from "react";
import {useRouter} from "next/navigation";
import {removeGamePost} from "@/app/action/games/posts/removeGamePost";

interface RemovePostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    game_id: string;
    post_id: string;
    children?: React.ReactNode;
}

export default function RemovePostButton({game_id, post_id, children, className}: RemovePostButtonProps) {
    const [, setLoading] = useAtom(loadingAtom);
    const router = useRouter();
    const handleRemove = async () => {
        try {
            setLoading(true);
            const res = await removeGamePost('DELETE', Number(game_id), Number(post_id));
            if (! res.success) {
                toast.error(res.message);
                return;
            }
            toast.success("글을 삭제하였습니다.");
            router.push(`/games/${game_id}`);
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleRemove} className={className}>
            {children}
        </button>
    );
}