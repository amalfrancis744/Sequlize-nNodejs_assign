import express from "express"
import { AddBooks, countEachGenre, deleteABookWithTitle, getAllBooks, getBooksAfterYear, getBooksByGenre, getTiggredLogs, updateBookGenre, updateBookGenrebyCondition } from "../controllers/bookController.js"
const router = express.Router()

router.post("/addbook",AddBooks)
router.put("/updategenre",updateBookGenre)
router.put("/updatebooks/:id/genre",updateBookGenrebyCondition)
router.delete("/deletespecbook",deleteABookWithTitle)



router.get("/getbook",getAllBooks)
router.get("/getAfterPublished",getBooksAfterYear)
router.get("/counteachgenre",countEachGenre)
router.get('/genre/:genre', getBooksByGenre);
router.get("/getlogs",getTiggredLogs)



export default router