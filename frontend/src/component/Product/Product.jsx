import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Home/ProductList";
import { getProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";

import Pagination from "react-js-pagination";

const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if(error)
    {
      alert.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category,ratings,error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title={`${products.name}--Ecommerce`}/>
          <h2 className="productsHeading"> Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1}
              max={25000}
            />
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Product;
