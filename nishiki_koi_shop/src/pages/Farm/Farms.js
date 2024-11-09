import React, {createContext, useEffect, useState} from "react";
import '../../assets/css/Tour/tours.css';
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {tempTour, tempFarm} from "../../store/sampleTest";
import warningPNG from '../../assets/img/warning.png'

const Tours = () => {

    const [farmFilter, setFarmFilter] = useState([]);
    const [isActive, setIsActive] = useState(Array.from({length: farmFilter.length}, (_, i) => false));
    const [currIndex, setCurrIndex] = useState(-1);
    const [lastIndex, setLastIndex] = useState(-1);
    const [summary, setSummary] = useState([]);

    const handleSetIndexs = (info, index) => {
        if (currIndex === -1) {
            setCurrIndex(index);
            setLastIndex(index);
        } else {
            setLastIndex(currIndex);
            setCurrIndex(index);
        }
        setSummary(info);
        sessionStorage.setItem('infoTour', JSON.stringify(info));
    }

    const handleShowSummary = () => {
        const update = [...isActive];
        if (currIndex === lastIndex) update[currIndex] = true;
        else {
            update[currIndex] = true;
            update[lastIndex] = false;
        }
        setIsActive(update);
    }

    const handleCloseSummary = (index) => {
        const update = [...isActive];
        update[currIndex] = false;
        setIsActive(update);
        setCurrIndex(-1);
    }

    const [nameFarm, setNameFarm] = useState('Tất cả');
    const [priceTour, setPriceTour] = useState([]);
    const handleChooseFarm = (e) => {
        setNameFarm(e.target.value);
    }

    const handleChoosePrice = (range) => {
        setPriceTour(range);
    }

    const handleFilterResult = () => {
        setFarmFilter([]);
        let check = false;
        const temp = [];

        for (let i = 0; i < tempTour.length; i++) {
            if (priceTour[0] >= 0) {
                check = true;
                if (nameFarm !== 'Tất cả') {
                    if (tempTour[i].name === nameFarm && priceTour[0] <= tempTour[i].price && tempTour[i].price <= priceTour[1]) {
                        temp.push(tempTour[i]);
                    }
                } else {
                    if (priceTour[0] <= tempTour[i].price && tempTour[i].price <= priceTour[1]) {
                        temp.push(tempTour[i]);
                    }
                }
            } else if (nameFarm !== 'Tất cả') {
                check = true;
                if (tempTour[i].name === nameFarm) {
                    temp.push(tempTour[i]);
                }
            } else if (priceTour[0] >= 0) {
                if (priceTour[0] <= tempTour[i].price && tempTour[i].price <= priceTour[1]) {
                    temp.push(tempTour[i]);
                }
            }
        }

        if (check === false) {
            if (nameFarm === 'Tất cả') {
                setFarmFilter(tempTour);
                setCurrIndex(-1);
                setLastIndex(-1);
            } else
                toast("Có lỗi xảy ra hoặc không tồn tại");
        } else setFarmFilter(temp);
    }

    const handleSaveFarmObj = () => {
        sessionStorage.setItem('farm', JSON.stringify(summary));
    }

    useEffect(() => {
        setFarmFilter(tempTour);
    }, []);

    useEffect(() => {
        setIsActive(Array.from({length: farmFilter.length}, () => false));
    }, [farmFilter]);

    useEffect(() => {
        handleShowSummary();
    }, [currIndex, lastIndex]);

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
                                {(tempFarm.map((item, index) => (
                                    <option key={index}>{item.name}</option>
                                )))}
                            </select>
                        </fieldset>
                        <button className={'featureBtn'} onClick={handleFilterResult}>Tìm kiếm</button>
                    </div>
                </div>
                <div className={'show-tours'}>
                    {farmFilter.length !== 0 ? farmFilter.map((item, index) => (
                        <div key={index} className={'tour-card'} onClick={() => handleSetIndexs(item, index)}>
                            <img className={'thumbnail-tour'} src={item.imageUrl} alt={'thumbnailTour'}/>
                            <p>{item.id}</p> {/*title*/}
                            <p>{item.name}</p> {/*summary*/}
                            <Link to={'/Farms/' + summary.id}
                                  className={isActive[index] === true ? 'show-more effect-show' : 'hidden'}
                                  onClick={handleSaveFarmObj}>Xem thêm</Link>
                        </div>
                    )) : (
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <img width={"50%"} src={warningPNG} alt={'warningPNG'}/>
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
                                <img className={'thumbnail-tour'} src={summary.imageUrl} alt={'thumbnailTour'}/>
                                <p><strong style={{color: 'var(--text-color)'}}>Tên:</strong> {summary.name}
                                </p> {/*title*/}
                                <p><strong style={{color: 'var(--text-color)'}}>Giới thiệu:</strong> {summary.summary}

                                </p> {/*summary*/}
                                <p><strong style={{color: 'var(--text-color)'}}>Ngày khởi
                                    hành:</strong> {summary.dateStart}</p>{/*day-start*/}
                                <p><strong style={{color: 'var(--text-color)'}}>Ngày kết
                                    thúc:</strong> {summary.dateEnd}</p>{/*day-end*/}
                                <p><strong
                                    style={{color: 'var(--text-color)'}}>Giá:</strong> {(summary.price).toLocaleString('vi-VN')}
                                </p>{/*price*/}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default Tours;