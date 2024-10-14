import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/payment.css';
import admin from '../../utils/xml/api_full_administration.json'

const Payment = () => {
    const [listPayment, setListPayment] = useState([]);/*Thiet lap danh sach san pham*/
    const [totalCost, setTotalCost] = useState(0);
    const [payment, setPayment] = useState();

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
    useEffect(() => {
        setTempSample(admin.data);
    }, [tempSample]);

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
                                <form>
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
                                <form>
                                    <input type={'text'} value={'numberHouse'}/>
                                    <select>
                                        <option>Huyện/xã</option>
                                    </select>
                                    <select>
                                        <option>Phường/Thị trấn/Quận</option>
                                    </select>
                                    <select>
                                        <option>Tỉnh/Thành Phố</option>
                                    </select>
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
                            <tr key={{index}}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className={'infoProd'}>
                                        <img className={'thumbnailProd'} src={''} alt={'prod'}/>
                                        <p>{item.name}</p>
                                    </div>
                                </td>
                                <td>{item.amount}</td>
                                <td>{item.price}</td>
                                <td>{(item.amount * item.price).toLocaleString('vi-VN')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
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
    )
}
export default Payment;