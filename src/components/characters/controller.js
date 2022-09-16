import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) =>{
    try{
        const characters = await prisma.character.findMany()
        res.json({
            ok: true,
            data:characters
        });
    }catch(error){
        res.json({
        });
    }
};

export const create = async(req,res) => {
    try{
        const { body } = req;
        const character = await prisma.character.create({
            data:{
                ...body
            }
        });
        res.json({
            ok:true,
            data:character
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        });

    }
}
