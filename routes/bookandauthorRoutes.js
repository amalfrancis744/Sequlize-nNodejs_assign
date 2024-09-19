import express from 'express'
import { getBookAndAuthor, getBooksByAuthorByBirthYear } from '../controllers/bookandauthorControllers.js'
const router = express.Router() 




router.get("/getjoindata",getBookAndAuthor)
router.get("/getbookbybirthyear",getBooksByAuthorByBirthYear)

export default router