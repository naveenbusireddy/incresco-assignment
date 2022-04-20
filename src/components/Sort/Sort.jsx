import React from "react";

const Sort = (props) => {

    return (
        <>
            <label htmlFor="select" >Sort By</label>
            <select onChange={props.onDropSelect} defaultValue="Newest">
                <option value="Price-Low-High">Price-Low-High</option>
                <option value="Price-High-Low">Price-High-Low</option>
                <option value="Rating">Rating</option>
                <option value="Newest" >Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
        </>
    )
}

export default Sort;