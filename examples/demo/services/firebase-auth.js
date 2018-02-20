import Cookie from "js-cookie";
import axios from 'axios'

export default class FirebaseScheme {
  constructor (auth, options) {
    this.auth = auth
    this.apiKey = options.apiKey
    this.projectId = options.projectId

    this.authBaseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
    this.loginUrl = `${this.authBaseUrl}/verifyPassword?key=${this.apiKey}`
    this.userUrl = `${this.authBaseUrl}/getAccountInfo?key=${this.apiKey}`

    // -- Assign defaults and normalize options --
    this.options = Object.assign({
      returnSecureToken: true
    }, options)

  }

  mounted () {
    this.auth.syncToken()
  }

  async login (userData) {
    const loginRequestData = Object.assign({}, this.options, userData)
    const {data} = await axios.post(this.loginUrl, loginRequestData)
    this.auth.setToken(data.idToken)
    this.auth.fetchUser(data)
  }

  async fetchUser () {
    if (!this.auth.token) {
      return Promise.resolve()
    }
    const {data} = await axios.post(this.userUrl, {idToken: this.auth.token})
    this.auth.setUser(data.users[0])
  }
}
