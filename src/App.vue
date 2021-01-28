<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div>
        <navbar pre-image="/img/multicolor.jpg" :links="MENU" :logo="LOGO" />
        <router-view/>
        <footer-block />
      </div>
    </transition>
  </div>
</template>

<script>
  import FooterBlock from '@/components/footer-block';
  import Navbar from '@/components/navbar';
  import config from '@/config';
  import { mapActions } from 'vuex';

  export default {
    name: 'app',
    components: {
      Navbar,
      FooterBlock,
    },
    data: function() {
      return {
        MENU: config.MENU,
        DISCLAIMER: config.DISCLAIMER,
        LOGO: config.LOGO,
      }
    },
    methods: {
      ...mapActions([
        'getTopics',
      ]),
    },
    created: function() {
      this.getTopics();
    }
  }
</script>

<style lang="scss">
</style>
