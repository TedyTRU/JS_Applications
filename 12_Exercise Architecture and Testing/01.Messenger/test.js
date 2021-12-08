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


    it('loads messages', async () => {
        await page.goto('http://localhost:5500/');

        const res = await Promise.all([
            page.click('text=Refresh'),
            page.waitForRequest('**/jsonstore/messenger')
        ])

        const messages = await page.$eval('textarea[id="messages"]', (m) => m.value);
        //console.log(messages);
        expect(messages).to.contains('Spami: Hello, are you there?');
        expect(messages).to.contains('Garry: Yep, whats up :?');
        expect(messages).to.contains('Spami: How are you? Long time no see? :)');
        expect(messages).to.contains('George: Hello, guys! :))');
    });


    it('can send message', async () => {
        await page.goto('http://localhost:5500/');

        await page.fill('div#controls >> input[id="author"]', 'Name');
        await page.fill('div#controls >> input[id="content"]', 'Message');

        await page.click('text=Send');
        await page.click('text=Refresh');

        const messages = await page.$eval('textarea[id="messages"]', (m) => m.value);
        expect(messages).to.contains('Name: Message');

    });


});

