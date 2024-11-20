import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../assets/css/Fish/FishDetail.css';
import {handleGetAllProd} from "../../utils/handleFuncs";

const FishDetail = () => {
    const [fishInfo, setFishInfo] = useState({});
    const [farmsData, setFarmsData] = useState([]);
    const [fishData, setFishData] = useState([]);
    const [suggestFish, setSuggestFish] = useState([]);

    useEffect(() => {
        setFishInfo(JSON.parse(sessionStorage.getItem('infoFish')));
    }, []);

    // useEffect(() => {
    //     console.log(fishData);
    // }, [fishData]);

    useEffect(() => {
        if (fishInfo.name) {
            //danh sach nhung nong trai co ca nay
            handleGetAllProd(`http://localhost:8080/api/v1/farms/filter/${fishInfo.name}`, null, setFarmsData, null);
            //danh sach nhung con ca cung loai
            handleGetAllProd(`http://localhost:8080/api/v1/fish/filter/${fishInfo.fishTypeId}`, null, setFishData, null);
        }
    }, [fishInfo]);

    return (<div className="fish-detail-container">
        <div className={'fish-detail-content'}>
            <div className="fish-summary">
                <div className={'fish-detail-thumbnail'}>
                    <img src={fishInfo.image} alt={fishInfo.name} className="fish-image"/>
                </div>
                <div className={'fish-detail-summary'}>
                    <h4>{fishInfo.name}</h4>
                    <p>Kích thước: {fishInfo.size}</p>
                    <p>Giá: {fishInfo.price}</p>
                </div>
            </div>
            <div className={'fish-detail-description'}>{fishInfo.description}</div>
            <div className={'fish-detail-suggestions'}>
                <div className={'suggestions-items'}>
                    <h4>Những nông trại có giống cá này</h4>
                    <div className={'suggestions-items-content'}>
                        {farmsData.map((item, i) => (<div key={i} className={'suggestion-item'}>
                            <img src={item.image} alt={item.name} className="item-image"/>
                            <p><strong>{item.name}</strong></p>
                            <Link to={`/tour/${item.id}`}>Xem thêm</Link>
                        </div>))}
                    </div>
                </div>
                <div className={'suggestions-items'}>
                    <h4>Có thể bạn quan tâm</h4>
                    <div className={'suggestions-items-content'}>
                        {fishData.map((item, i) => (<div key={i} className={'suggestion-item'}>
                            <img src={item.image} alt={item.name} className="item-image"/>
                            <p><strong>{item.name}</strong></p>
                            <Link to={`/fish/${item.id}`}>Xem thêm</Link>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    </div>)
};

export default FishDetail;
