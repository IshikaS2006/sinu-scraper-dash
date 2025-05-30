const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB;
const COLLECTION_NAME = process.env.MONGO_COLLECTION;

let cachedClient = null;

async function connectToDatabase() {
  // using cache
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const websites = await db.collection(COLLECTION_NAME).find({}).toArray();
    console.log("data: ", websites);

    const data = websites.map((website) => ({
      url: website.sourceUrl,
      name: website.sourceUrl,
      email: website.email?.[0] || "",
      phone: website.phone?.[0] || "",
      phones: website.phone || [],
      emails: website.email || [],
      otherLinks: website.otherLinks || [],
      savedAt: website.savedAt,
      _id: website._id,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching websites:", error);
    res.status(500).json({ error: "Failed to fetch websites" });
  }
}
