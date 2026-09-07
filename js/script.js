/* =========================================================
   Hecho a Mano — script base
   ========================================================= */

/* ---------- Catálogo de productos ----------
   Fuente única de datos para la página de Producto (producto.html?id=...):
   como el resto de la web no tiene build system, el nombre/precio/categoría/
   descripción de cada producto sigue viviendo también en los data-* de sus
   tarjetas (tienda.html, busqueda.html, home) — aquí se repiten para poder
   montar la ficha de un producto cualquiera sin depender de qué página
   enlazó hasta ella, y para poder calcular "También podría gustarte...".
   Si se añade o cambia un producto en las tarjetas, hay que reflejarlo
   también aquí (mismo id). */
const PRODUCTS_DATA = {
  /* ---- Tablas (tipo TAB, familia 'tabla': tamaño 18/25 cm x color liso/estampado) ---- */
  'tabla-estampado': {
    dateAdded: '2026-09-06',
    name: 'Tabla pequeña con estampado',
    category: 'servir',
    type: 'TAB',
    family: 'tabla',
    variant: { size: '18', color: 'FLO1' },
    price: '22,00 €',
    description: 'Tabla redonda de madera de 18 cm con borde dorado y un estampado floral decoupage pintado a mano, ideal para servir o decorar la mesa.',
    images: ["url('assets/img/productos/tabla-estampado-1.jpg')", "url('assets/img/productos/tabla-estampado-2.jpg')"],
    // DE PRUEBA (2026-09-06): códigos ficticios para que Juan pruebe el flujo
    // de carrito/checkout antes de tener productos reales en stock. `skus` es
    // la lista de códigos de las unidades físicas que quedan disponibles AHORA
    // MISMO de este modelo/color/tamaño, ordenada del número más bajo al más
    // alto (el más bajo es siempre el primero en venderse/mostrarse). El stock
    // no es un número aparte: es sencillamente `skus.length`. El sufijo
    // "-PRUEBA" distingue estos códigos de uno real; sustituir este array por
    // los códigos reales (o quitar el campo `skus`) en cuanto haya stock de
    // verdad, y borrar cada código de la lista según se vaya vendiendo esa
    // unidad concreta.
    skus: ['SER-TAB-FLO1-18-001-PRUEBA', 'SER-TAB-FLO1-18-002-PRUEBA'],
  },
  'tabla-estampado-grande': {
    dateAdded: '2026-09-06',
    name: 'Tabla grande con estampado',
    category: 'servir',
    type: 'TAB',
    family: 'tabla',
    variant: { size: '25', color: 'FLO1' },
    price: '26,00 €',
    description: 'Tabla redonda de madera de 25 cm con borde dorado y un estampado floral decoupage pintado a mano, ideal para servir o decorar la mesa en formato grande.',
    images: ["url('assets/img/productos/tabla-estampado-grande-1.jpg')", "url('assets/img/productos/tabla-estampado-grande-2.jpg')"],
    // DE PRUEBA (2026-09-06): lista de códigos vacía a propósito, para que
    // Juan vea el estado "Agotado" (tarjeta atenuada + sello, ficha sin poder
    // añadir al carrito) sin tener que fabricar ni editar nada más. Ver nota
    // igual en 'tabla-estampado' de arriba.
    skus: [],
  },
  'tabla-natural-18': {
    dateAdded: '2026-09-06',
    name: 'Tabla pequeña madera natural',
    category: 'servir',
    type: 'TAB',
    family: 'tabla',
    variant: { size: '18', color: 'MAD' },
    price: '22,00 €',
    description: 'Tabla redonda de madera de 18 cm en acabado natural liso, sin estampado, para servir o decorar la mesa con un toque más sobrio.',
    images: ["linear-gradient(135deg, #C9A66B, #EAEAE7)"],
  },
  'tabla-natural-25': {
    dateAdded: '2026-09-06',
    name: 'Tabla grande madera natural',
    category: 'servir',
    type: 'TAB',
    family: 'tabla',
    variant: { size: '25', color: 'MAD' },
    price: '26,00 €',
    description: 'Tabla redonda de madera de 25 cm en acabado natural liso, sin estampado, para servir o decorar la mesa en formato grande.',
    images: ["linear-gradient(135deg, #C9A66B, #9FBFB5)"],
  },
  'tabla-personalizable': {
    dateAdded: '2026-09-06',
    name: 'Tabla personalizable',
    category: 'servir',
    type: 'TAB',
    family: 'tabla',
    personalizable: true,
    price: '18,00 €',
    description: 'Tabla redonda de madera lisa, personalizable a tu gusto (pintura, iniciales, motivo especial...) en el tamaño y acabado que elijas.',
    images: ["url('assets/img/productos/tabla-plain-1.jpg')", "url('assets/img/productos/tabla-plain-2.jpg')"],
  },

  /* ---- Cajas de pañuelos (tipo CAJ, familia 'caja-panuelos': solo color) ---- */
  'caja-panuelos-estampado': {
    dateAdded: '2026-09-06',
    name: 'Caja de pañuelos con estampado floral',
    category: 'decorar',
    type: 'CAJ',
    family: 'caja-panuelos',
    variant: { color: 'FLO1' },
    price: '16,00 €',
    description: 'Caja de pañuelos de madera decorada a mano con papel decoupage de estampado floral, un toque de color para cualquier rincón de la casa.',
    images: ["url('assets/img/productos/caja-panuelos-estampado-1.jpg')", "url('assets/img/productos/caja-panuelos-estampado-2.jpg')"],
  },
  'caja-panuelos-blanca': {
    dateAdded: '2026-09-06',
    name: 'Caja de pañuelos blanca',
    category: 'decorar',
    type: 'CAJ',
    family: 'caja-panuelos',
    variant: { color: 'BLA' },
    price: '16,00 €',
    description: 'Caja de pañuelos de madera pintada en blanco liso, un básico que combina con cualquier decoración.',
    images: ["linear-gradient(135deg, #FFFFFF, #C9CDD2)"],
  },
  'caja-panuelos-verde': {
    dateAdded: '2026-09-06',
    name: 'Caja de pañuelos verde agua',
    category: 'decorar',
    type: 'CAJ',
    family: 'caja-panuelos',
    variant: { color: 'VER' },
    price: '16,00 €',
    description: 'Caja de pañuelos de madera pintada en verde agua, un color suave para dar vida a cualquier estancia.',
    images: ["linear-gradient(135deg, #9FBFB5, #434B54)"],
  },
  'caja-panuelos-personalizable': {
    dateAdded: '2026-09-06',
    name: 'Caja de pañuelos personalizable',
    category: 'decorar',
    type: 'CAJ',
    family: 'caja-panuelos',
    personalizable: true,
    price: '13,00 €',
    description: 'Caja de pañuelos de madera lisa, lista para personalizar a tu gusto (nombre, iniciales, colores...).',
    images: ["url('assets/img/productos/caja-panuelos-plain-1.png')", "url('assets/img/productos/caja-panuelos-plain-2.jpg')", "url('assets/img/productos/caja-panuelos-plain-3.jpg')"],
  },

  /* ---- Bandejas decorativas (tipo BAN, familia 'bandeja': solo color) ---- */
  'bandeja-decorativa': {
    dateAdded: '2026-08-15',
    name: 'Bandeja decorativa verde agua',
    category: 'servir',
    type: 'BAN',
    family: 'bandeja',
    variant: { color: 'VER' },
    price: '24,00 €',
    description: 'Bandeja decorativa pintada a mano en verde agua, ideal para servir en la mesa o decorar una estantería.',
    images: ["linear-gradient(135deg, #9FBFB5, #55606B)"],
  },
  'bandeja-decorativa-blanca': {
    dateAdded: '2026-09-06',
    name: 'Bandeja decorativa blanca',
    category: 'servir',
    type: 'BAN',
    family: 'bandeja',
    variant: { color: 'BLA' },
    price: '24,00 €',
    description: 'Bandeja decorativa pintada a mano en blanco liso, ideal para servir en la mesa o decorar una estantería.',
    images: ["linear-gradient(135deg, #EAEAE7, #C9CDD2)"],
  },
  'bandeja-decorativa-madera': {
    dateAdded: '2026-09-06',
    name: 'Bandeja decorativa madera natural',
    category: 'servir',
    type: 'BAN',
    family: 'bandeja',
    variant: { color: 'MAD' },
    price: '24,00 €',
    description: 'Bandeja decorativa en acabado madera natural, ideal para servir en la mesa o decorar una estantería.',
    images: ["linear-gradient(135deg, #C9A66B, #55606B)"],
  },
  'bandeja-personalizable': {
    dateAdded: '2026-09-06',
    name: 'Bandeja decorativa personalizable',
    type: 'BAN',
    family: 'bandeja',
    personalizable: true,
    price: '20,00 €',
    description: 'Bandeja decorativa lisa, lista para personalizar en el color que elijas (nombre, iniciales, motivo especial...).',
    images: ["linear-gradient(135deg, #EAEAE7, #9FBFB5)"],
  },

  /* ---- Bolsas tote (tipo TOT, familia 'bolsa-tote': solo tamaño) ---- */
  'bolsa-tote-pequena': {
    dateAdded: '2026-09-06',
    name: 'Bolsa tote pequeña',
    category: 'bolsas',
    type: 'TOT',
    family: 'bolsa-tote',
    variant: { size: 'P' },
    price: '13,00 €',
    description: 'Bolsa tote pequeña de tela pintada a mano, perfecta como bolso de diario o para regalar.',
    images: ["linear-gradient(135deg, #E4C878, #9FBFB5)"],
  },
  'bolsa-tote': {
    dateAdded: '2026-08-15',
    name: 'Bolsa tote mediana',
    category: 'bolsas',
    type: 'TOT',
    family: 'bolsa-tote',
    variant: { size: 'M' },
    price: '16,00 €',
    description: 'Bolsa tote de tela pintada a mano, resistente y perfecta para el día a día.',
    images: ["linear-gradient(135deg, #9FBFB5, #434B54)"],
  },
  'bolsa-tote-grande': {
    dateAdded: '2026-09-06',
    name: 'Bolsa tote grande',
    category: 'bolsas',
    type: 'TOT',
    family: 'bolsa-tote',
    variant: { size: 'G' },
    price: '19,00 €',
    description: 'Bolsa tote grande de tela pintada a mano, con capacidad de sobra para la compra o la playa.',
    images: ["linear-gradient(135deg, #434B54, #9FBFB5)"],
  },
  'bolsa-tote-personalizable': {
    dateAdded: '2026-09-06',
    name: 'Bolsa tote personalizable',
    type: 'TOT',
    family: 'bolsa-tote',
    personalizable: true,
    price: '13,00 €',
    description: 'Bolsa tote de tela lisa, lista para personalizar en el tamaño que elijas (nombre, iniciales, motivo especial...).',
    images: ["linear-gradient(135deg, #EAEAE7, #434B54)"],
  },

  /* ---- Posavasos de cristal (tipo POS, familia 'posavasos': solo color) —
     tipo nuevo, todavía sin ningún producto fotografiado. ---- */
  'posavasos-cristal-estampado': {
    dateAdded: '2026-09-06',
    name: 'Posavasos de cristal con estampado floral',
    category: 'servir',
    type: 'POS',
    family: 'posavasos',
    variant: { color: 'FLO1' },
    price: '9,00 €',
    description: 'Posavasos de cristal decorado a mano con estampado floral decoupage, protege la mesa con un toque de color.',
    images: ["linear-gradient(135deg, #C9738A, #9FBFB5)"],
  },
  'posavasos-cristal-blanco': {
    dateAdded: '2026-09-06',
    name: 'Posavasos de cristal blanco',
    category: 'servir',
    type: 'POS',
    family: 'posavasos',
    variant: { color: 'BLA' },
    price: '9,00 €',
    description: 'Posavasos de cristal pintado en blanco liso, un básico discreto para el día a día.',
    images: ["linear-gradient(135deg, #FFFFFF, #9FBFB5)"],
  },
  'posavasos-personalizable': {
    dateAdded: '2026-09-06',
    name: 'Posavasos de cristal personalizable',
    type: 'POS',
    family: 'posavasos',
    personalizable: true,
    price: '7,00 €',
    description: 'Posavasos de cristal liso, listo para personalizar en el color que elijas (nombre, iniciales, motivo especial...).',
    images: ["linear-gradient(135deg, #EAEAE7, #C9CDD2)"],
  },

  /* ---- Platitos pequeños (tipo PLA, familia 'platito': solo color) —
     tipo nuevo, todavía sin ningún producto fotografiado. ---- */
  'platito-pan-amarillo': {
    dateAdded: '2026-09-06',
    name: 'Platito pequeño amarillo suave',
    category: 'servir',
    type: 'PLA',
    family: 'platito',
    variant: { color: 'AMA' },
    price: '7,00 €',
    description: 'Platito pequeño pintado a mano en amarillo suave, perfecto para el pan o como platito de apoyo en la mesa.',
    images: ["linear-gradient(135deg, #E4C878, #FFFFFF)"],
  },
  'platito-pan-blanco': {
    dateAdded: '2026-09-06',
    name: 'Platito pequeño blanco',
    category: 'servir',
    type: 'PLA',
    family: 'platito',
    variant: { color: 'BLA' },
    price: '7,00 €',
    description: 'Platito pequeño pintado en blanco liso, un básico versátil para la mesa.',
    images: ["linear-gradient(135deg, #FFFFFF, #C9A66B)"],
  },
  'platito-personalizable': {
    dateAdded: '2026-09-06',
    name: 'Platito personalizable',
    type: 'PLA',
    family: 'platito',
    personalizable: true,
    price: '5,00 €',
    description: 'Platito pequeño liso, listo para personalizar en el color que elijas (nombre, iniciales, motivo especial...).',
    images: ["linear-gradient(135deg, #EAEAE7, #E4C878)"],
  },

  /* ---- Cuadro personalizado (tipo CUA, familia 'cuadro': solo existe como
     personalizable, no tiene "hermanos" ya hechos con stock). ---- */
  'cuadro-personalizado': {
    dateAdded: '2026-08-15',
    name: 'Cuadro con nombre personalizado',
    category: 'decorar',
    type: 'CUA',
    family: 'cuadro',
    personalizable: true,
    price: '26,00 €',
    description: 'Cuadro personalizado con el nombre que tú elijas, en el color de marco que prefieras — perfecto como regalo.',
    images: ["linear-gradient(135deg, #55606B, #9FBFB5)"],
  },
};

