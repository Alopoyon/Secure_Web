<template>
    <div v-if="isStandardLayout">
      <Header />
      <main class="flex-shrink-0">
        <router-view />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    data() {
      return {
        isStandardLayout: true,
      };
    },
    components: {
      Header,
      Footer,
    },
    created() {
      // Check the current route to determine the layout
      this.isStandardLayout = this.$route.meta.layout !== 'custom';
      console.log('this.$route.meta.layout : ',this.$route.meta.layout );
    },
  };
  </script>
  