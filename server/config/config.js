const mongoose=require('mongoose');
const url = "put you url please" // put your connection string
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err);
})