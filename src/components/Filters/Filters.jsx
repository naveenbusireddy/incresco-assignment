import React, { useEffect, useState } from "react";
import Filter from "../Filter/Filter";

const Filters = (props) => {
        
    const getSpecificFilter=(filterName)=>{
        return props.filters.filter((filter)=> filter.id===filterName)[0].filterValues;
    }

    return (
        <>
            <Filter type={"Gender"} filterOptions={ getSpecificFilter("Gender")} onFilterSelect={props.onFilterSelect} /> 

            <Filter type={"Brand"} filterOptions={ getSpecificFilter("Brand")} onFilterSelect={props.onFilterSelect}/> 

            <Filter type={"Categories"} filterOptions={ getSpecificFilter("Categories")} onFilterSelect={props.onFilterSelect}/> 

        </>
    )
}

export default Filters;