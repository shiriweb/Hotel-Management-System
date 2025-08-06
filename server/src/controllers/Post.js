import cloudinary from "../config/Cloudinary.js";
import { Post } from "../models/Post.js";
import slugify from "slugify";

export const createPostController = async (req, res) => {
  try {
    const {
      title,
      hotelLocation,
      description,
      category,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
    } = req.body;

    const files = req.files?.images;

    // Validation for required fields except images and slug
    if (
      !title ||
      !hotelLocation ||
      !description ||
      !category ||
      !isAvailable ||
      !guest ||
      !price ||
      !nearArea ||
      !facilities
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate images uploaded via files
    if (!files || files.length !== 3) {
      return res.status(400).json({
        message: "You must provide exactly 3 images",
      });
    }

    // Upload images to Cloudinary and get URLs
    const imageUrls = await Promise.all(
      files.map((file) =>
        cloudinary.uploader
          .upload(file.tempFilePath) // <-- make sure your file path property matches here
          .then((result) => result.secure_url)
      )
    );

    // Create slug from title
    const slug = slugify(title, { lower: true });

    // Create new post document
    const newPost = new Post({
      title,
      hotelLocation,
      description,
      category,
      images: imageUrls,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
      slug,
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error in createPostController:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getPostController = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .select("-images")
      .populate("category");
    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error getting the post",
      error,
    });
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).send({
      success: true,
      message: "POsts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting all posts",
      error,
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      hotelLocation,
      description,
      nearArea,
      price,
      isAvailable,
      facilities,
      guest,
      category,
    } = req.body;
    const files = req.files?.images;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Validate the fields
    if (
      !title &&
      !hotelLocation &&
      !description &&
      !nearArea &&
      !price &&
      !isAvailable === undefined &&
      !facilities &&
      !guest &&
      !category &&
      !files
    ) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    let uploadImage = post.images;
    if (files && files.length === 3) {
      await Promise.all(
        post.images.map((url) => {
          const publicId = url.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(publicId);
        })
      );
      // Upload new images
      uploadImage = await Promise.all(
        files.map((file) =>
          cloudinary.uploader
            .upload(file.tempFilePath)
            .then((result) => result.secure_url)
        )
      );
    } else if (files && files.lenght !== 3) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 3 images" });
    }

    // Update the post
    const updatePost = await Post.findByIdAndUpdate(id, {
      ...(title && { title }),
      ...(hotelLocation && { hotelLocation }),
      ...(description && { description }),
      ...(facilities && { facilities }),
      ...(nearArea && { nearArea }),
      ...(category && { category }),
      ...(guest && { guest }),
      ...(isAvailable !== undefined && { isAvailable }),
      ...(price && { price }),
      ...(files && { images: uploadImage }),
      ...(title && { slug: slug(title, { lower: true }) }),
    });
    await updatePost.save();
    return res.status(200).send({
      success: true,
      message: "Post update successfully",
      updatePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating post",
      error,
    });
  }
};

export const deletePostController = async(req, res)=>{
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message:"Post delete successfully",
    })
  } catch (error) {
    console.log(error);
return res.status(500).send({
  suceess: false,
  message:"Error while deleting post",
  error,
})
    
  }
}