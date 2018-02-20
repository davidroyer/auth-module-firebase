<template>
<div>
  <h2>Login</h2>
  <hr>
  <b-alert v-model="hasError" dismissible variant="danger">Please check credentials.</b-alert>
  <b-alert show v-if="redirect">
    You have to login before accessing to <strong>{{ redirect }}</strong>
  </b-alert>
  <form id="login-form" @keydown.enter="handleLogin">
    <b-form-group label="Email">
      <b-input type="email" v-model="email" placeholder="Your Email..." required ref="email" />
    </b-form-group>

    <b-form-group label="Password">
      <b-input type="password" v-model="password" required placeholder="Your Password..." />
    </b-form-group>

    <div class="text-right">
      <b-btn-group>
        <b-btn @click="handleLogin" variant="outline-primary" size="lg">Login with Firebase</b-btn>
      </b-btn-group>
    </div>
  </form>
</div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      email: '',
      password: '',
      hasError: false
    }
  },
  computed: {
    redirect() {
      return this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect)
    },
    loginData() {
      const data = {
        email: this.email,
        password: this.password
      }
      return data
    }
  },
  mounted() {
    this.$refs.email.focus()
  },
  methods: {
    async handleLogin() {
      return this.$auth.loginWith('firebase', this.loginData)
      .catch(e => {
        this.hasError = true
      })
    }
  }
}
</script>

<style>
  #login-form {
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
