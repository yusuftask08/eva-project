<template>
  <v-app id="inspire">
    <v-container fluid fill-height style="padding: 0px !important">
      <v-layout
        align-center
        justify-center
        style="background-color: #009999"
        class="col-7"
      >
        <v-flex xs12 sm8 md11>
          <h1 class="white--text" style="font-size: 60px">Siemens</h1>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md7>
          <v-card class="elevation-7" style="width: 500px; height: 41vh">
            <v-card-text style="padding: 0 10px 0 16px !important">
              <div class="d-flex align-center justify-center">
                <!-- <img
                  class="mt-8"
                  style="width: 200px"
                  src="@/assets/siemens-logo.png"
                  alt=""
                /> -->
              </div>
              <v-form class="mt-10">
                <v-text-field
                  v-model="user.username"
                  name="login"
                  label="Username"
                  width="90%"
                  class="mr-1"
                  type="text"
                  color="#009999"
                >
                </v-text-field>
                <v-text-field
                  v-model="user.password"
                  id="password"
                  name="password"
                  width="90%"
                  label="password"
                  class="mr-1"
                  type="password"
                  color="#009999"
                  @keydown.enter="login({ ...user }), (loader = 'loading')"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                :disabled="loading"
                width="97%"
                class="white--text ml-1"
                color="#009999"
                style="text-transform: none !important"
                @click="login({ ...user }), (loader = 'loading')"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-layout align-content-end>
            <div v-if="!this.$store.state.success" class="text-center ma-2">
              <v-snackbar
                :right="'right'"
                color="red"
                v-model="snackbar"
                :timeout="timeout"
                class="mb-5"
              >
                <h3>{{ error }}</h3>
              </v-snackbar>
            </div>
            <div v-if="this.$store.state.success" class="text-center ma-2">
              <v-snackbar
                :right="'right'"
                color="green"
                v-model="snackbar"
                :timeout="timeout"
                class="mb-5"
              >
                <h3>{{ text }}</h3>
              </v-snackbar>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loading: false,
      snackbar: false,
      timeout: 2000,
    };
  },

  methods: {
    login() {
      this.$router.push("/");
      // this.loading = true;
      // this.$store.dispatch("Login", { ...this.user }).then(() => {
      //   setTimeout(() => {
      //   }, 1000);
      //   (this.loading = false), (this.snackbar = true);
      // });
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },

    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style >
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
