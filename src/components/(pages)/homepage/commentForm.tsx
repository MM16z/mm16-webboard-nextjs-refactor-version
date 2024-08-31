"use client"

import { homepageApiService } from '@/api/homepageService'
import { verela } from '@/fonts/fonts'
import { useAppSelector } from '@/redux/hook'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function CommentForm({ postId }: { postId: number }) {
    const router = useRouter()
    const [comment, setComment] = useState("")
    const userId = useAppSelector(state => state.userSlice.currentUser.userId)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await homepageApiService.createComment({
                commentContent: comment,
                postId: postId,
            })
            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Comment created successfully",
                    icon: "success"
                })
                setComment("")
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: `Failed to create comment: ${error}`,
                icon: "error"
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment-input">Type something nice :D</label>
            <textarea
                id="comment-input"
                name="comment"
                className={`border-[1px] border-gray-400 rounded-lg ${verela.className}`}
                onChange={(e) => setComment(e.target.value)}
                disabled={!userId}
                required
            ></textarea>
            <button id="comment-submitbtn" type="submit"
                disabled={!userId} style={{ opacity: !userId ? "0.5" : "1", cursor: !userId ? "help" : "pointer" }}
            >
                Submit
            </button>
        </form>
    )
}
