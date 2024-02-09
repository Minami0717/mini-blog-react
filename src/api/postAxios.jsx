import client from "./client";

export const getPosts = async () => {
    try {
        const res = await client.get('post');
        return res.data;
    } catch (error) { throw error; }
}

export const getPost = async (postId) => {
    try {
        const res = await client.get(`post/${postId}`);
        return res.data;
    } catch (error) { throw error; }
}

export const insPost = async (post) => {
    try {
        const res = await client.post('post', post);
        return res;
    } catch (error) { throw error; }
}

export const updPost = async (post) => {
    try {
        const res = await client.put('post', post);
        return res;
    } catch (error) { throw error; }
}

export const delPost = async (postId) => {
    try {
        const res = await client.delete(`post/${postId}`);
        return res;
    } catch (error) { throw error; }
}