import React, { useEffect, useState } from "react";
import '../../assets/css/Tour/tours.css';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import warningPNG from '../../assets/img/warning.png';
import {handleGetAllProd, handleGetData, useHookTourForm} from "../../utils/handleFuncs";
import Farms from "../Farm/Farms";
import Tour from "./Tour";

const Tours = () => {
    // Sử dụng hooks để quản lý dữ liệu form
    const tourForm = useHookTourForm();

    const [farmFilter, setFarmFilter] = useState([]);
    const [isActive, setIsActive] = useState([]);
    const [currIndex, setCurrIndex] = useState(-1);
    const [lastIndex, setLastIndex] = useState(-1);
    const [summary, setSummary] = useState({});
    const [nameFarm, setNameFarm] = useState('Tất cả');
    const [priceTour, setPriceTour] = useState([0, Infinity]);
    const [farmData, setFarmData] = useState([]);
    const [chooseOne, setChooseOne] = useState(null);
    const [tourData, setTourData] = useState([]);




    // Thêm các state bị thiếu


    const handleFilterResult = () => {
        setFarmFilter(tourData);
        let check = false;
        const temp = [];

        for (let i = 0; i < farmFilter.length; i++) {
            if (priceTour[0] >= 0) {
                check = true;
                if (nameFarm !== 'Tất cả') {
                    if (farmFilter[i].tourName === nameFarm && priceTour[0] <= farmFilter[i].tourPrice && farmFilter[i].tourPrice <= priceTour[1]) {
                        temp.push(farmFilter[i]);
                    }
                } else {
                    if (priceTour[0] <= farmFilter[i].tourPrice && farmFilter[i].tourPrice <= priceTour[1]) {
                        temp.push(farmFilter[i]);
                    }
                }
            } else if (nameFarm !== 'Tất cả') {
                check = true;
                if (farmFilter[i].tourName === nameFarm) {
                    temp.push(farmFilter[i]);
                }
            } else if (priceTour[0] >= 0) {
                if (priceTour[0] <= farmFilter[i].tourPrice && farmFilter[i].tourPrice <= priceTour[1]) {
                    temp.push(farmFilter[i]);
                }
            }

        }


        if (check === false) {
            if (nameFarm === 'Tất cả') {
                setFarmFilter(Tours);
                setCurrIndex(-1);
                setLastIndex(-1);
            } else
                toast("Có lỗi xảy ra hoặc không tồn tại");
        } else setFarmFilter(temp);
    }


    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/farms/get-all-farm', sessionStorage.getItem('token'), setFarmData, setChooseOne);
        handleGetAllProd('http://localhost:8080/api/v1/tours/get-all-tours', sessionStorage.getItem('token'), setTourData, null);
        }, []);

    const handleSetIndexs = (info, index) => {
        setLastIndex(currIndex);
        setCurrIndex(index);
        setSummary(info);
        sessionStorage.setItem('info', JSON.stringify(info));
    };


    const handleShowSummary = () => {
        const update = isActive.map((_, i) => i === currIndex);
        setIsActive(update);
    };

    const handleCloseSummary = () => {
        const update = isActive.map(() => false);
        setIsActive(update);
        setCurrIndex(-1);
    };

    const handleChooseFarm = (e) => setNameFarm(e.target.value);

    const handleChoosePrice = (range) => setPriceTour(range);

    const handleSaveFarmObj = () => {
        sessionStorage.setItem('farm', JSON.stringify(summary));
    };

    useEffect(() => {
        setIsActive(Array(farmFilter.length).fill(false));
    }, [farmFilter]);

    useEffect(() => {
        if (currIndex >= 0) handleShowSummary();
    }, [currIndex, lastIndex]);

    useEffect(() => {
        console.log(tourData);
        setFarmFilter(tourData);
        console.log(farmFilter)
    }, [tourData]);

    return (
        <div className={'tours-container'}>
            <div className={'tours-content'}>
                <div className={'filter-zone'}>
                    <div className={'filter-form'}>
                        <label>Bộ lọc tìm kiếm</label>
                        <fieldset className={'fieldset'}>
                            <legend>Ngày khởi hành</legend>
                            <input className={'dateInput'} type={'date'} defaultValue={''}/>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Ngày trở về</legend>
                            <input className={'dateInput'} type={'date'} defaultValue={''}/>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Giá</legend>
                            <p><input name={'price'} type={'radio'} value={['0', '100000000']}
                                      onClick={() => handleChoosePrice([0, 10000000])}/>{'<='}10.000.000</p>
                            <p><input name={'price'} type={'radio'} value={['10000000', '25000000']}
                                      onClick={() => handleChoosePrice([10000000, 25000000])}/>10.000.000 -
                                25.000.000</p>
                            <p><input name={'price'} type={'radio'} value={['250000000', '400000000']}
                                      onClick={() => handleChoosePrice([25000000, 40000000])}/>25.000.000 -
                                40.000.000</p>
                            <p><input name={'price'} type={'radio'} value={['40000000', '550000000']}
                                      onClick={() => handleChoosePrice([40000000, 55000000])}/>40.000.000 -
                                55.000.000</p>
                            <p><input name={'price'} type={'radio'} value={['55000000', '1000000000']}
                                      onClick={() => handleChoosePrice([55000000, 1000000000])}/>>= 55.000.000
                            </p>
                            <p><input name={'price'} type={'radio'} value={['0', '0']}
                                      onClick={() => handleChoosePrice([-1, 0])}/>Tất cả</p>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Trang trại</legend>
                            <select className={'selectInput'} onChange={handleChooseFarm}>
                                <option defaultValue={'default'}>Tất cả</option>
                                {(farmData.map((item, index) => (
                                    <option key={index}>{item.name}</option>
                                )))}
                            </select></fieldset>
                        <button className={'featureBtn'} onClick={handleFilterResult}>Tìm kiếm</button>
                    </div>

                </div>
                <div className={'show-tours'}>
                    {farmFilter.length !== 0 ? (
                        farmFilter.map((item, index) => (
                            <div key={index} className={'tour-card'} onClick={() => handleSetIndexs(item, index)}>
                                <img className={'thumbnail-tour'} src={item.image} alt={'thumbnailTour'}/>
                                <p>{item.farmId}</p> {/* title */}
                                <p>{item.tourName}</p> {/* summary */}
                                <Link
                                    to={'/tours/' + item.farmId}
                                    className={isActive[index] === true ? 'show-more effect-show' : 'hidden'}
                                    onClick={handleSaveFarmObj}
                                >
                                    Xem thêm
                                </Link>
                            </div>

                        ))
                    ) : (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img width={'50%'} src={warningPNG} alt={'warningPNG'}/>
                        </div>
                    )}
                </div>

                <div className='show-summary-tour'>
                    {currIndex === -1 ? (
                        <p>Vui lòng chọn 1 chuyến đi để xem tóm tắt</p>
                    ) : (
                        <>
                            <p style={{padding: '10px 0'}}>Tóm tắt chuyến đi</p>
                            <div className={'summary-tour-content'}>
                                <div className={'closeBtn'} onClick={() => handleCloseSummary(currIndex)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                         className="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </div>
                                <img className={'thumbnail-tour'} src={summary.image} alt={'thumbnailTour'}/>
                                <p><strong style={{color: 'var(--text-color)'}}>Tên:</strong> {summary.tourName}
                                </p> {/*title*/}
                                <p><strong style={{color: 'var(--text-color)'}}>Giới thiệu:</strong> {summary.tourDescription}

                                </p> {/*summary*/}
                                <p><strong style={{color: 'var(--text-color)'}}>Ngày khởi
                                    hành:</strong> {summary.tourStartDate}</p>{/*day-start*/}
                                <p><strong style={{color: 'var(--text-color)'}}>Ngày kết
                                    thúc:</strong> {summary.tourEndDate}</p>{/*day-end*/}
                                <p>
                                    <strong style={{color: 'var(--text-color)'}}>Giá:</strong>
                                    {summary.tourPrice && !isNaN(summary.tourPrice) ? summary.tourPrice.toLocaleString('vi-VN') : 'N/A'}
                                </p>

                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Tours;
