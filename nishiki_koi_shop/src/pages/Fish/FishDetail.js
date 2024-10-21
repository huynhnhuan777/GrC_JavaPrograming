import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import '../../assets/css/Fish/FishDetail.css';

const relatedProductsData = [
    {id: 2, name: 'Koi Fish 2', price: '$250', imageUrl: 'https://via.placeholder.com/150'},
    {id: 3, name: 'Koi Fish 3', price: '$300', imageUrl: 'https://via.placeholder.com/150'},
    // Thêm sản phẩm liên quan khác nếu cần
];

function FishDetail() {
    const {id} = useParams(); // Lấy id sản phẩm từ URL
    const [fishDetail, setFishDetail] = useState(JSON.parse(sessionStorage.getItem('infoFish')));
    const [relatedProducts, setRelatedProducts] = useState(relatedProductsData);

    const handleAddToCart = () => {
        // Thêm sản phẩm vào giỏ hàng (giả sử có cơ chế lưu trữ giỏ hàng trong localStorage/sessionStorage)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(fishDetail);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Sản phẩm đã được thêm vào giỏ hàng');
    };

    return (
        <div className="fish-detail-container">
            <div className={'fish-detail-content'}>
                <div className="fish-detail">
                    <img src={fishDetail.imageUrl} alt={fishDetail.name} className="fish-image"/>
                    <div className="fish-info">
                        <h1>{fishDetail.name}</h1>
                        <p>{fishDetail.description}</p>
                        <p className="fish-price">Giá: {fishDetail.price}</p>
                        <button onClick={handleAddToCart} className="add-to-cart-button">Thêm vào giỏ hàng</button>
                    </div>
                </div>

                <div className="related-products">
                    <h2>Sản phẩm liên quan</h2>
                    <div className="related-products-list">
                        {relatedProducts.map((product) => (
                            <div key={product.id} className="related-product-card">
                                <Link to={`/fish/${product.id}`}>
                                    <img src={product.imageUrl} alt={product.name} className="related-product-image"/>
                                    <h3>{product.name}</h3>
                                    <p>{product.price}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FishDetail;
