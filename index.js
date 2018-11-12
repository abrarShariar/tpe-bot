const puppeteer = require('puppeteer');
const config = require('./config.js');

(async () => {


  const logValues = async (page, selector) => {
    let input = await page.$(`input[name=${selector}]`);
    let value = await input.getProperty('value');
    console.log(value);
  }

  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: false, timeout: 0 });
  const page = await browser.newPage();
  try {
    // log in
    await page.goto('https://portal.aiub.edu', { waitUntil: 'load' });
    let username = config.id;
    let password = config.password

    await page.$eval('#username', (el, username) => {
     el.value = username;
   }, username);

     await page.$eval('#password', (el, password) => {
      el.value = password;
    }, password);

    await page.waitFor(2000);
    await page.$eval(".btn-primary", el => el.click());
    // await delay(7000);

  } catch (err) {
    console.log("EAT SHIT: ", err);
  }



})();
