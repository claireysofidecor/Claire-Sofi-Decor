/* =========================================================
   Hecho a Mano — script base
   ========================================================= */

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

      shopCards.forEach(card => {
        const matchesCat = currentCat === 'todo' || card.dataset.category === currentCat;
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

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
    updateCartBadge();
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
  function wireAddToCartButtons(scope) {
    scope.querySelectorAll('.product-card[data-id] .product-card__add-cart').forEach(addBtn => {
      addBtn.addEventListener('click', () => {
        const card = addBtn.closest('.product-card');
        addToCart({
          id: card.dataset.id,
          name: card.dataset.name,
          price: card.dataset.price,
          image: card.dataset.image,
        });

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

  wireAddToCartButtons(document);
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

      cartList.innerHTML = cart.map(item => `
        <article class="cart-item" data-id="${escapeHtml(item.id)}">
          <div class="cart-item__image" style="background-image: ${escapeHtml(item.image)};"></div>
          <div class="cart-item__body">
            <h3 class="cart-item__name">${escapeHtml(item.name)}</h3>
            <p class="cart-item__price">${escapeHtml(item.price)}</p>
          </div>
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" data-action="decrease" aria-label="Quitar una unidad">−</button>
            <span class="cart-item__qty-value">${item.qty}</span>
            <button class="cart-item__qty-btn" data-action="increase" aria-label="Añadir una unidad">+</button>
          </div>
          <p class="cart-item__subtotal">${formatPrice(parsePrice(item.price) * item.qty)}</p>
          <button class="cart-item__remove" aria-label="Quitar del carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </article>
      `).join('');

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
        const lines = cart.map(item => `- ${item.name} (x${item.qty}) — ${formatPrice(parsePrice(item.price) * item.qty)}`);
        const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);

        const subject = encodeURIComponent('Solicitud de pedido — Claire & Sofi Decor');
        const body = encodeURIComponent(`¡Hola! Estoy interesado/a en estos productos de vuestro carrito:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}\n\nEspero vuestra respuesta con el número al que pueda hacer el Bizum. ¡Gracias!`);

        window.location.href = `mailto:claireysofia.decor@gmail.com?subject=${subject}&body=${body}`;
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

      window.location.href = `mailto:claireysofia.decor@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
