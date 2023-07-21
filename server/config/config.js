const mongoose=require('mongoose');
const url = "mongodb+srv://Aniketvs:Aniketsharma%402111@cluster0.y4m5vhn.mongodb.net/portfolio?retryWrites=true&w=majority" // put your connection string
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err);
})