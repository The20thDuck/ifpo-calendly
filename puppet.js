const puppeteer = require('puppeteer');
const request_client = require('request-promise-native');


(async () => {
    const browser = await puppeteer.launch();//{headless: false});
    const page = await browser.newPage();
    await page.goto('https://calendly.com/login', {waitUntil: 'networkidle2'});

    // Enter email
    await page.waitFor('input[name=email]');
    await page.$eval('input[name=email]', el => el.value = 'warren.sunada.wong@gmail.com');
    await page.click('input[type="submit"]');

    // Enter password
    await page.waitFor('input[name=password]');
    await page.$eval('input[name=password]', el => el.value = 'Foodpantry1');
    await page.click('input[type="submit"]');

    // Retrieve event types
    await page.waitFor(".avatar");
    const events = await page.$$eval('.grid-3-cell', events => events.map(event => event.innerText));
    console.log(events);
    // console.log(await page._client.send('Network.getAllCookies'));

    await page.setRequestInterception(true);

    page.on('request', request => {
        request_client({
        uri: request.url(),
        resolveWithFullResponse: true,
        }).then(response => {
        const request_url = request.url();
        const request_headers = request.headers();
        const request_post_data = request.postData();
        const response_headers = response.headers;
        const response_size = response_headers['content-length'];
        const response_body = response.body;

        result.push({
            // request_url,
            // request_headers,
            // request_post_data,
            // response_headers,
            // response_size,
            response_body,
        });
        // if (result.includes("36203197")) {
        console.log(result);
        // }
        request.continue();
        }).catch(error => {
        // console.error(error);
        request.abort();
        });
    });

    async function getLink(ind) {
        // Get single-use link for event 2
        await page.$$eval('.grid-3-cell', (events, ind) => {
            // Click dropdown
            const dropdown = events[ind].querySelector("button[aria-label=\"Other ways to share your link\"]");
            dropdown.click();
            
            // Create single-use link
            let buttons = Array.from(document.querySelectorAll("button"));
            buttons.forEach(button => {
                if (button.innerText.includes("Create Single-Use Link")) {
                    button.click();
                }
            });
        }, ind);

        await page.waitFor("input[aria-invalid=\"false\"]");
        
        
        let link = await page.evaluate(() => {
            // Copy link
            let input = document.querySelector("input[aria-invalid=\"false\"]");
            let link = input.getAttribute("value");

            // Close link popup
            buttons = Array.from(document.querySelectorAll("button"));
            buttons.forEach(button => {
                if (button.innerText.includes("Copy and Close")) {
                    button.click();
                }
            });
            return link;
        });
        return link;
    }
    for (let x = 0; x < 10; x++) {
        console.log(await getLink(1));
    }
    // await browser.close();
})();
