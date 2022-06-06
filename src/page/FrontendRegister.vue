<template>
<div>
    <v-app>
       <Nav/>
        <h3 class="text-center mt-5">{{ $t('Register Form') }}</h3>
        <v-card color="cyan" max-width="500" class="mx-auto px-4 width mt-5">
            <div>
                <v-text-field class="mt-5" v-model="register.name" color="white" v-bind:label="$t('Enter Username')" hide-details="auto" full-width required solo-inverted></v-text-field>
                <v-text-field class="mt-5" color="white" v-bind:label="$t('Enter AccountId')" hide-details="auto" full-width v-model="register.accid" required solo-inverted></v-text-field>
                <v-text-field color="white" solo-inverted v-model="register.password" full-width :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" :label="$t('Enter Passsword')" name="input-10-2" :hint="$t('At least 8 characters')" value="" class="input-group--focused mt-5" @click:append="show1 = !show1">
                </v-text-field>

            </div>
            <v-row class="pb-5 ma-0 mt-5" justify="center">
             <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn @click="frontregisterIt" depressed outlined color="white login" v-bind="attrs"
            v-on="on">
                    {{ $t('Register') }}
                </v-btn>
          
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
             v-if="description=='already register accountId'" color="red"
              dark
            >{{ $t('!Register Alert') }}</v-toolbar>
            <v-toolbar
             v-else color="green"
              dark
            >{{ $t('!Register Alert') }}</v-toolbar>
            <v-card-text>
              <div class="text-h4 pa-12" color="bold">{{ description }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >{{ $t('Close') }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
                <!-- <v-btn @click="frontregisterIt" depressed outlined color="white login">
                    Register
                </v-btn> -->
            </v-row>
        </v-card>
    </v-app>
</div>
</template>

<script>
import axios from "axios";
import Nav from './Nav';
export default {
    name: "FrontendRegister",
    components:{Nav},
    data() {
        return {
            show1: false,
            password: "Password",
            token: "",
            description:"",
            rules: {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 8 || "Min 8 characters",

                // passwordMatch: () => `The password and Confirmpassword you entered don't match`,
            },
            register: {
                name: "",
                accid: "",
                password: "",
            },
        };
    },
    methods: {
        frontregisterIt() {

            axios
                .post("http://api.sky-name-login.com/api/user/createaccount", this.register)
                .then((response) => {
                    console.log(response.data[0].desc);
                    const desc = response.data[0].desc
                    if (desc == "already register accountId") {
                        this.description=desc

                    } else {
                       
                       this.description=desc
                        this.$router.push("/userlist");

                    }
                 
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
