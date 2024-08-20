import { AllPostsParams, CurrentUserPostsParams } from "@/models/homepageModel";
import apiService from "./axios/apiIntereptors";

const HOMEPAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const HOMEPAGE_DATA_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/user_posts';

export const homepageApiService = {
    getAllPosts,
    getCurrentUserPosts,
    updatePostLike
};

async function getAllPosts(params: AllPostsParams) {
    const response = await apiService().get(`${HOMEPAGE_DATA_BASE_URL}/${params.offset}`,);
    return response.data;
}

async function getCurrentUserPosts(query: CurrentUserPostsParams) {
    const response = await apiService().get(`${HOMEPAGE_DATA_BASE_URL}`, { params: query });
    return response.data;
}

async function updatePostLike(payload: any, actionType: "like" | "unlike") {
    const response = await apiService().post(`${HOMEPAGE_BASE_URL}/${actionType === "like" ? "user_post_liked" : "user_post_unliked"}`,
        JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}