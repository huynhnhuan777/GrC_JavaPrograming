import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleGetObjById } from '../../utils/handleFuncs'
import axios from 'axios'
import { handleSubmit } from '../../utils/handleFuncs'
import '../../assets/css/Account/CustomerOrderDetail.css'

function CustomerOrderFishDetail() {
    const { id } = useParams()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [orderFish, setOrderFish] = useState({})
    const [orderFishDetail, setOrderFishDetail] = useState([])
    const [fish, setFish] = useState({})
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        handleGetObjById(`http://localhost:8080/api/v1/order-fishes/${parseInt(id, 10)}`, token, setOrderFish)
        handleGetObjById(`http://localhost:8080/api/v1/order-fish-details/order-fish/${parseInt(id, 10)}`, token, setOrderFishDetail)
    }, [])

    useEffect(() => {
        const fetchFishData = async () => {
            if (orderFishDetail.length === 0) return;

            try {
                const fishIds = orderFishDetail.map(detail => detail.fishId);
                const fishPromises = fishIds.map(fishId =>
                    axios.get(`http://localhost:8080/api/v1/fish/${fishId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                );
                const responses = await Promise.all(fishPromises);
                const fishData = responses.map(response => response.data);
                const fishMap = {};
                fishData.forEach(fishItem => fishMap[fishItem.id] = fishItem);
                setFish(fishMap);
            } catch (error) {
                console.error("Error fetching fish data:", error);
            }
        };
        fetchFishData();
    }, [orderFishDetail])

    const cancelOrder = async () => {
        const orderFishForm = { ...orderFish, status: 'CANCELLED' };
        delete orderFishForm.orderFishId
        console.log(orderFishForm)
        await axios.put(
            `http://localhost:8080/api/v1/order-fishes/update/${orderFish.orderFishId}`,
            orderFishForm,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        window.location.assign(`/order-fish/${id}`)
    }

    return (
        <div className={'customer-order-detail-container'}>
            <h1>Thông tin đơn hàng</h1>
            <div className={'customer-order-details-wrapper'}>
                <div className={'customer-order-detail-content'}>
                    <form onSubmit={cancelOrder}>
                        <h2>Thông tin của bạn</h2>
                        <label>Họ và tên: <span>{user.fullName}</span></label><br />
                        <label>Số điện thoại: <span>{user.phoneNumber}</span></label><br />
                        <label>Email: <span>{user.email}</span></label><br />
                        <label>Địa chỉ: <span>{user.address}</span></label><br />
                        {orderFish.status === 'PENDING' && (<button type='submit'>Hủy đơn</button>)}
                    </form>
                </div>
                <div className={'customer-order-detail-content'}>
                    <h2>Thông tin sản phẩm</h2>
                    <p>Tình trạng đơn hàng: <strong>{orderFish.status}</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderFishDetail.map((detail, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{fish[detail.fishId]?.name || 'N/A'}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={'3'}>Tổng tiền:</td>
                                <td>{orderFish.totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerOrderFishDetail
