import {sampleOrders} from "../../../store/sampleTest";
import '../../../assets/css/Admin/ordersAdmin.css'
import {toast, ToastContainer} from "react-toastify";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useChooseAll} from "../../../utils/handleFuncs";
import {handleRenderSelectCard} from "../../../utils/handleRenderFuncs";
import {ToolManager} from "../../../components/ToolManager";

const OrdersAdmin = () => {
    const orderStatus = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];
    const [status, setStatus] = useState(false);

    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(sampleOrders.length);

    const handleChooseOne = (index) => {
        if (chooseOne[index]) toast('Đã hủy chọn thành công');
        else toast.success('Đã chọn thành công');

        const temp = chooseOne;
        chooseOne[index] = !chooseOne[index];
        setChooseOne(temp);
    }

    return (
        <div className={'manager-order-container'}>
            <div className={'manager-order-content'}>
                <ToolManager setStatus={setStatus} itemLength={sampleOrders.length} useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}/>

                <div className={'list-orders'}>
                    {sampleOrders.map((item, index) => (
                        <div key={index} className={'order-item'}>
                            <div className={'order-user-name'}>{item.username}</div>
                            <div className={'order-id'}>{item.orderId}</div>
                            <div className={'order-total-cost'}>{item.price}</div>
                            <div className={'order-status'}>
                                {handleRenderSelectCard(item.status, orderStatus, true)}
                            </div>
                            <div className={'tool'}>
                                <input className={'check-box'} type={'checkbox'} style={{width: '15px', height: '15px'}}
                                       onClick={() => handleChooseOne(index)}
                                />
                            </div>
                            <Link className={'order-details'} to={'/orders/' + item.orderId}>Xem thêm</Link>
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
