const express=require('express')
const router=express.Router()

const restore=require('../controllers/restore.controllers')
router.get('/',restore.getAllRestore)

module.exports=router