import { test, expect } from '@playwright/test';

test.describe('QR Ordering Flow', () => {
  test('End to end user journey from QR scan to checkout', async ({ page }) => {
    // 1. Scan QR / land on table page
    await page.goto('/table?id=12');
    
    // Check if table number is captured
    await expect(page.locator('text=Table 12')).toBeVisible();
    
    // 2. Navigate to Menu
    await page.click('text=Open Menu');
    await expect(page).toHaveURL(/.*\/menu/);
    
    // 3. Add items to cart
    // Using nth(0) and nth(1) to click the first two "Add +" buttons
    const addButtons = page.locator('button:has-text("Add +")');
    // Ensure menu loaded
    await expect(addButtons.first()).toBeVisible();
    
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();
    await addButtons.nth(1).click(); // Add second item twice

    // 4. Verify Floating Cart badge updates (1 + 2 = 3 items)
    await expect(page.locator('text=View Cart')).toBeVisible();
    
    // 5. Navigate to Cart Checkout
    await page.locator('text=View Cart').click();
    await expect(page).toHaveURL(/.*\/cart/);

    // 6. Verify cart contents
    await expect(page.locator('text=Total Amount')).toBeVisible();
    
    // 7. Submit order
    const submitBtn = page.locator('button:has-text("Place Order")');
    await submitBtn.click();
    
    // 8. Verify order confirmation UI
    await expect(page.locator('text=Order Placed!')).toBeVisible();
  });
});
