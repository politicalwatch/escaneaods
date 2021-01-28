<template>
  <header class="c-navbar">
    <div class="c-disclaimer" v-if="!closedDisclaimer && disclaimerLink.hasOwnProperty('name')">
      <a v-if="disclaimerLink.external" :href="disclaimerLink.route" target="_blank" v-html="disclaimerLink.name"></a>
      <router-link v-else :to="{name: disclaimerLink.route}" v-html="disclaimerLink.name"></router-link>

      <a class="c-disclaimer__close" href="#" @click="closeDisclaimer"><tipi-icon icon="close" color="#fff" /></a>
    </div>
    <div  v-if="preImage" class="c-decorator" :style="`background-image: url(${preImage})`"></div>
    <div class="c-navbar__wrapper o-container">
      <div class="c-navbar__brand">
        <a class="c-navbar__brand-link" href="/"><img class="c-navbar__brand-logo" :src="logo"></a>
      </div>
      <p class="c-navbar__subtitle">Escáner de ODS de la Cooperación Española</p>
      <button
        type="button"
        class="c-navbar__menu-toggle"
        :class="{ 'is-active' : menuVisible }"
        v-on:click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="u-hide">Menú</span>
      </button>
      <nav class="c-navbar__menu" :class="{ 'is-active' : menuVisible }">
        <ul class="c-menu">
          <li
          @click="closeMenuMobile"
          class="c-menu__item"
          v-for="link in links"
          :key="link.route"
          v-show="link.condition">
            <a v-if="link.external" :href="link.route" target="_blank">{{ link.name }}<tipi-icon :icon="link.icon" class="c-menu__icon" v-if="link.icon" /></a>
            <router-link v-else :to="{name: link.route }" class="c-menu__link">{{ link.name }}<tipi-icon :icon="link.icon" class="c-menu__icon" v-if="link.icon" /></router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { TipiIcon } from 'tipi-uikit'

export default {
  name: 'Navbar',
  components: {
    TipiIcon,
  },
  props: {
    links: Array,
    disclaimerLink: {
      type: Object,
      default: function() { return {}; },
    },
    preImage: String,
    logo: String,
  },
  data: function () {
    return {
      closedMessage: false,
      menuVisible: false,
    };
  },
  computed: {
    closedDisclaimer: function () {
      return window.sessionStorage.getItem('closedDisclaimer') || this.closedMessage ? true : false;
    },
  },
  methods: {
    closeDisclaimer: function() {
      window.sessionStorage.setItem('closedDisclaimer', true);
      this.closedMessage = true;
    },
    toggleMenu: function() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenuMobile: function () {
      if (this.menuVisible) {
        this.menuVisible = false;
      }
    },
  },
};
</script>

<style lang="scss">
  .c-navbar__subtitle {
    color: #d64949;
    font-weight: bold;
    font-size: 1.25em;
    margin-left: 20px;
    margin-top: auto;
    margin-bottom: auto;

    @media (max-width: 768px) {
      font-size: 1em;
    }
  }
</style>
