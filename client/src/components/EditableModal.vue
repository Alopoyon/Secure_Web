<template>
    <div>
      <!-- Button to trigger the modal -->
      <button @click="openModal">Open Modal</button>
  
      <!-- Modal -->
      <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-content">
          <!-- Modal content goes here -->
          <h1>Hello Modal!</h1>
          <label for="inputField">Input Field:</label>
          <input type="text" id="inputField" v-model="inputValue" />
        </div>
        <button class="modal-close is-large" @click="closeModal"></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
        inputValue: ''
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        // Clear input value and close modal
        this.inputValue = '';
        this.showModal = false;
      }
    }
  };
  </script>