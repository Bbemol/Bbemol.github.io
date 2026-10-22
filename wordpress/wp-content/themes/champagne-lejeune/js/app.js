'use strict';

(() => {
  const W = '#ffffff';
  const D = '#2C353D';
  // Dossier des images : relatif en statique, fourni par le thème sous WordPress.
  const ASSETS = window.LEJEUNE_ASSETS || 'assets/';

  const CUVEES = [
    { id: 'brut-reserve', name: 'Brut Réserve', cru: 'Premier Cru', pack: ASSETS + 'brut-reserve.png', situ: ASSETS + 'brut-reserve.png', dark: false,
      short: 'Vif et floral, la signature de la maison.',
      desc: "Notre cuvée emblématique. Un assemblage équilibré de Chardonnay et de Pinot Noir issus de nos parcelles Premier Cru, patiemment élevé en cave pour révéler finesse et fraîcheur.",
      facts: [['Assemblage', 'Chardonnay & Pinot Noir'], ['Dosage', 'Brut'], ['Vieillissement', '3 ans sur lattes'], ['Service', '8 – 10 °C']],
      tasting: [['Œil', 'Or pâle, bulles fines et persistantes'], ['Nez', 'Fleurs blanches, agrumes, brioche légère'], ['Bouche', 'Fraîche et ronde, finale saline']],
      accords: "À l'apéritif, avec des gougères ou des huîtres." },
    { id: 'demi-sec', name: 'Demi-Sec Réserve', cru: 'Premier Cru', pack: null, situ: null, dark: false,
      short: 'Tout en rondeur et en gourmandise.',
      desc: "Une bulle douce et soyeuse, pensée pour les moments gourmands. Le même assemblage que notre Brut Réserve, avec un dosage plus généreux.",
      facts: [['Assemblage', 'Chardonnay & Pinot Noir'], ['Dosage', 'Demi-sec'], ['Vieillissement', '3 ans sur lattes'], ['Service', '6 – 8 °C']],
      tasting: [['Œil', 'Or soutenu, mousse onctueuse'], ['Nez', 'Fruits mûrs, miel, pâte de coing'], ['Bouche', 'Ample et suave, belle fraîcheur']],
      accords: 'Foie gras, tarte aux fruits, desserts peu sucrés.' },
    { id: 'brut-rose', name: 'Brut Rosé', cru: 'Premier Cru', pack: ASSETS + 'rose.png', situ: ASSETS + 'rose.png', dark: false,
      short: 'Fruits rouges et robe lumineuse.',
      desc: "Un rosé d'assemblage délicat, où le Pinot Noir de nos coteaux apporte couleur et fruit. Toute l'élégance d'une fin d'après-midi d'été.",
      facts: [['Assemblage', 'Chardonnay & Pinot Noir'], ['Dosage', 'Brut'], ['Vieillissement', '3 ans sur lattes'], ['Service', '8 – 10 °C']],
      tasting: [['Œil', 'Rose saumoné, reflets cuivrés'], ['Nez', 'Fraise des bois, groseille, framboise'], ['Bouche', 'Croquante et fruitée, finale fraîche']],
      accords: 'Saumon gravlax, cuisine asiatique, tarte aux fraises.' },
    { id: 'grande-reserve', name: 'Brut Grande Réserve', cru: 'Grand Cru', pack: null, situ: null, dark: false,
      short: 'La profondeur et la noblesse du Grand Cru.',
      desc: "Issue de nos parcelles Grand Cru de Verzy et d'Ambonnay, cette cuvée bénéficie d'une longue maturation qui lui donne complexité et vinosité.",
      facts: [['Assemblage', 'Chardonnay & Pinot Noir'], ['Dosage', 'Brut'], ['Vieillissement', '5 ans sur lattes'], ['Service', '10 – 12 °C']],
      tasting: [['Œil', 'Or lumineux, cordon fin'], ['Nez', 'Fruits secs, pain grillé, notes beurrées'], ['Bouche', 'Structurée et ample, longue finale']],
      accords: 'Volaille de Bresse, homard, risotto aux morilles.' },
    { id: 'millesime-2019', name: 'Millésime 2019', cru: 'Grand Cru · Millésimé', pack: null, situ: null, dark: true,
      short: "L'expression d'une seule année d'exception.",
      desc: "Une cuvée produite seulement les grandes années. 2019 a donné des raisins d'une maturité rare, que nous avons laissés vieillir longuement en cave.",
      facts: [['Assemblage', 'Chardonnay & Pinot Noir'], ['Année', '2019'], ['Vieillissement', '6 ans sur lattes'], ['Service', '10 – 12 °C']],
      tasting: [['Œil', 'Or profond, bulles très fines'], ['Nez', 'Fruits jaunes, épices douces, moka'], ['Bouche', 'Riche et racée, grande persistance']],
      accords: 'Plats truffés, Comté 24 mois, Saint-Jacques snackées.' }
  ];

  // Chaque page : ses panneaux et la teinte [logo/chapitres, nav/compteur] de chacun.
  const PAGES = {
    cuvees: { labels: ['Accueil', 'Nos Cuvées', 'La Famille'], tones: [[W, W], [D, D], [D, D]] },
    histoire: { labels: ['Notre histoire', 'En chiffres', 'Le Vignoble'], tones: [[D, D], [W, W], [W, W]] },
    news: { labels: ['Actualités'], tones: [[D, D]] },
    contact: { labels: ['Contact'], tones: [[W, W]] }
  };

  const PLACEHOLDERS = {
    'Commande': 'Quantité, date souhaitée…',
    'Visite & dégustation': 'Nombre de personnes, dates…',
    'Vendanges': 'Vos disponibilités, votre expérience…',
    'Autre': 'Votre message'
  };

  const state = {
    page: 'cuvees', idx: 0,
    detail: null, shown: false, swapping: false,
    objet: 'Commande', formCuvee: 'brut-reserve', sent: false,
    menu: false
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const app = $('#app');
  const modal = $('#modal');
  let renderedPage = null;
  let renderedDetail = null;
  let wheelLock = false;
  let swapTimer = 0;
  let langTimer = 0;

  // Sous 900px, les panneaux s'empilent et la page défile verticalement (voir styles.css).
  const mobileQuery = window.matchMedia('(max-width: 900px)');
  const isMobile = () => mobileQuery.matches;

  // Une image absente laisse voir le fond de son conteneur plutôt qu'une icône cassée.
  document.addEventListener('error', (e) => {
    if (e.target instanceof HTMLImageElement) e.target.style.visibility = 'hidden';
  }, true);

  /* ---------- Construction initiale ---------- */

  $('#cuvees-grid').innerHTML = CUVEES.map((c, i) => `
    <button class="cuvee-card" data-action="open" data-id="${c.id}">
      <div class="cuvee-media ${c.dark ? 'placeholder-dark' : 'placeholder'}">
        ${c.pack
          ? `<img src="${c.pack}" alt="${esc(c.name)}">`
          : `<div class="cuvee-ph"><span class="cuvee-ph-title">Photo bouteille</span><span class="cuvee-ph-note">à venir</span></div>`}
        <span class="cuvee-num">${pad(i + 1)}</span>
      </div>
      <span class="cuvee-cru">${esc(c.cru)}</span>
      <span class="cuvee-name">${esc(c.name)}</span>
      <span class="cuvee-short">${esc(c.short)}</span>
    </button>`).join('');

  $('#f-cuvee').innerHTML = CUVEES.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('');

  $('#d-dots').innerHTML = CUVEES.map((c) =>
    `<button class="modal-dot" data-action="dot" data-id="${c.id}" aria-label="${esc(c.name)}"><span></span></button>`).join('');

  /* ---------- Rendu ---------- */

  function render() {
    const { page, idx } = state;
    const pg = PAGES[page];
    const total = pg.labels.length;
    const tone = pg.tones[idx] || [W, W];

    for (const view of $$('.view')) view.hidden = view.dataset.page !== page;
    app.style.setProperty('--l-fg', tone[0]);
    app.style.setProperty('--r-fg', tone[1]);

    const view = $(`.view[data-page="${page}"]`);
    const track = $('.track', view);
    if (track) track.style.transform = `translateX(${-idx * 100}vw)`;
    for (const img of $$('[data-par]', view)) {
      img.style.transform = `translateX(${(idx - Number(img.dataset.par)) * -40}px)`;
    }

    for (const item of $$('.nav-item')) {
      const id = item.dataset.nav;
      item.classList.toggle('is-active', id === page && !(id === 'cuvees' && idx === 0));
    }

    const chrome = $('#chrome');
    chrome.hidden = total < 2;
    if (renderedPage !== page) {
      $('#chapters').innerHTML = pg.labels.map((label, i) =>
        `<button class="chapter" data-action="go" data-idx="${i}" title="${esc(label)}" aria-label="${esc(label)}"><span></span></button>`).join('');
      renderedPage = page;
    }
    $$('.chapter').forEach((b, i) => b.classList.toggle('is-active', i === idx));
    $('#chapter-label').textContent = pg.labels[idx];
    $('#counter-cur').textContent = pad(idx + 1);
    $('#counter-tot').textContent = '/ ' + pad(total);
    $('#prev').classList.toggle('is-disabled', idx === 0);
    $('#next').classList.toggle('is-disabled', idx === total - 1);
    $('#progress').style.width = ((idx + 1) / total * 100) + '%';

    app.classList.toggle('is-solid', isMobile() && view.scrollTop > 40);
    app.classList.toggle('is-menu-open', state.menu);
    $('.burger').setAttribute('aria-expanded', String(state.menu));

    renderModal();
    renderContact();
  }

  function renderModal() {
    const { detail, shown, swapping } = state;
    modal.classList.toggle('is-open', !!detail);
    modal.classList.toggle('is-shown', !!(detail && shown));
    modal.classList.toggle('is-swapping', swapping);
    modal.setAttribute('aria-hidden', detail ? 'false' : 'true');
    modal.inert = !detail;
    if (!detail || detail === renderedDetail) return;
    renderedDetail = detail;

    const di = CUVEES.findIndex((c) => c.id === detail);
    const c = CUVEES[di];
    const next = CUVEES[(di + 1) % CUVEES.length];

    const media = $('#d-media');
    media.className = 'modal-img ' + (c.dark ? 'placeholder-dark' : 'placeholder');
    media.innerHTML = c.situ
      ? `<img src="${c.situ}" alt="${esc(c.name)}">`
      : `<div class="modal-ph"><div><div class="modal-ph-title">Photo en situation</div><div class="modal-ph-note">${esc(c.name)} · sur table, à venir</div></div></div>`;

    $('#d-num').textContent = `${pad(di + 1)} / ${pad(CUVEES.length)}`;
    $('#d-cru').textContent = c.cru;
    $('#d-name').textContent = c.name;
    $('#d-short').textContent = c.short;
    $('#d-desc').textContent = c.desc;
    $('#d-facts').innerHTML = c.facts.map(([k, v]) =>
      `<div class="fact"><div class="fact-k">${esc(k)}</div><div class="fact-v">${esc(v)}</div></div>`).join('');
    $('#d-tasting').innerHTML = c.tasting.map(([k, v]) =>
      `<div class="tasting-row"><span class="tasting-k">${esc(k)}</span><span class="tasting-v">${esc(v)}</span></div>`).join('');
    $('#d-accords').textContent = c.accords;
    $('#d-next-name').textContent = `${next.name} →`;
    $$('.modal-dot').forEach((b, i) => b.classList.toggle('is-active', i === di));
    $('.modal-panel').scrollTop = 0;
    modal.scrollTop = 0;
  }

  function renderContact() {
    for (const chip of $$('.chip')) chip.classList.toggle('is-active', chip.dataset.objet === state.objet);
    $('#field-cuvee').hidden = state.objet !== 'Commande';
    $('#f-cuvee').value = state.formCuvee;
    $('#f-msg').placeholder = PLACEHOLDERS[state.objet];
    $('#contact-form').hidden = state.sent;
    $('#contact-sent').hidden = !state.sent;
  }

  function setState(patch) {
    Object.assign(state, patch);
    render();
  }

  /* ---------- Navigation ---------- */

  function go(i) {
    const n = Math.max(0, Math.min(PAGES[state.page].labels.length - 1, i));
    if (isMobile()) scrollToPanel(n, 'smooth');
    if (n !== state.idx) setState({ idx: n });
  }

  function setPage(page, idx = 0, extra = {}) {
    clearTimeout(swapTimer);
    setState({ page, idx, detail: null, shown: false, swapping: false, menu: false, ...extra });
    if (isMobile()) scrollToPanel(idx, 'instant');
  }

  function currentView() {
    return $(`.view[data-page="${state.page}"]`);
  }

  function scrollToPanel(idx, behavior) {
    const view = currentView();
    const panel = $$('.panel', view)[idx];
    view.scrollTo({ top: idx && panel ? panel.offsetTop : 0, behavior });
  }

  // Sur mobile, le panneau courant suit le défilement (soulignement du menu, bouton « Découvrir »).
  function onViewScroll(e) {
    if (!isMobile() || e.currentTarget !== currentView()) return;
    const view = e.currentTarget;
    const line = view.scrollTop + window.innerHeight * .4;
    let idx = 0;
    $$('.panel', view).forEach((panel, i) => { if (panel.offsetTop <= line) idx = i; });
    if (idx !== state.idx) setState({ idx });
    else app.classList.toggle('is-solid', view.scrollTop > 40);
  }

  function openDetail(id) {
    if (state.detail) { swapTo(id); return; }
    setState({ detail: id, shown: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setState({ shown: true })));
    $('.modal-close').focus({ preventScroll: true });
  }

  function swapTo(id) {
    clearTimeout(swapTimer);
    setState({ shown: false, swapping: true });
    swapTimer = setTimeout(() => {
      setState({ detail: id });
      requestAnimationFrame(() => setState({ shown: true, swapping: false }));
    }, 520);
  }

  function closeDetail() {
    clearTimeout(swapTimer);
    setState({ shown: false, swapping: false });
    swapTimer = setTimeout(() => setState({ detail: null }), 380);
  }

  function stepDetail(delta) {
    const di = CUVEES.findIndex((c) => c.id === state.detail);
    swapTo(CUVEES[(di + delta + CUVEES.length) % CUVEES.length].id);
  }

  function order(id) {
    clearTimeout(swapTimer);
    setPage('contact', 0, { objet: 'Commande', formCuvee: id, sent: false });
  }

  function showLangNote() {
    const toast = $('#lang-toast');
    toast.hidden = false;
    clearTimeout(langTimer);
    langTimer = setTimeout(() => { toast.hidden = true; }, 3000);
  }

  const actions = {
    next: () => go(state.idx + 1),
    prev: () => go(state.idx - 1),
    go: (el) => go(Number(el.dataset.idx)),
    home: () => setPage('cuvees', 0),
    cuvees: () => setPage('cuvees', 1),
    histoire: () => setPage('histoire'),
    news: () => setPage('news'),
    contact: () => setPage('contact'),
    'contact-visite': () => setPage('contact', 0, { objet: 'Visite & dégustation', sent: false }),
    menu: () => setState({ menu: !state.menu }),
    open: (el) => openDetail(el.dataset.id),
    dot: (el) => swapTo(el.dataset.id),
    close: closeDetail,
    'detail-next': () => stepDetail(1),
    'detail-prev': () => stepDetail(-1),
    'detail-order': () => order(state.detail),
    objet: (el) => setState({ objet: el.dataset.objet }),
    fr: () => { clearTimeout(langTimer); $('#lang-toast').hidden = true; },
    en: showLangNote
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (el && actions[el.dataset.action]) actions[el.dataset.action](el);
  });

  $('#f-cuvee').addEventListener('change', (e) => { state.formCuvee = e.target.value; });

  // Pas encore de traitement côté serveur : l'envoi affiche la confirmation.
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    setState({ sent: true });
  });

  /* ---------- Molette, clavier, glissé ---------- */

  for (const view of $$('.view')) view.addEventListener('scroll', onViewScroll, { passive: true });
  mobileQuery.addEventListener('change', () => setState({ menu: false }));

  // Sur mobile, molette, flèches et glissés gardent leur comportement natif (défilement).
  window.addEventListener('wheel', (e) => {
    if (state.detail || isMobile()) return;
    if (PAGES[state.page].labels.length < 2) return;
    e.preventDefault();
    if (wheelLock) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 6) return;
    wheelLock = true;
    go(state.idx + (d > 0 ? 1 : -1));
    setTimeout(() => { wheelLock = false; }, 1050);
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if (e.key === 'Escape') {
      if (state.detail) closeDetail();
      else if (state.menu) setState({ menu: false });
      return;
    }
    if (state.detail || isMobile()) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); go(state.idx + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(state.idx - 1); }
  });

  let touchX = 0;
  let touchY = 0;
  window.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', (e) => {
    if (state.detail || isMobile()) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(state.idx + (dx < 0 ? 1 : -1));
  }, { passive: true });

  render();
})();
