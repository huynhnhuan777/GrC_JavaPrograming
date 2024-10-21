import React from 'react';
import { Link } from 'react-router-dom';

function ListFish() {
    const koiProducts = [
        { id: 1, name: 'Koi Fish 1', price: '$200' },
        { id: 2, name: 'Koi Fish 2', price: '$250' },
        { id: 3, name: 'Koi Fish 3', price: '$300' },
        // ... Các sản phẩm khác
    ];

    return (
        <div className="list-fish-container">
            <h1>Danh sách cá Koi</h1>
            <ul className="koi-products-list">
                {koiProducts.map(product => (
                    <li key={product.id} className="koi-product-item">
                        <h3>{product.name}</h3>
                        <p>Giá: {product.price}</p>
                        <Link to={`/fish/${product.id}`}>Xem chi tiết</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListFish;
