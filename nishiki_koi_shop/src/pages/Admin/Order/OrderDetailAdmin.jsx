import {useEffect, useState} from "react";
import '../../../assets/css/Admin/Component/DetailObj/OrderDeetailAdmin.css'
import Loading from "../../../components/Modal/Loading";
import {handleRenderSelectCard} from "../../../utils/handleRenderFuncs";

const OrderDetailAdmin = ({orderData}) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (orderData.fishId.length !== 0) {
            setIsLoading(true);
        }
    }, [orderData.fishId]);
    return (
        !isLoading ? <Loading/> :
            <div className={'order-detail-container'}>
                <div className={'order-detail-content'}>
                    <h3>Thông tin đơn hàng</h3>
                    <p>Mã đơn hàng: {orderData.orderFishId}</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%'
                    }}>
                        <p style={{width: '20%'}}>ID sản phẩm</p>
                        <p style={{width: '10%'}}>Số lượng</p>
                        <p style={{width: '70%'}}>Tổng tiền</p>
                    </div>
                    <div
                        style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '20%'
                        }}>
                            {orderData.fishId.map((item, index) => (
                                <p key={index} style={{}}>{item}</p>))}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '10%'
                        }}>
                            {orderData && orderData?.quantity.map((item, index) => (
                                <p key={index} style={{}}>{item}</p>))}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '70%'
                        }}>
                            {orderData && orderData.price.map((item, index) => (
                                <p key={index} style={{}}> {item.toLocaleString('vi-VN')} đ</p>))}
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default OrderDetailAdmin