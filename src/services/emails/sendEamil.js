import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";


export const sendEamil = async (email) =>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "mmeegoo20@gmail.com",
          pass: "peedgxkjgpoajcgm",
        },
      });
      let token = jwt.sign({email},"sendingEmails")
      const info = await transporter.sendMail({
        from: '"Mego 👻" <mmeegoo20@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        
        html: emailTemplate(token), // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}


// const verify = catchError((req,res)=>{
//   jwt.verify(req.params.token,"sendingEmails",async(err,decoded)=>{
//     if(err){
//       return res.status(403).json({message:"Token expired"})
//     }
//     await userModel.findOneAndUpdate({email:decoded.email},{verifyEamil: true})
//   res.json({message:"success"})
//   })
  
// })