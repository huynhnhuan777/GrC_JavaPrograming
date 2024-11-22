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
        setValidPayment(true);
    }

    const [tempSample, setTempSample] = useState([]);
    const [tempDistrict, setTempDistrict] = useState([]);
    const [tempWard, setTempWard] = useState([]);

    const [validCity, setValidCity] = useState(false);
    const [validDistrict, setValidDistrict] = useState(false);
    const [validWard, setValidWard] = useState(false);
    const [validPayment, setValidPayment] = useState(false);

    const handleGetCity = (e) => {
        setValidCity(true);
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
        setValidDistrict(true);
        let districtObject = [];
        for (let i = 0; i < tempDistrict.length; i++) {
            if (tempDistrict[i].id === districtID) {
                districtObject = tempDistrict[i].data3;
            }
        }
        setTempWard(districtObject);
    }

    const handleGetWard = (e) => {
        setValidWard(true);
    }

    const handleSubmitPayment = () => {
        if (!validCity) {
            toast.error("Tính để shipper đi hết 63 tỉnh thành à?");
            return;
        }
        if (!validDistrict) {
            toast.error("Ship cho cả thành phố hay gì?");
            return;
        }
        if (!validWard) {
            toast.error("Mua 1 con cả quận cùng hưởng à?");
            return;
        }
        if (!validPayment) {
            toast.error("Rồi muốn thanh toán kiểu gì?");
            return;
        }
        toast.warning('Tính năng hiện chưa có ở bản demo!');
    }

    useEffect(() => {
        setListPayment(JSON.parse(sessionStorage.getItem('listPayment')));
    }, []);

    useEffect(() => {
        const total = listPayment.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        setTotalCost(total);
    }, [listPayment]);

    useEffect(() => {
        try {
            setTempSample(admin.data);
        } catch (error) {
            console.error('ERROR: ', error.message());
        }
    }, [tempSample]);

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
                                <h3>Vui lòng chọn địa chỉ giao hàng: </h3>
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
                                <h3 style={{padding: "10px"}}>Vui lòng ghi địa chỉ giao hàng mới:</h3>
                                <form className={'form-address'}>
                                    <fieldset className={'fieldset'}>
                                        <legend>Tỉnh/Thành phố</legend>
                                        <select className={'selectInput'} onChange={handleGetCity}>
                                            <option defaultValue={-1}></option>
                                            {tempSample ?
                                                (
                                                    tempSample.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    ))
                                                ) : (console.log('Error: can not fetch data from static api file'))
                                            }
                                        </select>
                                    </fieldset>
                                    <fieldset className={'fieldset'}>
                                        <legend>Quận/Huyện</legend>
                                        <select className={'selectInput'} onChange={handleGetDistrict}>
                                            <option defaultValue={-1}></option>
                                            {tempDistrict ?
                                                (
                                                    tempDistrict.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    ))
                                                ) : ''
                                            }
                                        </select>
                                    </fieldset>
                                    <fieldset className={'fieldset'}>
                                        <legend>Xã/Phường/Thị trấn</legend>
                                        <select className={'selectInput'} onChange={handleGetWard}>
                                            <option defaultValue={-1}></option>
                                            {tempWard ? (
                                                tempWard.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))
                                            ) : ''}
                                        </select>
                                    </fieldset>
                                    <fieldset className={'fieldset'}>
                                        <legend>Số nhà + đường</legend>
                                        <input className={'textInput'} type={'text'}/>
                                    </fieldset>
                                    <fieldset className={'fieldset'}>
                                        <legend>Ghi chú cho shipper</legend>
                                        <input className={'textInput'} type={'text'}/>
                                    </fieldset>
                                </form>
                            </div>
                        )
                    }
                </div>
                <div className={'showProdList'}>
                    <table className={'listProd'}>
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
                                        <img className={'thumbnailProd'} src={item.image} alt={'prod'}/>
                                        <p>{item.name}</p>
                                    </div>
                                </td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toLocaleString('vi-VN')}</td>
                                <td>{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={'PaymentZone'}>
                    <div className={'Payment'}>
                        <div className={'chooseMethodPayment'}>
                            <form className={'form-payment'}>
                                <h3>Vui lòng chọn phương thức thanh toán</h3>
                                <fieldset className={'fieldset'}>
                                    <legend>Phương thức</legend>
                                    <select className={'selectInput'} onChange={handleSetPayment}>
                                        <option value={0}></option>
                                        <option value={1}>Thanh toán khi nhận hàng (COD)</option>
                                        <option value={2}>Thanh toán trực tuyến</option>
                                    </select>
                                </fieldset>
                            </form>
                            {payment === 2 ? (
                                <div className={'ShowQR'}>
                                    <img className={'QRImg'} src={''} alt={'QRCode'}/>
                                </div>
                            ) : ''}
                        </div>
                        <div className={'submitForm'}>
                            <h4>Vui lòng xác nhận thanh toán</h4>
                            {payment === 1 ? (
                                <div className={'showInfoCash'}>
                                    <p>Tổng số tiền: {totalCost.toLocaleString('vi-VN')} </p>
                                    <p>Phí vận chuyển: {(totalCost * 0.03).toLocaleString('vi-VN')}</p>
                                    <p>Tổng cộng: {(totalCost * 1.03).toLocaleString('vi-VN')}</p>
                                </div>
                            ) : (
                                <div className={'showInfoBanking'}>
                                    <p>Tổng số tiền: {totalCost.toLocaleString('vi-VN')} </p>
                                </div>
                            )
                            }

                            <button className={'featureBtn'} onClick={handleSubmitPayment}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default Payment;