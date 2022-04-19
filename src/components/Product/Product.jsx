import React from "react";
import "./product.css";

const Product = (props) => {
    return (
        <li className="product">{props.productData.productName}</li>
    )
}

export default Product;