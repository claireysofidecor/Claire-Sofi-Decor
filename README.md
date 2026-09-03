# Claire & Sofi Decor

Puedes encontrar la web live [aquí](https://claireysofidecor.github.io/Claire-Sofi-Decor/).

Estructura del proyecto:

```
web sofia/
├── index.html          → página principal
├── tienda.html         → página de la tienda (todos los productos + filtros)
├── favoritos.html      → página "Mis Favoritos"
├── galeria.html        → página "Galería" (todas las creaciones, con modal)
├── sobre-nosotras.html → página "Sobre nosotras" (historia, valores, las dos hermanas)
├── contacto.html       → página "Contacto" (formulario + FAQ)
├── css/style.css       → estilos (paleta y tipografías al principio del archivo)
├── js/script.js        → menú móvil + carrusel + menú "Tienda" + filtros + favoritos + modal de galería + formulario de contacto
├── assets/img/         → logo(s) y fotos de producto
└── assets/icons/       → iconos sueltos (flechas del carrusel, etc.)
```

## Estado actual
- **Nav bar**: fondo gris pizarra (`#55606B`), logo a la izquierda (imagen `assets/img/logo1.1_claro.png`, la versión clara para que se lea sobre ese fondo), 5 enlaces centrados (Inicio, Tienda, Galería, Sobre nosotras, Contacto), 3 iconos a la derecha (buscar, favoritos, carrito) — buscar y carrito siguen siendo solo visuales; favoritos ya es funcional (ver más abajo). Logo e iconos con un margen pequeño y constante respecto al borde real de la ventana (no de un contenedor centrado). Presente igual en las seis páginas, y todos los enlaces de la nav y del pie llevan ya a su página real (nada de anclas rotas).
- **Menú "Tienda"**: al pasar el ratón por "Tienda" en la nav baja un panel pegado a la propia barra (sin hueco) con 5 categorías en forma de círculo (Ver todo, Para servir, Para decorar, Bolsas, Personalizado); el resto de la página se oscurece mientras está abierto. Cada categoría lleva a `tienda.html` con esa categoría ya filtrada (`tienda.html?cat=servir`, etc.). En móvil este menú se desactiva (el propio menú hamburguesa ya lista "Tienda" como enlace normal).
- **Página Tienda** (`tienda.html`): cabecera con una frase a modo de título, y debajo los mismos 5 filtros que el desplegable en forma de pastillas — al pulsar uno se filtran las tarjetas de producto sin recargar la página (JavaScript) y se actualiza la URL (`?cat=...`) para que el enlace se pueda compartir o llegar ya filtrado desde el menú. De momento hay 12 productos de ejemplo, 3 por categoría.
- **Favoritos**: el corazón de cada tarjeta de producto (en "Productos destacados" y en la tienda) se puede marcar y desmarcar — se guarda en el navegador de quien visita la web (`localStorage`, no en un servidor), así que cada persona ve solo lo suyo y se mantiene aunque cierre la pestaña. El icono de corazón de la nav lleva un contador (igual que el del carrito) con el número de favoritos, y al pulsarlo lleva a **`favoritos.html`** ("Mis Favoritos"): misma estructura que la tienda pero solo con los productos marcados, sin filtros, y con un botón "Explorar más" al final que lleva de vuelta a la tienda. Los favoritos también se pueden quitar desde ahí mismo, con el mismo corazón.
- **Página Galería** (`galeria.html`): no es una tienda más, es un escaparate de todo lo que se ha creado (vendido o no) para animar a comprar. Cabecera con el título "Todas nuestras creaciones, en un mismo sitio", y debajo una cuadrícula de tarjetas grandes, dos por fila, con las esquinas apenas redondeadas. Al pasar el ratón por una tarjeta aparece el nombre de la pieza sobre un degradado oscuro, pegado a la esquina inferior izquierda si la tarjeta está en la columna de la izquierda, o a la derecha si está en la de la derecha (en móvil, con una sola columna, siempre a la izquierda). Al hacer clic se abre una ventana modal que oscurece el resto de la página para apreciar mejor la foto, a tamaño grande: solo tiene la imagen, el nombre centrado debajo, una X arriba a la derecha para cerrar y, si la pieza tiene más de una foto, flechas a los lados para pasar entre ellas (si solo tiene una, las flechas no aparecen) — también se puede cerrar con la tecla Escape, con las flechas del teclado, o pulsando fuera de la imagen. De momento hay 8 piezas de ejemplo con degradados de color en vez de fotos reales, tal como en el resto de la web.
- **Página Sobre nosotras** (`sobre-nosotras.html`): cuenta la historia de la marca. Cabecera a dos columnas (texto + foto, alineadas arriba) con la presentación y un botón a la tienda; debajo, dos bloques que alternan foto/texto a un lado y otro ("Cómo empezamos" y "Nuestro proceso"); una cuadrícula de 4 tarjetas con lo que hace especial a la marca (hecho a mano, piezas únicas, con cariño, a tu medida); dos tarjetas de perfil, una por hermana; y una franja final con una llamada a la acción hacia la tienda y la galería (en un tono más oscuro que el pie de página, para que no se confundan). **El texto de esta página es un borrador** (historia, descripciones de las hermanas, etc.) — el usuario dijo que todavía no tiene el texto definitivo, así que habrá que sustituirlo más adelante por el suyo.
- **Página Contacto** (`contacto.html`): a la izquierda un formulario (nombre, email y mensaje); al enviarlo, como la web no tiene servidor propio, se abre el programa de correo de quien lo rellena con el mensaje ya redactado a `claireysofia.decor@gmail.com`, listo para revisar y mandar — no se envía nada automáticamente desde la propia página. A la derecha, una tarjeta con otras formas de contactar (email, envíos, tiempo de respuesta y redes sociales). Debajo, una sección de preguntas frecuentes desplegables (envíos, personalización, plazos, devoluciones). El contenido de las preguntas frecuentes también es orientativo, como el resto de textos de ejemplo del sitio.
- **Carrusel** a todo el ancho con 3 diapositivas que rotan solas cada 5 segundos (se puede cambiar en `js/script.js`, variable `interval` de `initCarousel`), con flechas (iconos propios, sin círculo) y puntos para navegar a mano.
- **Productos destacados**: sección debajo del carrusel, en la home, con una cuadrícula de tarjetas de producto (4 por fila en escritorio, 3 en tablet, 2 en móvil), cada una con imagen, botón de favorito, nombre y precio. Es un adelanto de la tienda, no la tienda completa (para eso está `tienda.html`).
- **Reseñas de clientas**: sección tipo carrusel debajo de productos destacados, con 5 reseñas de ejemplo (estrellas, cita y nombre) que rotan solas cada 6,5 segundos, con flechas y puntos para navegar a mano. Usa el mismo patrón de carrusel que la banda de inicio.
- **Pie de página**: fondo gris pizarra a juego con la nav bar, con el logo en versión clara, un mensaje breve ("Objetos únicos creados a mano con mucho cariño"), iconos de redes sociales (Instagram, TikTok, Pinterest — enlaces de ejemplo), y tres columnas de enlaces: Navegación (las mismas 5 secciones que la nav bar), Información (envíos y devoluciones, formas de pago, términos y condiciones) y Contacto (correo electrónico + "Envíos a toda España"). Se convierte en una sola columna en móvil.
- Las imágenes del carrusel y de las tarjetas de producto usan degradados de color en vez de fotos reales — están marcadas con una etiqueta "Sustituir por foto real" para que sea fácil encontrarlas y cambiarlas más adelante. Los nombres/precios de los productos y las reseñas también son de ejemplo (hay una nota debajo del carrusel de reseñas que lo recuerda).
- Menú responsive: en pantallas pequeñas la navegación se convierte en un menú hamburguesa (el desplegable es blanco con texto oscuro; solo la barra superior es gris pizarra).

## Paleta de color (editable en `css/style.css`, arriba del todo)
Paleta "C · Minimal elegante": el gris manda, con amarillo y verde agua como acentos puntuales.
- Fondo gris muy claro: `#F6F6F4`
- Gris pizarra (color principal, fondo de la nav): `#55606B`
- Verde agua (acento): `#9FBFB5`
- Amarillo suave (acento, botones/CTA): `#E4C878`
- Texto gris oscuro: `#2E3338`
- Texto gris medio (secundario): `#8A9099`

## Tipografía
Toda la página usa "Aktiv Grotesk Cd Thin" (fuente de pago, Dalton Maag). Hay un `@font-face` comentado en `css/style.css` listo para activar en cuanto se añadan los archivos `.woff2` en `assets/fonts/`.
En la nav bar se usa una variable aparte (`--font-nav`) con un peso más grueso y sin condensar, porque el "Thin" condensado se veía demasiado fino y apretado ahí. El resto de la página sigue en la variante fina por ahora.

## Nombre de la marca
"Claire & Sofi Decor" — aplicado en el `<title>` y en el logo (imagen) de la nav bar.

## Próximos pasos
Conseguir los archivos de la fuente Aktiv Grotesk, sustituir las fotos/reseñas/piezas de la galería de ejemplo por las reales, escribir el texto definitivo de "Sobre nosotras" (historia y descripciones de Claire y Sofi) y revisar las preguntas frecuentes de "Contacto", hacer funcionales el buscador y el carrito, y decidir si el formulario de contacto necesita enviarse sin salir de la web (haría falta un servicio externo de formularios o un backend propio, ya que ahora mismo abre el correo de quien escribe).
