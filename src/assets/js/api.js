import { URL, lIMIT_POST_COUNT } from './contst.min.js'
const { POSTS, USERS } = URL
export let slipPosts = 0

export async function getPosts() {
  try {
    const response = await fetch(`${POSTS}?limit=${lIMIT_POST_COUNT}&skip=${slipPosts}`);
    const data = await response.json()
    slipPosts += 3
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUser(id) {
  try {
    const response = await fetch(`${USERS}/${id}`);
    return await response.json();
  } catch (error) {
    throw new Error(error)
  }
}