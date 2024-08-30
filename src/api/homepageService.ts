import { AllPostsParams, CurrentUserPostsParams } from "@/models/homepageModel";
import apiService from "./axios/apiIntereptors";

const HOMEPAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/homepage";

export const homepageApiService = {
    getAllPosts,
    getSystemInfo,
    updatePostLike,
    createComment,
    deleteComment
};

async function getAllPosts(params: AllPostsParams, userId: string | undefined) {
    const response = await apiService().get(`${HOMEPAGE_BASE_URL}/${params.offset}`,
        {
            params: {
                userId,
            }
        }
    );
    return response.data;
}

async function updatePostLike(postId: number, actionType: "like" | "unlike") {
    const response = await apiService().post(`${HOMEPAGE_BASE_URL}/update_post_like`,
        JSON.stringify({ postId, actionType }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

async function createComment(payload: { postId: number; commentContent: string }) {
    const response = await apiService().post(`${HOMEPAGE_BASE_URL}/create_comment`,
        JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

async function deleteComment(id: number) {
    const response = await apiService().post(`${HOMEPAGE_BASE_URL}/delete_comment`,
        JSON.stringify({ commentId: id }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

async function getSystemInfo() {
    const response = await apiService().get(`${process.env.NEXT_PUBLIC_API_URL}/system-info`);
    return response.data;
}
