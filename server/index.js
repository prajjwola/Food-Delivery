const express = require('express')
const app = express()
const port = 5000
const userList= [
  'kaylin','ram','gopal'
]
app.get('/users', (req, res) => {
 const searchedUser = userList.filter((item)=>{
    if(item[0] == req.query.initial ) return item
 })

 res.send(searchedUser)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})