const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://vaishnavigurramkonda04_db_user:Vaishu%40799@cluster1.4ahiztr.mongodb.net/?appName=Cluster1";


const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
});


async function run(){

try{

await client.connect();

await client.db("admin").command({
    ping:1
});


console.log("MongoDB Connected Successfully");


}
catch(error){

console.log("Mongo Error:");
console.log(error.message);

}

finally{

await client.close();

}

}


run();