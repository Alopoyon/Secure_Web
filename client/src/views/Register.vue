<template>
    <!-- <div class="container "> -->
        <div class="d-flex flex-column vh-100 justify-content-center align-items-center">
            <div class="col-md-6">
                <div v-if="loading" class="d-flex flex-column vh-100 justify-content-center align-items-center z-100">
                    <div class="spinner-grow text-primary" style="width: 4rem; height: 4rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <form @submit.prevent="createAccount">
                        <!-- Name -->
                        <div class="mb-3 row">
                            <div class="col">
                                <div class="form-floating ">
                                    <input 
                                    type="text" 
                                    class="form-control"
                                    id="firstName"  
                                    placeholder="First name" 
                                    v-model="fName">
                                    <label for="firstName">First name</label>
                                </div>
                                
                            </div>

                            <div class="col">
                                <div class="form-floating ">
                                    <input 
                                        type="text" 
                                        class="form-control"
                                        id="lastName" 
                                        placeholder="Last name" 
                                        v-model="lName">
                                        <label for="lastName">Last name</label>
                                </div>
                            </div>
                        </div>

                        <!-- Username -->
                        <div class="form-floating mb-3">
                            <input 
                                type="email" 
                                class="form-control" 
                                id="userName" 
                                placeholder="Username"
                                v-model="userName"
                                @blur="validateUserName"
                                :class="{'is-invalid': userNameTouched && !isValidUserName, 'is-valid':userNameTouched && isValidUserName}">

                            <label for="userName">Username</label>

                            <div 
                                v-if=" userNameTouched && !isValidUserName" 
                                class="invalid-feedback">
                                Please enter a valid username.
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="form-floating mb-3">
                            <input 
                                type="email" 
                                class="form-control" 
                                id="userEmail" 
                                placeholder="name@example.com"
                                v-model="email"
                                @blur="validateEmail"
                                :class="{'is-invalid': emailTouched && !isValidEmail, 'is-valid':emailTouched && isValidEmail}">

                            <label for="userEmail">Email address</label>

                            <div 
                                v-if=" emailTouched && !isValidEmail" 
                                class="invalid-feedback">
                                Please enter a valid email address.
                            </div>
                        </div>

                        <!-- Password -->
                        <div class="form-floating mb-3">
                            <input 
                                type="password" 
                                class="form-control" 
                                id="userPassword" 
                                placeholder="Password"
                                v-model="password"
                                @blur="validatePassword"
                                :class="{'is-invalid': passwordTouched && !isValidPassword, 'is-valid':passwordTouched && isValidPassword}">

                            <label for="userPassword">Password</label>

                            <div 
                                v-if=" passwordTouched && !isValidPassword" 
                                class="invalid-feedback">
                                Please enter a valid password.
                            </div>
                        </div>

                        <!-- Submit -->
                        <button 
                            type="submit" 
                            class="btn btn-primary" 
                            :disabled="!isValidEmail || !isValidPassword" >
                            SignUp
                        </button>

                        <div id="registerlink" class="form-text">
                            Already have an account? <span><router-link class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/login">Sign In</router-link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    <!-- </div> -->
</template>

<script>
export default{
    data(){
        return {
            fName: '',
            fNameisTouched: false,
            lName: '',
            lNameisTouched: false,
            userName: '',
            userNameisTouched: false,
            email: '',
            emailTouched: false,
            password: '',
            passwordTouched: false,
            loading: false,
        };
    },
    computed:{
        isValidUserName(){
            const usnRegex1 = /^\S+[@]\S+[.]\S{2,}$/;
            return usnRegex1.test(this.userName);
        },
        isValidEmail(){
            const emailRegex = /^\S+[@]\S+[.]\S{2,}$/;
            let responseData;
            fetch(`http://localhost:5000/checkItem/${this.email}`)
                .then(response => response.text())
                .then(data => {responseData=data;})
                .catch(error => console.error('Error:', error));
            return emailRegex.test(this.email) & responseData;
        },
        isValidPassword(){
            const passWordRegex = /^\S{8,}$/;
            return passWordRegex.test(this.password);
        }
    },
    methods: {
        validateEmail(){
            this.emailTouched = true;
        },
        validatePassword(){
            this.passwordTouched = true;
        },
        async loginSubmit(){
            if(this.isValidEmail && this.isValidPassword){
                try{
                    this.loading = true;
                    const response = await fetch('http://localhost:5000/createAccount',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password,
                        }),
                    });
                    const data = await response.json();
                    console.log('Server Response:',data);
                    if (response.ok){
                        this.$router.push('/login');
                    }
                    
                } catch (error) {
                    console.error('Error submitting the form:', error);
                } finally {
                    this.loading = false;
                }
            }
            else{
                console.log('Sorry! Looks like the server is busy. Please try again later!')
            }
        },
    },
    name: 'Login',
};
</script>