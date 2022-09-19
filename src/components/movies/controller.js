import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const findAll = async (req, res) =>{
    const query = req.query;
    const { gender,order,name } = req.query 
    

    if(Object.keys(query).length===0){
        try{
            const movies = await prisma.movie.findMany({
                select:{
                    id:true,
                    image:true,
                    tittle:true,
                    fecha_creacion:true
                }
            })
            res.json({
                ok: true,
                data:movies
            });
        }catch(error){
            res.json({
            });
        }
    }else if(gender){
        const movies = await prisma.movie.findMany({
            where:{
                genderId:Number(gender)
            },
            select:{
                id:true,
                image:true,
                tittle:true,
                fecha_creacion:true
            }
        })
        res.json({
            ok:true,
            data:movies
        })
    }else if(name){
        const movie = await prisma.movie.findMany({
            where:{
                tittle:name
            },
            select:{
                id:true,
                image:true,
                tittle:true,
                fecha_creacion:true
            }
        })
        res.json({
            ok:true,
            data:movie
        })
    }else if(order){
        const movie = await prisma.movie.findMany({
            orderBy:{
                fecha_creacion:order
            },
            select:{
                tittle:true,
                fecha_creacion:true
            }
        })
        res.json({
            ok:true,
            data:movie
        })
    }
};

export const create = async(req,res) => {
    try{
        const { body } = req;
        const movie = await prisma.movie.create({
            data:{
                ...body
            }
        });
        res.json({
            ok:true,
            data:movie
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        });

    }
}
export const update = async(req,res) =>{
    try{
        const movieId = Number(req.params.id);
        const {image,tittle,calification,fecha_creacion} = req.body;
        const movieUpdate = await prisma.movie.update({
            where:{
                id:movieId
            },
            data:{
                image,tittle,calification,fecha_creacion
            }
        })
        res.json(movieUpdate)
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        })
    }
}

export const remove = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteMovie = await prisma.movie.delete({
            where:{
                id: Number(id)
            }
        })
        res.json({
            ok:true,
            data:"Pelicula eliminada"
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        })
    }
}

export const detail = async(req,res) => {
    try{
        const { id } = req.params;
        const detailMovie = await prisma.movie.findUnique({
            where:{
                id: Number(id)
            },
            include:{
                character:{
                    select:{
                        name:true
                    }
                }
            }
        })
        res.json({
            ok:true,
            data:detailMovie
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message
        })
        
    }
}
