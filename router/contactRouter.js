const express=require('express')
const router=express.Router();
const {getContact,createContacts,getContactByID,editContact,deleteContact}=require('../Controller/Controller');
router.route("/").get(getContact);
router.route("/").post(createContacts);
router.route("/:id").get(getContactByID);
router.route("/:id").put(editContact);
router.route("/:id").delete(deleteContact);


module.exports=router;