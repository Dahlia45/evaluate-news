const dotenv = require('dotenv');
dotenv.config();
require('regenerator-runtime/runtime');

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const fetch = require("node-fetch")
const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1?'
const KEY = process.env.API_KEY
const PORT = 8081

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    //console.log(`Server listening on port ${PORT}!`)
  })

  let getData = async (url = '') => {
    //console.log('URL -> ', url)
    var request = await fetch(url)
    try {
      // Transform into JSON
      var projectData = await request.json()
      // server log appear in console
      // console.log('El GetData =>', projectData)
      let res = {}
      res.score_tag = projectData.score_tag;
      res.agreement = projectData.agreement;
      res.subjectivity = projectData.subjectivity;
      res.confidence = projectData.confidence;
      res.irony = projectData.irony;
      // server log appear in console
      // console.log("RES 9 ", res)
  
      return res
    }
    catch (error) {
      console.log("error MOST", error);
      // appropriately handle the error
    }
  }
let APIData = {};
app.post('/fetch', async (req, res) => {

  let inputUrl = req.body.url
  let URL = `${BASE_URL}key=${KEY}&url=${inputUrl}&lang=en`
  APIData = await getData(URL)
})
app.get('/data', (req, res) =>res.send(APIData))
console.log(APIData);

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
