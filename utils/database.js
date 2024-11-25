import mongoose from 'mongoose'
let iscon = false

export const connectToDb = async()=>{
    mongoose.set('strictQuery' , true)
    if(iscon){
        console.log('Database is connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName :"share_prompt",
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        iscon = true
        console.log('Connected')
    } catch (error) {
        console.log(error)
    }
}