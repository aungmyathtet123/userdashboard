<template>
<div>
    <v-app>
       <Nav/>
        <h3 class="text-center mt-5">{{ $t('Userlists') }}</h3>
        
        <v-container>
            <v-btn large color="blue lighten-2" class="mb-5" to='/userRegister'>{{ $t('Register') }}</v-btn>
            <v-data-iterator :items="userlists" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
                <template v-slot:header>
                    <v-toolbar dark color="blue darken-3" class="mb-1">
                        <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" :label="$t('Search')"></v-text-field>
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-spacer></v-spacer>
                            <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys" prepend-inner-icon="mdi-magnify" :label="$t('Sort by')"></v-select>
                            <v-spacer></v-spacer>
                            <v-btn-toggle v-model="sortDesc" mandatory>
                                <v-btn large depressed color="blue" :value="false">
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn large depressed color="blue" :value="true">
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </template>
                    </v-toolbar>
                </template>

                <template v-slot:default="props">
                    <v-row>
                        <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="4">
                            <v-card>
                                <v-card-title class="subheading font-weight-bold">
                                    {{ item.username }}
                                    <v-btn class="ml-auto" @click="ban(item.account_id,item.status)" v-if="item.status==0">
                                        <v-icon large color="red">
                                            mdi-checkbox-marked-circle
                                        </v-icon>
                                        {{ $t('Ban') }}
                                    </v-btn>

                                    <v-btn class="ml-auto" @click="unban(item.account_id,item.status)" v-else>
                                        <v-icon large color="red">
                                            mdi-cancel
                                        </v-icon>
                                        {{ $t('UNBan') }}
                                    </v-btn>
                                </v-card-title>

                                <v-divider></v-divider>

                                <v-list dense>
                                    <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                                        <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                                            {{ key }}:
                                        </v-list-item-content>
                                        <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">
                                            {{ item[key.toLowerCase()] }}
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <span class="grey--text">{{ $t('Items per page') }}</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                                    {{ itemsPerPage }}
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)">
                                    <v-list-item-title>{{ number }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <v-spacer></v-spacer>

                        <span class="mr-4 grey--text">
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </v-app>
</div>
</template>

<script>
import axios from "axios";
import Nav from './Nav';
export default {
    name: "Userlist",
    components:{Nav},
    data() {
        return {
            
            token: "",
            itemsPerPageArray: [3, 9, 12, 15, 18],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 9,
            sortBy: 'name',
            userlists: [],
            keys: [
                'Account_id',
                'Created_at',
            ],

        };
    },
    created() {
        this.initialize()
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.userlists.length / this.itemsPerPage)
        },
        filteredKeys() {
            return this.keys.filter(key => key !== 'Name')
        },
    },
    methods: {
        initialize() {
            axios
                .get("http://api.sky-name-login.com/api/user/getalluser")
                .then((response) => {
                    console.log(response);
                    let token = localStorage.getItem("token");
                    this.token = token;
                    console.log(token);
                    this.userlists = response.data.data;
                });
        },

       
        ban(account_id, status) {
            console.log(status)
            axios
                .get("http://api.sky-name-login.com/api/setting/banuser", {
                    params: {
                        accid: account_id
                    }
                })
                .then((response) => {
                    console.log(response);
                });

            this.$router.go()

        },

        unban(account_id, status) {
            console.log(status)
            axios
                .get("http://api.sky-name-login.com/api/setting/unbanuser", {
                    params: {
                        accid: account_id
                    }
                })
                .then((response) => {
                    console.log(response);
                });

            this.$router.go()

        },

      

        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },

      
    },

};
</script>

