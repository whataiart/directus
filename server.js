import { spawnSync } from 'node:child_process';
import process from 'node:process';

// 1. Ejecutar bootstrap si es necesario (crea tablas iniciales y corre migraciones en la base de datos)
console.log('[Directus] Ejecutando verificación de base de datos (bootstrap)...');
const bootstrap = spawnSync(process.execPath, ['./directus/cli.js', 'bootstrap'], {
	stdio: 'inherit',
	env: process.env,
});

if (bootstrap.status !== 0) {
	console.warn('[Directus] Bootstrap finalizó con código:', bootstrap.status);
}

// 2. Iniciar el servidor Directus (API y Panel Admin)
console.log('[Directus] Iniciando servidor...');
await import('./api/dist/start.js');
