import axios from 'axios'
window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['X-TEST'] = 'test'
window.axios.defaults.params = {}
window.axios.defaults.params.nocache = Date.parse(import.meta.env.VITE_API_LAST_MODIFIED)
