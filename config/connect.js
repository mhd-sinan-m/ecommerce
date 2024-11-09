const mongoose = require("mongoose")
const mongoUrl = process.env.MONGOURL
const colours = require("../utilities/colours")


const dbConnect  = async ()=>{
  await mongoose.connect(mongoUrl,{dbName:'ecommerce'})
  .then(()=>{
    console.log(colours.magenta +'mongoDb connected successfully on' + colours.black,mongoUrl);
  })
  .catch(()=>{
    console.error(colours.magenta + 'mongoDb error ' + colours.reset);
    
  })
}
module.exports= dbConnect