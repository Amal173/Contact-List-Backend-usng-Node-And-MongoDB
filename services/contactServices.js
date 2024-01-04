const contact = require("../models/Schema");

// get contact
const getContactData=async(pipeline)=>{
    
    return await contact.aggregate(pipeline);
   
}

// get one contact
const getOneContactData=async(id)=>{
    return await contact.findById(id);
   
}

// create contact
const createContactData=async(updateData)=>{
    const {
        firstName,
        lastName,
        email,
        phonenumber,
        imagepath
      } = updateData;

    return await contact.create({ 
        firstName,
        lastName,
        email,
        phonenumber,
        imagepath})

}


// update contact
const updateContactData=async(id,updateData)=>{
    return await contact.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      )

}


// delete contact
const deleteContactData=async(id)=>{
   return await contact.findByIdAndDelete(id);

}


module.exports={getContactData,getOneContactData,deleteContactData,createContactData,updateContactData}