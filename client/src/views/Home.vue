<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
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
  