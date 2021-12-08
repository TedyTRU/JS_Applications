import { createComment, deleteGame, getAllComments, getGameById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, userData, comments, onComment) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>
    
            <div class="details-comments">
                <h2>Comments:</h2>
    
                ${comments.length == 0 
                ? html`<p class="no-comment">No comments.</p>`
                : html`<ul>
                    ${comments.map(commentTemplate)}
                </ul>`}
    
            </div>

            ${isOwner
            ? html`<div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>`
            : null}
    
        </div>

        ${!isOwner && userData != null
        ? html`<article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onComment} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`
        : null}
    
    </section>
`;

const commentTemplate = (comment) => html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
`;

export async function detailsPage(ctx) {
    // console.log(ctx.params.id);
    const game = await getGameById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && game._ownerId == userData.id;

    const comments = await getAllComments(ctx.params.id);

    ctx.render(detailsTemplate(game, isOwner, onDelete, userData, comments, onComment));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this meme FOREVER?');

        if (choice) {
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const gameId = ctx.params.id;
        const comment = formData.get('comment');

        if (comment == '') {
            return alert('Please enter a comment before you send!');
        }

        await createComment({ gameId, comment });
        event.target.reset();
    
        ctx.page.redirect(`/details/${gameId}`);
    }

}