const puppeteer = require('puppeteer');

async function login (email, password) {
    // console.log(`${email} ${password}`);
    const browser = await puppeteer.launch(  {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.goto('https://calendly.com/login', {waitUntil: 'networkidle2'});

    // Enter email
    await page.waitFor('input[name=email]');
    await page.$eval('input[name=email]', (el, email) => el.value = email, email);
    await page.click('input[type="submit"]');

    // Enter password
    await page.waitFor('input[name=password]');
    await page.$eval('input[name=password]', (el, password) => el.value = password, password);
    await page.click('input[type="submit"]');

    // Validate login
    await page.waitFor(() => {
        let a = document.querySelector('.avatar');
        let b = document.querySelector("div.error-message");
        return !!a || (!!b && !!(b.innerText));
    });
    if ((await page.$$('div.error-message')).length > 0) {
        console.log('bad login');
        await browser.close();
        return false;
    }
    console.log("logged in");
    // If validated, return {session, csrf}
    // const events = await page.$$eval('.grid-3-cell', events => events.map(event => event.innerText));
    // console.log(events);
    let cookies = (await page._client.send('Network.getAllCookies')).cookies;
    let session = cookies.filter(
        (cookie) => {
            return cookie.name === '_calendly_session';
        }
    )[0].value;
    
    let csrf = await page.$eval('meta[name="csrf-token"]', (meta) => {
        return meta.getAttribute('content');
    });
    await browser.close();
    return [session, csrf];
}
    
module.exports.login = login;

// login("warren.sunada.wong@gmail.com", "Foodpantry1");
// export async function getLink(ind) {
//     // Get single-use link for event 2
//     await page.$$eval('.grid-3-cell', (events, ind) => {
//         // Click dropdown
//         const dropdown = events[ind].querySelector("button[aria-label=\"Other ways to share your link\"]");
//         dropdown.click();
        
//         // Create single-use link
//         let buttons = Array.from(document.querySelectorAll("button"));
//         buttons.forEach(button => {
//             if (button.innerText.includes("Create Single-Use Link")) {
//                 button.click();
//             }
//         });
//     }, ind);

//     await page.waitFor("input[aria-invalid=\"false\"]");
    
    
//     let link = await page.evaluate(() => {
//         // Copy link
//         let input = document.querySelector("input[aria-invalid=\"false\"]");
//         let link = input.getAttribute("value");

//         // Close link popup
//         buttons = Array.from(document.querySelectorAll("button"));
//         buttons.forEach(button => {
//             if (button.innerText.includes("Copy and Close")) {
//                 button.click();
//             }
//         });
//         return link;
//     });
//     return link;
// }
    // await browser.close();

