import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const findAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      ok: true,
      data: users,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const {body} =req;
    bcrypt.hash(body.password,15,async(error,hash)=> {
      if(error){
        return res.status(500)
        .send({message:error})
      }else{
        const user = await prisma.user.create({
          data: {
            name:body.name,
            email:body.email,
            password:hash,
            phone_number:body.phone_number
          },
        });
        res.json({
          ok: true,
          data: user,
        });
      }
    })

  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};

export const login = async (req,res) => {
  try{
    const {body} = req;

    const user = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })

    if(!(body.email && body.password)){
      res.status(400).send("enter email and password");
    }
    if(await bcrypt.compare(body.password,user.password)){
      const token = jwt.sign(body.email,"KEY")
      return res.status(200).send({
        msg:'Logged',
        token
      })
    }else{
      res.status(403).send("Invalid credentials");
    }
  }catch(err){
    console.log(err)
  }
}