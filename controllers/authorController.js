import Author from "../models/author.js";

export const AddAuthor = async (req, res) => {
  try {
    const { name, birth_year } = req.body;

    if (!name || !birth_year) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }



    const checkAuthor = await Author.findOne({ where:{
        name:name
    } });

    if (checkAuthor) 
    {
        return res.status(409).json({ message: "Author already exists" });
    }

    const author = await Author.create({
      name,
      birth_year,
    });

    res.status(201).json({ message: "Author added successfully", author: author });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};