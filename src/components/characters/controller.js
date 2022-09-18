import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) =>{
        const query =req.query
        const peliculaId=req.query.peliculaId
        console.log(Object.keys(query).length)

        if(Object.keys(query).length===0){
            const characters = await prisma.character.findMany({
                select:{
                    id:true,      
                    name:true,
                    image:true}
            })
            res.json({
                ok: true,
                data:characters
            });
        }else if(peliculaId){
            const characters = await prisma.character.findMany({
                where:{
                    peliculaId:Number(peliculaId)
                },

                select:{
                    id:true,
                    name:true,
                    image:true
                }
            })
            res.json({
                ok:true,
                data:characters
            })
        }
        else{
            const characters = await prisma.character.findMany({
                where:{
                    OR:[
                    {name:req.query.name},
                    {image:req.query.image},
                    ],
                },
                select:{
                    id:true,      
                    name:true,
                    image:true},
            })
            res.json({
                ok: true,
                data:characters
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

export const findMovieName = async(req,res) => {
    try{

    }catch(error){
        res.json({
            ok:false,
            data:error.message
        })
    }
}