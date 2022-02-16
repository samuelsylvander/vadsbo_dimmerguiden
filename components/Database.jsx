import { connectToDatabase } from "../libs/mongodb";

export async function getServerSideProps(context) {
    const db = await connectToDatabase();
    const info = db
        .collection("vadsbo")
        .find({});

    return {
        props: {
            info: JSON.parse(JSON.stringify(info))
        }
    }
}