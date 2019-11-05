const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const memberCheck = require('./login')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputEmail = req.body.inputEmail
  const inputPassword = req.body.inputPassword
  const errorMsg = '無效密碼。請再試一次'
  if (memberCheck(inputEmail, inputPassword)[0] === true) {
    const name = memberCheck(inputEmail, inputPassword)[1]
    res.render('show', { name })
  } else {
    res.render('index', { errorMsg })
  }

})

app.listen(port, () => {
  console.log(`Express app listening on port:${port}`)
})