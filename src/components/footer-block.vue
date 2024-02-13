<template>
  <div>
    <div
      id="footer"
      class="o-container o-container--fluid o-section u-bg-white"
    >
      <div class="o-container">
        <div class="o-grid">
          <div class="o-grid__col u-3@sm u-margin-top-4">
            <p class="u-text-overline">Desarrollado por</p>
            <a href="http://politicalwatch.es" target="_blank"
              ><img
                src="/img/logo-politicalwatch.png"
                class="big"
                alt="Logo de Political Watch"
            /></a>
          </div>
          <div class="o-grid__col u-8@sm u-offset-1@sm u-margin-top-4">
            <p class="u-text-overline">Con el apoyo de</p>
            <div class="logos o-grid">
              <div class="o-grid__col">
                <a
                  href="http://www.exteriores.gob.es/Portal/es/Ministerio/SecretariosDeEstado/SecretariaDeEstadoCooperacionInternacional/Paginas/Inicio.aspx"
                  target="_blank"
                  ><img
                    src="/img/maeuec-seci.jpg"
                    class="big"
                    alt="Logo de la Secretaria de Estado de Cooperación (Ministerio de Asuntos Exteriores, Unión Europea y Cooperación) del Gobierno de España"
                /></a>
              </div>
              <div class="o-grid__col">
                <a
                  href="https://cooperacionespanola.es/es/direccion-general-de-politicas-de-desarrollo-sostenible"
                  target="_blank"
                  ><img
                    src="/img/logo_cooperacion.jpg"
                    class="big"
                    alt="Logo de Cooperación Española"
                /></a>
              </div>
              <div class="o-grid__col">
                <a href="https://www.agenda2030.gob.es/" target="_blank"
                  ><img
                    src="/img/logo_agenda.jpg"
                    class="big"
                    alt="Logo de la Secretaría de Estado para la Agenda 2030."
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="o-grid">
          <div class="o-grid__col u-12@sm u-margin-top-4">
            <p class="u-color-secondary-dark u-text-tbody2">
              {{ new Date().getFullYear() }} Political Watch - Algunos derechos
              reservados
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="c-decorator"
      style="background-image: url('/img/multicolor.jpg')"
    ></div>

    <vue-cookie-accept-decline
      :debug="false"
      :disableDecline="false"
      :showPostponeButton="false"
      @clicked-accept="cookieClickedAccept"
      @clicked-decline="cookieClickedDecline"
      @status="cookieStatus"
      elementId="cookiePanel"
      ref="cookiePanel"
      transitionName="slideFromBottom"
      type="floating"
    >
      <template #message>
        Este sitio usa cookies para asegurarte la mejor experiencia web.
      </template>

      <template #declineContent>Rechazar</template>
      <template #acceptContent>Aceptar</template>
    </vue-cookie-accept-decline>
  </div>
</template>

<script>
import VueCookieAcceptDecline from 'vue-cookie-accept-decline';
import 'vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css';

import { TipiIcon } from '@politicalwatch/tipi-uikit';

export default {
  name: 'FooterBlock',
  components: {
    VueCookieAcceptDecline,
    TipiIcon,
  },
  methods: {
    cookieStatus: (val) => {
      // console.log('Cookie status: ' + val);
      if (val === 'decline' || val == null) {
        if (gtag) {
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });
        }
      } else if (val === 'accept') {
        bootstrap().then(() => {
          gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
          });
        });
      }
    },
    cookieClickedAccept: () => {
      bootstrap().then(() => {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
        });
      });
    },
    cookieClickedDecline: () => {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      });
    },
  },
};
</script>

<style scoped lang="scss">
#footer {
  .o-container {
    border-top: 1px solid #ddd;
  }
}

.logos {
  .o-grid__col a img {
    max-height: 100px;
  }
}
</style>
