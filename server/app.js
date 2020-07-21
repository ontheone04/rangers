const express = require('express')
const app = express()
const models = require('./models')
const cors = require('cors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


app.use(express.static('public'))
app.use(cors())
app.use(express.json())





app.post('/api/rangers/registration',async (req,res) => {

    
    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 10) 
    const newUser = models.User.build({
        username: username, password: password
    })
newUser.save().then( resp =>  res.send(resp)).catch(error => res.send(error))



})
app.post('/api/rangers/addToCollection',async (req,res) => {
    //console.log("line33",req.body.rangerid)
   // console.log(req.headers.authorization.split(" ")[1])
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'d33pd0wn')
   // console.log(verify.userid)
    const userid = verify.userid
    const rangerid = req.body.rangerid
    const newranger = models.Userranger.build({userid:userid, rangerid:rangerid})
    newranger.save().then((resp)=>res.send(resp)).catch((error)=>res.send(error))
    
})

app.post('/api/rangers',async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const persistedUser = await models.User.findOne({
        where:{
            username: username
        }
    })
if (persistedUser) {
    const isUser = await bcrypt.compare(password, persistedUser.password)
    if (isUser) {
        const token = jwt.sign({username: username, userid:persistedUser.id},'d33pd0wn')
        res.send({token: token, success: true, user: persistedUser})

    } else {res.send({success: false})}
}else {res.send({success: false})}

    //const persistedUser = users.find(user => {
       // return(user.username == username && user.password == password)
    //})

    //if(persistedUser) {

       // const token = jwt.sign({username: username},'d33pd0wn')
       // console.log(token)



        //res.json({success: true, token: token})

  //  } else {
        //res.json({success: false})

  //  }

    

})

app.get('/api/rangers/getCollection',async(req,res) => {
    console.log("bout to get collection")
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'d33pd0wn')
    const userid = verify.userid
    console.log(userid)
    const myrangers = await models.User.findAll({
        where: {
            id: userid 
        }, 
        include: [
        {
            model: models.Rangerz,
            as: "rangers"

        }]
    })
     console.log(myrangers[0].rangers)
    res.send(myrangers[0].rangers)
})

app.get('/api/rangers/:id',async (req,res) => {
    const id = req.params.id
    const rangers = await models.Rangerz.findAll({
        where: {
            id: id
        }
    })
    res.json(rangers)
})

// app.get('/api/rangers/:series',async (req,res) => {
//     const series = req.params.series
//     const rangers = await models.Rangerz.findAll({
//         where: {
//             series: series
//         }
//     })
//     res.json(rangers)
// })

app.get('/api/rangers',async (req,res) => {
    
    let rangers = [] 
   
    let search = req.query.search
    if(search) {
        rangers = await models.Rangerz.findAll({
            where: {
               name: {
                   [Op.iLike]: `%${search}%`
               }
            }
        })
        // search for a particler power ranger 
        console.log(rangers)
    } else {
        rangers = await models.Rangerz.findAll() 
    }
        console.log(search)

//    let rangers =await models.Rangerz.findAll()

    res.json(rangers)
})





app.listen(3001,() => {

    console.log('Its Morphin Time')
})