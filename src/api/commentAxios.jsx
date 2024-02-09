import client from "./client";

export const insComment = async (comment) => {
    try {
        const res = await client.post('cmt', comment);
        return res;
    } catch (error) { throw error; }
}