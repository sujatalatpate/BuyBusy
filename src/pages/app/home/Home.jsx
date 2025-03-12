import { useState } from "react";
import style from "./Home.module.css";
import Loader from "../../../components/product/Loader";
import { itemDetailsData } from "../../../data/data";
import { useCart } from "../../../context/cartContext";
import ProductCart from "../../../components/product/product";
import { Link } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setpriceFilter] = useState(500);
  const [selectedCategories, setSelectedCategories] = useState([]);

  

   //filtered products
   const filteredProducts = itemDetailsData.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = product.price <= priceFilter;

    const matchCategory = selectedCategories.length === 0 || selectedCategories.some((category) => product.category.toLowerCase() === category.toLowerCase());

    return matchCategory && matchSearch && matchPrice;
})

  //category filter
  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
        // Deselect category if it's already selected
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
        // Select category if it's not already selected
        setSelectedCategories([...selectedCategories, category]);
    }
};

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  return (
    <>
    
      <div className={style.container}>
      <div className={style.searchBox}>
            <input type="text" placeholder = "Search By Name" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
          </div>
        <div className={style.home}>
          <div className={style.filter}>
            <div className={style.headings}>
              <h2>Filter</h2>
              <label htmlFor="price">Price: {priceFilter}</label><br/>
              <input
                type="range"
                name="price"
                min="1"
                max="1000"
                step="20"
                value={priceFilter}
                onChange={(e) => setpriceFilter(Number(e.target.value))}
              />
            </div>
            <h2 style={{marginLeft:'80px'}}>Category</h2>
            <div className={style.catagoryContainer}>
              <div className={style.catagory}>
                <input
                  type="checkbox"
                  id="mensFashion"
                  value="Men's Clothing"
                  onChange={handleCategoryFilter}
                  checked={isCategorySelected("Men's Clothing")}
                />
                <label htmlFor="mensFashion">Men's Clothing</label>
              </div>
              <div className={style.catagory}>
                <input
                  type="checkbox"
                  id="womensFashion"
                  value="Women's Clothing"
                  onChange={handleCategoryFilter}
                  checked={isCategorySelected("Women's Clothing")}
                />
                <label htmlFor="womensFashion">Women's Clothing</label>
              </div>
              <div className={style.catagory}>
                <input
                  type="checkbox"
                  id="jewelery"
                  value="jewelery"
                  onChange={handleCategoryFilter}
                  checked={isCategorySelected("jewelery")}
                />
                <label htmlFor="jewelery">Jewelery</label>
              </div>
              <div className={style.catagory}>
                <input
                  type="checkbox"
                  id="electronics"
                  value="Electronics"
                  onChange={handleCategoryFilter}
                  checked={isCategorySelected("Electronics")}
                />
                <label htmlFor="electronics">Electronics</label>
              </div>
            </div>
          </div>
          <div className={style.search}>
         
          </div>
          
          <div className={style.product}>
            <ProductCart products={filteredProducts}/>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
