import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req, res) =>{
    try{
        const movies = await prisma.movie.findMany()
        res.json({
            ok: true,
            data:movies
        });
    }catch(error){
        res.json({
        });
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
