<?php defined( 'ABSPATH' ) || exit; ?>
<!-- Fiche cuvée -->
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="d-name" aria-hidden="true" inert>
  <div class="modal-media">
    <div class="modal-img" id="d-media"></div>
    <div class="modal-media-shade"></div>
    <div class="modal-logo stg" style="--d:.9s">
      <span class="logo-small">CHAMPAGNE</span>
      <span class="logo-big">LEJEUNE</span>
    </div>
    <div class="modal-controls stg" style="--d:1s">
      <div class="modal-arrows">
        <button class="modal-arrow" data-action="detail-prev" aria-label="Cuvée précédente">←</button>
        <button class="modal-arrow" data-action="detail-next" aria-label="Cuvée suivante">→</button>
      </div>
      <div class="modal-dots" id="d-dots"></div>
    </div>
  </div>
  <div class="modal-line"></div>
  <div class="modal-panel">
    <button class="modal-close stg" style="--d:.9s" data-action="close" aria-label="Fermer">×</button>
    <div class="modal-content">
      <div class="modal-kicker stg" style="--d:.42s">
        <span class="modal-num" id="d-num"></span>
        <span class="modal-rule"></span>
        <span class="modal-cru" id="d-cru"></span>
      </div>
      <div class="modal-title-mask">
        <h2 class="modal-title" id="d-name"></h2>
      </div>
      <div class="stg" style="--d:.62s">
        <p class="modal-short" id="d-short"></p>
        <p class="modal-desc" id="d-desc"></p>
      </div>
      <div class="modal-facts stg" style="--d:.72s" id="d-facts"></div>
      <div class="stg" style="--d:.82s">
        <div class="modal-heading">Dégustation</div>
        <div class="modal-tasting" id="d-tasting"></div>
        <div class="modal-heading modal-heading-accords">Accords</div>
        <p class="modal-accords" id="d-accords"></p>
      </div>
      <div class="stg" style="--d:.92s">
        <div class="modal-actions">
          <button class="btn btn-dark" data-action="detail-order">Commander cette cuvée</button>
          <button class="btn btn-outline" data-action="detail-next" id="d-next-name"></button>
        </div>
        <div class="modal-note">Vente au domaine sur rendez-vous · Expédition sur demande</div>
      </div>
    </div>
  </div>
</div>

<div class="toast" id="lang-toast" role="status" hidden>English version coming soon.</div>
