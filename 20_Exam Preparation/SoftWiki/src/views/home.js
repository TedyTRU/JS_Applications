import { getMostRecentArticles } from '../api/data.js';
import { html } from '../lib.js';

const homeTemplate = (jsArticle, cSharpArticle, javaArticle, pythonArticle) => html`
        <section id="home-page" class="content">
            <h1>Recent Articles</h1>
        
            ${jsArticle ? articleCard(jsArticle) : 
                           html`<section class="recent js">
                                <h2>JavaScript</h2>
                                 <h3 class="no-articles">No articles yet</h3>  
                                 </section>`}

            ${cSharpArticle ? articleCard(cSharpArticle) : 
                            html`<section class="recent csharp">
                                 <h2>C#</h2>
                                 <h3 class="no-articles">No articles yet</h3>  
                                 </section>`}

            ${javaArticle ? articleCard(javaArticle) :
                            html`<section class="recent java">
                                 <h2>Java</h2>
                                <h3 class="no-articles">No articles yet</h3>  
                                </section>`}

            ${pythonArticle ? articleCard(pythonArticle) : 
                            html`<section class="recent python">
                                <h2>Python</h2>
                                <h3 class="no-articles">No articles yet</h3>  
                                </section>`}

        </section>`;

const articleCard = (article) => html`
    <section class="recent csharp">
        <h2>${article.category}</h2>
        <article>
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <a href="/details/${article._id}" class="btn details-btn">Details</a>
        </article>
    </section>`;


export async function homePage(ctx) {
    const articles = await getMostRecentArticles();

    const jsArticle = articles.find(x => x.category == 'JavaScript');
    const cSharpArticle = articles.find(x => x.category == 'C#');
    const javaArticle = articles.find(x => x.category == 'Java');
    const pythonArticle = articles.find(x => x.category == 'Python');

    ctx.render(homeTemplate(jsArticle, cSharpArticle, javaArticle, pythonArticle));
}