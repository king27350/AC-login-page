// data
const users = [{
  firstName: 'Tony',
  email: 'tony@stark.com',
  password: 'iamironman'
},
{
  firstName: 'Steve',
  email: 'captain@hotmail.com',
  password: 'icandothisallday'
},
{
  firstName: 'Peter',
  email: 'peter@parker.com',
  password: 'enajyram'
},
{
  firstName: 'Natasha',
  email: 'natasha@gamil.com',
  password: '*parol#@$!'
},
{
  firstName: 'Nick',
  email: 'nick@shield.com',
  password: 'password'
}
]

//identify user
// example  { inputEmail: 'tony@stark.com', inputPassword: 'iamironman' }
function memberCheck(inputEmail, inputPassword) {
  // check email first from our data, if not exist show alert
  let found = users.find(function (item) {
    return item.email === inputEmail
  })
  // check password 
  if (found === undefined) {
    return ''
  }
  else if (found.password === inputPassword) {
    console.log('login success')

    return found.firstName
  } else {
    console.log('wrong email and password')
    return ''
  }

}

//console.log(memberCheck('tony@stark.com', 'iamironman'))
module.exports = memberCheck