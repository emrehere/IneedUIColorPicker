import express from "express";
import {  postColors, getColors, deleteColorById, viaHexDelete } from "../controllers/colorController.mjs";
import requireAuth from "../middleware/requireAuth.mjs"


const router = express.Router();


router.delete('/viahex/:hex', requireAuth, viaHexDelete)

// router.put('/updateColors', updateColors)

// router.put('/anotherUpdateColors', anotherUpdateColors)

router.get('/getColors', requireAuth, getColors)

router.post('/postColors', requireAuth, postColors)

router.delete('/deleteColor/:id', requireAuth, deleteColorById)

// router.put('/updateColor/:id', updateColorById)

// router.put('/updateAllColors', updateAllColors)

// router.delete('/c/:colorValue', deleteColorByValue)


export default router