import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL!).then(() => {
            console.log("db connected")
        }).catch((error) => {
            console.log(error.message);
            process.exit()
        })
    } catch (error) {
        console.log("something went wrong");

    }

}

export default connect