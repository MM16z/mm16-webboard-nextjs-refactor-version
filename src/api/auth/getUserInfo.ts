import axios from "axios";

const getUserInfo = async () => {

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/get_user_by_id`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get user auth: ${error.message}`);
        }
    }
};

export default getUserInfo;
