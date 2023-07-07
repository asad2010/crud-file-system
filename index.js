const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001
const functions = require('./functions')
var jsonParser = bodyParser.json()
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//thunder
app.get('/:id', functions.getOneInfo)   
app.post('/', functions.addInfo)
app.patch('/:id', functions.updInfo)
app.delete('/:id', functions.deleteInfo)
// dom
app.get('/', functions.getInfo)
app.post('/add', functions.add)
app.get('/delete/:id', functions.delete)
// app.get('/edit/:id', functions.update) 





app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})