"use client"

import { homepageApiService } from "@/api/homepageService";
import { verela } from "@/fonts/fonts";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import Swal from "sweetalert2";

type CommentBoxContainer = {
    commentusername: string;
    commentcontent: string;
    commentId: number;
    commentUserId: number
};

const CommentBoxContainer = (probs: CommentBoxContainer) => {
    const { commentusername, commentcontent, commentId, commentUserId } = probs;
    const router = useRouter()
    const userId = useAppSelector(state => state.userSlice.currentUser.userId)

    const isHasPermission = userId === commentUserId
    const handleDeleteComment = async () => {
        try {
            const response = await homepageApiService.deleteComment(commentId)
            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Comment deleted successfully",
                    icon: "success"
                })
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: `Failed to delete comment: ${error}`,
                icon: "error"
            })
        }
    }
    return (
        <div className="reply-box-container pt-4">
            <hr className="mt-[-10px]"></hr>
            <span className="comment-profile-circle-line">
                <span className="comment-profile-circle-img" title="user icons">User icons created by Freepik - Flaticon</span>
            </span>
            <span className="comment-username">{commentusername}</span>
            <span className={`comment-post-content ${verela.className} pt-2`}>{commentcontent}</span>
            <span className="comment-delete" style={{
                fontFamily: "Silkscreen",
                color: "red",
                border: "1px solid red",
                width: "fit-content",
                display: isHasPermission ? "block" : "none",
                cursor: "pointer",
            }}
                onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'You will not be able to recover this post!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel it!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleDeleteComment()
                        }
                    })
                }}
            >Delete comment</span>
        </div>
    );
};

export default CommentBoxContainer;
