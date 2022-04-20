import React from "react";
import "./product.css";

const Product = (props) => {
    return (
        <li className="product">{"Price:"+props.productData.price+", Name:"+props.productData.productName}</li>
    )
}

export default Product;