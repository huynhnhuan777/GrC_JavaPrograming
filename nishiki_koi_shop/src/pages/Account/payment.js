import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Account/payment.css';
import AddNewAddress from "./Modal/AddNewAddress";
import {handleSubmit, useHookPaymentForm} from "../../utils/handleFuncs";
import {useNavigate} from "react-router-dom";

const Payment = () => {
    const [listPayment, setListPayment] = useState([]);/*Thiet lap danh sach san pham*/
    const [totalCost, setTotalCost] = useState(0);
    const [payment, setPayment] = useState(0);
    const [user, setUser] = useState(null);
    const [validPayment, setValidPayment] = useState(false);
    const [status, setStatus] = useState(false);

    const orderFish = useHookPaymentForm();
    const navigate = useNavigate();

    const handleSetPayment = (event) => {
        setPayment(event.target.value);
        setValidPayment(true);
    }

    const handleSubmitPayment = () => {
        if (validPayment && user.address !== null) {
            orderFish.values.status = 'PENDING';
            orderFish.values.paymentMethod = payment;
            orderFish.values.shippingAddress = user.address;

            orderFish.values.cartItemIds = listPayment.map((item) => item.id);

            console.log(orderFish)

            handleSubmit(null, orderFish, 'http://localhost:8080/api/v1/order-fishes/create', sessionStorage.getItem('token'), 'POST', null, '/orders');
        } else {
            toast.warning('Thiếu thông tin cần thiết để lập đơn hàng!')
        }
    }

    const handleChangeAddress = () => {
        setStatus(true);
    }

    useEffect(() => {
        setListPayment(JSON.parse(sessionStorage.getItem('listPayment')));
        setUser(JSON.parse(sessionStorage.getItem('user')));
    }, []);

    useEffect(() => {
        const total = listPayment.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        setTotalCost(total);
    }, [listPayment]);


    useEffect(() => {
        console.log(validPayment);
    }, [validPayment]);

    return (<div className={'payment-container'}>
        <div className={'payment-content'}>
            {/*
                Trang payment can nhung yeu cau sau:
                1. Hien thi toan bo san pham se mua
                2. Cho phep nhap dia chi giao hang (neu chua set)
                3. Cho phep chon phuong thuc thanh toan
                */}
            <div className={'chooseAddress'}>
                <div className={'availableAddress'}>
                    <h3>Địa chỉ giao hàng hiện tại: </h3>
                    <p>{user && user.address ? user.address : 'Bạn không có địa chỉ nào cả'}</p>
                    <button className={'featureBtn'} onClick={handleChangeAddress}>Đổi địa chỉ</button>
                </div>
            </div>
            {status && <AddNewAddress setStatus={setStatus}
                                      setUser={setUser}/>}
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
                    {listPayment.map((item, index) => (<tr key={index}>
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
                    </tr>))}
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
                                    <option value={'COD'}>Thanh toán khi nhận hàng (COD)</option>
                                    <option value={'OP'}>Thanh toán trực tuyến</option>
                                </select>
                            </fieldset>
                        </form>
                        {payment === 2 ? (<div className={'ShowQR'}>
                            <img className={'QRImg'} src={''} alt={'QRCode'}/>
                        </div>) : ''}
                    </div>
                    <div className={'submitForm'}>
                        <h4>Vui lòng xác nhận thanh toán</h4>
                        {payment === 1 ? (<div className={'showInfoCash'}>
                            <p>Tổng số tiền: {totalCost.toLocaleString('vi-VN')} </p>
                            <p>Phí vận chuyển: {(totalCost * 0.03).toLocaleString('vi-VN')}</p>
                            <p>Tổng cộng: {(totalCost * 1.03).toLocaleString('vi-VN')}</p>
                        </div>) : (<div className={'showInfoBanking'}>
                            <p>Tổng số tiền: {totalCost.toLocaleString('vi-VN')} </p>
                        </div>)}

                        <button className={'featureBtn'} onClick={handleSubmitPayment}>Xác nhận</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    </div>)
}
export default Payment;