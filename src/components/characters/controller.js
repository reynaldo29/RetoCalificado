import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) =>{
    try{
        const characters = await prisma.character.findMany({
            select:{      
                name:true,
                image:true}
        })
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
export const update = async(req,res) => {
    try{
        const characterId= Number(req.params.id);
        const {name,date_birth,image,weight,history} = req.body;
        const character = await prisma.character.update({
            where:{
                id:characterId
            },
            data:{
                name,date_birth,image,weight,history
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
        const deleteCharacter = await prisma.character.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({
            ok:true,
            data:"Personaje eliminado"
        })

    }catch(error){
        res.json({
            ok:false,
            data:error.message
        });
    }
}
export const detail = async(req,res) => {
    try{
        const { id } = req.params;
        const detailCharacter = await prisma.character.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                pelicula:{
                    select:{
                        tittle:true
                    }
                }
            }
                
            
        })
        res.json({
            ok:true,
            data:detailCharacter
        })


    }catch(error){
        res.json({
            ok:false,
            data:error.message
        })
    }
}