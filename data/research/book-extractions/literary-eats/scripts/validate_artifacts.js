#!/usr/bin/env node
/* Verifica cobertura, rangos, candidatos y JSON sin depender de datos externos. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const errors = [];
const coverage = read('coverage.json');
const candidates = read('candidates.json').candidates;
const expected = Array.from({ length: 229 }, (_, i) => i + 1);
if (JSON.stringify(coverage.pages_reviewed) !== JSON.stringify(expected)) errors.push('La cobertura no incluye exactamente 1–229.');
if (coverage.pages_pending.length || coverage.pages_with_error.length) errors.push('Hay páginas pendientes o con error.');
const seen = new Set();
for (const range of coverage.planned_ranges) {
  for (let page = range.start; page <= range.end; page += 1) {
    if (seen.has(page)) errors.push(`Superposición en PDF ${page}.`);
    seen.add(page);
  }
}
if (seen.size !== 229) errors.push('Los rangos no cubren 229 páginas.');
const ids = new Set();
for (const item of candidates) {
  if (ids.has(item.candidate_id)) errors.push(`ID repetido: ${item.candidate_id}.`);
  ids.add(item.candidate_id);
  const words = item.support_excerpt.trim().split(/\s+/).filter(Boolean).length;
  if (words > 25) errors.push(`Extracto supera 25 palabras: ${item.candidate_id} (${words}).`);
  if (item.status !== 'extraction_candidate') errors.push(`Estado inválido: ${item.candidate_id}.`);
  if (item.source_page_pdf < 1 || item.source_page_pdf > 229) errors.push(`Página inválida: ${item.candidate_id}.`);
}
for (let i = 1; i <= 10; i += 1) read(`batches/batch-${String(i).padStart(3, '0')}.json`);
read('manifest.json'); read('schema.json'); read('rejected.json');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validación aprobada: 229 páginas, 10 lotes y ${candidates.length} candidatos; extractos <= 25 palabras.`);
