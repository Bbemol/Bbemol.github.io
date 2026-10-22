<?php defined( 'ABSPATH' ) || exit; ?>
<!-- En-tête -->
<header class="topbar">
  <button class="logo" data-action="home" aria-label="Accueil">
    <span class="logo-small">CHAMPAGNE</span>
    <span class="logo-big">LEJEUNE</span>
  </button>
  <button class="burger" data-action="menu" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>
  <nav class="nav" id="nav">
    <button class="nav-item" data-action="cuvees" data-nav="cuvees">Nos Cuvées</button>
    <button class="nav-item" data-action="histoire" data-nav="histoire">De Père en Fils</button>
    <button class="nav-item" data-action="news" data-nav="news">Actualités</button>
    <button class="nav-item" data-action="contact" data-nav="contact">Contact</button>
    <div class="lang">
      <button class="lang-btn is-active" data-action="fr">FR</button>
      <span class="lang-sep">/</span>
      <button class="lang-btn" data-action="en">EN</button>
    </div>
  </nav>
</header>
