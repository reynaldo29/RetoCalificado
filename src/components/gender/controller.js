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

export const update = async(req,res) => {
    try{
        const genderId= Number(req.params.id);
        const {name,image} = req.body;
        const character = await prisma.gender.update({
            where:{
                id:genderId
            },
            data:{
                name,image
            }
        })
        res.json(character)
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        });
    }
}

export const remove = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteGender = await prisma.gender.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({
            ok:true,
            data:"genero eliminado"
        })

    }catch(error){
        res.json({
            ok:false,
            data:error.message
        });
    }
}