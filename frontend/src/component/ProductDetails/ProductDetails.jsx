import React, { useEffect } from "react";
import "./ProductDetails.css";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction.jsx";
import { useParams } from "react-router-dom";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params)

 

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

   const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if(error){
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);
  console.log(product);
  return (
   <>
      {loading ? <Loader/>:(
          <>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, key) => {
                return (
                  <CarouselItem>
                    <img
                      className="d-block w-100"
                      src={item.url}
                      alt={`slide ${key}`}
                    />
                  </CarouselItem>
                );
              })}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>+</button>
                <input type="text" />
                <button>-</button>
              </div>
              <button disabled={product.stock < 1 ? true : false}>
                Add to cart
              </button>
            </div>
            <p>
              Status:{" "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description:<p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0]?(
        <div className="reviews">
          {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
        </div>):(
          <p className="noReviews">No Reviews Yet</p>
        )
      }
    </>)}
   </>
  );
};

export default ProductDetails;
