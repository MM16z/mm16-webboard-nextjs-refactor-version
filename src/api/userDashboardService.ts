import apiService from "./axios/apiIntereptors";

const USER_DASHBOARD_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/user-dashboard';

const HEADERS = {
    "Content-Type": "application/json",
}

export const dashBoardApiService = {
    getAllUserPosts,
    createPost,
    editPost,
    deletePost
};

async function getAllUserPosts(params: any) {
    try {
        const response = await apiService().get(`${USER_DASHBOARD_BASE_URL}/get_user_posts`, { params: params });
        return response.data;
    } catch (error) {
        console.error("Error in getAllUserPosts:", error);
        throw new Error('Failed to get all user posts');
    }
}

async function createPost(payload: any) {
    try {
        const response = await apiService().post(`${USER_DASHBOARD_BASE_URL}/create_post`, JSON.stringify(payload), {
            headers: HEADERS
        });
        return response;
    } catch (error) {
        console.error("Error in createPost:", error);
        throw new Error('Failed to create post');
    }
}

async function editPost(payload: any) {
    try {
        const response = await apiService().post(`${USER_DASHBOARD_BASE_URL}/update_post`, JSON.stringify(payload), {
            headers: HEADERS
        });
        return response;
    } catch (error) {
        console.error("Error in editPost:", error);
        throw new Error('Failed to edit post');
    }
}

async function deletePost(payload: any) {
    try {
        const response = await apiService().post(`${USER_DASHBOARD_BASE_URL}/delete_post`, JSON.stringify(payload), {
            headers: HEADERS
        });
        return response;
    } catch (error) {
        console.error("Error in deletePost:", error);
        throw new Error('Failed to delete post');
    }
}