/* Ids de los N productos con dateAdded más reciente — usado por el filtro
   "Novedades" de la Tienda. Si dos productos comparten fecha (p.ej. todo el
   catálogo de ejemplo original, añadido de una vez), el desempate es el
   orden en que aparecen aquí arriba; no representa un orden real entre ellos. */
function getRecentProductIds(count) {
  return Object.keys(PRODUCTS_DATA)
    .sort((a, b) => new Date(PRODUCTS_DATA[b].dateAdded) - new Date(PRODUCTS_DATA[a].dateAdded))
    .slice(0, count);
}

/* Tipo de producto (código de 3 letras, bloque 2 del SKU real) → categoría
   de SKU (bloque 1): esta tabla es INDEPENDIENTE de `category` (que solo
   decide en qué filtro de la Tienda aparece el producto). Por qué hace
   falta: un producto personalizable podría en el futuro no tener
   `category` (sin filtro fijo de Tienda), pero su código real siempre debe
   llevar el mismo prefijo de categoría que el resto de su tipo (todas las
   TAB son SER, pase lo que pase con el filtro de la tienda). */
const TYPE_TO_SKU_CATEGORY = {
  TAB: 'SER',
  CAJ: 'DEC',
  BAN: 'SER',
  POS: 'SER',
  TOT: 'BOL',
  PLA: 'SER',
  CUA: 'DEC',
};

/* Familias de variantes: agrupan los productos "hechos" (con stock, no
   personalizables) que son el mismo objeto en distinto tamaño y/o
   color/estampado, y además son la fuente de opciones elegibles del
   producto personalizable de su mismo `type` (pedido de Juan 2026-09:
   "cada estampado y cada tamaño existente, según el tipo de producto,
   debe ser una opción elegible en los personalizables").
   - `axes`: qué ejes tiene esta familia ('size', 'color', o ambos).
   - `sizes` / `colors`: opciones de cada eje que tenga, en orden; `swatch`
     es el color de la muestra redonda del selector (inventado para los
     estampados, que no son un color plano).
   - `matrix`: qué producto real de PRODUCTS_DATA corresponde a cada
     combinación de opciones (clave = valores de `axes` en ese orden,
     unidos con "|"; con un solo eje, la clave es directamente ese
     código). Si una combinación no tiene producto real detrás todavía,
     no aparece como clave: el selector la deshabilita y muestra el aviso
     de "Agotado" (igual que antes).
   `cuadro` no lleva `matrix`: el cuadro personalizado no tiene ningún
   "hermano" ya hecho con stock, solo existe como personalizable — su eje
   de color se usa igual como opciones elegibles, pero nunca para navegar
   a un hermano real. */
