import axios from "axios"

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

export default {
    GET() {

    },

    members: {
        get() {
            return axios.get('/members')
        },
        add(data) {
            return axios.post('members/add', data)
        }
    }
}
