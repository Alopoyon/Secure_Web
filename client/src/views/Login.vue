<template>
    <!-- <div class="container "> -->
        <div class="d-flex flex-column vh-100 justify-content-center align-items-center border">
            <div class="col-md-6">
                <form @submit.prevent="loginSubmit">
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

                    <!-- SignedIn Checkbox -->
                    <div class="mb-3 form-check">
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            id="keepSignedIn">
                        <label class="form-check-label" for="keepSignedIn">Keep me signed in</label>
                    </div>

                    <!-- Submit -->
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        :disabled="!isValidEmail || !isValidPassword" >
                        Login
                    </button>
                </form>
            </div>
    </div>
    <!-- </div> -->
</template>

<script>
export default{
    data(){
        return {
            email: '',
            emailTouched: false,
            password: '',
            passwordTouched: false,
        };
    },
    computed:{
        isValidEmail(){
            const emailRegex = /^\S+\S+[.]\S{2,}$/;
            return emailRegex.test(this.email);
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
                const response = await fetch('http://localhost:5000/loginSubmit',{
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
            }
            else{
                console.log('Sorry! Looks like the server is busy. Please try again later!')
            }
        },
    },
    name: 'Login',
};
</script>