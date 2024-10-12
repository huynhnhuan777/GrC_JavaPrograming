import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/payment.css'

const Payment = () => {
    const [listPayment, setListPayment] = useState([]);/*Thiet lap danh sach san pham*/

    /*Du lieu mau ve customer*/

    const [tempUser, setTempUser] = useState([
        {id: 'user_1101_1121', name: 'CaoNhatHao'}
    ])

    useEffect(() => {
        setListPayment(JSON.parse(sessionStorage.getItem('listPayment')));
    }, []);

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
                    <p>Vui lòng chọn địa chỉ giao hàng: </p>
                    <form>
                        <select>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </form>
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
                        <select>
                            <option>Thanh toán khi nhận hàng (COD)</option>
                            <option>Thanh toán trực tuyến</option>
                        </select>
                    </div>
                    <div className={'selectShowQR'}>
                        <img className={'QRImg'} src={''} alt={'QRCode'}/>
                    </div>
                </div>
                <div className={'submitForm'}>
                    <p>Xác nhận thanh toán:</p>
                    <p>Tổng số tiền: </p>
                    <p>Hình thức thanh toán:</p>
                    <form>
                        <button className={'featureBtns'}>Xác nhận</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Payment;