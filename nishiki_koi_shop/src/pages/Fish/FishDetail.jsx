import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/Fish/FishDetail.css';

const FishDetail = () => {
    const { id } = useParams();
    const [infoFish, setInfoFish] = useState(() => {
        const storedInfo = sessionStorage.getItem('infoFish');
        return storedInfo ? JSON.parse(storedInfo) : null; // Fallback to null if no data
    });

    const fakeOtherFish = [
        {
            id: 2,
            name: 'Koi Showa Sanshoku',
            imageUrl: 'https://cakoibienhoa.com/public/userfiles/products/ca-koi-kohaku.jpg', // Sử dụng link thực tế
            price: 7500000,
        },
        {
            id: 3,
            name: 'Koi Kohaku',
            imageUrl: 'https://cakoibienhoa.com/public/userfiles/products/ca-koi-kohaku.jpg', // Sử dụng link thực tế
            price: 6000000,
        },
        {
            id: 4,
            name: 'Koi Utsurimono',
            imageUrl: 'https://cakoibienhoa.com/public/userfiles/products/ca-koi-kohaku.jpg', // Sử dụng link thực tế
            price: 8000000,
        },
    ];

    useEffect(() => {
        // Logic to fetch fish details based on ID can be added here
    }, [id]);

    const handleAddToCart = () => {
        alert(`Thêm ${infoFish.name} vào giỏ hàng!`);
    };

    if (!infoFish) {
        return (
            <div className='fish-detail-container'>
                <h2>Thông tin không khả dụng</h2>
                <p>Vui lòng quay lại trang trước đó.</p>
            </div>
        );
    }

    return (
        <div className='fish-detail-container'>
            <div className='fish-detail-content'>
                {/* Left section: Fish image */}
                <div className='fish-detail-left'>
                    <img
                        className='thumbnail-fish'
                        src={infoFish.imageUrl || 'https://cakoibienhoa.com/public/userfiles/products/ca-koi-kohaku.jpg'}
                        alt='thumbnail-fish'
                    />
                </div>

                {/* Right section: Fish information and "Add to Cart" button */}
                <div className='fish-detail-right'>
                    <h4>Thông tin chi tiết</h4>
                    <ul className='show-info-fish'>
                        <li><strong>ID:</strong> {infoFish.id}</li>
                        <li><strong>Tên:</strong> {infoFish.name}</li>
                        <li><strong>Giá:</strong> {infoFish.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                        <li><strong>Mô tả:</strong> {infoFish.description || 'Không có mô tả.'}</li>
                    </ul>
                    <button className='add-to-cart-btn' onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                </div>
            </div>

            {/* Bottom section: Other fish products */}
            <div className='other-fish-section'>
                <h4>Sản phẩm cá khác</h4>
                <div className='other-fish-list'>
                    {fakeOtherFish.map((fish, index) => (
                        <div key={index} className='other-fish-card'>
                            <img className='thumbnail-fish' src={fish.imageUrl} alt='other-fish-thumbnail' />
                            <p>{fish.name}</p>
                            <p>{fish.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FishDetail;
