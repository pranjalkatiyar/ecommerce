import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction.jsx";
import { useParams } from "react-router-dom";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import { addItemsToCart } from "../../actions/cartAction";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
    console.log(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };


  const addToCartHandler=()=>{
    dispatch(addItemsToCart(params.id,quantity));
    toast.success("Item Added to Cart");
  }

   useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);
  console.log(product);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                    <button
                      style={{ padding: "0.25rem 0.5rem" }}
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        margin: "0.5rem",
                        border: "solid black 1px",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      style={{ padding: "0.25rem 0.5rem" }}
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                  </div>
                  <button onClick={addToCartHandler}>
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "greenColor" : "redColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
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
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
