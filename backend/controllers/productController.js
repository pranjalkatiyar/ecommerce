const Product = require("../modals/productModals");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// create products =Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // to tell who added this product
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "product created",
  });
});

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  //  now not use this because we have created a class for this
  // let query, so it will be using that property of that class
  // const product = await Product.find();

  const product = await apiFeature.query;

  res.status(200).json({ success: true, product, productCount });
});

// get single product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update product =Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "product is deleted",
  });
});

// cathcAsyncError.js =helps in not closing the server if the value is not passed in the create product

// create newreview or update the review
// doubt in this
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  const product = await Product.findById(productId);
  //check user is already reviewed or not
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  // if user is already reviewed then update the review
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  }
  // if user is not reviewed then push the review
  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  // calculate the average rating
  let avg = 0;
  product.rating = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});


// get all reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler("product not found",404))
  }
  res.status(200).json({
    success: true,
    reviews:product.reviews
  });
});

// delete review of a product

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});