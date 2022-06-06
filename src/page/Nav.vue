<template>
<div>
    <v-bottom-navigation :value="value" grow x-large>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-btn to="/">
            <span> {{ $t('dashboard') }}</span>
            <v-icon large color="teal darken-2">mdi-android</v-icon>
        </v-btn>

        <div class="ml-auto mt-2">
            <v-select small v-model="$i18n.locale" prepend-icon="mdi-map" :items="langs" label="Solo field" dense solo></v-select>
        </div>

        <v-btn class="ml-auto" @click="logout" v-if="token">
            <span>{{ $t('Logout') }}</span>

            <v-icon large color="teal darken-2">mdi-account-circle</v-icon>
        </v-btn>
        <v-btn class="ml-auto" to="/login" v-else>
            <span>{{ $t('Login') }}</span>

            <v-icon large color="teal darken-2">mdi-account-circle</v-icon>
        </v-btn>
        <div v-if="token"></div>
        <v-btn to="/register" v-else>
            <span>{{ $t('Register') }}</span>

            <v-icon large color="teal darken-2">mdi-domain</v-icon>
        </v-btn>

    </v-bottom-navigation>

    <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
            <v-list-item-group v-model="group" active-class="cyan--text text--accent-4">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="teal darken-2">mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        <router-link to="/" class="user">{{ $t('Home') }}</router-link>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="teal darken-2">mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        <router-link to="/userlist" class="user" v-if="token">{{ $t('Userlists') }}</router-link>
                        <router-link to="/login" class="user" v-else>{{ $t('Userlist') }}</router-link>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    name: 'Nav',
    data() {
        return {
            drawer: false,
            token: "",
            value: "recent",
            group: null,
            langs: ['en', 'cn'],
        }
    },
    created() {
        let token = localStorage.getItem("token");
        this.token = token;
        console.log(token);

    },
    methods: {

        logout() {
            localStorage.removeItem("token");
            this.$router.push("/");
            // console.log(token);
        },
    },

}
</script>
