import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/cart.css'
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {
    const [listProd, setListProd] = useState([]);
    const [isChecked, setIsChecked] = useState({});
    const [totalCost, setTotalCost] = useState(0);

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
                    toast("Checked");
                } else {
                    const tmp = [...tempData];
                    setTotalCost(totalCost - (tmp[index].amount * tmp[index].price))
                    toast("Unchecked");
                }
                return newCheckedList;
            }
        )
    }

    const handleBuyClick = () => {
        navigate('/payment');
    }

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
                <table border={'1px solid black'}>
                    <tbody>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Thông tin sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tạm tính</th>
                        <th>Tùy chọn</th>
                        <th>Đã chọn?</th>
                    </tr>
                    {tempData.map((value, index) => (
                        <tr key={index}>
                            <td style={{height: "fit-content"}}>{index}</td>
                            <td>{value.id}</td>
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
                            <td>
                                <div className={'optionBtns'}>
                                    <button className={'featureBtns'}>Mua</button>
                                    <button className={'featureBtns'}>Xóa</button>
                                </div>
                            </td>
                            <td>
                                <input type={"checkbox"} name={'choose'} value={'checked'}
                                       onChange={() => handleChecked(index)}/>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan={2}>Tổng tiền:</td>
                        <td colSpan={4}>{totalCost.toLocaleString('vi-VN')}</td>
                        <td>
                            <div className={'optionBtns'}>
                                <button className={'featureBtns'} onClick={handleBuyClick}>Mua</button>
                                <button className={'featureBtns'}>Xóa</button>
                            </div>
                        </td>
                        <td>
                            <input type={"checkbox"} name={'choose'} value={'checked'}
                                   onChange={() => handleChecked(2)}/>
                        </td>
                    </tr>
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
    )
}
export default Cart;