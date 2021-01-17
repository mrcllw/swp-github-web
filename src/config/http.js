import axios from 'axios'

export const baseURL = 'http://swp-github-api.herokuapp.com/api'
export const http = axios.create({
  baseURL
})
