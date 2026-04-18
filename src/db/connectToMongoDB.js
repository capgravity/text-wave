import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_DB_URI;
		if (!mongoUri) {
			throw new Error("Missing MongoDB URI. Set MONGO_URI in your .env");
		}

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB")
    }
    catch (error) {
        console.log("Error connecting to database.", error.message)
    }

}

export default connectToMongoDB;