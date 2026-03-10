# Besga Agro Solar v2

Versión reconstruida del proyecto corrigiendo los problemas del panel administrativo.

## Cambios clave
- Se eliminó NextAuth para evitar conflictos de login.
- Se usa un sistema propio de acceso con cookie segura y JWT.
- `middleware.ts` protege `/admin/*` pero deja libre `/admin/login`.
- El login ahora muestra error real cuando el email o la contraseña no coinciden.
- `postcss.config.js` ya viene compatible con `type: module`.

## Instalación
```bash
npm install
```

## Crear `.env`
En Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

## Configurar admin
1. Elegí email y contraseña.
2. Generá el hash:
```bash
npm run hash:admin -- "TuContraseñaSegura"
```
3. Pegá el resultado en `.env`.

Ejemplo:
```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@besga.com"
ADMIN_PASSWORD_HASH="$2a$12$..."
ADMIN_JWT_SECRET="una-clave-larga-y-segura"
SITE_URL="http://localhost:3000"
COMPANY_NAME="Besga Agro Solar"
COMPANY_CITY="Santa Rosa, La Pampa"
WHATSAPP_NUMBER="5492954XXXXXX"
```

## Base de datos
```bash
npm run prisma:generate
npm run prisma:migrate
```
Cuando pida nombre de migración:
```text
init
```

## Productos de ejemplo
```bash
npm run seed
```

## Ejecutar
```bash
npm run dev
```

## URLs
- Sitio: http://localhost:3000
- Login admin: http://localhost:3000/admin/login
- Panel admin: http://localhost:3000/admin

## Usuario del panel
- Email: el que pongas en `ADMIN_EMAIL`
- Contraseña: la que usaste al correr `npm run hash:admin -- "TuContraseña"`

## Qué resuelve esta versión
- error de `npm` no reconocido → tema de Node/PATH
- error de `postcss.config.js` → corregido
- error de `DATABASE_URL` → documentado en `.env`
- redirecciones infinitas en `/admin` → corregidas
- login sin feedback → corregido

## Siguientes mejoras
- subir imágenes desde PC
- módulo de proyectos administrable
- envío automático de emails
- estadísticas de consultas


## Diseño responsive incluido
- Enfoque mobile-first
- Breakpoints estándar: base (~320px), md 768px, lg 1024px, xl 1280px
- Menú hamburguesa en mobile
- Grillas y columnas adaptativas
- Botones y áreas táctiles optimizadas
- Ajuste de tipografías, padding e imágenes según ancho de pantalla


## Hero section full screen
- Home con fondo visual full screen
- Imagen de fondo responsive con `bg-cover` y `bg-center`
- Overlay oscuro + degradado para mejorar legibilidad
- Altura pensada para mobile y desktop usando `min-h-[92svh]`
- Botones y contenido preparados para superposición sobre fondo visual


## Subida de imágenes desde la PC
- Panel admin con input para subir imágenes
- Las imágenes se guardan en `public/uploads`
- El sistema genera automáticamente URLs locales como `/uploads/archivo.jpg`
- También se pueden seguir pegando URLs manuales, una por línea


## Consulta por producto estilo ficha lateral
- Página de producto con galería grande a la izquierda
- Miniaturas verticales / horizontales según pantalla
- Panel de consulta a la derecha con título, precio y formulario
- En desktop el formulario queda fijo con `sticky`


## Hero con slider automático
- Home con 3 imágenes de fondo
- Transición automática cada 4 segundos
- Indicadores manuales para cambiar slide
- Botón de WhatsApp agregado en la ficha de producto
