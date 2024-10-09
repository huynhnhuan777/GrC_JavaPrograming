import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/payment.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

const Payment = () => {
    const [amount, setAmount] = useState(0); /*se lam thanh [] sau*/
    const [list, setList] = useState([]);/*Thiet lap danh sach san phan*/

    const handleIncreaseAmount = () => {
        setAmount(amount + 1);
    }
    const handleDeceaseAmount = () => {
        if (amount > 0) {
            setAmount(amount - 1);
        }
    }

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
                            <th>ID</th>
                            <th>Thông tin sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>
                                <div className={'prodInfo'}>
                                    <img className={'thumbnailProd'} src={''} alt={'prod'}/>
                                    <h5>product</h5>
                                </div>
                            </td>
                            <td>
                                <button className={'featureBtns'} onClick={handleDeceaseAmount}>-</button>
                                <p>{amount}</p>
                                <button className={'featureBtns'} onClick={handleIncreaseAmount}>+</button>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
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