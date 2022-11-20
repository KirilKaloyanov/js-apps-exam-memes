import {put, del, get, post } from './api.js';

export async function getAll() {
    const memes = await get('/data/memes?sortBy=_createdOn%20desc');
    return memes;
}
export async function createMeme(meme) {
    await post('/data/memes', meme);
}

export async function getById(id) {
    return await get('/data/memes/' + id);
}

export async function deleteById(id) {
    return await del('/data/memes/' + id);
}

export async function updateMeme(id, meme) {
    return await put('/data/memes/' + id, meme);
}

