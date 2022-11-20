import {get} from './api.js';

export async function getAll() {
    const memes = await get('/data/memes?sortBy=_createdOn%20desc');
    return memes;
}