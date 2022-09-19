import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) =>{
    try{
        const genders = await prisma.gender.findMany({
            select:{
                id:true,
                name:true,
                image:true
            }
        })
        res.json({
            ok: true,
            data:genders
        });
    }catch(error){
        res.json({
        });
    }
};

export const create = async(req,res) => {
    try{
        const { body } = req;
        const gender = await prisma.gender.create({
            data:{
                ...body
            }
        });
        res.json({
            ok:true,
            data:gender
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        });

    }
}