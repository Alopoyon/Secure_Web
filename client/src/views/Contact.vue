<template>
<div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out using the form below or contact us directly.</p>
        <form @submit.prevent="submitForm">
          <!-- Form fields go here -->
          <div class="mb-3">
            <label for="name" class="form-label">Your Name</label>
            <input type="text" class="form-control" id="name" v-model="formData.name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Your Email</label>
            <input type="email" class="form-control" id="email" v-model="formData.email" required>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Your Message</label>
            <textarea class="form-control" id="message" v-model="formData.message" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-md-6">
        <h2>Contact Information</h2>
        <p><i class="fas fa-map-marker-alt"></i> 123 Street, Cityville</p>
        <p><i class="fas fa-phone"></i> (555) 123-4567</p>
        <p><i class="fas fa-envelope"></i> info@example.com</p>
      </div>
    </div>
  </div>
</template>
   
<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log('Form submitted:', this.formData);
      // You can send the form data to your server or perform other actions.
    },
  },
};
</script>
   

<style>
/* Add any custom styles here */
</style>