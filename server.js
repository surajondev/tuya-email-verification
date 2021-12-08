import express from "express";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()


const app = express()
const port = process.env.PORT || 8000

var code

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/sendcode', async(req, res)=>{
    const tuya = new TuyaContext({
        baseUrl: 'https://openapi.tuyain.com',
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.SECRET_KEY,
      });

    code = Math.floor(Math.random() * 10000)
    if(code<1000){code=code+1000} 
    
    const  data  = await tuya.request({
    method: 'POST',
    path: '/v1.0/iot-03/messages/mails/actions/push',
    body: {
        "to_address": req.body.emailaddress,
        "reply_to_address": "test@example.com",
        "template_id": "MAIL_1624531323",
        "template_param": `{\"code\":\"${code}\"}`
        },
    })


})

app.post('/verify', async(req, res)=>{
    if(req.body.code == code){
        res.send({
            verify:true
        })    
    }
    else{
        res.send({
            verify:false
        })  
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})