import React, {useState} from "react";
import '../../assets/css/Tour/tour.css';
import {Link} from "react-router-dom";

const Tour = () => {

    const [tempSample, setTempSample] = useState([
        {
            id: 'KOI-E-3306-11-01',
            name: 'Natalya Farm',
            address: 'tổ 2 phường Hắc Ám quận Hắc Hóa TP.Hỗn Mang',
            summary: 'The farm of Natalya',
            dateStart: '2024-10-12',
            dateEnd: '2024-10-15',
            price: 15000000
        },
        {
            id: 'KOI-E-3306-11-01',
            name: 'Natalya Farm',
            address: 'tổ 2 phường Hắc Ám quận Hắc Hóa TP.Hỗn Mang',
            summary: 'The farm of Natalya',
            dateStart: '2024-10-12',
            dateEnd: '2024-10-15',
            price: 15000000
        },
        {
            id: 'KOI-E-3306-11-01',
            name: 'Natalya Farm',
            address: 'tổ 2 phường Hắc Ám quận Hắc Hóa TP.Hỗn Mang',
            summary: 'The farm of Natalya',
            dateStart: '2024-10-12',
            dateEnd: '2024-10-15',
            price: 15000000
        },
        {
            id: 'KOI-E-3306-11-01',
            name: 'Natalya Farm',
            address: 'tổ 2 phường Hắc Ám quận Hắc Hóa TP.Hỗn Mang',
            summary: 'The farm of Natalya',
            dateStart: '2024-10-12',
            dateEnd: '2024-10-15',
            price: 15000000
        },
    ])

    const [isActive, setIsActive] = useState(false);
    const [summary, setSummary] = useState([]);

    const handleShowSummary = (info) => {
        console.log(info);
        setSummary(info);
        setIsActive(true);
    }

    const handleClosePopUp = () => {
        setIsActive(false);
        setSummary([]);
    }

    return (
        <div className={'tour-container'}>
            <div className={'tour-content'}>
                <div className={'filter-zone'}>
                    <form className={'filter-form'}>
                        <label>Bộ lọc tìm kiếm</label>
                        <fieldset className={'fieldset'}>
                            <legend>Ngày khởi hành</legend>
                            <div className={'date-form'}>
                                <fieldset className={'fieldset'}>
                                    <legend>Ngày</legend>
                                    <input className={'dateInput'} type={'text'} defaultValue={1}/>
                                </fieldset>
                                <fieldset className={'fieldset'}>
                                    <legend>Tháng</legend>
                                    <input className={'dateInput'} type={'text'} defaultValue={1}/>
                                </fieldset>
                                <fieldset className={'fieldset'}>
                                    <legend>Năm</legend>
                                    <input className={'dateInput'} type={'text'} defaultValue={1991}/>
                                </fieldset>
                            </div>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Giá</legend>
                            <p><input type={'radio'} value={['0', '100000000']}/>{'<='}10.000.000</p>
                            <p><input type={'radio'} value={['10000000', '25000000']}/>10.000.000 - 25.000.000</p>
                            <p><input type={'radio'} value={['250000000', '400000000']}/>25.000.000 - 40.000.000</p>
                            <p><input type={'radio'} value={['40000000', '550000000']}/>40.000.000 - 55.000.000</p>
                            <p><input type={'radio'} value={['55000000', '1000000000']}/>>= 55.000.000</p>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Trang trại</legend>
                            <select className={'selectInput'}>
                                <option defaultValue={-1}>Tất cả</option>
                            </select>
                        </fieldset>
                        <button className={'featureBtns'}>Tìm kiếm</button>
                    </form>
                </div>
                <div className={'show-tours'}>
                    {tempSample ? tempSample.map((item, index) => (
                        <div key={index} className={'tour-card'} onClick={() => handleShowSummary(item)}>
                            <img className={'thumbnail-tour'} src={''} alt={'thumbnailTour'}/>
                            <p>{item.id}</p> {/*title*/}
                            <p>{item.name}</p> {/*summary*/}
                        </div>
                    )) : ''}
                </div>
                <div className={'show-summary-tour'}>
                    {isActive===false ? (
                        <p>Vui lòng chọn 1 chuyến đi để xem tóm tắt</p>
                    ) : (
                        <>
                            <p  style={{padding:'10px 0'}}>Tóm tắt chuyến đi</p>
                            <div className={'summary-tour-content'}>
                                <img className={'thumbnail-tour'} src={''} alt={'thumbnailTour'}/>
                                <p>Tên: {summary.name}</p> {/*title*/}
                                <p>Giới thiệu: {summary.summary}</p> {/*summary*/}
                                <p>Ngày khởi hành: {summary.dateStart}</p>{/*day-start*/}
                                <p>Ngày kết thúc: {summary.dateEnd}</p>{/*day-end*/}
                                <p>Giá: {summary.price}</p>{/*price*/}
                                <Link to={'/tour'}>Xem thêm</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Tour;