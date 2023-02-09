const productmodel = require('../model/productmodel');
const ErrorHander = require('../utils/errorhander');
const catchasyncerror  = require('../middleware/catchasyncerror');
const ApiFeatures = require('../utils/apifeatures');

// create product -- admin
exports.createproduct = catchasyncerror(async (req,res,next)=>{
    const product = await productmodel.create(req.body);

    res.status(201).json({success : true,product})
});

// get all product
exports.getallproduct = catchasyncerror(async (req,res)=>{
    // const cookie = "SameSite = none;secure"
    const resultPerPage = 8;
    const productcount = await productmodel.countDocuments();
    const apiFeatures = new ApiFeatures(productmodel.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const product = await apiFeatures.query;
    //const product = await productmodel.find();
    res.status(200).json({success : true,product,productcount})
    // .setHeader("set-cookie",[cookie]) 
    // Note :- productcount were add in getoneproduct by the tutor.So,please check it agin further
});

//update product
exports.updateproduct = catchasyncerror(async (req,res,next)=>{
    let product = await productmodel.findById(req.params.id)

    if(!product)
    {
        //return res.status(500).json({success:false,message:"product not found"})
        return next(new ErrorHander("product not found",404))
    }

    product = await productmodel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
    res.status(200).json({success : true,product})

});

//delete product
exports.deleteproduct = catchasyncerror(async (req,res,next)=>{
    const product = await productmodel.findById(req.params.id)

    if(!product)
    {
        //return res.status(500).json({success:false,message:"product not found"})
        return next(new ErrorHander("product not found",404))
    }

    await product.remove();
    res.status(200).json({success : true,message:"product deleted successfully"})

});

//find one product
exports.getoneproduct = catchasyncerror(async (req,res,next)=>{
    const product = await productmodel.findById(req.params.id)

    if(!product)
    {
        //return res.status(500).json({success:false,message:"product not found"})
        return next(new ErrorHander("product not found",404))
    }
    res.status(200).json({success : true,product})
});

//create new review or update review

exports.createProductReview = catchasyncerror(async (req,res,next)=>{
    const {rating,comment,productId} = req.body;
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    const product = await productmodel.findById(productId);
    const isReviewed = product.reviews.find((rev)=>rev.user.toString() === rev.user._id.toString());

    if(isReviewed)
    {
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() === rev.user._id.toString())
            {
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.noOfreviews = product.reviews.length
    }

    let avg = 0;
    product.ratings = product.reviews.forEach((rev)=>{
        avg += rev.rating;
    })/product.reviews.length;

    await product.save({validateBeforeSave:false});
    res.status(200).json({success:true})
})

//get product review
exports.getProductReview = catchasyncerror(async (req,res,next)=>{
    const product = await productmodel.findById(req.query.id);
    if(!product)
    {
        return next(new ErrorHander("product not found",404))
    }
    res.status(200).json({success:true,review: product.reviews})
})

//delete review
exports.deleteReview = catchasyncerror(async (req,res,next)=>{
    const product = await productmodel.findById(req.query.productId);
    if(!product)
    {
        return next(new ErrorHander("product not found",404))
    }

    const review = product.reviews.filter(rev=>rev._id.toString() !== rev.query.id.toString());

    let avg = 0;
    reviews.forEach((rev)=>{
        avg += rev.rating;
    });
    const rating = avg/reviews.length;
    const noOfreviews = reviews.length;

    await product.findByIdAndUpdate(req.query.productId,{reviews,rating,noOfreviews},{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({success:true,review: product.reviews})
})