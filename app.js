const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const memberCheck = require('./login')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
// 使用 session 中介軟體
app.use(session({
  secret: 'secret', // 對session id 相關的cookie 進行簽名
  resave: true,
  saveUninitialized: false, // 強制將未初始化的session存回 session store，未初始化的意思是它是新的而且未被修改。
  cookie: {
    maxAge: 1000 * 60 * 3, // 設定 session 的有效時間，單位毫秒
  },
}));


app.get('/', (req, res) => {
  if (req.session.userName) { //判斷session 狀態，如果有效，則返回主頁，否則轉到登入頁面
    res.render('show', { name: req.session.userName })
  } else {
    res.render('index')
  }
}

)

app.post('/', (req, res) => {
  const inputEmail = req.body.inputEmail
  const inputPassword = req.body.inputPassword
  const errorMsg = '無效密碼。請再試一次'
  if (memberCheck(inputEmail, inputPassword).length > 0) {
    const name = memberCheck(inputEmail, inputPassword)
    req.session.userName = name // 登入成功，設定 session
    console.log(req.sessionID)
    res.render('show', { name })
  } else {
    res.render('index', { errorMsg })
  }

})

app.get('/logout', (req, res) => {
  // 刪除session
  req.session.destroy(function (err) {
    // cannot access session here
    console.log(req.session)
  })
  res.redirect('/');
});

app.get('/cart', (req, res) => {
  res.render('cart')
})

app.get('/member', (req, res) => {
  res.render('member')
})

app.listen(port, () => {
  console.log(`Express app listening on port:${port}`)
})