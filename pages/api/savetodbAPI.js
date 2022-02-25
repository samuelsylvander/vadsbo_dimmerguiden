import { connectToDatabase } from "../../libs/mongodb";
import { ObjectId } from "mongodb";

export default async function updateDB(req, res) {
    const requestObject = JSON.parse(req.body);

    try {
        const { client, db } = await connectToDatabase();
        const vadsbo = await db.collection("projects");

        if (!requestObject.id) {
            const result = await vadsbo.insertOne(requestObject);
            console.log(result)
            res.status(200).json(result) 
            res.send()

        } else {
            const filter = {_id: new ObjectId(requestObject.id)};
            // const update = {$set: {roomList: requestObject.roomList}};
            const result = await vadsbo.replaceOne(filter, requestObject);
            console.log(result)
            res.status(200).json(result)
            res.send()
        }
    } catch (e) {
        res.status(500).json({error: e})
        console.log(e)
        res.send()
    }
}