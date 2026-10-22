<?php defined( 'ABSPATH' ) || exit; ?>
<!-- Navigation horizontale -->
<div class="chrome" id="chrome">
  <div class="chapters">
    <div class="chapters-bars" id="chapters"></div>
    <span class="chapters-label" id="chapter-label"></span>
  </div>
  <div class="counter">
    <button class="round-btn" id="prev" data-action="prev" aria-label="Précédent">←</button>
    <div class="counter-num"><span class="counter-cur" id="counter-cur">01</span><span class="counter-tot" id="counter-tot">/ 03</span></div>
    <button class="round-btn" id="next" data-action="next" aria-label="Suivant">→</button>
  </div>
  <div class="progress"><div class="progress-bar" id="progress"></div></div>
</div>
