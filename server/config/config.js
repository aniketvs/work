const mongoose=require('mongoose');
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err);
})