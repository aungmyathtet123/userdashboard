<template>
<div>
    <v-app>
        <Nav />
        <h3 class="text-center mt-5">{{ $t('Login Form') }}</h3>
        <v-card max-width="500" class="mx-auto px-4 width mt-5" color="cyan">
            <div>
                <v-text-field color="white" v-model="login.phone" :label="$t('Enter Phone or Email')" hide-details="auto" full-width></v-text-field>
                <v-text-field color="white" v-model="login.password" full-width :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" :label="$t('Enter Passsword')" name="input-10-2" :hint="$t('At least 8 characters')" value="" class="input-group--focused" @click:append="show3 = !show3">
                </v-text-field>
            </div>
            <v-row class="pb-5 ma-0" justify="center">
                <v-btn @click="loginIt" depressed outlined color="white">
                    {{ $t('Login') }}
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
    name: "Login",
    components: {
        Nav
    },

    data() {
        return { token: "",
            show3: false,
            password: "Password",
            token: "",
            rules: {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 8 || "Min 8 characters",
                emailMatch: () => `The email and password you entered don't match`,
            },
            login: {
                phone: "",
                password: "",
            },
        };
    },
    methods: {
        loginIt() {
            axios
                .post("http://api.sky-name-login.com/api/user/login", this.login)
                .then((response) => {
                    console.log(response);
                    let token = response.data.token;
                    localStorage.setItem("token", token);
                    this.$router.push("/userlist");
                });
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
</style>
