const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://serviceMan:bMYGJNHipJLmERqv@cluster0.fvnrb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceData = client.db("serviceCollection").collection("service");

    app.get("/services", async (req, res) => {
      const result = await serviceData.find().toArray();
      res.send(result);
    });

    app.post("/addService", async (req, res) => {
      const service = req.body;
      const result = await serviceData.insertOne(service);
      res.send(result);
    });

    app.delete("/serviceDelete/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await serviceData.deleteOne(query);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("db connect");
});
app.listen(port, () => {
  console.log("port", port);
});
