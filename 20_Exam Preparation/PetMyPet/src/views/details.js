import { deletePet, getLikesByPetId, getMyLikeByPetId, getPetById, likePet } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (pet, isOwner, onDelete, likes, showLikeBtn, onLike) => html`
<section id="details-page" class="details">
    <div class="pet-information">
        <h3>Name: ${pet.name}</h3>
        <p class="type">Type: ${pet.type}</p>
        <p class="img"><img src=${pet.imageUrl}></p>
        <div class="actions">

            ${isOwner
            ? html`<a class="button" href="/edit/${pet._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
            : null}
            
            ${likeControlsTemplate(showLikeBtn, onLike)}
            
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>

        </div>
    </div>
    <div class="pet-description">
        <h3>Description:</h3>
        <p>${pet.description}</p>
    </div>
</section>
`;

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`;
    
    } else {
        return null;
    }
};

export async function detailsPage(ctx) {

    const userData = getUserData();

    let [pet, likes, hasLike] = await Promise.all([
        getPetById(ctx.params.id),
        getLikesByPetId(ctx.params.id),
        userData ? getMyLikeByPetId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && pet._ownerId == userData.id;
    const showLikeBtn = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(pet, isOwner, onDelete, likes, showLikeBtn, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this meme FOREVER?');

        if (choice) {
            await deletePet(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likePet(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}
