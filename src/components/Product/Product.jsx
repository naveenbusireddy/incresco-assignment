import React from "react";
import "./product.css";

const Product = (props) => {
    return (
    
        <li className="product">
            {props.productData.images.length && <img src={props.productData.images[0].src}/>}
            <li className="li-product">{props.productData.brand}</li>
            <li className="li-productName">{props.productData.productName}</li>
            <li><span className="li-price">Rs.{+props.productData.price}</span> <span className="li-mrp">Rs.{+props.productData.mrp}</span> <span>{props.productData.discountDisplayLabel}</span> </li>
            
        </li>

    )
}

export default Product;