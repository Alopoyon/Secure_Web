<template>
    <div v-if="loading" class="d-flex flex-column vh-100 justify-content-center align-items-center z-100">
        <div class="spinner-grow text-primary" style="width: 4rem; height: 4rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
      <div>
      <h1>{{ message }}</h1>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
        loading:false,
      };
    },
    mounted() {
      fetch('http://localhost:5000')
        .then((response) => response.json())
        .then((data) => {
          this.message = data.message;
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
  };
  </script>
  