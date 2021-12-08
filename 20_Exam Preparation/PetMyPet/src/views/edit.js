import { editPet, getPetById } from '../api/data.js';
import { html } from '../lib.js';


const editTemplate = (pet, onSubmit) => html`
    <section id="edit-page" class="edit">
        <form @submit=${onSubmit} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Pet</legend>
                <p class="field">
                    <label for="name">Name</label>
                    <span class="input">
                        <input type="text" name="name" id="name" value=${pet.name}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description"
                            id="description" .value=${pet.description}></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${pet.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" .value=${pet.type}>
                            <option value="cat">Cat</option>
                            <option value="dog" selected>Dog</option>
                            <option value="parrot">Parrot</option>
                            <option value="reptile">Reptile</option>
                            <option value="other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;

export async function editPage(ctx) {
    const pet = await getPetById(ctx.params.id);

    ctx.render(editTemplate(pet, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const name = formData.get('name').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const type = formData.get('type');

        if (name == '' || description == '' || imageUrl == '') {
            return alert('All fields are required!');
        }

        await editPet(ctx.params.id, { name, description, imageUrl, type });

        ctx.page.redirect('/details/' + ctx.params.id);
    }

}