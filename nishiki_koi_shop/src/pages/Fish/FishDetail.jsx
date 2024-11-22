import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../assets/css/Fish/FishDetail.css';
import {handleGetAllProd} from "../../utils/handleFuncs";
import {toast, ToastContainer} from "react-toastify";

const FishDetail = () => {
    const [fishInfo, setFishInfo] = useState({});
    const [farmsData, setFarmsData] = useState([]);
    const [farm, setFarm] = useState('');
    const [fishData, setFishData] = useState([]);

    const handleBuyNow = () => {
        if (sessionStorage.getItem("user")) {

        } else toast.warning('Vui lòng đăng nhập để được mua hàng');
    }

    const handleAddCart = () => {
        if (sessionStorage.getItem("user")) {

        } else toast.warning('Vui lòng đăng nhập để đưa sản phẩm và giỏ háng');
    }

    useEffect(() => {
        setFishInfo(JSON.parse(sessionStorage.getItem('infoFish')));
    }, []);

    useEffect(() => {
        if (fishInfo.name) {
            //danh sach nhung nong trai co ca nay
            handleGetAllProd(`http://localhost:8080/api/v1/farms/filter/${fishInfo.name}`, null, setFarmsData, null).then(r => console.log(r));
            //danh sach nhung con ca cung loai
            handleGetAllProd(`http://localhost:8080/api/v1/fish/filter-by-type/${fishInfo.fishTypeId}`, null, setFishData, null).then(r => console.log(r));
        }
    }, [fishInfo]);

    useEffect(() => {
        if (fishInfo.farmId) {
            handleGetAllProd(`http://localhost:8080/api/v1/farms/${fishInfo.farmId}`, null, setFarm, null).then(r => console.log(r));
        }
    }, [fishInfo]);

    return (<div className="fish-detail-container">
        <div className={'fish-detail-content'}>
            <div className="fish-summary">
                <div className={'fish-detail-thumbnail'}>
                    <img src={fishInfo.image} alt={fishInfo.name} className="fish-image"/>
                </div>
                <div className={'fish-detail-summary'}>
                    <div>
                        <h3>Tên giống cá: {fishInfo.name}</h3>
                        <p>Thuộc nông trại: <Link to={`/farms/${fishInfo.farmId}`}>{farm.name}</Link></p>
                        <p>Kích thước cá: <strong>{fishInfo.size} (cm)</strong></p>
                        <p>Giá: <strong>{fishInfo.price ? fishInfo.price.toLocaleString('vi-VN') : ''} đ</strong></p>
                    </div>
                    <div>
                        <button className={'featureBtn'} onClick={handleBuyNow}>Mua ngay</button>
                        <button className={'featureBtn'} onClick={handleAddCart}>Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
            <div className={'fish-detail-description'}>
                <h4>Mô tả</h4>
                {fishInfo.description}
            </div>
            <div className={'fish-detail-suggestions'}>
                <div className={'suggestions-items'}>
                    <h4>Những nông trại có giống cá này</h4>
                    <div className={'suggestions-items-content'}>
                        {farmsData.map((item, i) => (
                            <div key={i} className={'suggestion-item'}>
                                <img src={item.image} alt={item.name} className="item-image"/>
                                <p><strong>{item.name}</strong></p>
                                <Link to={`/farms/${item.id}`} className={'featureBtn'}>Xem thêm</Link>
                            </div>))}
                    </div>
                </div>
                <div className={'suggestions-items'}>
                    <h4>Có thể bạn quan tâm</h4>
                    <div className={'suggestions-items-content'}>
                        {fishData.map((item, i) => (<div key={i} className={'suggestion-item'}>
                            <img src={item.image} alt={item.name} className="item-image"/>
                            <p><strong>{item.name}</strong></p>
                            <Link to={`/fish/${item.id}`} className={'featureBtn'}>Xem thêm</Link>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>)
};

export default FishDetail;