const PRODUCT_FAMILIES = {
  tabla: {
    type: 'TAB',
    baseName: 'Tabla con estampado',
    axes: ['size', 'color'],
    sizes: [
      { code: '18', label: 'Pequeña (18 cm)' },
      { code: '25', label: 'Grande (25 cm)' },
    ],
    colors: [
      { code: 'FLO1', label: 'Estampado floral', swatch: '#C9738A' },
      { code: 'MAD', label: 'Madera natural', swatch: '#C9A66B' },
    ],
    matrix: {
      '18|FLO1': 'tabla-estampado',
      '25|FLO1': 'tabla-estampado-grande',
      '18|MAD': 'tabla-natural-18',
      '25|MAD': 'tabla-natural-25',
    },
  },
  'caja-panuelos': {
    type: 'CAJ',
    baseName: 'Caja de pañuelos',
    axes: ['color'],
    colors: [
      { code: 'FLO1', label: 'Estampado floral', swatch: '#C9738A' },
      { code: 'BLA', label: 'Blanco', swatch: '#FFFFFF' },
      { code: 'VER', label: 'Verde agua', swatch: '#9FBFB5' },
    ],
    matrix: {
      FLO1: 'caja-panuelos-estampado',
      BLA: 'caja-panuelos-blanca',
      VER: 'caja-panuelos-verde',
    },
  },
  bandeja: {
    type: 'BAN',
    baseName: 'Bandeja decorativa',
    axes: ['color'],
    colors: [
      { code: 'VER', label: 'Verde agua', swatch: '#9FBFB5' },
      { code: 'BLA', label: 'Blanco', swatch: '#FFFFFF' },
      { code: 'MAD', label: 'Madera natural', swatch: '#C9A66B' },
    ],
    matrix: {
      VER: 'bandeja-decorativa',
      BLA: 'bandeja-decorativa-blanca',
      MAD: 'bandeja-decorativa-madera',
    },
  },
  'bolsa-tote': {
    type: 'TOT',
    baseName: 'Bolsa tote',
    axes: ['size'],
    sizes: [
      { code: 'P', label: 'Pequeña' },
      { code: 'M', label: 'Mediana' },
      { code: 'G', label: 'Grande' },
    ],
    matrix: {
      P: 'bolsa-tote-pequena',
      M: 'bolsa-tote',
      G: 'bolsa-tote-grande',
    },
  },
  posavasos: {
    type: 'POS',
    baseName: 'Posavasos de cristal',
    axes: ['color'],
    colors: [
      { code: 'FLO1', label: 'Estampado floral', swatch: '#C9738A' },
      { code: 'BLA', label: 'Blanco', swatch: '#FFFFFF' },
    ],
    matrix: {
      FLO1: 'posavasos-cristal-estampado',
      BLA: 'posavasos-cristal-blanco',
    },
  },
  platito: {
    type: 'PLA',
    baseName: 'Platito pequeño',
    axes: ['color'],
    colors: [
      { code: 'AMA', label: 'Amarillo suave', swatch: '#E4C878' },
      { code: 'BLA', label: 'Blanco', swatch: '#FFFFFF' },
    ],
    matrix: {
      AMA: 'platito-pan-amarillo',
      BLA: 'platito-pan-blanco',
    },
  },
  cuadro: {
    type: 'CUA',
    baseName: 'Cuadro personalizado',
    axes: ['color'],
    colors: [
      { code: 'MAD', label: 'Marco madera natural', swatch: '#C9A66B' },
      { code: 'BLA', label: 'Marco blanco', swatch: '#FFFFFF' },
      { code: 'GRI', label: 'Marco gris pizarra', swatch: '#55606B' },
    ],
  },
};

// Construye la clave de `matrix` (o de comparación de variante) a partir de
// los ejes que tenga esa familia y los valores elegidos, siempre en el
// mismo orden en el que se declaró `axes`, para que nunca se desincronice
// con las claves escritas a mano arriba.
function familyKey(family, values) {
  return family.axes.map(axis => values[axis]).join('|');
}

/* ---------- Código de producto (SKU) y stock ----------
   Campo opcional en cada entrada de PRODUCTS_DATA:
   - `skus`: lista de códigos (uno por cada unidad física idéntica —mismo
     tipo+color/estampado+tamaño— que queda disponible AHORA MISMO), ordenada
     del número de unidad más bajo al más alto. No hay un `stock` aparte: el
     stock es sencillamente `skus.length`. El código de cada pieza incluye su
     propio nº de unidad (ver la página de referencia de códigos), así que dos
     unidades del mismo modelo NUNCA comparten código — por eso es una lista y
     no un único `sku`. Al vender/reservar una unidad concreta, se quita su
     código de la lista (a mano, editando PRODUCTS_DATA) para que dicho código
     no se vuelva a ofrecer.
   Si un producto NO tiene `skus` (no es un array), se trata como "no
   gestionado": se comporta igual que siempre (sin código visible, se puede
   añadir al carrito sin límite, nunca aparece agotado) — así el catálogo de
   ejemplo/placeholder actual sigue funcionando igual sin inventarle un stock
   real que no existe. En cuanto un producto tenga `skus` gestionado, una
   lista vacía (`skus: []`) lo marca agotado (tarjeta atenuada + sello
   "Agotado", ficha sin poder añadirlo al carrito) SIN quitarlo de la web —
   solo desaparece de verdad si se pide explícitamente quitando su tarjeta. */
function isStockManaged(product) {
  return !!product && Array.isArray(product.skus);
}
function getStockCount(product) {
  return isStockManaged(product) ? product.skus.length : Infinity;
}
function isOutOfStock(product) {
  return isStockManaged(product) && product.skus.length === 0;
}
// Códigos que corresponden a `qty` unidades de este producto: siempre los
// `qty` números más bajos de los que quedan disponibles (el mismo criterio
// con el que se irían vendiendo las piezas físicas en la vida real). Con un
// producto no gestionado devuelve una lista vacía (no hay códigos que
// mostrar).
function getSkusForQty(product, qty) {
  if (!isStockManaged(product)) return [];
  return product.skus.slice(0, Math.max(0, qty));
}

// Referencia(s) a mostrar/usar para un producto, sea cual sea su tipo:
// - Gestionado por stock (`skus`): las unidades más bajas disponibles para
//   la cantidad pedida (ver getSkusForQty).
// - Personalizable con código ya calculado (`liveRefCode`): el código
//   "PER-..." de esa combinación exacta elegida por el cliente — no vive
//   en PRODUCTS_DATA porque depende de la selección de cada pedido (ver
//   computePersonalizableCode en la ficha de producto, y el `refCode`
//   guardado en cada línea del carrito).
// - Ninguno de los dos: lista vacía (no hay nada que mostrar).
function getDisplayRefs(product, qty, liveRefCode) {
  if (!product) return [];
  if (liveRefCode) return [liveRefCode];
  if (isStockManaged(product)) return getSkusForQty(product, qty);
  return [];
}

// Traduce el color/estampado y el tamaño de un código de referencia a un
// texto legible (ver describeSkuCode, más abajo, que explica el formato).
const SKU_COLOR_LABELS = {
  LIS: 'Liso',
  MAD: 'Madera natural',
  BLA: 'Blanco',
  VER: 'Verde agua',
  AMA: 'Amarillo suave',
  GRI: 'Gris pizarra',
  OTR: 'Otro color',
  PER: 'A personalizar',
};
const SKU_PATTERN_FAMILY_LABELS = {
  FLO: 'Estampado floral',
};
function describeSkuCode(code, customColorLabel) {
  if (!code) return '';
  const parts = code.split('-');
  const isPersonalizable = parts[0] === 'PER';
  // Quita el prefijo ("PER" o la categoría) y, en los códigos reales, el
  // nº de unidad del final: lo que queda son solo los bloques de
  // color/tamaño de esta pieza en concreto (1 o 2 bloques, según los ejes
  // de su familia).
  const meaningful = isPersonalizable ? parts.slice(3) : parts.slice(2, 4);

  let colorCode = null;
  let sizeCode = null;
  meaningful.forEach(token => {
    if (!token) return;
    const looksLikeSize = /^\d+$/.test(token) || ['P', 'M', 'G', 'UNI'].includes(token);
    if (looksLikeSize && sizeCode === null) {
      sizeCode = token;
    } else if (colorCode === null) {
      colorCode = token;
    }
  });

  // Si viene una descripción propia del cliente (personalización a medida,
  // ver "Otro: descríbelo tú" en el selector de color), esa es siempre la
  // que se muestra en vez de traducir el código — el código en sí solo
  // lleva "PER" en el bloque de color, que no dice nada útil por sí solo.
  let colorLabel = customColorLabel || colorCode || '';
  if (!customColorLabel && colorCode) {
    if (SKU_COLOR_LABELS[colorCode]) {
      colorLabel = SKU_COLOR_LABELS[colorCode];
    } else {
      const familyMatch = colorCode.match(/^([A-Z]+)(\d+)$/);
      if (familyMatch && SKU_PATTERN_FAMILY_LABELS[familyMatch[1]]) {
        colorLabel = `${SKU_PATTERN_FAMILY_LABELS[familyMatch[1]]} ${familyMatch[2]}`;
      }
    }
  }

  let sizeLabel = sizeCode || '';
  if (sizeCode) {
    if (/^\d+$/.test(sizeCode)) {
      sizeLabel = `${sizeCode} cm`;
    } else if (sizeCode === 'UNI') {
      sizeLabel = 'Talla única';
    } else if (['P', 'M', 'G'].includes(sizeCode)) {
      sizeLabel = `Talla ${sizeCode}`;
    }
  }

  return [sizeLabel, colorLabel].filter(Boolean).join(' · ');
}

