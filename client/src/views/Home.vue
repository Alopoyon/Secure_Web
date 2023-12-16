<template>
   <div v-if="message.length > 0 ">
        <div>
          <h1>{{ message }}</h1>
        </div>
      </div>
      <div v-else>
        <div>
          <h1>Server not reachable! Please try again.</h1>
        </div>
      </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router';
  export default {
    data() {
      return {
        message: '',
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData(){
        // this.loading=true;
        fetch('http://localhost:5000')
        .then((response) => response.json())
        .then((data) => {
          this.message = data.message;
          // this.loading=false;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      },
    },
  };
  </script>
  