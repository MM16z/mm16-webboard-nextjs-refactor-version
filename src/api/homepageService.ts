import { AllPostsParams, CurrentUserPostsParams } from "@/models/homepageModel";
import apiService from "./axios/apiIntereptors";

const HOMEPAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/homepage";

export const homepageApiService = {
    getAllPosts,
    updatePostLike,
    createComment,
    deleteComment
};

async function getAllPosts(params: AllPostsParams, userId: string | undefined) {
    try {
        const response = await apiService().get(`${HOMEPAGE_BASE_URL}/${params.offset}`,
            {
                params: {
                    userId,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        throw new Error('Failed to get all posts');
    }
}

async function updatePostLike(postId: number, actionType: "like" | "unlike") {
    try {
        const response = await apiService().post(`${HOMEPAGE_BASE_URL}/update_post_like`,
            JSON.stringify({ postId, actionType }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in updatePostLike:", error);
        throw new Error('Failed to update post like');
    }
}

async function createComment(payload: { postId: number; commentContent: string }) {
    try {
        const response = await apiService().post(`${HOMEPAGE_BASE_URL}/create_comment`,
            JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error("Error in createComment:", error);
        throw new Error('Failed to create comment');
    }
}

async function deleteComment(id: number) {
    try {
        const response = await apiService().post(`${HOMEPAGE_BASE_URL}/delete_comment`,
            JSON.stringify({ commentId: id }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error("Error in deleteComment:", error);
        throw new Error('Failed to delete comment');
    }
}
