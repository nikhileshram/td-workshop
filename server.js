const express = require('express')
const fs = require('fs')
const filename = "./db.json"

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', function showfile(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/add', (req,res) => {
    var data = JSON.parse(fs.readFileSync(filename))
    let user = req.body
    data.users.push(user)
    fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) => {
        res.send('user added!')
    })
})

app.post('/delete', (req,res) => {
    var data = JSON.parse(fs.readFileSync(filename))
    let user = req.body
    let rno = req.body.rno
    data.users.forEach(user => {
        if(user.rno === rno){
            user.splice()
        }
    });
    fs.writeFileSync(filename, JSON.stringify(data, null, '\t'))
})
app.listen(3333)