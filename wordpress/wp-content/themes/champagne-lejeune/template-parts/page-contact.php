<?php defined( 'ABSPATH' ) || exit; ?>
<!-- Contact & Visites -->
<div class="view" data-page="contact" hidden>
  <section class="contact">
    <img class="contact-bg" src="<?php lejeune_asset( 'brut-reserve.png' ); ?>" alt="Champagne Lejeune">
    <div class="contact-shade"></div>
    <div class="contact-inner">
      <div class="contact-info">
        <div class="eyebrow">Contact &amp; Visites</div>
        <h1 class="contact-title">À bientôt<br>en Champagne</h1>
        <p class="contact-text">Vente au domaine, visites et dégustations sur rendez-vous, au cœur de nos vignes de Villers-Marmery.</p>
        <div class="contact-cols">
          <div>
            <div class="contact-label">Adresse</div>
            <div class="contact-value">51380 Villers-Marmery<br>France</div>
          </div>
          <div>
            <div class="contact-label">Nous joindre</div>
            <div class="contact-value">+33 (0)3 26 00 00 00<br>contact@champagne-lejeune.fr</div>
          </div>
        </div>
        <div class="contact-legal">L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</div>
      </div>

      <div class="contact-form-wrap">
        <form class="contact-form" id="contact-form" novalidate>
          <div>
            <div class="field-label">Objet</div>
            <div class="chips" id="objets">
              <button type="button" class="chip" data-action="objet" data-objet="Commande">Commande</button>
              <button type="button" class="chip" data-action="objet" data-objet="Visite &amp; dégustation">Visite &amp; dégustation</button>
              <button type="button" class="chip" data-action="objet" data-objet="Vendanges">Vendanges</button>
              <button type="button" class="chip" data-action="objet" data-objet="Autre">Autre</button>
            </div>
          </div>
          <div id="field-cuvee">
            <label class="field-label" for="f-cuvee">Cuvée souhaitée</label>
            <select class="field" id="f-cuvee" name="cuvee"></select>
          </div>
          <div class="field-row">
            <div>
              <label class="field-label" for="f-nom">Nom</label>
              <input class="field" id="f-nom" name="nom" placeholder="Votre nom" autocomplete="name">
            </div>
            <div>
              <label class="field-label" for="f-email">Courriel</label>
              <input class="field" id="f-email" name="email" type="email" placeholder="vous@exemple.fr" autocomplete="email">
            </div>
          </div>
          <div>
            <label class="field-label" for="f-msg">Message</label>
            <textarea class="field" id="f-msg" name="message" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-accent contact-submit">Envoyer</button>
        </form>
        <div class="contact-sent" id="contact-sent" hidden>
          <span class="diamond diamond-lg"></span>
          <h3>Merci.</h3>
          <p>Votre message a bien été transmis. Nous vous répondrons dans les meilleurs délais.</p>
        </div>
      </div>
    </div>
  </section>
</div>
