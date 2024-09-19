import express from "express"
import { AddAuthor } from "../controllers/authorController.js"

const router = express.Router()


router.post('/addauthor',AddAuthor)



export default router