const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
require('./config/config')

const FormDataModel=require('../server/config/schema');
app.post('/form',async (req,res)=>{
    try {
        const formData = req.body;
    
        // Create a new document using the FormDataModel
        const newFormData = new FormDataModel(formData);
    
        // Save the document to the database
        await newFormData.save();
    
        res.status(201).json({ success: true, message: 'successfully.' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }

})
app.get('/',async (req,res)=>{
    try {
        // Fetch all form data from the database
        const formDataList = await FormDataModel.find({});
    
        res.status(200).json({ success: true, data: formDataList });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
})
const port=5000;
app.listen(port,(err)=>{
if(err)console.log(err);
else{
    console.log("server is running on port:",port);
}
})