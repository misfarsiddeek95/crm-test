import { test, expect } from "@playwright/test";

// We run all steps in one test to maintain the state (the created customer).
test("should handle the full customer CRUD workflow", async ({ page }) => {
  // 1. --- SETUP: Generate unique data for this test run ---
  // This ensures the test is repeatable and won't conflict with old data.
  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  const firstName = "Test";
  const lastName = "User";
  const updatedFirstName = "Updated";

  // --- 2. NAVIGATION ---
  await page.goto("http://localhost:5173/"); // Make sure your dev server is running!
  await expect(
    page.getByRole("heading", { name: "Customer Management" })
  ).toBeVisible();

  // --- 3. CREATE a new customer ---
  await test.step("Create Customer", async () => {
    // Click the create button
    await page.getByRole("button", { name: "+ Create Customer" }).click();

    // Wait for the modal and fill in the form
    await expect(
      page.getByRole("heading", { name: "Create New Customer" })
    ).toBeVisible();
    await page.getByLabel("Email").fill(uniqueEmail);
    await page.getByLabel("First Name").fill(firstName);
    await page.getByLabel("Last Name").fill(lastName);

    // Submit the form
    // Use 'exact: true' to distinguish from '+ Create Customer'
    await page
      .getByRole("button", { name: "Create Customer", exact: true })
      .click();
  });

  // --- 4. READ the new customer in the table ---
  await test.step("Read Customer", async () => {
    // Wait for the modal to be hidden
    await expect(
      page.getByRole("heading", { name: "Create New Customer" })
    ).toBeHidden();

    // Find the new row in the table using the unique email
    const newRow = page.getByRole("row", {
      name: new RegExp(uniqueEmail, "i"),
    });
    await expect(newRow).toBeVisible();
    await expect(newRow).toContainText(`${firstName} ${lastName}`);
  });

  // --- 5. UPDATE the new customer ---
  await test.step("Update Customer", async () => {
    // Find the "Edit" button for our specific new row and click it
    const newRow = page.getByRole("row", {
      name: new RegExp(uniqueEmail, "i"),
    });
    await newRow.getByRole("button", { name: "Edit" }).click();

    // Wait for the modal and update the first name
    await expect(
      page.getByRole("heading", { name: `Edit ${uniqueEmail}` })
    ).toBeVisible();
    await page.getByLabel("First Name").fill(updatedFirstName);

    // Submit the update
    // Use 'exact: true' to be specific
    await page
      .getByRole("button", { name: "Update Customer", exact: true })
      .click();
  });

  // --- 6. VALIDATE the update in the table ---
  await test.step("Validate Update", async () => {
    // Wait for the modal to be hidden
    await expect(
      page.getByRole("heading", { name: `Edit ${uniqueEmail}` })
    ).toBeHidden();

    // Check that the table now shows the updated name
    const updatedRow = page.getByRole("row", {
      name: new RegExp(uniqueEmail, "i"),
    });
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText(`${updatedFirstName} ${lastName}`);
  });

  // --- 7. DELETE the customer ---
  await test.step("Delete Customer", async () => {
    // Find the "Delete" button for our row and click it
    const updatedRow = page.getByRole("row", {
      name: new RegExp(uniqueEmail, "i"),
    });
    await updatedRow.getByRole("button", { name: "Delete" }).click();

    // Wait for the confirmation modal
    await expect(
      page.getByRole("heading", { name: "Confirm Deletion" })
    ).toBeVisible();
    await expect(
      page.getByText(`Are you sure you want to delete ${uniqueEmail}?`)
    ).toBeVisible();

    // Confirm the deletion
    // Scope to the dialog to avoid ambiguity with table Delete buttons
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Delete" }).click();
  });

  // --- 8. VALIDATE the deletion ---
  await test.step("Validate Delete", async () => {
    // Wait for the confirmation modal to be hidden
    await expect(
      page.getByRole("heading", { name: "Confirm Deletion" })
    ).toBeHidden();

    // Expect the row to no longer be in the table
    const deletedRow = page.getByRole("row", {
      name: new RegExp(uniqueEmail, "i"),
    });
    await expect(deletedRow).toBeHidden();
  });
});
