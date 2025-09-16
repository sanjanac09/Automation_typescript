import {expect, test} from '@playwright/test';

import { Page } from '@playwright/test';    

// test('visit empty url', async ({ page }) => {
//   await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
//   await page.getByText('right click me',{exact:true}).click({ button: 'right'});
// });

test('visit empty url', async ({ page }) => {
  await page.goto('https://artoftesting.com/samplesiteforselenium');
  // const maleRadioButton = page.locator('#male');
  // await maleRadioButton.check();
  // await expect(maleRadioButton).toBeChecked();
  //  const femaleRadioButton = page.locator('#female');
  //   await femaleRadioButton.check();  
  //   await expect(femaleRadioButton).toBeChecked();
  // await page.waitForTimeout(3000);

  //checkbox
  await page.locator('.Automation').check();
  await expect(page.locator('.Automation')).toBeChecked();
  await page.waitForTimeout(3000);

  await page.locator('.Performance').check();
  await expect(page.locator('.Performance')).toBeChecked();
  await page.waitForTimeout(3000);
  await page.locator('.Automation').uncheck();
  await expect(page.locator('.Automation')).not.toBeChecked();
  await page.waitForTimeout(3000);
});

 //dialog handling
test('dailog handling', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  // page.on('dialog', async dialog => {
  //   expect(dialog.type()).toBe('alert');
  //   expect(dialog.message()).toBe('I am a JS Alert');
  //   await dialog.accept();
  // });
  
  // // Click the button to trigger the alert
  //   await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  //   await expect(page.locator("#result"),('You successfully clicked an alert')).toBeVisible();

//confirmation dialog to simulate ok
// page.on('dialog', async dialog => {
//   expect(dialog.type()).toBe('confirm');
//   expect(dialog.message()).toBe('I am a JS Confirm');
//   // await dialog.accept(); 
//    await dialog.dismiss(); // to simulate clicking "Cancel"
// });

// // Click the button to trigger the confirm dialog
//   await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
//   await expect(page.locator("#result"),('You clicked: Ok')).toBeVisible();
//   await page.waitForTimeout(3000);

// //prompt dialog
page.on('dialog', async dialog => {
  expect(dialog.type()).toBe('prompt');
  expect(dialog.message()).toBe('I am a JS prompt');
  await dialog.accept('Playwright'); // Provide input text and accept the prompt
});

// Click the button to trigger the prompt dialog
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  await expect(page.locator("#result"),('You entered: Playwright')).toBeVisible();
  await page.waitForTimeout(3000);
//  
});