const asyncHandler = require("express-async-handler");
const multer = require("multer");
const upload = require("../middleware/multer");
const path = require("path");
const { getContactData, getOneContactData, deleteContactData, createContactData, updateContactData } = require('../services/contactServices')


//get contact
const getContact = asyncHandler(async (req, res) => {
  let { page, size, search } = req.query;
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  let pipeline = [];
  let pipelineCount = [];

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phonenumber: { $regex: search, $options: 'i' } },
        ]
      }
    });
  }

  pipeline.push(
    { $skip: skip },
    { $limit: limit },
  );

  pipelineCount.push(
    { $count: "totalCount" },
  );

  const contacts = await getContactData(pipeline)
  const contactsCount = await getContactData(pipelineCount)

  res.status(200).json({ contacts, contactsCount });
});


//post contact
const createContacts = asyncHandler(async (req, res) => {
  console.log("the request body is:", req.body);
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: "img upload error" });
    } else if (err) {
      res.status(500).json({ message: "server error" });
    } else {
      const {
        firstName,
        lastName,
        email,
        phonenumber,

      } = req.body;

      console.log("file", req.file);
      const imagepath = req.file ? req.file.path : null;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !phonenumber
      ) {
        res.status(400);
        throw new Error("All fields are mandatory");
      }

      const updateData = { firstName, lastName, email, phonenumber, imagepath }

      try {
        const newContact = await createContactData(updateData)
        res.status(201).json({ newContact });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  });
});

//get contact by id
const getContactByID = asyncHandler(async (req, res) => {
  const contacts = await getOneContactData(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json({ contacts });
});

//put contact
const editContact = asyncHandler(async (req, res) => {
  console.log("req.body::", req.body);
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: "img upload error" });
    } else if (err) {
      res.status(500).json({ message: "server error" });

    }
    
    let image;
    if (req.file) {
      image = path.join("uploads", req.file.filename);
    }
    else {
      const contacts = await getOneContactData(req.params.id);
      if (!contacts) {
        res.status(404);
        throw new Error("contact not found");
      }
      image = contacts.imagepath;
    }
    const updateData = {
      ...req.body,
      ...(image ? { imagepath: image } : {}),
    };
    const editedcontact = await updateContactData(req.params.id, updateData);
    res.status(200).json({ editedcontact });

  });
});
//delete contact
const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await deleteContactData(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("contact not found");
  }

  res.status(200).json({ contacts });
});


module.exports = {
  getContact,
  createContacts,
  getContactByID,
  editContact,
  deleteContact,
};
