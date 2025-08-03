const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion réussie à MongoDB"))
  .catch((err) => console.error("Erreur de connexion : " + err));

module.exports = mongoose;
