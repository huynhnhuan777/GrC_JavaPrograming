import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Account/payment.css';
import admin from '../../utils/xml/api_full_administration.json'

const Payment = () => {
    const [listPayment, setListPayment] = useState([]);/*Thiet lap danh sach san pham*/
    const [totalCost, setTotalCost] = useState(0);
    const [payment, setPayment] = useState(0);

    /*Du lieu mau ve customer*/

    const [tempUser, setTempUser] = useState([
        {id: 'user_1101_1121', name: 'CaoNhatHao', address: ''}
    ])

    const handleSetPayment = (event) => {
        setPayment(Number(event.target.value));
    }

    useEffect(() => {
        setListPayment(JSON.parse(sessionStorage.getItem('listPayment')));
    }, []);

    useEffect(() => {
        const total = listPayment.reduce((acc, item) => acc + (item.amount * item.price), 0);
        setTotalCost(total);
    }, [listPayment]);

    const [tempSample, setTempSample] = useState([]);
    const [tempCity, setTempCity] = useState([]);
    const [tempDistrict, setTempDistrict] = useState([]);
    const [tempWard, setTempWard] = useState([]);
    useEffect(() => {
        try {
            setTempSample(admin.data);
        } catch (error) {
            console.error('ERROR: ', error.message());
        }
    }, [tempSample]);

    const handleGetCity = (e) => {
        const cityID = e.target.value;

        let cityObject = [];
        for (let i = 0; i < tempSample.length; i++) {
            if (tempSample[i].id === cityID) {
                cityObject = tempSample[i].data2;
            }
        }

        setTempDistrict(cityObject);
    }

    const handleGetDistrict = (e) => {
        const districtID = e.target.value;

        let districtObject = [];
        for (let i = 0; i < tempDistrict.length; i++) {
            if (tempDistrict[i].id === districtID) {
                districtObject = tempDistrict[i].data3;
            }
        }

        setTempWard(districtObject);
    }

    const handleGetWard = (e) => {
        const WardID = e.target.value;
    }

    useEffect(() => {
        console.log(tempDistrict);
    }, [tempDistrict]);

    return (
        <div className={'payment-container'}>
            <div className={'payment-content'}>
                {/*
                Trang payment can nhung yeu cau sau:
                1. Hien thi toan bo san pham se mua
                2. Cho phep nhap dia chi giao hang (neu chua set)
                3. Cho phep chon phuong thuc thanh toan
                */}
                <div className={'chooseAddress'}>
                    {tempUser[0].address ? (
                            <div className={'availableAddress'}>
                                <p>Vui lòng chọn địa chỉ giao hàng: </p>
                                <form className={'form-address'}>
                                    <select className={'listAddress'}>
                                        <option>---</option>
                                        {tempUser[0].address.map((item, index) => (
                                            <option key={index} value={index}>{item}</option>
                                        ))}
                                    </select>
                                </form>
                            </div>
                        )
                        :
                        (
                            <div className={'newAddress'}>
                                <p>Vui lòng ghi địa chỉ giao hàng mới:</p>
                                <form className={'form-address'}>
                                    <select onChange={handleGetCity}>
                                        <option defaultValue={-1}>Tỉnh/Thành Phố</option>
                                        {tempSample ?
                                            (
                                                tempSample.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))
                                            ) : (console.log('Error: can not fetch data from static api file'))
                                        }
                                    </select>
                                    <select onChange={handleGetDistrict}>
                                        <option defaultValue={-1}>Phường/Thị trấn/Quận</option>
                                        {tempDistrict ?
                                            (
                                                tempDistrict.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))
                                            ) : ''
                                        }
                                    </select>

                                    <select onChange={handleGetWard}>
                                        <option defaultValue={-1}>Huyện/xã</option>
                                        {tempWard ? (
                                            tempWard.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))
                                        ) : ''}
                                    </select>
                                    <input type={'text'}/>
                                </form>
                            </div>
                        )
                    }
                </div>
                <div className={'showProdList'}>
                    <table border={'1ppx solid black'}>
                        <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Thông tin sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng</th>
                        </tr>
                        {listPayment.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className={'infoProd'}>
                                        <img className={'thumbnailProd'} src={''} alt={'prod'}/>
                                        <p>{item.name}</p>
                                    </div>
                                </td>
                                <td>{item.amount}</td>
                                <td>{item.price.toLocaleString('vi-VN')}</td>
                                <td>{(item.amount * item.price).toLocaleString('vi-VN')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={'PaymentZone'}>
                    <div className={'chooseMethodPayment'}>
                        <div className={'selectForm'}>
                            <p>Vui lòng chọn phương thức thanh toán</p>
                            <select onChange={handleSetPayment}>
                                <option value={0}>---</option>
                                <option value={1}>Thanh toán khi nhận hàng (COD)</option>
                                <option value={2}>Thanh toán trực tuyến</option>
                            </select>
                        </div>
                        <div className={'selectShowQR'}>
                            <img className={'QRImg'} src={''} alt={'QRCode'}/>
                        </div>
                    </div>
                    <div className={'submitForm'}>
                        <h5>Vui lòng xác nhận thanh toán</h5>
                        {payment === 1 ? (
                            <div className={'showInfoCash'}>
                                <p>Tổng số tiền: {totalCost.toLocaleString('vi-VN')} </p>
                                <p>Phí vận chuyển: {(totalCost * 0.03).toLocaleString('vi-VN')}</p>
                            </div>
                        ) : (
                            <div className={'showInfoBanking'}></div>
                        )
                        }
                        <form>
                            <button className={'featureBtns'}>Xác nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment;