import React from "react";
import "./product.css";

const Product = (props) => {
    return (
    
        <li className="product">
            <div className="img">
                {props.productData.images.length && <img src={props.productData.images[0].src} alt={props.productData.productName} />}
                <div className="img-bottom-left">
                   {(props.productData.rating) > 0 && <span> {(props.productData.rating).toFixed(1)}★|</span>}
                   {(props.productData.ratingCount) > 0 && <span> {(props.productData.ratingCount/1000).toFixed(1)}K</span>}                    
                </div>
            </div>            
            
            <div className="li-product">{props.productData.brand}</div>
            <div className="li-productName">{props.productData.productName}</div>
            <div>
                <span className="li-price">Rs.{+props.productData.price}</span>  
                <span className="li-mrp">Rs.{+props.productData.mrp}</span>  
                <span className="li-discount">{props.productData.discountDisplayLabel}</span>
            </div>
            
        </li>

    )
}

export default Product;