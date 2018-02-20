<template>
    <div>
    <b-alert show variant="warning">This is a secure page!</b-alert>
    <b-row>
      <b-col md="8">
        <b-card title="State">
          <pre>{{ state }}</pre>
        </b-card>
      </b-col>

      <b-col md="8">
        <b-card title="Firebase API">
          <pre>{{ posts }}</pre>
        </b-card>
      </b-col>

      <b-col md="4">
        <b-card title="Scopes" class="mb-2">
          User: <b-badge>{{ $auth.hasScope('user') }}</b-badge>
          Test: <b-badge>{{ $auth.hasScope('test') }}</b-badge>
          Admin: <b-badge>{{ $auth.hasScope('admin') }}</b-badge>
        </b-card>
        <b-card title="token">
          {{ $auth.token || '-' }}
        </b-card>
      </b-col>
    </b-row>
    <hr>
    <b-btn-group>
      <b-button @click="addPost">Add Post</b-button>
      <b-button @click="$auth.logout()">Logout</b-button>
    </b-btn-group>
  </div>
</template>

<script>
const apiUrl = 'https://fire-tests.firebaseio.com'

export default {
  async asyncData({ app, store }) {
    const posts = await app.$axios.$get(`${apiUrl}/posts.json?auth=${app.$auth.token}`) || []
    return {
      posts
    }
  },
  middleware: ['auth'],
  computed: {
    state() {
      return JSON.stringify(this.$auth.state, undefined, 2)
    }
  },

  methods: {
    async addPost () {
      const result = await this.$axios.$post(`${apiUrl}/posts.json?auth=${this.$auth.token}`, {
        name: 'Name here',
        attr: 'An attr',
        time: new Date()
      })
    }
  }
}
</script>
