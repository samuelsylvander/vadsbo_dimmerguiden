import { connectToDatabase } from "../../libs/mongodb";
import { ObjectId } from "mongodb";

export default async function updateDB(req, res) {
	const requestObject = JSON.parse(req.body);
	delete requestObject._id;

	try {
		const { db } = await connectToDatabase();
		const vadsbo = await db.collection("projects");

		if (!requestObject.project_id) {
			const result = await vadsbo.insertOne(requestObject);
			// console.log(result);
			res.status(200).json(result);
			res.send();
			await vadsbo.updateOne({ _id: result.insertedId }, { $set: { project_id: result.insertedId } });
			console.log("updated id to: " + result.insertedId);
		} else {
			const filter = { _id: new ObjectId(requestObject.project_id) };
			// const update = {$set: {roomList: requestObject.roomList}};
			const result = await vadsbo.replaceOne(filter, requestObject);
			console.log(result);
			res.status(200).json(result);
			res.send();
		}
	} catch (e) {
		res.status(500).json({ error: e });
		console.log(e);
		res.send();
	}
}
