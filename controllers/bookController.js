import { col, fn, Op } from "sequelize";

import Book from "../models/book.js";
import sequelize from "../config/db.js";




// This route for Insert books to database

export const AddBooks = async(req,res)=>{

    try{

        const {title,author,published_year,genre} =req.body


        if(!title || !author|| !published_year || !genre){
            return res.status(400).json({message:"Please fill all the fields"})
        }
       const checkBook = await Book.findOne({
        where:{
            title:title
        }

       })

       if(checkBook) return res.status(409).json({message:"book already have"})

        const book = await Book.create({
            title,
            published_year,
            author,
            genre
        })
        res.status(201).json({message:"Book added successfully",book:book});


    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({messgae:"Internal Server Error"})

    }

}

// This route for get all books
export  const  getAllBooks = async (req,res)=>{

    try{
       
        const books = await Book.findAll()

        if(!books)
        {
            return res.json({message: "No bboks found"})
        }
        res.status(200).json(books)

    }
    catch(error)
    {
        console.log(error)
    }
} 

// get title and author with speic publsihed year
export const getBooksAfterYear = async (req,res)=>{
    try{

        const books = await Book.findAll({

            attributes:["title","author"],
            where:{
                published_year:{[Op.gt]:1950}
            }
        }) 

        res.json(books)


    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const  updateBookGenre = async (req,res)=>{

    try{

        const {title,newGenre} =req.body
        if(!title || !newGenre)
        {
            return res.status(400).json({message: "Please provide both title and new genre"})
        }
         const book = await Book.findOne({where:{title}});
         if(!book)
         {
            return res.status(404).json({message:"Book not found"})
         }

         await book.update({genre:newGenre})
         res.json({message: "Book genre upadted successfully"})


    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
} 

export const deleteABookWithTitle = async (req,res)=>{

    try{

        const {title} = req.body

        if(!title) return res.status(400).json({message:"please fill title"})

        const book = await Book.findOne({where:{title}})

        if(!book) return res.status(404).json({message:"Book not found"})
        
        await Book.destroy({ where: { title } });

        res.json({message:"Book Deleted Successfully"})
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const countEachGenre = async (req,res)=>{

    try{
        const genres = await Book.findAll({
            attributes: ['genre', [fn('COUNT', col('genre')), 'count']],
            group: 'genre',
          });


    res.json(genres);

    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Server have some issue"})
        
    }
}

export const  getBooksByGenre = async (req,res)=>{

    try{

        const genre = req.params.genre;

        const [...results] = await sequelize.query('CALL GetBooksByGenre(:genre)',{

            replacements:{genre:genre},
        })

        console.log("check data",results)

        res.json({
            messgae:"Books retrived successfully",
            data:results
        })

    }
    catch(error)
    {
        console.log(error)
    }
}


export const updateBookGenrebyCondition = async (req,res)=>{

    try{
    
        const {id} =req.params
        const {newGenre}= req.body

        const book =await Book.findByPk(id)

     if(!book)
     {
        return res.status(404).json({message:"Book not found"})
     }
     const oldGenre = book.genre;
     book.genre = newGenre
     await book.save()
     res.json({
        message: 'Book genre updated successfully',
        oldGenre,
        newGenre,
    });

    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({messgae:"server error have"})
    }
} 


export const getTiggredLogs = async (req,res)=>{

    

     try {
            const [results] = await sequelize.query('SELECT * FROM books_logs ORDER BY change_timestamp DESC');
            res.status(200).json(results);
        } 

  
        catch (error) {
            console.error('Error fetching logs:', error);
            res.status(500).json({ error: 'An error occurred while fetching logs.' });
        }
}

