const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, (err) => {
  if (err) {console.log(err)}
  console.log('server is runnig ok in port' + port)
})
