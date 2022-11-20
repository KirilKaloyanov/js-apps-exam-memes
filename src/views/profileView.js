import { get } from '../api/api.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (user, memes) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${
                (memes.length == 0)
                    ? html `<p class="no-memes">No memes in database.</p>`
                    : memes.map(cardMeme)
            }
        </div>
    </section>
`;

const cardMeme = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href=${`/memes/details/${meme._id}`}>Details</a>
    </div>
`

export async function profileView(ctx) {
    const user = getUserData();

    const memes = await get(`/data/memes?where=_ownerId%3D%22${user.id}%22&sortBy=_createdOn%20desc`)
    ctx.render(profileTemplate(user, memes));

}