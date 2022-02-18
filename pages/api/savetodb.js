import { connectToDatabase } from "../../libs/mongodb";
import { MongoClient } from "mongodb";

export default async function updateDB(req, res) {
    const requestObject = JSON.parse(req.body);
    console.log(typeof requestObject);
    const filter = {projectName: requestObject.projectName};
    const update = {$set: {roomList: requestObject.roomList}};
    const uri = "mongodb+srv://samuel:Zm4Ch6EdfKxlp3YL@samuel.5dn7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {

        await client.connect();
        const database = await client.db("vadsboDB");
        const vadsbo = await database.collection("vadsbo");
        const matches = await vadsbo.find(filter).count();
        console.log(matches);

        if (matches == 0) {
            const result = await vadsbo.insertOne(requestObject);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            console.log(result)
            res.status(200).json(result)
        } else {
            const result = await vadsbo.updateOne(filter, update);
            console.log(`A document was updated with the _id: ${result.updatedId}`);
            console.log(result)
            res.status(200).json(result)
        }

    } catch (e) {
        res.status(500).json({error: e})
        console.log(e)
    } finally {
        await client.close();
    }
}