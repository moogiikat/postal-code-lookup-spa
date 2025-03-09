import { test, expect } from "@playwright/test"

test("postal code search functionality", async ({ page }) => {
  // Navigate to the address search page
  await page.goto("http://localhost:3000/")

  // Verify the page title
  await expect(page.locator("h1")).toHaveText("住所検索")

  // Input a postal code and search
  await page.fill('input[type="text"]', "354-0026")
  await page.click('button:has-text("検索")')

  // Verify search results appear
  await expect(page.locator('h2:has-text("検索結果:")').first()).toBeVisible()

  // Verify the postal code in the result
  await expect(page.locator('span:has-text("〒3540026")').first()).toBeVisible()

  // Verify the address in the result
  await expect(
    page.locator('p:has-text("埼玉県 富士見市 鶴瀬西")').first()
  ).toBeVisible()

  // Verify search history section exists
  await expect(page.locator('h2:has-text("検索履歴")').first()).toBeVisible()

  // Verify the search is added to history
  await expect(
    page.locator('p:has-text("郵便番号: 3540026")').first()
  ).toBeVisible()
})

test("postal code search with invalid input", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Test with invalid postal code
  await page.fill('input[type="text"]', "999-9999")
  await page.click('button:has-text("検索")')

  await expect(
    page.locator('p:has-text("郵便番号が存在しません。")').first()
  ).toBeVisible()
})

test("postal code search with invalid format", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Test with invalid postal code format
  await page.fill('input[type="text"]', "999-999")
  await page.click('button:has-text("検索")')

  // Verify error message for invalid format
  await expect(
    page
      .locator(
        'p:has-text("郵便番号は半角数字でハイフンありの8桁かハイフンなしの7桁で入力してください。")'
      )
      .first()
  ).toBeVisible()
})

test("postal code search with special characters", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Test with postal code containing special characters
  await page.fill('input[type="text"]', "999999@")
  await page.click('button:has-text("検索")')

  // Verify error message for special characters
  await expect(
    page
      .locator(
        'p:has-text("郵便番号は半角数字のみまたは半角数字とハイフンのみで入力してください。")'
      )
      .first()
  ).toBeVisible()
})
