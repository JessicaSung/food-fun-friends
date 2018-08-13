import React from 'react';
import ReactDOM from 'react-dom';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';
import renderer from 'react-test-renderer';

import App from './App';

// Create React App default test.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// jest-image-snapshot + puppeteer saves a png snapshot and compares.
expect.extend({ toMatchImageSnapshot });

describe('jest-image-snapshot and puppeteer png match', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('should match the visual layout', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // await page.setViewport({
    //   width: 800,
    //   height: 1200
    // });

    const image = await page.screenshot({
      // fullPage: true
    });

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});

// react-test-renderer saves an html structure snapshot and compares.
test('react-test-renderer html match', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