// Marca como "Agotado" (atenuada + sello centrado) cualquier tarjeta de
// producto de un contenedor dado cuyo stock gestionado esté a 0. Ninguna
// tarjeta lleva el stock en su HTML: SIEMPRE se consulta PRODUCTS_DATA (la
// única fuente real), así que esto se llama sobre document al cargar cada
// página, y también cada vez que se pintan tarjetas por JS (Favoritos,
// "También podría gustarte") para que queden igual de al día.
function applyStockUI(scope) {
  scope.querySelectorAll('.product-card[data-id]').forEach(card => {
    const data = PRODUCTS_DATA[card.dataset.id];
    if (!data) return;

    const image = card.querySelector('.product-card__image');
    const addBtn = card.querySelector('.product-card__add-cart');
    const overlay = card.querySelector('.product-card__stock-overlay');

    if (isOutOfStock(data)) {
      card.classList.add('is-out-of-stock');
      if (!overlay && image) {
        image.insertAdjacentHTML('beforeend', '<span class="product-card__stock-overlay"><span>Agotado</span></span>');
      }
      if (addBtn) addBtn.setAttribute('aria-disabled', 'true');
    } else {
      card.classList.remove('is-out-of-stock');
      if (overlay) overlay.remove();
      if (addBtn) addBtn.removeAttribute('aria-disabled');
    }
  });
}

