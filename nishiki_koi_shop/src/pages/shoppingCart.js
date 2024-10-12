import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/cart.css'
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {
    /*danh sach san pham se mua-khoi tao rong*/
    const [listProd, setListProd] = useState([]);

    /*danh sach san phan can thanh toan- se chuyen sang trang payment*/
    const [paymentList, setPaymentList] = useState([]);

    const [isChecked, setIsChecked] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [checkedAll, setCheckedAll] = useState(false);

    /*Du lieu mau*/
    const [tempData, setTempData] = useState([
            {id: 'KOI_1001_11_2213', name: 'KOI NIKO', amount: 2, price: 1150000},
            {id: 'KOI_1001_11_2214', name: 'KOI OSAKA', amount: 2, price: 1155000},
        ]
    )

    const navigate = useNavigate();

    const handleIncreaseAmount = (index) => {
        const reUpdate = [...tempData];
        reUpdate[index].amount += 1
        setListProd(reUpdate);

        if (isChecked[index]) {
            console.log('check');
            setTotalCost(totalCost + reUpdate[index].price);
        }
    }
    const handleDeceaseAmount = (index) => {
        const reUpdate = [...tempData];
        if (reUpdate[index].amount > 0) {
            reUpdate[index].amount -= 1
            setListProd(reUpdate);

            if (isChecked[index]) {
                setTotalCost(totalCost - reUpdate[index].price);
            }
        }
    }

    const handleChecked = (index) => {
        setIsChecked(prev => {
                const newCheckedList = {...prev, [index]: !prev[index]};
                if (newCheckedList[index]) {
                    const tmp = [...tempData];
                    setTotalCost(totalCost + tmp[index].amount * tmp[index].price);
                    setPaymentList([...paymentList, tmp[index]]);
                    setCheckedAll(false);
                    toast("Chọn thành công!");
                } else {
                    const tmp = [...tempData];
                    setTotalCost(totalCost - (tmp[index].amount * tmp[index].price));
                    setPaymentList(paymentList.filter(paymentList => paymentList.id !== tmp[index].id));
                    toast("Hông lấy nữa hả? Tiếc ghê...");
                    setCheckedAll(false);
                }
                return newCheckedList;
            }
        )
    }

    const handleCheckedAll = () => {
        if (checkedAll === false) {
            setIsChecked(prevState => {
                let newCheckedState = {};

                const inp = document.getElementsByClassName('chooseProd');
                for (let i = 0; i < inp.length; i++) {
                    inp[i].checked = true;
                    newCheckedState[i] = true;
                }
                const tmp = [...tempData];
                setTotalCost(tmp.reduce((acc, currentValue) => acc + (currentValue.price * currentValue.amount), 0));
                setPaymentList(tmp);
                toast("Chọn hết cả rồi nha!");
                setCheckedAll(true);
                return newCheckedState;
            });
        } else toast("Bạn đã chọn hết rồi!");
    }

    const handleCheckBox = () => {
        for (const [key, value] of Object.entries(isChecked)) {
            if (value === true) {
                return true; // Break sẽ hoạt động trong vòng lặp for...of
            }
        }
        return false
    }

    const handleUnCheckedAll = () => {
        if (checkedAll === true || handleCheckBox()) {
            setIsChecked(prevState => {
                const newCheckedState = {};
                for (let key in prevState) {
                    if (prevState.hasOwnProperty(key)) {
                        newCheckedState[key] = false;
                    }
                }
                const inp = document.getElementsByClassName('chooseProd');
                for (let i = 0; i < inp.length; i++) {
                    inp[i].checked = false;
                }

                setTotalCost(0);
                setPaymentList([]);
                toast('Bỏ hết, mua sau đúng hem?');
                setCheckedAll(false);
                return newCheckedState;
            })
        } else toast("Còn gì nữa đây để bỏ đây hở!?");
    }

    const handleBuyClick = () => {
        if (handleCheckBox()) {
            sessionStorage.setItem('listPayment', JSON.stringify(paymentList));
            navigate('/payment');
        } else toast("Tính thanh toán không khí hả?!");
    }

    useEffect(() => {
        console.log('Payment list: ', paymentList);
    }, [paymentList]); // Chạy mỗi khi paymentList thay đổi

    return (
        <div className={'cart-container'}>
            <div className={'cart-content'}>
                {/*
                Yeu cau cho UI gio hang:
                1. Can cac cot nhu: STT, ma sp, ten va hinh san pham, so luong, gia tien/don vi tinh, tong tien, nut chuc nang
                2. so luong co nut tang giam
                3. nut chuc nang bao gom: chon, xoa
                4. cuoi cung co nut chon het.
                */}
                {tempData ?
                    <table style={{borderCollapse: 'collapse'}}>
                        <tbody>
                        <tr style={{backgroundColor: 'var(--bg-color-table)'}}>
                            {/*<th>ID</th>*/}
                            <th>Thông tin sản phẩm</th>
                            <th style={{width: '10%'}}>Số lượng</th>
                            <th style={{width: '15%'}}>Giá</th>
                            <th style={{width: '15%'}}>Tạm tính</th>
                            <th style={{width: '10%'}}>
                                <div className={''}>
                                    <button className={'featureBtns'} onClick={handleCheckedAll}>Chọn hết</button>
                                    <button className={'featureBtns'} onClick={handleUnCheckedAll}>Bỏ Hểt</button>
                                </div>
                            </th>
                        </tr>
                        {tempData.map((value, index) => (
                            <tr key={index}>
                                {/*<td>{value.id}</td>*/}
                                <td>
                                    <div className={'infoProd'}>
                                        <img className={'thumbnailProd'} src={''} alt={'prod'}/>
                                        <p>{value.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className={'changeAmountBtns'}>
                                        <button className={'featureBtns'}
                                                onClick={() => handleDeceaseAmount(index)}>-
                                        </button>
                                        <p>{value.amount}</p>
                                        <button className={'featureBtns'} onClick={() => handleIncreaseAmount(index)}>+
                                        </button>
                                    </div>
                                </td>
                                <td>{value.price.toLocaleString('vi-VN')}</td>
                                <td>{(value.amount * value.price).toLocaleString('vi-VN')}</td>
                                {/*<td>*/}
                                {/*    <div className={'optionBtns'}>*/}
                                {/*        <button className={'featureBtns'} onClick={() => handleBuySingleProd(index)}>Mua*/}
                                {/*        </button>*/}
                                {/*        <button className={'featureBtns'}*/}
                                {/*                onClick={() => handleRemoveSingleProd(value.id)}>Xóa*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*</td>*/}
                                <td>
                                    <input className={'chooseProd'} type={"checkbox"} name={'choose'} value={'checked'}
                                           onClick={() => handleChecked(index)}/>
                                </td>
                            </tr>
                        ))}

                        <tr style={{borderBottom: 'none', backgroundColor: 'transparent'}}>
                            <td colSpan={4}>Tổng tiền: {totalCost.toLocaleString('vi-VN')}</td>
                            {/*<td>*/}
                            {/*    <div className={'optionBtns'}>*/}
                            {/*        <button className={'featureBtns'} onClick={handleBuyClick}>Mua</button>*/}
                            {/*        <button className={'featureBtns'} onClick={handleRemoveAllClick}>Xóa</button>*/}
                            {/*    </div>*/}
                            {/*</td>*/}
                            <td>
                                <div className={'optionBtns'}>
                                    <button className={'featureBtns'} onClick={handleBuyClick}>Mua ngay</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    :
                    <p>Có mua cái dell gì đâu mà </p>
                }
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
    )
}
export default Cart;