const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./config')

const PORT = 8000
const app = express()




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/login', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }

    const existingUser = await collection.findOne({ email: data.email })
    if (!existingUser) {
        res.send("user not registered")
    }
    else {

        const isPassword = await bcrypt.compare(data.password, existingUser.password)
        if (isPassword) {
            res.render('home')

        }
    }
})
app.post('/signup', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }

    const existingUser = await collection.findOne({ email: data.email })
    if (existingUser) {
        res.send("user already registered")
    }
    else {

        const hashPass = await bcrypt.hash(data.password, 10)
        data.password = hashPass

        const userData = await collection.insertMany(data)
        console.log(userData)
        res.send("successful")
    }
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})