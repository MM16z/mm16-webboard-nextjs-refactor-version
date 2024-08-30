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
    const response = await apiService().get(`${USER_DASHBOARD_BASE_URL}/get_user_posts`, { params: params });
    return response.data;
}

async function createPost(payload: any) {
    const response = await apiService().post(`${USER_DASHBOARD_BASE_URL}/create_post`, JSON.stringify(payload), {
        headers: HEADERS
    });
    return response;
}

async function editPost(payload: any) {
    const response = await apiService().post(`${USER_DASHBOARD_BASE_URL}/update_post`, JSON.stringify(payload), {
        headers: HEADERS
    });
    return response;
}

async function deletePost(payload: any) {
    const response = await apiService().post(`${USER_DASHBOARD_BASE_URL}/delete_post`, JSON.stringify(payload), {
        headers: HEADERS
    });
    return response;
}