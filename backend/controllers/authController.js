// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Cet email est déjà utilisé" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: "Utilisateur créé avec succès" });
//     } catch (err) {
//         res.status(500).json({ message: "Erreur serveur" });
//     }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Identidiants invalides" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Identifiants invalides" });
//   } catch (err) {
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

// exports.verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Token manquant ou invalide" });
//     }
//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Token invalide" });
//     }
// };

// Nouvelle version sans verifyToken

const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur : " });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Identifiants invalides" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Identifiants invalides" });

        // Ici, vous pouvez générer un token ou simplement répondre avec succès
        res.status(200).json({ message: "Connexion réussie" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};