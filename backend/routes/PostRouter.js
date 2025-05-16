const express = require("express");
const Post = require("../database/postModel");
const router = express.Router();
router.post("/posts", async (request, response) => {
    const post = new Post(request.body);
    try {
        await post.save();
        response.send(post);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get("/posts", async (request, response) => {
    try {
        const posts = await Post.find({});
        response.send(posts);
    } catch (error) {
        response.status(500).send({ error });
    }
});

router.get("/posts/:slug", async (request, response) => {
    try {
        const post = await Post.findOne({ slug: request.params.slug });
        response.send(post);
    } catch (error) {
        response.status(500).send({ error });
    }
});

router.patch("/posts/:slug", async (request, response) => {
    try {
        const post = await Post.findByIdAndUpdate(request.params.slug,
            request.body,);
        await post.save();
        response.send(post);
    } catch (error) {
        response.status(500).send({ error });
    }
}); 

router.delete("/posts/:slug", async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.slug);
        if (!post) {
            return response.status(404).send("Post wasn't found");
        }
        response.status(204).send();
    } catch (error) {
        response.status(500).send({ error });
    }
});

module.exports = router;