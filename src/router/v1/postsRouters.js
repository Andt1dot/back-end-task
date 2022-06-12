const postRouter = require("express").Router();
const postController = require("../../controller/postsController");
const { tokenValidation } = require("../../middleware/security");
const { validatePost } = require("../../middleware/validation");



//4.bloggers can create posts
postRouter.post("/", tokenValidation, validatePost, postController.createNewPost);

//7.bloggers can see their posts whether they're public or hidden
postRouter.get("/user", tokenValidation, postController.getAllPostsByUser);

//8.bloggers can see posts of other bloggers as long as they're public
postRouter.get("/", tokenValidation, postController.getAllPosts);

//5.bloggers can remove their posts && 10. admins can remove any public post
postRouter.delete("/:post_id", tokenValidation, postController.deleteOnePost);

// 5.bloggers can update their posts && (note) - optional admins can update any public post
postRouter.patch("/:post_id",tokenValidation, validatePost, postController.updateOnePost);

// 6.bloggers can publish and hide their posts
postRouter.put("/status/:post_id", tokenValidation, postController.updateOnePostStatus);

module.exports = postRouter;
