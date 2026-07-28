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

test('la biblioteca de hallazgos informa una cola vacía tras la promoción completa', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Hallazgos' }).click()
  await expect(page.getByText('0 hallazgos visibles')).toBeVisible()
})

test('una ficha mínima promovida participa en la búsqueda principal', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: '¿A quién lees?' }).fill('Eudora Welty')
  await page.getByRole('option', { name: 'Eudora Welty' }).click()
  await expect(page.getByRole('heading', { name: 'Eudora Welty' })).toBeVisible()
  await expect(page.getByText('Ficha mínima · perfil en desarrollo')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Mint Julep' })).toBeVisible()
})

test('el índice reúne los autores canónicos promovidos', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Índice' }).click()
  await expect(page.getByRole('heading', { name: 'Autores, de la A a la Z.' })).toBeVisible()
  await expect(page.getByText('218 autores · 313 recomendaciones y sugerencias de bebidas.')).toBeVisible()
  await expect(page.getByRole('list', { name: 'Índice alfabético de autores' }).getByRole('listitem')).toHaveCount(218)
})

test('la búsqueda abre una ficha promovida con confianza baja visible', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: '¿A quién lees?' }).fill('Homer')
  await page.getByRole('option', { name: 'Homer' }).click()
  await expect(page.getByRole('heading', { name: 'Homer' })).toBeVisible()
  await expect(page.getByText('Confianza baja').first()).toBeVisible()
  await expect(page.getByText('Literary Libations').first()).toBeVisible()
})

for (const viewport of [{ width: 390, height: 844 }, { width: 1200, height: 900 }]) {
  test(`la ficha promovida se mantiene utilizable a ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.getByRole('textbox', { name: '¿A quién lees?' }).fill('Mark Twain')
    await page.getByRole('textbox', { name: '¿A quién lees?' }).press('ArrowDown')
    await page.getByRole('textbox', { name: '¿A quién lees?' }).press('Enter')
    await expect(page.getByRole('heading', { name: 'Mark Twain' })).toBeVisible()
    const widths = await page.locator('body').evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }))
    expect(widths.scroll).toBeLessThanOrEqual(widths.client)
  })
}
