const express = require('express')
const app = express()


require('dotenv').config()

// const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
// const authToken = 'your_auth_token';

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

app.use(express.json())

const PORT=8080;


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome to my API",

    })
})

app.get("/sendotp", async(req,res)=>{
    // generate number of 6 digit in js
    const otp = Math.floor(100000 + Math.random() * 900000);

    try {
        const message = await client.messages.create({
          body: otp,
          to: '+917897985449',
          from: '+13206160818',
        });
        res.status(200).json({ message: "OTP sent successfully",otp:otp });
      } catch (error) {
        // You can implement your fallback code here
        res.status(500).json({ message:error.message });
        console.error(error);
      }
  
})

app.listen(PORT,()=>{
    console.log("Server is rumming at 8080")
})