const {expect} = require('chai');
const puppeteer = require('puppeteer');

var testsArray = [
  {
    title: 'MyAnimeList',
    url: 'https://myanimelist.net/',
    testCases: [
      {
        url: 'https://myanimelist.net/',
        expectedInput: 'MyAnimeList.net'
      },
      {
        url: 'https://myanimelist.net/2',
        expectedInput: 'MyAnimeList.net'
      },
    ]
  },
  {
    title: 'MyAnimeList2',
    url: 'https://myanimelist.net/',
    testCases: [
      {
        url: 'https://myanimelist.net/',
        expectedInput: 'MyAnimeList.net'
      },
      {
        url: 'https://myanimelist.net/2',
        expectedInput: 'MyAnimeList.net'
      },
    ]
  }
];

// Define global variables
let browser
let page

before(async function () {
  browser = await puppeteer.launch()
  page = await browser.newPage()
})

beforeEach(async function () {
  page = await browser.newPage()
})

afterEach(async function () {
  await page.close()
})

after(async function () {
  await browser.close()
})

testsArray.forEach(function(testPage) {
  describe(testPage.title, function () {

    it('Online', async function () {
      const [response] = await Promise.all([
        page.goto(testPage.url, {timeout:0}),
        page.waitForNavigation({timeout:0}),
      ]);

      expect(200).to.equal(parseInt(response.headers().status));
    })

    testPage.testCases.forEach(function(testCase) {
      it(testCase.url, async function () {
        const [response] = await Promise.all([
          page.goto(testCase.url, {timeout:0}),
          page.waitForNavigation({timeout:0}),
        ]);

        const text = await page.evaluate(() => $('.link-mal-logo').text().trim())
        expect(text).to.equal(testCase.expectedInput);
      })
    });
  });
})
