import axios from 'axios'

export const baseURL = 'https://swp-github-api.herokuapp.com/api'
export const http = axios.create({
  baseURL
})
