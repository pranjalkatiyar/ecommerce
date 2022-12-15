const Order = require("../modals/orderModals");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../modals/productModals");

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get single order => /api/v1/order/:id

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get myOrders in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    success: true,
    order,
  });
});

//   get all order --admin

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find();

  let totalAmount = 0;

  order.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    order,
  });
});

// update order --admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }


    if(order.orderStatus==='Delivered'){
        return next(new ErrorHandler('You have already delivered this order',400))
    }

    order.orderItems.forEach(async (item)=>{
        await updateStock(item.product,item.quantity)
    });

    order.orderStatus=req.body.status; 

    if(req.body.status==='Delivered'){
        order.deliveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    });
});

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.stock=product.stock-quantity;

    await product.save({validateBeforeSave:false})
}

// delete order --admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order=await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No order found with this ID',404))
    }

    await order.remove();

    res.status(200).json({
        success:true
    });

});