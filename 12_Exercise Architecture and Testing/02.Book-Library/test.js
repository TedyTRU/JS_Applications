const { chromium, request } = require('playwright-chromium');
const { expect } = require('chai');

describe('Tests', async function () {
    this.timeout(6000);
    let page, browser;

    before(async () => { browser = await chromium.launch(); });
    // browser = await chromium.launch({ headless: false, slowMo: 500 });
    after(async () => { await browser.close(); });
    this.beforeEach(async () => { page = await browser.newPage(); });
    this.afterEach(async () => { await page.close(); });


    it('loads and displays all books', async () => {

        await page.goto('http://localhost:5500/');
        await page.click('text=Load All Books');
        await page.waitForSelector('text=Harry Potter');

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));
        expect(rows[1]).to.contains('Harry Potter');
        expect(rows[1]).to.contains('Rowling');
        expect(rows[2]).to.contains('C# Fundamentals');
        expect(rows[2]).to.contains('Svetlin Nakov');
    });


    it('can create book', async () => {
        await page.goto('http://localhost:5500/');

        await page.fill('form#createForm >> input[name="title"]', 'Title');
        await page.fill('form#createForm >> input[name="author"]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')
        ]);

        const data = JSON.parse(request.postData());
        //console.log(data);
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');

        //await page.waitForTimeout(60000);
    });


    it('can edit book', async () => {
        await page.goto('http://localhost:5500/');

        await Promise.all([
            page.click('text=Load All Books'),
            page.click('.editBtn'),
        ]);

        const editForm = await page.isVisible('#editForm');
        expect(editForm).to.be.true;

        await page.fill('form#editForm >> input[name="title"]', 'Edited');
        await page.fill('form#editForm >> input[name="author"]', 'Author2');
        await page.click('text=Save');
        await page.click('text=Load All Books');

        const content = await page.textContent('table tbody');
        expect(content).to.contain('Edited');
        expect(content).to.contain('Author2');

    });


    it('can delete book', async () => {
        await page.goto('http://localhost:5500/');

        await Promise.all([
            page.click('text=Load All Books'),
            page.click('.deleteBtn'),
            page.on('dialog', dialog => dialog.accept())
        ]);

        await page.click('text=Load All Books');

        const content = await page.textContent('table tbody');
        expect(content).not.to.contain('J.K.Rowling');

    });

});

