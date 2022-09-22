import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) =>{
        const query =req.query
        const { movies,image,name,age}=req.query

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
        }else if(movies){
            const characters = await prisma.character.findMany({
                where:{
                    peliculaId:Number(movies)
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
        } else if(age){
            const actualDate= new Date();
            const yearBirth = actualDate.getFullYear()-Number(age);
            const birth = new Date(yearBirth)
            birth.setFullYear(yearBirth)
            birth.setDate(31)
            birth.setMonth(10)
            
            const birth2 =new Date(birth)
            birth.setDate(0)
            birth.setMonth(0)
            birth2.setHours(42)
            birth2.setMinutes(59)
            birth2.setSeconds(59)

            const fecha = await prisma.character.findMany({
                where: {
                    date_birth:{
                       gte:birth,
                        lte:birth2
                    }
                },
                select:{
                    name:true,
                    date_birth:true
                    
                }
            })
            console.log(birth)
            console.log(birth2)
            res.json({
                ok:true,
                data:fecha
            }) 
        }else{
            const characters = await prisma.character.findMany({
                where:{
                    OR:[
                    {name:name},
                    {image:image},
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

