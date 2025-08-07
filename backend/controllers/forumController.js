const Forum = require('../models/articleModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Forum.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des posts.' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Forum.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post non trouvé.' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération du post.' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newPost = new Forum({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la création du post.' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Forum.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post non trouvé.' });
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour du post.' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Forum.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post non trouvé.' });
        }
        res.json({ message: 'Post supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression du post.' });
    }
};