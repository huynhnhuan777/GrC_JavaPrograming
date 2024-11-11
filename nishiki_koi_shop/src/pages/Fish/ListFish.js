import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { koiProducts } from "../../store/sampleTest";
import '../../assets/css/Fish/listFish.css';

// Function to save selected fish info to session storage
const handleSaveFishInfo = (info) => {
    sessionStorage.setItem('infoFish', JSON.stringify(info));
}

// Component to display the filtered list of fish
function ListFish({ currItems }) {
    return (
        <>
            {currItems && currItems.map((item, index) => (
                <div key={index} className="fish-card">
                    <div className="thumbnail-fish">
                        <img src={item.imageUrl} alt="thumbnail-fish"/>
                    </div>
                    <div className="summary-fish">
                        <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                        <p>{item.price}</p>
                        <Link to={`/fish/${item.id}`} style={{ color: 'green', fontWeight: 'bold' }}
                              onClick={() => handleSaveFishInfo(item)}>Xem thêm</Link>
                    </div>
                </div>
            ))}
        </>
    );
}

// Component to handle pagination and filtering logic
function PaginatedItems({ itemsPerPage, filters }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [koiProducts, setKoiProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        fetch('/api/v1/fish-types')
            .then((response) => response.json())
            .then((data) => {
                setKoiProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching fish data:', error);
                setLoading(false);
            });
    }, []);

    // Apply the filters to the koi products
    const filteredItems = koiProducts.filter(item => {
        // Apply Type filter
        if (filters.type && item.type !== filters.type) return false;
        // Apply Price filter
        if (filters.price && (item.price < filters.price[0] || item.price > filters.price[1])) return false;
        return true;
    });

    // Get the items to display on the current page
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredItems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="list-fish-content">
                <ListFish currItems={currentItems} />
            </div>
            <div className="controler-paginate">
                <ReactPaginate
                    breakLabel="..."
                    className="pageControl"
                    pageClassName="pageNumber"
                    previousClassName="prevPage"
                    nextClassName="nextPage"
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}

const Fish = () => {
    const [filters, setFilters] = useState({
        type: '',
        price: [0, 1000000000] // Default to all prices
    });

    // Handler to update the type filter
    const handleTypeChange = (e) => {
        setFilters({ ...filters, type: e.target.value });
    }

    // Handler to update the price filter
    const handlePriceChange = (e) => {
        const value = e.target.value.split('-').map(v => parseInt(v, 10));
        setFilters({ ...filters, price: value });
    }

    return (
        <div className="list-fish-container">
            <div className="filter-zone">
                <div className="filter-form">
                    <label>Bộ lọc tìm kiếm</label>
                    <fieldset className="fieldset">
                        <legend>Loại cá</legend>
                        <select className="selectInput" onChange={handleTypeChange} value={filters.type}>
                            <option value="">Tất cả loại</option>
                            <option value="Koi">Koi</option>
                            <option value="Goldfish">Goldfish</option>
                            {/* Add more types as needed */}
                        </select>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend>Giá</legend>
                        <p>
                            <input name="price" type="radio" value="0-10000" onChange={handlePriceChange} checked={filters.price[1] === 10000} />
                            {"<= 10000"}
                        </p>
                        <p>
                            <input name="price" type="radio" value="10000-12000" onChange={handlePriceChange} checked={filters.price[0] === 10000 && filters.price[1] === 12000} />
                            10000 - 12000
                        </p>
                        <p>
                            <input name="price" type="radio" value="12000-15000" onChange={handlePriceChange} checked={filters.price[0] === 12000 && filters.price[1] === 15000} />
                            12000 - 15000
                        </p>
                        <p>
                            <input name="price" type="radio" value="15000-20000" onChange={handlePriceChange} checked={filters.price[0] === 15000 && filters.price[1] === 20000} />
                            15000 - 20000
                        </p>
                        <p>
                            <input name="price" type="radio" value="0-1000000000" onChange={handlePriceChange} checked={filters.price[1] === 1000000000} />
                            Tất cả
                        </p>
                    </fieldset>
                </div>
            </div>
            <PaginatedItems itemsPerPage={8} filters={filters} />
        </div>
    );
}

export default Fish;
