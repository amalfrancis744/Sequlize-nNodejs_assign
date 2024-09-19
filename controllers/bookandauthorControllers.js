
import { Op } from "sequelize"
import models from "../models/index.js"

const {Book,Author} = models


export const getBookAndAuthor = async(req,res)=>{

    try{

        const result = await Book.findAll({

            include:[
                {

                    model:Author,
                    as:"authorDetailes",
                    attributes:['name','birth_year']
                },
            ],
            attributes:['title','author','published_year','genre']
        }) 
        console.log("this is data",result)
        

        res.json({messgae:"data found successfull",data:result})

    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({messgae:"server side error"})
    }
} 


export const getBooksByAuthorByBirthYear = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: ['title'],
            include: [
                {
                    model: Author,
                    as: 'authorDetailes',
                    where: {
                        birth_year: { [Op.lt]: 2000 }
                    },
                    attributes: []
                }
            ]
        })
        const titles = await books.map(book => {
            return book.title
        })

        res.json({ message: "data fetched successfully", data: titles })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server side error" })
    }
}