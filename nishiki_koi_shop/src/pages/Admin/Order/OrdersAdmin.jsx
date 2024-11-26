import {sampleOrders} from "../../../store/sampleTest";
import '../../../assets/css/Admin/Page/ordersAdmin.css'
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    handleChooseOne, handleGetAllProd, handleSubmit, useChooseAll, useHookPaymentForm
} from "../../../utils/handleFuncs";
import {handleRenderSelectCard} from "../../../utils/handleRenderFuncs";
import {ToolManager} from "../../../components/Admin/ToolManager";

const OrdersAdmin = () => {
    const orderStatus = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];
    const [status, setStatus] = useState(false);
    const [id, setId] = useState(-1);

    const formData = useHookPaymentForm();

    const [orders, setOrders] = useState([]);

    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(sampleOrders.length);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/order-fishes/get-all-order-fishes', sessionStorage.getItem('token'), setOrders, setChooseOne);
    }, []);

    useEffect(() => {
        console.log(formData.values);
    }, [formData.values]);

    return (<div className={'manager-order-container'}>
            <div className={'manager-order-content'}>
                <ToolManager setStatus={setStatus}
                             itemLength={orders.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                             baseUrl={'orders'}
                />

                <div className={'list-orders'}>
                    <div className={'order-item'}>
                        <div className={'order-id'}>ID hóa đơn</div>
                        <div className={'order-date'}>Ngày lập</div>
                        <div className={'order-payment-method'}>Phương thức thanh toán</div>
                        <div className={'order-status'}>Tình trạng</div>
                        <div className={'order-total-cost'}>Tổng giá trị</div>
                        <div className={'order-show-more'}></div>
                        <div className={'order-submit'}></div>
                    </div>
                    {orders.map((item, index) => (<div key={index} className={'order-item'}>
                            <div className={'order-id'}>{item.orderFishId}</div>
                            <div className={'order-date'}>{item.createdDate}</div>
                            <div className={'order-payment-method'}>{item.paymentMethod}</div>
                            <div className={'order-status'}>{handleRenderSelectCard({
                                name: 'status',
                                currChoice: item.status,
                                arrayData: orderStatus,
                                isDisabled: true,
                                useHook: formData
                            })} </div>
                            <div
                                className={'order-total-cost'}>{item.totalAmount ? item.totalAmount.toLocaleString('vi-VN') : ''} đ
                            </div>
                            <div className={'order-show-more'}>
                                <input className={'check-box'} type={'checkbox'} style={{width: '15px', height: '15px'}}
                                       onClick={() => handleChooseOne(chooseOne, setChooseOne, index, Number(item.orderFishId), setId)}
                                />
                            </div>
                            <div className={'order-submit'}>
                                <button className={'featureBtn'}
                                        onClick={(e) => handleSubmit(e,
                                            formData,
                                            `http://localhost:8080/api/v1/manager/order-fishes/update/${item.orderFishId}`,
                                            sessionStorage.getItem('token'),
                                            "PUT",
                                            null,
                                            'admin/orders')}>Cập nhật
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer
                autoClose={1500}
            />
        </div>
    )
}
export default OrdersAdmin
