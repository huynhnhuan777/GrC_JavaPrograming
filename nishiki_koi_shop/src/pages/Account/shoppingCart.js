import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Account/cart.css';
import { useNavigate } from "react-router-dom";
import { handleGetObjById, handleDeleteObj } from "../../utils/handleFuncs";
import axios from "axios";

const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [fishData, setFishData] = useState({});
    const [isChecked, setIsChecked] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [checkedAll, setCheckedAll] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).id : null;
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        handleGetObjById(`http://localhost:8080/api/v1/cart/${userId}`, token, setCartData).then(r => console.log(r));
    }, []);

    useEffect(() => {
        const fetchFishData = async () => {
            if (cartData) {
                try {
                    const fishIds = [...new Set(cartData.items.map(item => item.fishId))];
                    const fishPromises = fishIds.map(fishId =>
                        axios.get(`http://localhost:8080/api/v1/fish/${fishId}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        })
                    );
                    const responses = await Promise.all(fishPromises);
                    const fishMap = responses.reduce((acc, response) => {
                        acc[response.data.id] = response.data;
                        return acc;
                    }, {});
                    setFishData(fishMap);
                } catch (error) {
                    console.error("Error fetching fish data:", error);
                }
            };
        }
        fetchFishData();
    }, [cartData]);

    useEffect(() => {
        if (cartData && cartData.items) {
            const newTotalCost = cartData.items.reduce((sum, item, index) => {
                return sum + (isChecked[index] ? item.quantity * item.price : 0);
            }, 0);
            setTotalCost(newTotalCost);
        }
    }, [cartData, isChecked]);

    useEffect(() => {
        const updateCartItem = async () => {
            if (Object.keys(cartItem).length !== 0) {
                const { id, ...cartItemForm } = cartItem
                await axios.put(`http://localhost:8080/api/v1/cart/items/update/${id}`, cartItemForm, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
        };

        updateCartItem();
    }, [cartItem.id, cartItem.quantity]);

    const handleIncreaseAmount = (index) => {
        if (!cartData || !cartData.items) return;
        const fishAvailableQuantity = fishData[cartData.items[index].fishId]?.quantity || 0;
        if (cartData.items[index].quantity >= fishAvailableQuantity) {
            toast("Cá không đủ cho bạn chơi rồi");
            return;
        }
        const updatedItems = [...cartData.items];
        updatedItems[index].quantity += 1;
        setCartData({ ...cartData, items: updatedItems });
        setCartItem(updatedItems[index]);
        if (isChecked[index]) {
            setTotalCost(prev => prev + updatedItems[index].price);
        }
    };

    const handleDecreaseAmount = (index) => {
        if (!cartData || !cartData.items || cartData.items[index].quantity <= 0) return;
        const updatedItems = [...cartData.items];
        updatedItems[index].quantity -= 1;
        setCartData({ ...cartData, items: updatedItems });
        setCartItem(updatedItems[index]);
        if (isChecked[index]) {
            setTotalCost(prev => prev - updatedItems[index].price);
        }
    };

    const handleChecked = (index) => {
        setIsChecked((prev) => {
            const newChecked = { ...prev, [index]: !prev[index] };
            setTotalCost(prev => {
                const tmp = cartData.items[index];
                const newCost = prev + (isChecked[index] ? -tmp.quantity * tmp.price : tmp.quantity * tmp.price);
                return newCost;
            });
            return newChecked;
        });

        toast(isChecked[index] ? "Hông lấy nữa hả? Tiếc ghê..." : "Chọn thành công!");
    };

    const handleCheckedAll = () => {
        if (!cartData || !cartData.items) return;
        if (!checkedAll) {
            const newCheckedState = {};
            cartData.items.forEach((_, index) => newCheckedState[index] = true);
            setIsChecked(newCheckedState);
            setCheckedAll(true);
            setTotalCost(cartData.items.reduce((sum, item) => sum + item.quantity * item.price, 0));
            toast("Chọn hết cả rồi nha!");
        } else {
            toast("Bạn đã chọn hết rồi!");
        }
    };

    const handleUnCheckedAll = () => {
        if (checkedAll || Object.values(isChecked).some(val => val)) {
            setIsChecked({});
            setCheckedAll(false);
            setTotalCost(0);
            toast('Bỏ hết, mua sau đúng hem?');
        } else {
            toast("Còn gì nữa đây để bỏ đây hở!?");
        }
    };

    const handleBuyClick = () => {
        if (Object.values(isChecked).some(val => val)) {
            const paymentList = cartData.items.filter((_, index) => isChecked[index]);
            sessionStorage.setItem('listPayment', JSON.stringify(paymentList));
            navigate('/payment');
        } else {
            toast("Tính thanh toán không khí hả?!");
        }
    };

    return (
        <div className={'cart-container'}>
            <div className={'cart-content'}>
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--bg-color-table)' }}>
                            <th></th>
                            <th>Thông tin sản phẩm</th>
                            <th style={{ width: '10%' }}>Số lượng</th>
                            <th style={{ width: '15%' }}>Giá</th>
                            <th style={{ width: '15%' }}>Tạm tính</th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <button className={'featureBtn'} onClick={handleCheckedAll} style={{ width: '100px' }}>Chọn hết</button>
                                    <button className={'featureBtn'} onClick={handleUnCheckedAll} style={{ width: '100px' }}>Bỏ Hểt</button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData === null ? (
                            <tr><td colSpan={6}>Loading...</td></tr>
                        ) : cartData?.items?.length === 0 ? (
                            <tr><td colSpan={'6'}><p>Có mua cái dell gì đâu mà</p></td></tr>
                        ) : (
                            <>
                                {cartData.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <button className={'featureBtn'} onClick={() => handleDeleteObj('cart', item.id, token)}>Xóa</button>
                                        </td>
                                        <td>
                                            <div className={'infoProd'}>
                                                {fishData[item.fishId] ? (
                                                    <>
                                                        <img
                                                            className={'thumbnailProd'}
                                                            src={fishData[item.fishId].image}
                                                            alt={'product'}
                                                        />
                                                        <span>{fishData[item.fishId].name}</span>
                                                    </>
                                                ) : (
                                                    <p>Loading image...</p>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'changeAmountBtns'}>
                                                <button className={'featureBtn'} onClick={() => handleDecreaseAmount(index)}>-</button>
                                                <p>{item.quantity}</p>
                                                <button className={'featureBtn'} onClick={() => handleIncreaseAmount(index)}>+</button>
                                            </div>
                                        </td>
                                        <td>{item.price.toLocaleString('vi-VN')}</td>
                                        <td>{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                                        <td>
                                            <input
                                                className={'chooseProd'}
                                                type="checkbox"
                                                checked={isChecked[index] || false}
                                                onChange={() => handleChecked(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                <tr style={{ backgroundColor: 'transparent' }}>
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