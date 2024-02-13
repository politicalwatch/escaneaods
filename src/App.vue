<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div>
        <navbar pre-image="/img/multicolor.jpg" :links="MENU" :logo="LOGO" />
        <router-view />
        <footer-block />
      </div>
    </transition>
  </div>
</template>

<script>
import FooterBlock from '@/components/footer-block.vue';
import Navbar from '@/components/navbar.vue';
import config from '@/config';
import { useScannerStore } from '@/stores/scanner';

export default {
  name: 'app',
  components: {
    Navbar,
    FooterBlock,
  },
  setup() {
    const store = useScannerStore();
    return { store };
  },
  data: function () {
    return {
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    };
  },
  created: function () {
    this.store.getTopics();
  },
};
</script>

<style lang="scss"></style>
