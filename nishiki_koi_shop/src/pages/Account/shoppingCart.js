import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Account/cart.css';
import {Link, useNavigate} from "react-router-dom";
import {handleDeleteObj, handleGetObjById, handleSubmit, useHookCartItemForm} from "../../utils/handleFuncs";
import axios from "axios";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [isChecked, setIsChecked] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [checkedAll, setCheckedAll] = useState(false);

    const navigate = useNavigate();
    const userId = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).id : null;
    const token = sessionStorage.getItem('token');

    const cartItem = useHookCartItemForm();

    useEffect(() => {
        handleGetObjById(`http://localhost:8080/api/v1/cart/items`, token, setCartData).then(r => console.log(r));
    }, []);

    useEffect(() => {
        if (cartData && cartData.items) {
            const newTotalCost = cartData.items.reduce((sum, item, index) => {
                return sum + (isChecked[index] ? item.quantity * item.price : 0);
            }, 0);
            setTotalCost(newTotalCost);
        }
    }, [cartData, isChecked]);

    const handleIncreaseAmount = (index) => {
        const updatedItems = [...cartData];

        if (updatedItems[index].quantity + 1 > updatedItems[index].stored) {
            toast.warning("Đã đat giới han số cá có thể mua được!");
            return;
        }

        updatedItems[index].quantity += 1;

        cartItem.values.fishId = updatedItems[index].fishId;
        cartItem.values.quantity = 1;

        setCartData(updatedItems);

        handleSubmit(null, cartItem, 'http://localhost:8080/api/v1/cart/items/add', sessionStorage.getItem('token'), "POST", null, null).then(r => console.log(r));

        if (isChecked[index]) {
            setTotalCost(prev => prev + updatedItems[index].price);
        }
    };

    const handleDecreaseAmount = (index) => {
        const updatedItems = [...cartData];

        if (updatedItems[index].quantity - 1 === 0) {
            toast.warning("Tính mua cá cõi âm à!");
            return;
        }

        updatedItems[index].quantity -= 1;

        cartItem.values.fishId = updatedItems[index].fishId;
        cartItem.values.quantity = 1;

        setCartData(updatedItems);

        handleSubmit(null, cartItem, 'http://localhost:8080/api/v1/cart/items/remove', sessionStorage.getItem('token'), "POST", null, null).then(r => console.log(r));

        if (isChecked[index]) {
            setTotalCost(prev => prev - updatedItems[index].price);
        }
    };

    const handleChecked = (index) => {
        setIsChecked((prev) => {
            const newChecked = {...prev, [index]: !prev[index]};
            setTotalCost(prev => {
                const tmp = cartData[index];
                return prev + (isChecked[index] ? -tmp.quantity * tmp.price : tmp.quantity * tmp.price);
            });
            return newChecked;
        });

        toast.success(isChecked[index] ? "Hông lấy nữa hả? Tiếc ghê..." : "Chọn thành công!");
    };

    const handleCheckedAll = () => {
        if (!checkedAll) {
            const newCheckedState = {};
            cartData.forEach((_, index) => newCheckedState[index] = true);
            setIsChecked(newCheckedState);
            setCheckedAll(true);
            setTotalCost(cartData.reduce((sum, item) => sum + item.quantity * item.price, 0));
            toast.success("Chọn hết cả rồi nha!");
        } else {
            toast.success("Bạn đã chọn hết rồi!");
        }
    };

    const handleUnCheckedAll = () => {
        if (checkedAll || Object.values(isChecked).some(val => val)) {
            setIsChecked({});
            setCheckedAll(false);
            setTotalCost(0);
            toast.success('Bỏ hết, mua sau đúng hem?');
        } else {
            toast.warning("Còn gì nữa đây để bỏ đây hở!?");
        }
    };

    const handleBuyClick = () => {
        if (Object.values(isChecked).some(val => val)) {
            const paymentList = cartData.filter((_, index) => isChecked[index]);
            sessionStorage.setItem('listPayment', JSON.stringify(paymentList));
            navigate('/payment');
        } else {
            toast.error("Tính thanh toán không khí hả?!");
        }
    };

    useEffect(() => {
        console.log(cartData);
    }, [cartData])

    return (
        <div className={'cart-container'}>
            <div className={'cart-content'}>
                <table style={{backgroundColor: 'var(--bg-color-table)'}}>
                    <thead>
                    <tr className={'disable'}>
                        <th style={{width: '5%'}}></th>
                        <th style={{width: '45%'}}><h3>Thông tin sản phẩm</h3></th>
                        <th style={{width: '10%'}}><h3>Số lượng</h3></th>
                        <th style={{width: '15%'}}><h3>Giá</h3></th>
                        <th style={{width: '15%'}}><h3>Tạm tính</h3></th>
                        <th style={{width: '10%'}}>
                            <div>
                                <button className={'featureBtn'} onClick={handleCheckedAll}
                                        style={{width: '100px'}}>Chọn hết
                                </button>
                                <button className={'featureBtn'} onClick={handleUnCheckedAll}
                                        style={{width: '100px'}}>Bỏ Hểt
                                </button>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartData === null || cartData.length === 0 ? (
                        <tr>
                            <td colSpan={6}><p>Có cái dell gì đâu mà mua</p></td>
                        </tr>
                    ) : (
                        <>
                            {cartData.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <button className={'featureBtn'}
                                                onClick={() => handleDeleteObj(`http://localhost:8080/api/v1/cart/items/delete/${item.id}`, item.id, sessionStorage.getItem('token'))}>Xóa
                                        </button>
                                    </td>
                                    <td>
                                        <div className={'infoProd'}>
                                            <img
                                                className={'thumbnailProd'}
                                                src={item.image}
                                                alt={'product'}
                                                style={{height: '200px', width: 'auto'}}
                                            />
                                            <Link to={`/fish/${item.id}`}><strong>{item.name}</strong></Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'changeAmountBtns'}>
                                            <button className={'featureBtn'}
                                                    onClick={() => handleDecreaseAmount(index)}>-
                                            </button>
                                            <p><strong>{item.quantity}</strong></p>
                                            <button className={'featureBtn'}
                                                    onClick={() => handleIncreaseAmount(index)}>+
                                            </button>
                                        </div>
                                    </td>
                                    <td><strong>{item.price.toLocaleString('vi-VN')} đ</strong></td>
                                    <td><strong>{(item.quantity * item.price).toLocaleString('vi-VN')} đ</strong></td>
                                    <td>
                                        <input
                                            className={'chooseProd'}
                                            type="checkbox"
                                            checked={isChecked[index] || false}
                                            style={{width: '20px', height: '20px'}}
                                            onChange={() => handleChecked(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr style={{backgroundColor: 'transparent'}}>
                                <td colSpan={4}>Tổng tiền:</td>
                                <td>{totalCost.toLocaleString('vi-VN')}</td>
                                <td>
                                    <button className={'featureBtn'} onClick={handleBuyClick}>Mua ngay</button>
                                </td>
                            </tr>
                        </>
                    )}
                    </tbody>
                </table>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    );
};

export default Cart;