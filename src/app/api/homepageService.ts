import { AllPostsParams, CurrentUserPostsParams } from "@/app/models/homepageModel";
import apiService from "./axios/apiIntereptors";

const HOMEPAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/user_posts';

export const homepageApiService = {
    getAllPosts,
    getCurrentUserPosts
};

async function getAllPosts(params: AllPostsParams) {
    const response = await apiService().get(`${HOMEPAGE_BASE_URL}/${params.offset}`);
    return response.data;
}

async function getCurrentUserPosts(query: CurrentUserPostsParams) {
    const response = await apiService().get(`${HOMEPAGE_BASE_URL}`, { params: query });
    return response.data;
}