import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";
import Sort from "../Sort/Sort";

const ProductsPage = () => {

    const [products, setProducts] = useState();
    const [finalProductList, setFinalProductList] = useState();
    const [filteredProductList,setFilteredProductList]=useState();
    const [filters, setFilters] = useState();
    const [selectedFilters, setSelectedFilters] = useState({ Brand: "selectAll", Categories: "selectAll", Gender: "selectAll" });
    const [sortOption, setSortOption] = useState("Newest");
    const [searchOption, setSearchOption] = useState('');

    const getData = () => {
        axios.get(`https://demo7303877.mockable.io/`)
            .then((responseData) => {
                setProducts(responseData.data.products);
                setFilters(responseData.data.filters.primaryFilters);
                getSortedProductList(responseData.data.products);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const getFilteredProducts = () => {
        let brands = selectedFilters.Brand === "selectAll" ? "" : selectedFilters.Brand.split(',');
        let gender = selectedFilters.Gender === "selectAll" ? "" : selectedFilters.Gender.split(',');
        let categories = selectedFilters.Categories === "selectAll" ? "" : selectedFilters.Categories.split(',');

        let filterProductList = products.filter((product) => {
            let isBrandMatch = !brands || brands.indexOf(product.brand) > -1;
            let isGenderMatch = !gender || gender.indexOf(product.gender) > -1;
            let isCategoryMatch = !categories || categories.indexOf(product.category) > -1;
            return (isGenderMatch && isCategoryMatch && isBrandMatch);
        })
        getSortedProductList(filterProductList);
    }

    useEffect(() => {
        if (products)
            getFilteredProducts();
    }, [selectedFilters]);

    const onFilterSelect = (childSelectedFilters) => {
        setSelectedFilters({ ...selectedFilters, ...childSelectedFilters });
    }

    const onDropSelect = (event) => {
        setSortOption(event.target.value);
    }

    const sort = (prop, array, isAsc) => {
        return isAsc ? array.sort((a, b) => a[prop] - b[prop]) : array.sort((a, b) => b[prop] - a[prop]); // b - a for reverse sort
    }

    const getSortedProductList = (finalProductListCopy) => {
        finalProductListCopy = JSON.parse(JSON.stringify(finalProductListCopy));
        switch (sortOption) {
            case "Price-Low-High": finalProductListCopy = sort("price", finalProductListCopy, true);
                break;
            case "Price-High-Low": finalProductListCopy = sort("price", finalProductListCopy, false);
                break;
            case "Newest": finalProductListCopy = sort("year", finalProductListCopy, false);
                break;
            case "Oldest": finalProductListCopy = sort("year", finalProductListCopy, true);
                break;
            case "Rating": finalProductListCopy = sort("rating", finalProductListCopy, false);
                break;
            default: finalProductListCopy = sort("year", finalProductListCopy, false);
        }
        setFinalProductList(finalProductListCopy);
        setFilteredProductList(finalProductListCopy);
    }

    useEffect(() => {
        if (finalProductList)
            getSortedProductList(finalProductList);
    }, [sortOption])

    const onChangeHandler = (event) => {
        setSearchOption(event.target.value);
    }

    const getSearchedProductList = () => {
       let finalProductListCopy = JSON.parse(JSON.stringify(filteredProductList));
        searchOption.length === 0 ? setFinalProductList(finalProductListCopy) : setFinalProductList(finalProductListCopy.filter(SearchProduct => SearchProduct.productName.trim().toLowerCase().includes(searchOption.trim().toLowerCase())))
    }

    useEffect(() => {
        if (filteredProductList)
            getSearchedProductList();
    }, [searchOption])

    // searchOption.length === 0 ? finalProductList : finalProductList.filter(SearchProduct => SearchProduct.brand.toLowerCase().includes(searchOption.toLowerCase()))
    // setFinalProductList(finalProductListCopy);


    return (
        <>
            <Sort onDropSelect={onDropSelect} />
            <input type="text" placeholder="Search Items" value={searchOption} onChange={onChangeHandler} />

            {products && <ProductList productsList={finalProductList} />}
            {filters && <Filters filters={filters} onFilterSelect={onFilterSelect} />}
        </>
    )
}

export default ProductsPage;