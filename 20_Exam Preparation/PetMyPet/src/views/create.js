import { createPet } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (onSubmit) => html`
    <section id="create-page" class="create">
        <form @submit=${onSubmit} id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Pet</legend>
                <p class="field">
                    <label for="name">Name</label>
                    <span class="input">
                        <input type="text" name="name" id="name" placeholder="Name">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="parrot">Parrot</option>
                            <option value="reptile">Reptile</option>
                            <option value="other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Pet">
            </fieldset>
        </form>
    </section>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

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

        await createPet({ name, description, imageUrl, type });

        ctx.page.redirect('/');
    }

}