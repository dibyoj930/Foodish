const mongoose = require("mongoose");
const { MongoClient } = require('mongodb')
const mongoURI = "mongodb+srv://Dibyo1:12345@cluster0.qbc4mjh.mongodb.net/mernfood?retryWrites=true&w=majority"
const databaseName = 'mernfood'
const client = new MongoClient(mongoURI);
const mongoDB = async () => {
      
      let result = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
          })
          db = await mongoose.connection.db
          collection = db.collection('fooddb');
          let res = await collection.find({}).toArray()
          //console.log(res);
          if(res){
            global.fooddb = res;
          console.log(global.fooddb);
          }

      /*
      let result = await client.connect();
      db = result.db(databaseName);
      collection = db.collection('fooddb');
      await collection.find({}).toArray((err,data)=>{
          if(err)console.log(err);
          global.fooddb = data;
          console.log(global.fooddb);
      });
      */
      new_coll = db.collection("Foodcat");
      let new_data = await new_coll.find({}).toArray();
      if(new_data){
            global.fooditems = new_data;
            console.log(global.fooditems);
      }



}

module.exports = mongoDB;

