import { expect, test } from '@playwright/test'

test('búsqueda, ficha y fuente se pueden recorrer', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('¿A quién lees?').fill('onetti')
  await page.getByRole('option', { name: /Juan Carlos Onetti/i }).click()
  await expect(page.getByRole('heading', { name: 'Juan Carlos Onetti' })).toBeVisible()
  await expect(page.getByText('Receta propuesta')).toBeVisible()
  await expect(page.getByText('Procedencia')).toBeVisible()
})

test('la interfaz funciona con teclado y respeta movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByLabel('¿A quién lees?').focus()
  await page.keyboard.type('cortazar')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Julio Cortázar' })).toBeVisible()
})
