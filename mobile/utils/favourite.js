import axios from "axios";
import { API_URL } from "@env";


export const getFavoritePosts = async (token) => {
    try {
        const response = await axios.get(API_URL + 'favorite_post', {
            headers: {
                'Authorization': token,
            }
        })
        return response.data;
    } catch (err) {
        console.log(err.response.status);
    }
}

export async function addFavoritePost(token, post_id) {
    try {
        const response = await axios.post(API_URL + 'favorite_post', { post_id },
            {
                headers: {
                    'Authorization': token,
                }
            })
        console.log(response.status)
    } catch (err) {
        console.log(err.response.status);
    }
}

export async function deleteFavoritePost(token, post_id) {
    try {
        const response = await axios.delete(API_URL + `favorite_post/${post_id}`,
            {
                headers: {
                    'Authorization': token,
                }
            })
        console.log(response.status)
    } catch (err) {
        console.log(err.response.status);
    }
}