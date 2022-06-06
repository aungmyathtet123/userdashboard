<template>
<div>
    <v-app>
    <Nav/>
        <h3 class="text-center mt-5">{{ $t('Register Form') }}</h3>
        <v-card color="cyan" max-width="500" class="mx-auto px-4 width mt-5">
            <div>
                <v-text-field v-model="register.name" color="white" :label="$t('Enter Username')" hide-details="auto" full-width required></v-text-field>
                <v-text-field color="white" :label="$t('Enter Phone or Email')" hide-details="auto" full-width v-model="register.phone" required></v-text-field>
                <v-text-field color="white" v-model="register.password" full-width :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" :label="$t('Enter Passsword')" name="input-10-2" :hint="$t('At least 8 characters')" value="" class="input-group--focused" @click:append="show1 = !show1">
                </v-text-field>

                <v-text-field color="white" v-model="register.password_confirmation" full-width :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show2 ? 'text' : 'password'" name="input-10-2" :label="$t('Enter Confirm Password')" :hint="$t('At least 8 characters')" value=""  class="input-group--focused" @click:append="show2 = !show2"></v-text-field>
                <span v-if="this.validate==false" class="text-danger">The password and confirmpassword you entered don't match</span>
            </div>
            <v-row class="pb-5 ma-0" justify="center">
                <v-btn @click="registerIt" depressed outlined color="white login">
                    {{ $t('Register') }}
                </v-btn>
            </v-row>
        </v-card>
    </v-app>
</div>
</template>

<script>
import axios from "axios";
import Nav from './Nav';
export default {
    name: "Register",
    components:{Nav},

    data() {
        return {
            show1: false,
            show2: false,
            password: "Password",
            token: "",
            validate: true,
            rules: {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 8 || "Min 8 characters",

                // passwordMatch: () => `The password and Confirmpassword you entered don't match`,
            },
            register: {
                name: "",
                phone: "",
                password: "",
                password_confirmation: "",
            },
        };
    },
    methods: {
        
        registerIt() {
  
            if (this.register.password == this.register.password_confirmation) {
                axios
                    .post("http://api.sky-name-login.com/api/user/register", this.register)
                    .then((response) => {

                        let token = response.data.token;
                        localStorage.setItem("token", token);
                        this.$router.push("/login");
                        // console.log(token);
                    });
            } else {
                this.validate = false
            }

        },
        

    },
};
</script>

<style>
.width {
    width: 100%;
}

h3 {
    font-family: Times New Roman;
    font-size: 30px;
}

.user {
    text-decoration: none;
    color: rgb(26, 24, 24) !important;
}
.text-danger{
  color: red!important;
}
</style>
