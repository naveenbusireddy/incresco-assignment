import React from "react";
import "./product.css";

const Product = (props) => {
    return (
    
        <li className="product">
            {props.productData.images.length && <img src={props.productData.images[0].src}/>  }
            {"Price:"+props.productData.price+", Name:"+props.productData.productName}
        </li>

    )
}

export default Product;