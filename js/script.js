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
            <p class="product-card__price">${escapeHtml(product.price)}</p>
          </div>
        </article>
      `).join('');

      if (favoritesEmpty) favoritesEmpty.hidden = favorites.length > 0;

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

  /* ---------- Iconos de la nav (buscar / carrito) ----------
     De momento son solo visuales; su funcionalidad se añadirá más adelante. */

});
