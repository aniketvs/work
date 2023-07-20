const mongoose=require('mongoose');
//const url="mongodb+srv://Aniketvs:Aniketsharma2111@cluster0.y4m5vhn.mongodb.net/?retryWrites=true&w=majority"mongodb+srv://Aniketvs:Aniketsharma2111@cluster0.y4m5vhn.mongodb.net/my_database?retryWrites=true&w=majority";

const url = "mongodb+srv://Aniketvs:Aniketsharma%402111@cluster0.y4m5vhn.mongodb.net/portfolio?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err);
})