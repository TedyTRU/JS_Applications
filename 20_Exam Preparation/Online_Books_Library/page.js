
import { getAllListings, getCollectionSize } from '../api/data.js';

const template = () => html``;


export async function catalogPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) | 1;

    const count = await getCollectionSize();
    const pages = Math.ceil(count / 3);
    const cars = await getAllListings(page);

    ctx.render(template(cars, page, pages));
}