// Pequeña sacudida visual para cuando se intenta añadir más unidades de las
// que quedan disponibles (tarjeta, ficha de producto o el "+" del carrito):
// sin modales ni textos nuevos, solo un "no" claro e inmediato.
function flashBlocked(el) {
  if (!el) return;
  el.classList.remove('is-blocked');
  void el.offsetWidth; // fuerza reflow para poder repetir la animación si se pulsa varias veces seguidas
  el.classList.add('is-blocked');
  setTimeout(() => el.classList.remove('is-blocked'), 550);
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil (hamburguesa) ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cierra el menú al pulsar un enlace (en móvil)
    navMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Carrusel (genérico, reutilizable) ----------
     Sirve tanto para la banda de inicio como para el carrusel de reseñas:
     recibe los selectores propios de cada uno y monta el mismo comportamiento
     (autoplay, flechas, puntos, pausa al pasar el ratón). */

  function initCarousel({ root, slideSelector, dotSelector, prevId, nextId, interval, pauseOnHover = true }) {
    const container = document.querySelector(root);
    if (!container) return;

    const slides = Array.from(container.querySelectorAll(slideSelector));
    const dots = Array.from(container.querySelectorAll(dotSelector));
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (slides.length === 0) return;

    let currentIndex = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
    let autoplayTimer = null;

    function goToSlide(index) {
      slides[currentIndex]?.classList.remove('is-active');
      dots[currentIndex]?.classList.remove('is-active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex]?.classList.add('is-active');
      dots[currentIndex]?.classList.add('is-active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, interval);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    // Flechas
    nextBtn?.addEventListener('click', () => {
      nextSlide();
      startAutoplay(); // reinicia el temporizador tras interacción manual
    });

    prevBtn?.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });

    // Puntos
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoplay();
      });
    });

    // Pausa al pasar el ratón por encima
    if (pauseOnHover) {
      container.addEventListener('mouseenter', stopAutoplay);
      container.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
  }

  // Banda de inicio: 3 imágenes, cambia cada 5s
  initCarousel({
    root: '.carousel',
    slideSelector: '.carousel__slide',
    dotSelector: '.carousel__dot',
    prevId: 'carouselPrev',
    nextId: 'carouselNext',
    interval: 5000,
  });

  // Reseñas de clientas: cambia cada 6.5s (algo más lento, para dar tiempo a leer)
  initCarousel({
    root: '.testimonials',
    slideSelector: '.testimonial',
    dotSelector: '.testimonials__dot',
    prevId: 'testimonialPrev',
    nextId: 'testimonialNext',
    interval: 6500,
  });

  /* ---------- Menú desplegable "Tienda" ----------
     Al pasar el ratón por "Tienda" baja un panel con las categorías y el
     resto de la página se oscurece. Con un pequeño retraso al cerrar para
     poder mover el cursor desde el enlace hasta el panel sin que se cierre. */
  const tiendaItem = document.getElementById('tiendaNavItem');
  const tiendaDropdown = document.getElementById('tiendaDropdown');
  const tiendaOverlay = document.getElementById('tiendaOverlay');

  if (tiendaItem && tiendaDropdown && tiendaOverlay) {
    let closeTimer = null;

    function openTiendaMenu() {
      clearTimeout(closeTimer);
      tiendaDropdown.classList.add('is-open');
      tiendaOverlay.classList.add('is-open');
    }

    function closeTiendaMenu() {
      tiendaDropdown.classList.remove('is-open');
      tiendaOverlay.classList.remove('is-open');
    }

    function scheduleCloseTiendaMenu() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeTiendaMenu, 200);
    }

    tiendaItem.addEventListener('mouseenter', openTiendaMenu);
    tiendaItem.addEventListener('mouseleave', scheduleCloseTiendaMenu);
    tiendaDropdown.addEventListener('mouseenter', openTiendaMenu);
    tiendaDropdown.addEventListener('mouseleave', scheduleCloseTiendaMenu);

    tiendaOverlay.addEventListener('click', () => {
      clearTimeout(closeTimer);
      closeTiendaMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        clearTimeout(closeTimer);
        closeTiendaMenu();
      }
    });
  }

  /* ---------- Filtros de la página "Tienda" ----------
     Filtra las tarjetas de producto por categoría y por texto de búsqueda
     a la vez (una tarjeta se muestra solo si cumple ambos criterios), sin
     recargar la página. Respeta la categoría (?cat=...) y la búsqueda
     (?q=...) indicadas en la URL al llegar desde el menú desplegable, el
     buscador de otra página, o al recargar. */
  const shopFilterBtns = Array.from(document.querySelectorAll('.shop-filters__btn'));
  const shopCards = Array.from(document.querySelectorAll('.shop__grid [data-category]'));
  const shopEmpty = document.getElementById('shopEmpty');

  function normalizeText(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // quita acentos para que "macrame" encuentre "macramé"
  }

  if (shopFilterBtns.length > 0) {
    let currentCat = 'todo';
    let currentQuery = '';

    function applyShopFilters() {
      let visibleCount = 0;
      const query = normalizeText(currentQuery.trim());
      const recentIds = currentCat === 'novedades' ? getRecentProductIds(6) : null;

      shopCards.forEach(card => {
        const matchesCat = currentCat === 'todo'
          ? true
          : currentCat === 'novedades'
            ? recentIds.includes(card.dataset.id)
            : currentCat === 'personalizable'
              ? card.dataset.personalizable === 'true'
              : card.dataset.category === currentCat;
        const haystack = normalizeText(`${card.dataset.name || ''} ${card.dataset.description || ''}`);
        const matchesQuery = query === '' || haystack.includes(query);
        const show = matchesCat && matchesQuery;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      shopFilterBtns.forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.filter === currentCat);
      });

      if (shopEmpty) shopEmpty.hidden = visibleCount > 0;
    }

    function setCat(cat) {
      currentCat = cat;
      applyShopFilters();

      const url = new URL(window.location.href);
      if (cat === 'todo') {
        url.searchParams.delete('cat');
      } else {
        url.searchParams.set('cat', cat);
      }
      window.history.replaceState({}, '', url);
    }

    function setQuery(query) {
      currentQuery = query;
      applyShopFilters();

      const url = new URL(window.location.href);
      if (query.trim() === '') {
        url.searchParams.delete('q');
      } else {
        url.searchParams.set('q', query);
      }
      window.history.replaceState({}, '', url);
    }

    const params = new URLSearchParams(window.location.search);
    const requestedCat = params.get('cat');
    currentCat = shopFilterBtns.some(btn => btn.dataset.filter === requestedCat) ? requestedCat : 'todo';
    currentQuery = params.get('q') || '';
    applyShopFilters();

    shopFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => setCat(btn.dataset.filter));
    });

    // El buscador de la nav bar (más abajo) llama a esto si estamos en la tienda.
    window.__csydShopSearch = setQuery;
  }

  /* ---------- Buscador de la nav bar ----------
     El icono de la lupa despliega una barra de búsqueda (misma navbar en
     las 6 páginas). Si estamos en la página Tienda, escribir además filtra
     los productos al momento (en combinación con la categoría activa, ver
     bloque anterior) para poder curiosear sin salir de ahí. Pero en
     cualquier página —incluida la Tienda— la lupa funciona como botón de
     "buscar": si hay texto escrito, pulsarla (o pulsar Intro) lleva a
     busqueda.html?q=..., la página con todos los resultados encontrados. */
  const navSearch = document.getElementById('navSearch');
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');

  if (navSearch && searchToggle && searchInput) {
    function openSearch() {
      navSearch.classList.add('is-open');
      searchInput.focus();
    }

    function closeSearch() {
      navSearch.classList.remove('is-open');
    }

    function goToSearchResults() {
      const query = searchInput.value.trim();
      if (query === '') return;
      window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
    }

    // Si venimos de otra página con ?q=..., o estamos en la tienda con una
    // búsqueda ya aplicada, se abre la barra rellena para que se vea qué se buscó.
    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) {
      searchInput.value = initialQuery;
      openSearch();
    }

    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navSearch.classList.contains('is-open')) {
        if (searchInput.value.trim() === '') {
          closeSearch();
        } else {
          goToSearchResults();
        }
      } else {
        openSearch();
      }
    });

    document.addEventListener('click', (e) => {
      if (!navSearch.contains(e.target)) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    searchInput.addEventListener('input', () => {
      if (typeof window.__csydShopSearch === 'function') {
        window.__csydShopSearch(searchInput.value);
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      goToSearchResults();
    });
  }

  /* ---------- Página "Resultados de búsqueda" ----------
     busqueda.html reutiliza las mismas 12 tarjetas de ejemplo que la
     Tienda, pero sin filtro de categoría: solo aplica el término de la URL
     (?q=...) contra el nombre y la descripción de cada producto, igual
     normalización (minúsculas, sin acentos) que el filtro de la tienda. */
  const searchGrid = document.getElementById('searchGrid');
  const searchResultsTitle = document.getElementById('searchResultsTitle');
  const searchResultsSubtitle = document.getElementById('searchResultsSubtitle');
  const searchEmpty = document.getElementById('searchEmpty');

  if (searchGrid) {
    const query = (new URLSearchParams(window.location.search).get('q') || '').trim();
    const normalizedQuery = normalizeText(query);
    const cards = Array.from(searchGrid.querySelectorAll('[data-category]'));
    let visibleCount = 0;

    cards.forEach(card => {
      const haystack = normalizeText(`${card.dataset.name || ''} ${card.dataset.description || ''}`);
      const show = normalizedQuery === '' || haystack.includes(normalizedQuery);
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (searchResultsSubtitle) {
      if (query !== '') {
        searchResultsSubtitle.textContent = `Mostrando resultados para “${query}”`;
        searchResultsSubtitle.hidden = false;
      } else {
        searchResultsSubtitle.hidden = true;
      }
    }

    if (searchResultsTitle && visibleCount === 0 && query !== '') {
      searchResultsTitle.textContent = 'Sin resultados';
    }

    if (searchEmpty) searchEmpty.hidden = visibleCount > 0;
  }

  /* ---------- Favoritos ----------
     Se guardan en localStorage del navegador (persisten entre páginas y
     visitas, cada persona ve solo los suyos). Cada tarjeta de producto que
     puede añadirse a favoritos lleva data-id/data-name/data-price/data-image
     en el <article class="product-card">; el botón del corazón usa esos
     datos para guardar lo necesario y poder pintar la tarjeta de nuevo en
     "Mis Favoritos" sin depender de en qué página se marcó. */
  const FAVORITES_KEY = 'csyd_favorites';

  function getFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(favorites) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      /* almacenamiento no disponible (modo privado, etc.) — no bloquea la interacción */
    }
  }

  function isFavorite(id) {
    return getFavorites().some(item => item.id === id);
  }

  function toggleFavorite(product) {
    const favorites = getFavorites();
    const index = favorites.findIndex(item => item.id === product.id);

    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(product);
    }

    saveFavorites(favorites);
    return index < 0; // true si se acaba de añadir, false si se acaba de quitar
  }

  function updateFavoritesBadge() {
    const count = String(getFavorites().length);
    document.querySelectorAll('#favoritesBadge').forEach(badge => {
      badge.textContent = count;
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[char]));
  }

  // Tarjetas "estáticas" del catálogo (home y tienda): marcan su estado
  // inicial según localStorage y alternan al pulsar el corazón.
  document.querySelectorAll('.product-card[data-id] > .product-card__image > .product-card__fav').forEach(favBtn => {
    const card = favBtn.closest('.product-card');
    const product = {
      id: card.dataset.id,
      name: card.dataset.name,
      price: card.dataset.price,
      image: card.dataset.image,
    };

    if (isFavorite(product.id)) {
      favBtn.classList.add('is-active');
      favBtn.setAttribute('aria-label', 'Quitar de favoritos');
    }

    favBtn.addEventListener('click', () => {
      const added = toggleFavorite(product);
      favBtn.classList.toggle('is-active', added);
      favBtn.setAttribute('aria-label', added ? 'Quitar de favoritos' : 'Añadir a favoritos');
      updateFavoritesBadge();
    });
  });

  updateFavoritesBadge();

  // Página "Mis Favoritos": pinta las tarjetas guardadas y permite
  // desmarcarlas igual que se marcan (al quitarlas, desaparecen de la lista).
  const favoritesGrid = document.getElementById('favoritesGrid');
  const favoritesEmpty = document.getElementById('favoritesEmpty');

  if (favoritesGrid) {
    function renderFavorites() {
      const favorites = getFavorites();

      favoritesGrid.innerHTML = favorites.map(product => `
        <article class="product-card" data-id="${escapeHtml(product.id)}" data-name="${escapeHtml(product.name)}" data-price="${escapeHtml(product.price)}" data-image="${escapeHtml(product.image)}">
          <div class="product-card__image" style="background-image: ${escapeHtml(product.image)};">
            <button class="product-card__fav is-active" aria-label="Quitar de favoritos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>
            </button>
            <span class="product-card__tag">Sustituir por foto real</span>
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
            <div class="product-card__footer">
              <p class="product-card__price">${escapeHtml(product.price)}</p>
              <button class="product-card__add-cart" type="button" aria-label="Añadir al carrito">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="17" cy="21" r="1"></circle><path d="M1 3h2l2.2 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L18.5 8H6"></path><line x1="19" y1="1" x2="19" y2="7"></line><line x1="16" y1="4" x2="22" y2="4"></line></svg>
              </button>
            </div>
          </div>
        </article>
      `).join('');

      if (favoritesEmpty) favoritesEmpty.hidden = favorites.length > 0;

      wireAddToCartButtons(favoritesGrid);
      wireProductCardLinks(favoritesGrid);
      applyStockUI(favoritesGrid);

      favoritesGrid.querySelectorAll('.product-card__fav').forEach(favBtn => {
        favBtn.addEventListener('click', () => {
          const card = favBtn.closest('.product-card');
          toggleFavorite({
            id: card.dataset.id,
            name: card.dataset.name,
            price: card.dataset.price,
            image: card.dataset.image,
          });
          renderFavorites(); // se ha desmarcado: se vuelve a pintar sin esa tarjeta
          updateFavoritesBadge();
        });
      });
    }

    renderFavorites();
  }

  /* ---------- Carrito ----------
     Igual que Favoritos, se guarda en localStorage del navegador. Cada
     producto añadido guarda id/name/price/image y una cantidad (qty) que
     aumenta si se vuelve a añadir el mismo producto desde una tarjeta. */
  const CART_KEY = 'csyd_cart';

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      /* almacenamiento no disponible (modo privado, etc.) — no bloquea la interacción */
    }
  }

  // Devuelve { ok: true } si se pudo añadir, o { ok: false, available } si
  // ya hay en el carrito tantas unidades de este producto como stock
  // gestionado queda (nunca bloquea productos sin stock gestionado).
  // `product.refCode`, cuando lo lleva (personalizables: el código
  // "PER-..." ya calculado con las opciones elegidas), forma parte de la
  // clave de "es la misma línea del carrito": dos pedidos personalizados
  // con distinto color/tamaño elegido son piezas distintas y NUNCA deben
  // sumarse en una sola línea, aunque compartan `id` de producto.
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id && item.refCode === product.refCode && (item.customNote || '') === (product.customNote || ''));
    const currentQty = existing ? existing.qty : 0;
    const data = PRODUCTS_DATA[product.id];

    if (isStockManaged(data) && currentQty + 1 > getStockCount(data)) {
      return { ok: false, available: getStockCount(data) };
    }

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
    updateCartBadge();
    return { ok: true };
  }

  function updateCartBadge() {
    const count = String(getCart().reduce((sum, item) => sum + item.qty, 0));
    document.querySelectorAll('#cartBadge').forEach(badge => {
      badge.textContent = count;
    });
  }

  // Convierte un precio en texto (p.ej. "24,00 €") en el número 24 para
  // poder sumar totales; formatPrice hace el camino contrario.
  function parsePrice(price) {
    const clean = String(price).replace(/[^\d,.-]/g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  }

  function formatPrice(value) {
    return `${value.toFixed(2).replace('.', ',')} €`;
  }

  // Botones "Añadir al carrito": tanto los de las tarjetas estáticas del
  // catálogo como los de tarjetas pintadas dinámicamente (Favoritos) usan
  // esta misma función para engancharse.
  // Las tarjetas de productos personalizables no pueden añadirse al
  // carrito directamente desde aquí (hace falta elegir color/tamaño
  // antes) — en su lugar, el botón lleva a la ficha del producto, donde
  // sí están los selectores (pedido de Juan 2026-09: no se puede añadir
  // al carrito hasta elegir todas las opciones).
  function wireAddToCartButtons(scope) {
    scope.querySelectorAll('.product-card[data-id] .product-card__add-cart').forEach(addBtn => {
      const card = addBtn.closest('.product-card');

      if (card.dataset.personalizable === 'true') {
        addBtn.setAttribute('aria-label', 'Elegir opciones y personalizar');
        addBtn.addEventListener('click', () => {
          window.location.href = `producto.html?id=${encodeURIComponent(card.dataset.id)}`;
        });
        return;
      }

      addBtn.addEventListener('click', () => {
        const result = addToCart({
          id: card.dataset.id,
          name: card.dataset.name,
          price: card.dataset.price,
          image: card.dataset.image,
        });

        if (!result.ok) {
          flashBlocked(addBtn);
          return;
        }

        const originalIcon = addBtn.innerHTML;
        addBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        addBtn.classList.add('is-added');
        setTimeout(() => {
          addBtn.innerHTML = originalIcon;
          addBtn.classList.remove('is-added');
        }, 1200);
      });
    });
  }

  // Las tarjetas de producto (imagen o nombre) llevan a su ficha individual
  // en producto.html?id=... — el corazón y el botón de añadir al carrito,
  // al estar dentro de la tarjeta, no deben disparar la navegación.
  function wireProductCardLinks(scope) {
    scope.querySelectorAll('.product-card[data-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.product-card__fav, .product-card__add-cart')) return;
        window.location.href = `producto.html?id=${encodeURIComponent(card.dataset.id)}`;
      });
    });
  }

  wireAddToCartButtons(document);
  wireProductCardLinks(document);
  applyStockUI(document);
  updateCartBadge();

  // Página "Carrito": pinta los productos guardados con su cantidad,
  // permite cambiarla o quitar productos, y calcula el total.
  const cartList = document.getElementById('cartList');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartSummary = document.getElementById('cartSummary');
  const cartTotal = document.getElementById('cartTotal');

  if (cartList) {
    function renderCart() {
      const cart = getCart();

      cartList.innerHTML = cart.map(item => {
        const data = PRODUCTS_DATA[item.id];
        const itemRefs = getDisplayRefs(data, item.qty, item.refCode);
        const refLabel = itemRefs.length > 1 ? 'Refs' : 'Ref';
        // Con referencia asignada, la tarjeta pasa a 3 líneas: nombre,
        // tamaño/color (derivados del propio código, para que nunca puedan
        // quedar desincronizados) y la referencia — sustituyendo POR
        // COMPLETO al precio unitario, que ya se ve a la derecha en
        // .cart-item__subtotal. Sin referencia asignada, se deja tal cual
        // estaba: solo el precio unitario debajo del nombre.
        const meta = itemRefs.length ? describeSkuCode(itemRefs[0], item.customNote) : '';
        const metaLine = meta ? `<p class="cart-item__meta">${escapeHtml(meta)}</p>` : '';
        const refLine = itemRefs.length ? `<p class="cart-item__sku">${refLabel}: ${escapeHtml(itemRefs.join(', '))}</p>` : '';
        const price = itemRefs.length ? '' : `<p class="cart-item__price">${escapeHtml(item.price)}</p>`;
        const atLimit = isStockManaged(data) && item.qty >= getStockCount(data);
        return `
        <article class="cart-item" data-id="${escapeHtml(item.id)}">
          <div class="cart-item__image" style="background-image: ${escapeHtml(item.image)};"></div>
          <div class="cart-item__body">
            <h3 class="cart-item__name">${escapeHtml(item.name)}</h3>
            ${price}
            ${metaLine}
            ${refLine}
          </div>
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" data-action="decrease" aria-label="Quitar una unidad">−</button>
            <span class="cart-item__qty-value">${item.qty}</span>
            <button class="cart-item__qty-btn" data-action="increase" aria-label="Añadir una unidad"${atLimit ? ' disabled title="Es el máximo disponible en stock ahora mismo"' : ''}>+</button>
          </div>
          <p class="cart-item__subtotal">${formatPrice(parsePrice(item.price) * item.qty)}</p>
          <button class="cart-item__remove" aria-label="Quitar del carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </article>
      `;
      }).join('');

      const isEmpty = cart.length === 0;
      if (cartEmpty) cartEmpty.hidden = !isEmpty;
      if (cartSummary) cartSummary.hidden = isEmpty;

      if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
        cartTotal.textContent = formatPrice(total);
      }

      cartList.querySelectorAll('.cart-item__qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.closest('.cart-item').dataset.id;
          const cart = getCart();
          const item = cart.find(p => p.id === id);
          if (!item) return;

          if (btn.dataset.action === 'increase') {
            const data = PRODUCTS_DATA[id];
            if (isStockManaged(data) && item.qty + 1 > getStockCount(data)) {
              flashBlocked(btn);
              return;
            }
            item.qty += 1;
          } else {
            item.qty -= 1;
          }

          const updated = item.qty > 0 ? cart : cart.filter(p => p.id !== id);
          saveCart(updated);
          renderCart();
          updateCartBadge();
        });
      });

      cartList.querySelectorAll('.cart-item__remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.closest('.cart-item').dataset.id;
          saveCart(getCart().filter(p => p.id !== id));
          renderCart();
          updateCartBadge();
        });
      });
    }

    renderCart();
  }

  // Modal de pago: se abre al pulsar "Pagar" y se cierra con la X o
  // tocando fuera de ella, igual que la modal de la galería.
  const checkoutModal = document.getElementById('checkoutModal');
  const payButton = document.getElementById('payButton');

  if (checkoutModal && payButton) {
    const checkoutClose = document.getElementById('checkoutModalClose');
    const checkoutForm = document.getElementById('checkoutForm');

    function openCheckoutModal() {
      checkoutModal.classList.add('is-open');
      document.body.classList.add('no-scroll');
      checkoutClose.focus();
    }

    function closeCheckoutModal() {
      checkoutModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }

    payButton.addEventListener('click', openCheckoutModal);
    checkoutClose.addEventListener('click', closeCheckoutModal);

    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!checkoutModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeCheckoutModal();
    });

    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const cart = getCart();
        const lines = cart.map(item => {
          const data = PRODUCTS_DATA[item.id];
          const itemRefs = getDisplayRefs(data, item.qty, item.refCode);
          const refLabel = itemRefs.length > 1 ? 'Refs' : 'Ref';
          const skuPart = itemRefs.length ? ` — ${refLabel}: ${itemRefs.join(', ')}` : '';
          const notePart = item.customNote ? ` — Personalización solicitada: "${item.customNote}"` : '';
          return `- ${item.name}${skuPart}${notePart} (x${item.qty}) — ${formatPrice(parsePrice(item.price) * item.qty)}`;
        });
        const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);

        const subject = encodeURIComponent('Solicitud de pedido — Claire & Sofi Decor');
        const body = encodeURIComponent(`¡Hola! Estoy interesado/a en estos productos de vuestro carrito:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}\n\nEspero vuestra respuesta con el número al que pueda hacer el Bizum. ¡Gracias!`);

        window.location.href = `mailto:claireysofi.decor@gmail.com?subject=${subject}&body=${body}`;
      });
    }
  }

  /* ---------- Página "Galería" ----------
     Cada tarjeta guarda su nombre y su(s) foto(s) en data-name/data-images
     (una lista en JSON, aunque solo haya una imagen). Al hacer clic se abre
     una modal que oscurece el fondo; si el producto tiene varias imágenes,
     aparecen flechas para navegar entre ellas. */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const galleryModal = document.getElementById('galleryModal');

  if (galleryItems.length > 0 && galleryModal) {
    const modalImage = document.getElementById('galleryModalImage');
    const modalName = document.getElementById('galleryModalName');
    const modalPrev = document.getElementById('galleryModalPrev');
    const modalNext = document.getElementById('galleryModalNext');
    const modalClose = document.getElementById('galleryModalClose');

    let currentImages = [];
    let currentIndex = 0;
    let lastFocusedItem = null;

    function showGalleryImage(index) {
      currentIndex = (index + currentImages.length) % currentImages.length;
      modalImage.style.backgroundImage = currentImages[currentIndex];

      const hasMultiple = currentImages.length > 1;
      modalPrev.classList.toggle('is-hidden', !hasMultiple);
      modalNext.classList.toggle('is-hidden', !hasMultiple);
    }

    function openGalleryModal(item) {
      let images = [];
      try {
        images = JSON.parse(item.dataset.images || '[]');
      } catch (e) {
        images = [];
      }
      if (images.length === 0) return;

      currentImages = images;
      modalName.textContent = item.dataset.name || '';
      lastFocusedItem = item;
      showGalleryImage(0);

      galleryModal.classList.add('is-open');
      document.body.classList.add('no-scroll');
      modalClose.focus();
    }

    function closeGalleryModal() {
      galleryModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      lastFocusedItem?.focus();
    }

    galleryItems.forEach(item => {
      item.addEventListener('click', () => openGalleryModal(item));
    });

    modalClose.addEventListener('click', closeGalleryModal);
    modalPrev.addEventListener('click', () => showGalleryImage(currentIndex - 1));
    modalNext.addEventListener('click', () => showGalleryImage(currentIndex + 1));

    // Clic fuera de la imagen (sobre el fondo oscurecido) cierra la modal.
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) closeGalleryModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!galleryModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeGalleryModal();
      if (e.key === 'ArrowLeft') showGalleryImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showGalleryImage(currentIndex + 1);
    });
  }

  /* ---------- Página "Producto" ----------
     Página única y reutilizable (producto.html?id=...): el contenido se
     rellena según el id de la URL, buscando los datos en PRODUCTS_DATA
     (arriba del todo del archivo). Así no hace falta crear una página HTML
     por cada producto — a esta ficha se llega haciendo clic en cualquier
     tarjeta de producto de cualquier página (ver wireProductCardLinks). */
  const productDetail = document.getElementById('productDetail');

  if (productDetail) {
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = productId ? PRODUCTS_DATA[productId] : undefined;

    const productDetailGrid = document.getElementById('productDetailGrid');
    const productNotFound = document.getElementById('productNotFound');
    const productRelatedSection = document.getElementById('productRelated');

    if (!product) {
      // ?id= ausente o que no existe en el catálogo: se muestra un aviso
      // en vez de la ficha, con un enlace de vuelta a la tienda.
      if (productDetailGrid) productDetailGrid.hidden = true;
      if (productNotFound) productNotFound.hidden = false;
      if (productRelatedSection) productRelatedSection.classList.add('is-hidden');
    } else {
      document.title = `${product.name} | Claire & Sofi Decor`;

      document.getElementById('productName').textContent = product.name;
      document.getElementById('productPrice').textContent = product.price;
      document.getElementById('productDescription').textContent = product.description;

      // -- Código de producto (SKU): discreto, bajo la descripción. Con
      // stock gestionado muestra el código de la unidad más baja
      // disponible; en personalizables, el código dinámico "PER-..." solo
      // aparece una vez elegidas todas las opciones (ver updateSkuDisplay,
      // junto a los selectores de tamaño/color, más abajo). --
      const productSku = document.getElementById('productSku');

      // -- Galería de imágenes: una imagen grande + el resto de fotos en
      // miniatura debajo (en vez de flechas encima, para no ocupar espacio
      // sobre el propio producto); se ocultan solas si solo hay una foto. --
      const productImage = document.getElementById('productImage');
      const productImageThumbs = document.getElementById('productImageThumbs');
      const images = product.images && product.images.length > 0
        ? product.images
        : ['linear-gradient(135deg, #EAEAE7, #C9CDD2)'];

      let currentImageIndex = 0;

      function renderProductThumbs() {
        productImageThumbs.innerHTML = images.map((img, i) => `<button type="button" class="product-detail__thumb${i === currentImageIndex ? ' is-active' : ''}" style="background-image: ${img};" aria-label="Ver imagen ${i + 1}"></button>`).join('');
        productImageThumbs.querySelectorAll('.product-detail__thumb').forEach((thumb, i) => {
          thumb.addEventListener('click', () => showProductImage(i));
        });
      }

      function showProductImage(index) {
        currentImageIndex = (index + images.length) % images.length;
        const bg = images[currentImageIndex];
        productImage.style.backgroundImage = bg;
        if (productImageModalImage) productImageModalImage.style.backgroundImage = bg;
        renderProductThumbs();
      }

      const hasMultipleImages = images.length > 1;
      productImageThumbs.classList.toggle('is-hidden', !hasMultipleImages);

      // -- Modal para ampliar la imagen (mismo patrón que la modal de la
      // Galería, reutilizando sus clases): clic en la imagen principal la
      // abre a pantalla completa; sus flechas (ocultas si solo hay una
      // imagen) y las miniaturas de debajo navegan el mismo índice, así
      // que la imagen de fondo y la ampliada quedan siempre sincronizadas. --
      const productImageModal = document.getElementById('productImageModal');
      const productImageModalImage = document.getElementById('productImageModalImage');
      const productImageModalClose = document.getElementById('productImageModalClose');
      const productImageModalPrev = document.getElementById('productImageModalPrev');
      const productImageModalNext = document.getElementById('productImageModalNext');

      if (productImageModal) {
        function openProductImageModal() {
          productImageModalImage.style.backgroundImage = images[currentImageIndex];
          productImageModalPrev.classList.toggle('is-hidden', !hasMultipleImages);
          productImageModalNext.classList.toggle('is-hidden', !hasMultipleImages);
          productImageModal.classList.add('is-open');
          document.body.classList.add('no-scroll');
          productImageModalClose.focus();
        }

        function closeProductImageModal() {
          productImageModal.classList.remove('is-open');
          document.body.classList.remove('no-scroll');
        }

        productImage.addEventListener('click', openProductImageModal);

        productImageModalClose.addEventListener('click', closeProductImageModal);
        productImageModalPrev.addEventListener('click', () => showProductImage(currentImageIndex - 1));
        productImageModalNext.addEventListener('click', () => showProductImage(currentImageIndex + 1));

        productImageModal.addEventListener('click', (e) => {
          if (e.target === productImageModal) closeProductImageModal();
        });

        document.addEventListener('keydown', (e) => {
          if (!productImageModal.classList.contains('is-open')) return;
          if (e.key === 'Escape') closeProductImageModal();
          if (e.key === 'ArrowLeft') showProductImage(currentImageIndex - 1);
          if (e.key === 'ArrowRight') showProductImage(currentImageIndex + 1);
        });
      }

      showProductImage(0);

      // -- Selectores de tamaño y color/estampado --------------------
      // Dos casos con la misma interfaz (una fila de "pastillas" por eje,
      // una para tamaño y otra para color/estampado, cada una solo visible
      // si la familia del producto tiene ese eje):
      //  - Producto YA HECHO (no personalizable): cada pastilla es un
      //    "hermano" real ya fotografiado (clic → va a su ficha) o, si esa
      //    combinación no existe todavía como producto real, una pastilla
      //    deshabilitada que abre el aviso de "Agotado".
      //  - Producto PERSONALIZABLE: cada pastilla es una opción a ELEGIR
      //    (no hay "hermano" al que navegar, es el mismo producto bajo
      //    pedido) — hasta que se elijan TODOS los ejes de su familia no
      //    se puede añadir al carrito ni hay código de referencia que
      //    mostrar (pedido de Juan, 2026-09).
      const productColorsBlock = document.getElementById('productColorsBlock');
      const productColors = document.getElementById('productColors');
      const productVariantsBlock = document.getElementById('productVariantsBlock');
      const productVariants = document.getElementById('productVariants');
      // Caja de texto para pedir un color/estampado a medida (pedido de
      // Juan 2026-09): solo se muestra cuando el cliente elige la pastilla
      // "Otro" del selector de color, en productos personalizables.
      const productCustomColor = document.getElementById('productCustomColor');
      const productCustomColorInput = document.getElementById('productCustomColorInput');

      function updateCustomColorUI() {
        if (!productCustomColor) return;
        const isCustom = selection.color === 'CUSTOM';
        productCustomColor.classList.toggle('is-hidden', !isCustom);
        if (isCustom && productCustomColorInput) productCustomColorInput.focus();
      }

      if (productCustomColorInput) {
        productCustomColorInput.addEventListener('input', () => {
          selection.customColorText = productCustomColorInput.value;
          updateSkuDisplay();
          updateAddToCartGating();
        });
      }

      const family = product.family ? PRODUCT_FAMILIES[product.family] : null;
      const selection = {}; // solo se rellena en personalizables

      function isSelectionComplete() {
        if (!product.personalizable) return true;
        if (!family) return true;
        return family.axes.every(axis => {
          if (axis === 'color' && selection.color === 'CUSTOM') {
            return !!(selection.customColorText && selection.customColorText.trim());
          }
          return !!selection[axis];
        });
      }

      // Código "PER-..." de un personalizable: PER + categoría de SKU de
      // su tipo (siempre la misma, venga o no de un `category` de
      // visualización) + tipo + color elegido [+ tamaño elegido, si su
      // familia tiene ese eje] — sin nº de unidad, porque hasta que se
      // fabrique la pieza no hay unidad física que numerar. Se sustituye a
      // mano por el código real definitivo en cuanto se fabrica el pedido.
      function computePersonalizableCode() {
        if (!family) return null;
        const skuCategory = TYPE_TO_SKU_CATEGORY[family.type] || '???';
        const parts = ['PER', skuCategory, family.type];
        if (family.axes.includes('color')) {
          parts.push(selection.color === 'CUSTOM' ? 'PER' : (selection.color || ''));
        }
        if (family.axes.includes('size')) parts.push(selection.size || '');
        return parts.join('-');
      }

      function updateSkuDisplay() {
        if (!productSku) return;
        const liveRefCode = product.personalizable && isSelectionComplete() ? computePersonalizableCode() : null;
        const nextSku = getDisplayRefs(product, 1, liveRefCode)[0] || null;
        if (nextSku) {
          productSku.textContent = `Ref: ${nextSku}`;
          productSku.hidden = false;
        } else {
          productSku.hidden = true;
        }
      }

      function renderAxis(axisName, blockEl, containerEl) {
        if (!family || !family.axes.includes(axisName)) {
          blockEl.classList.add('is-hidden');
          return;
        }
        const options = axisName === 'size' ? family.sizes : family.colors;
        const isColorAxis = axisName === 'color';
        const btnClass = isColorAxis ? 'product-detail__color' : 'product-detail__variant';
        // Solo el eje de color, y solo en personalizables, admite pedir
        // "algo distinto" que no esté en la lista (pedido de Juan 2026-09):
        // una pastilla extra al final que abre una caja de texto libre en
        // vez de fijar un color/estampado del catálogo.
        const showCustomOption = product.personalizable && isColorAxis;

        const optionsHtml = options.map(option => {
          const swatchAttr = isColorAxis ? ` style="background-color: ${option.swatch};"` : '';
          const labelText = isColorAxis ? '' : escapeHtml(option.label);

          if (product.personalizable) {
            const isActive = selection[axisName] === option.code;
            return `<button type="button" class="${btnClass}${isActive ? ' is-active' : ''}"${swatchAttr} data-code="${escapeHtml(option.code)}" aria-label="${escapeHtml(option.label)}" title="${escapeHtml(option.label)}">${labelText}</button>`;
          }

          const key = familyKey(family, { ...product.variant, [axisName]: option.code });
          const targetId = (family.matrix && family.matrix[key]) || null;
          const isActive = option.code === product.variant[axisName];
          const isAvailable = !!targetId;
          return `<button type="button" class="${btnClass}${isActive ? ' is-active' : ''}${isAvailable ? '' : ' is-disabled'}"${swatchAttr} data-target-id="${targetId ? escapeHtml(targetId) : ''}" aria-label="${escapeHtml(option.label)}" title="${escapeHtml(option.label)}">${labelText}</button>`;
        }).join('');

        const customHtml = showCustomOption
          ? `<button type="button" class="${btnClass} ${btnClass}--custom${selection.color === 'CUSTOM' ? ' is-active' : ''}" data-code="CUSTOM" aria-label="Otro: descríbelo tú" title="Otro: descríbelo tú">+</button>`
          : '';

        containerEl.innerHTML = optionsHtml + customHtml;

        blockEl.classList.remove('is-hidden');

        containerEl.querySelectorAll(`.${btnClass}`).forEach(btn => {
          btn.addEventListener('click', () => {
            if (product.personalizable) {
              selection[axisName] = btn.dataset.code;
              renderAxis(axisName, blockEl, containerEl);
              updateSkuDisplay();
              updateAddToCartGating();
              if (isColorAxis) updateCustomColorUI();
              return;
            }
            const targetId = btn.dataset.targetId;
            if (targetId) {
              if (targetId !== productId) window.location.href = `producto.html?id=${encodeURIComponent(targetId)}`;
            } else {
              openStockModal(family.baseName || product.name);
            }
          });
        });
      }

      renderAxis('size', productVariantsBlock, productVariants);
      renderAxis('color', productColorsBlock, productColors);
      updateCustomColorUI();
      updateSkuDisplay();

      // -- Aviso de "Agotado" (variante de tamaño/color sin producto real
      // detrás todavía): una modal pequeña con la X para cerrar, igual que
      // el resto de modales de la web. --
      const stockModal = document.getElementById('stockModal');
      const stockModalText = document.getElementById('stockModalText');
      const stockModalClose = document.getElementById('stockModalClose');

      function openStockModal(baseName) {
        stockModalText.innerHTML = `Agotado. Este producto no está disponible. Encuentra tu ${escapeHtml(baseName)} perfecto en <a href="tienda.html?cat=personalizable">Personalizables</a>`;
        stockModal.classList.add('is-open');
        document.body.classList.add('no-scroll');
      }

      function closeStockModal() {
        stockModal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }

      if (stockModal) {
        stockModalClose.addEventListener('click', closeStockModal);
        stockModal.addEventListener('click', (e) => {
          if (e.target === stockModal) closeStockModal();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && stockModal.classList.contains('is-open')) closeStockModal();
        });
      }

      // -- Favorito --
      const productFav = document.getElementById('productFav');
      const favProduct = { id: productId, name: product.name, price: product.price, image: images[0] };

      if (isFavorite(productId)) {
        productFav.classList.add('is-active');
        productFav.setAttribute('aria-label', 'Quitar de favoritos');
      }

      productFav.addEventListener('click', () => {
        const added = toggleFavorite(favProduct);
        productFav.classList.toggle('is-active', added);
        productFav.setAttribute('aria-label', added ? 'Quitar de favoritos' : 'Añadir a favoritos');
        updateFavoritesBadge();
      });

      // -- Añadir al carrito ------------------------------------------
      // No personalizable: igual que siempre (botón "Agotado" fijo si no
      // queda stock). Personalizable: el botón empieza deshabilitado con
      // el texto "Elige todas las opciones" y solo se activa cuando
      // `selection` cubre todos los ejes de su familia (pedido de Juan,
      // 2026-09); el código "PER-..." final se calcula en el momento de
      // pulsarlo, con la selección ya completa, y viaja con la línea del
      // carrito (`refCode`) para que cada combinación pedida sea su
      // propia línea (ver addToCart).
      const productAddCart = document.getElementById('productAddCart');
      const addCartDefaultText = productAddCart.textContent;

      function updateAddToCartGating() {
        if (!product.personalizable) return;
        const complete = isSelectionComplete();
        productAddCart.disabled = !complete;
        productAddCart.textContent = complete ? addCartDefaultText : 'Elige todas las opciones';
      }

      if (isOutOfStock(product)) {
        productAddCart.textContent = 'Agotado';
        productAddCart.disabled = true;
        productAddCart.classList.add('is-out-of-stock');
      } else {
        updateAddToCartGating();

        productAddCart.addEventListener('click', () => {
          if (product.personalizable && !isSelectionComplete()) {
            flashBlocked(productAddCart);
            return;
          }

          const liveRefCode = product.personalizable ? computePersonalizableCode() : undefined;
          const customNote = (product.personalizable && selection.color === 'CUSTOM' && selection.customColorText)
            ? selection.customColorText.trim()
            : undefined;
          const result = addToCart({ id: productId, name: product.name, price: product.price, image: images[0], refCode: liveRefCode, customNote });

          if (!result.ok) {
            flashBlocked(productAddCart);
            return;
          }

          const originalText = productAddCart.textContent;
          productAddCart.textContent = 'Añadido ✓';
          productAddCart.classList.add('is-added');
          setTimeout(() => {
            productAddCart.textContent = product.personalizable ? addCartDefaultText : originalText;
            productAddCart.classList.remove('is-added');
          }, 1200);
        });
      }

      // -- "También podría gustarte": hasta 4 productos de la misma
      // categoría; si no hay suficientes, se completa con otras
      // categorías, pero nunca repitiendo el producto actual. --
      const relatedGrid = document.getElementById('productRelatedGrid');
      const allOtherIds = Object.keys(PRODUCTS_DATA).filter(id => id !== productId);
      const sameCategoryIds = allOtherIds.filter(id => PRODUCTS_DATA[id].category === product.category);
      const otherCategoryIds = allOtherIds.filter(id => PRODUCTS_DATA[id].category !== product.category);
      const relatedIds = sameCategoryIds.concat(otherCategoryIds).slice(0, 4);

      if (relatedGrid) {
        relatedGrid.innerHTML = relatedIds.map(id => {
          const relatedProduct = PRODUCTS_DATA[id];
          const image = relatedProduct.images[0];
          const isPlaceholder = image.startsWith('linear-gradient');
          const favActive = isFavorite(id);

          return `
            <article class="product-card" data-category="${escapeHtml(relatedProduct.category)}" data-id="${escapeHtml(id)}" data-description="${escapeHtml(relatedProduct.description)}" data-name="${escapeHtml(relatedProduct.name)}" data-price="${escapeHtml(relatedProduct.price)}" data-image="${escapeHtml(image)}">
              <div class="product-card__image" style="background-image: ${escapeHtml(image)};">
                <button class="product-card__fav${favActive ? ' is-active' : ''}" aria-label="${favActive ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>
                </button>
                ${isPlaceholder ? '<span class="product-card__tag">Sustituir por foto real</span>' : ''}
              </div>
              <div class="product-card__body">
                <h3 class="product-card__name">${escapeHtml(relatedProduct.name)}</h3>
                <div class="product-card__footer">
                  <p class="product-card__price">${escapeHtml(relatedProduct.price)}</p>
                  <button class="product-card__add-cart" type="button" aria-label="Añadir al carrito">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="17" cy="21" r="1"></circle><path d="M1 3h2l2.2 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L18.5 8H6"></path><line x1="19" y1="1" x2="19" y2="7"></line><line x1="16" y1="4" x2="22" y2="4"></line></svg>
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('');

        wireAddToCartButtons(relatedGrid);
        wireProductCardLinks(relatedGrid);
        applyStockUI(relatedGrid);

        relatedGrid.querySelectorAll('.product-card__fav').forEach(favBtn => {
          favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = favBtn.closest('.product-card');
            const added = toggleFavorite({
              id: card.dataset.id,
              name: card.dataset.name,
              price: card.dataset.price,
              image: card.dataset.image,
            });
            favBtn.classList.toggle('is-active', added);
            favBtn.setAttribute('aria-label', added ? 'Quitar de favoritos' : 'Añadir a favoritos');
            updateFavoritesBadge();
          });
        });
      }
    }
  }

  /* ---------- Formulario de contacto ----------
     La web no tiene servidor propio (ni backend, ni build system), así que
     de momento el formulario abre el programa de correo de quien lo rellena
     con el mensaje ya redactado, en vez de enviarlo directamente desde
     la página. Es un primer paso funcional sencillo; si más adelante se
     quiere que se envíe sin salir de la web, hará falta un servicio externo
     de formularios o un backend propio. */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const subject = encodeURIComponent(`Mensaje de ${name || 'la web'} — Claire & Sofi Decor`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

      window.location.href = `mailto:claireysofi.decor@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
