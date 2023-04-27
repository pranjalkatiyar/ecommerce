import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

// image to be reseted


const ProductList = ({product}) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  console.log(product.images)
  return (
    // product.map(product=>{
    <Link className='productCard' to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/><span>({product.numOfReviews} Reviews)</span> 
        </div>
        <span>$ {product.price}</span>
    </Link>
    // })
  )
}

export default ProductList