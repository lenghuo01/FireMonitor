import {get} from '@/axios.js'
const getVideoData = get('/helloword',{id:1})
console.log(getVideoData)