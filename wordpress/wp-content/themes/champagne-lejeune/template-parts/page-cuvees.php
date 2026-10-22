<?php defined( 'ABSPATH' ) || exit; ?>
<!-- Nos Cuvées : Accueil · Nos Cuvées · La Famille -->
<div class="view" data-page="cuvees">
  <div class="track">

    <section class="panel hero">
      <img class="panel-bg" data-par="0" src="<?php lejeune_asset( 'vineyard-aerial.png' ); ?>" alt="Le vignoble Lejeune">
      <div class="hero-shade"></div>
      <div class="hero-content">
        <div class="hero-kicker">Propriétaires-Récoltants</div>
        <div class="hero-champagne">Champagne</div>
        <h1 class="hero-title">LEJEUNE</h1>
        <div class="hero-sub">Père &amp; Fils</div>
        <button class="hero-since" data-action="histoire"><span class="rule"></span>Onze générations depuis 1684<span class="rule"></span></button>
        <button class="btn btn-outline-light hero-cta" data-action="next">Découvrir nos cuvées <span class="hint-arrow">→</span></button>
      </div>
    </section>

    <section class="panel cuvees">
      <div class="cuvees-head">
        <div>
          <div class="eyebrow">Nos Cuvées</div>
          <h2 class="cuvees-title">Cinq expressions d'un même terroir</h2>
        </div>
        <span class="cuvees-places">Villers-Marmery · Verzy · Ambonnay</span>
      </div>
      <div class="cuvees-grid" id="cuvees-grid"></div>
    </section>

    <section class="panel famille">
      <div class="famille-inner">
        <div class="eyebrow">De Père en Fils</div>
        <span class="diamond famille-diamond"></span>
        <h2 class="famille-title">Derrière chaque bouteille,<br>onze générations</h2>
        <p class="famille-text">Depuis Sébastien Lejeune, né en 1684, notre famille cultive la vigne à Villers-Marmery, Verzy et Ambonnay.</p>
        <div class="famille-actions">
          <button class="btn btn-dark" data-action="histoire">Notre histoire</button>
          <button class="btn btn-outline" data-action="contact-visite">Nous rendre visite</button>
        </div>
      </div>
    </section>

  </div>
</div>
