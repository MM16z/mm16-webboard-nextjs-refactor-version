'use client'
import "@/styles/(pages)/user-dashboard/user-dashboard.css"
import "@/styles/post-box/post-box.css"
// import "@/styles/post-box/comment-box.css"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { dashBoardApiService } from '@/api/userDashboardService';
import { useAppSelector } from '@/redux/hook';
import EditInput from '@/components/(pages)/user-dashboard/EditInput';
import { silkscreen } from "@/fonts/fonts";
import { useRouter } from "next/navigation";

import swal from "sweetalert2";
import Image from "next/image";

import userIcon from "@/assets/bussiness-man.png";

const UserDashboardPage = (
    {
        params,
        searchParams,
    }: {
        params: { slug: string }
        searchParams: { [key: string]: string | string[] | undefined }
    }
) => {
    const router = useRouter();
    const getUserData = useAppSelector((state) => state.userSlice.currentUser)
    const [userPostData, setUserPostData] = useState([]);
    const userId = getUserData.userId;

    const [postForm, setPostForm] = useState({ title: '', content: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editInputValue, setEditInputValue] = useState(
        {
            post_id: null,
            post_content: '',
        }
    );

    const apiService = useMemo(() => {
        return dashBoardApiService
    }, []);

    const getUserPostData = useCallback(
        async (userId: number | null) => {
            if (userId) {
                const userPostData = await apiService.getAllUserPosts({
                    currentUserId: userId,
                });
                if (userPostData) {
                    setUserPostData(userPostData?.userPostData);
                }
            }
        },
        [apiService]
    );

    const onPostSubmitHandler = async () => {
        try {
            const response = await apiService.createPost({
                post_title: postForm.title,
                post_content: postForm.content,
            });
            if (response?.status === 201) {
                setPostForm({ title: '', content: '' });
                swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    text: 'Post success!',
                })
                return router.push('/', { scroll: false });
            }
        } catch (error) {
            console.log(error)
            return swal.fire({
                icon: 'error',
                text: `Post Failed! - Error ${error}`,
                title: 'xdding?',
            })
        }
    }

    const onEditSubmitHandler = async () => {
        try {
            const response = await apiService.editPost({
                id: editInputValue.post_id,
                post_content: editInputValue.post_content,
            });
            if (response?.status === 200) {
                getUserPostData(userId);
                setIsEditing(false);
                return swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    text: 'Edit success!',
                })
            }
        } catch (error) {
            console.log(error)
            return swal.fire({
                icon: 'error',
                text: `Post Failed! - Error ${error}`,
                title: 'xdding?',
            })
        }

    }

    const onDeletePosthandler = async (postId: number) => {
        try {
            const response = await apiService.deletePost({
                postId: postId,
            });
            if (response?.status === 200) {
                getUserPostData(userId);
                return swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    text: 'Delete success!',
                })
            }
        } catch (error) {
            console.log(error)
            return swal.fire({
                icon: 'error',
                text: `Delete Failed! - Error ${error}`,
                title: 'xdding?',
            })
        }
    }

    useEffect(() => {
        if (userId) {
            getUserPostData(userId);
        }
    }, [getUserPostData, userId]);


    return (
        <div className={`${silkscreen.className} userpanel-container`} ref={(e) => { isEditing && e?.scrollIntoView() }}>
            {isEditing && <EditInput onClose={() => setIsEditing(false)} titleInputValue={editInputValue.post_content} onEditChange={(value) => setEditInputValue({ ...editInputValue, post_content: value })} onEditSubmit={onEditSubmitHandler} />}
            <span id="username" className={`${silkscreen.className}`} style={{ zIndex: 1 }}>HI! {getUserData?.username} </span>
            <form onSubmit={(e) => {
                e.preventDefault();
                onPostSubmitHandler();
            }}>
                <div className="user-panel-inputcontainer">
                    <label htmlFor="post-text-input" style={{ marginBottom: "20px" }}>Write something nice :D</label>
                    <textarea
                        placeholder={"Title"}
                        autoFocus
                        onChange={(e) => {
                            setPostForm({ ...postForm, title: e.target.value })
                        }}
                        value={postForm.title}
                        required
                        className="post-inputborder"
                        id="post-text-input"
                        typeof="text"
                        style={{ height: "80px", overflow: "hidden" }}
                    />
                    <textarea
                        placeholder={"Content"}
                        onChange={(e) => {
                            setPostForm({ ...postForm, content: e.target.value })
                        }}
                        value={postForm.content}
                        required
                        className="post-inputborder"
                        id="post-text-input"
                        typeof="text"
                    />
                    <input id="post-submitbtn" type="submit" value="Post"></input>
                </div>
            </form>
            <section className="user-posts">
                <span id="user-post-text">Your recent posts</span>
                <div className="user-posts-container">
                    {userPostData?.map((post: any) => {
                        const postId = post.id;
                        const postTitle = post.post_title;
                        const postContent = post.post_content;
                        const postUsername = post.post_username;
                        const postCreatedAt = post.created_at;
                        return (
                            <div className="post-box-container" key={postId}>
                                <span className="vertical-line"></span>
                                <span className="vertical-line_1"></span>
                                <span className="horizontal-line"></span>
                                <span className="profile-circle-line">
                                    <Image src={userIcon} alt="profile-circle" width={40} height={40} style={{ scale: 1.2 }} />
                                </span>
                                <button
                                    className={`${userId === post.user_id ? "block" : "hidden"}`}
                                    id="post-edit-btn"
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(true);
                                        setEditInputValue({
                                            post_id: postId,
                                            post_content: postContent,
                                        });
                                    }}
                                >
                                    EDIT
                                </button>
                                <button
                                    className={`${userId === post.user_id ? "block" : "hidden"}`}
                                    id="post-delete-btn"
                                    type="button"
                                    onClick={() => {
                                        // onDeletePosthandler(postId);
                                        swal.fire({
                                            title: 'Are you sure?',
                                            text: 'You will not be able to recover this post!',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes, delete it!',
                                            cancelButtonText: 'No, cancel it!',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                onDeletePosthandler(postId);
                                            }
                                        })
                                    }}
                                >
                                    DELETE
                                </button>
                                <span className="username">{postUsername}</span>
                                <span className="title">{postTitle}</span>
                                <span className="line5"></span>
                                <span className="line6"></span>
                                <span className="post-content" style={{ marginBottom: "25px" }}>
                                    {postContent}
                                </span>
                                <span className="post-date">
                                    {dayjs(postCreatedAt).format("D MMM YYYY - HH:mm")}
                                </span>
                                <span className="horizontal-line_1"></span>
                            </div>
                        );
                    })}
                </div>
            </section>
            <div id="home-page-bg">
                <span id="home-page-bg-nested"></span>
            </div>
        </div>
    );
}

export default UserDashboardPage;
