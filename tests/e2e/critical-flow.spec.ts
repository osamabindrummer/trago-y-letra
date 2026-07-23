import { expect, test } from '@playwright/test'

test('búsqueda, ficha y fuente se pueden recorrer', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: '¿A quién lees?' }).fill('onetti')
  await page.getByRole('option', { name: /Juan Carlos Onetti/i }).click()
  await expect(page.getByRole('heading', { name: 'Juan Carlos Onetti' })).toBeVisible()
  await expect(page.getByText('La recomendación')).toBeVisible()
  await expect(page.getByText('La preparación')).toBeVisible()
  await expect(page.getByText('Alternativa sin alcohol')).toHaveCount(0)
})

test('la interfaz funciona con teclado y respeta movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('textbox', { name: '¿A quién lees?' }).focus()
  await page.keyboard.type('cortazar')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Julio Cortázar' })).toBeVisible()
})

test('el acceso rápido Poe abre la ficha correcta', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Poe', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Edgar Allan Poe' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Charles Bukowski' })).toHaveCount(0)
})
