import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { handleGetObjById, handleSubmit } from '../../utils/handleFuncs'
import axios from 'axios'

function CustomerOrderTourDetail() {
    const { id } = useParams()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [orderTour, setOrderTour] = useState({})
    const [orderTourDetail, setOrderTourDetail] = useState([])
    const [tour, setTour] = useState({})
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        handleGetObjById(`http://localhost:8080/api/v1/order-tours/${parseInt(id, 10)}`, token, setOrderTour)
        handleGetObjById(`http://localhost:8080/api/v1/order-tour-details/order-tour/${parseInt(id, 10)}`, token, setOrderTourDetail)
    }, [])

    useEffect(() => {
        const fetchTourData = async () => {
            if (orderTourDetail.length === 0) return

            try {
                const tourIds = orderTourDetail.map(detail => detail.tourId);
                const tourPromises = tourIds.map(tourId =>
                    axios.get(`http://localhost:8080/api/v1/tours/${tourId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                );
                const responses = await Promise.all(tourPromises);
                const tourData = responses.map(response => response.data);
                const tourMap = {};
                tourData.forEach(tourItem => tourMap[tourItem.tourId] = tourItem);
                setTour(tourMap);
            } catch (error) {
                console.error("Error fetching tour data:", error);
            }
        }
        fetchTourData()
    }, [orderTourDetail])

    const cancelOrder = async () => {
        const orderTourForm = { ...orderTour, status: 'CANCELLED' };
        await axios.put(
            `http://localhost:8080/api/v1/order-tours/update/${orderTour.orderTourId}`,
            orderTourForm,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        window.location.assign(`/order-tour/${id}`)
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
                        {orderTour.status === 'PENDING' && (<button type='submit'>Hủy đơn</button>)}
                    </form>
                </div>
                <div className={'customer-order-detail-content'}>
                    <h2>Thông tin sản phẩm</h2>
                    <p>Tình trạng đơn hàng: <strong>{orderTour.status}</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng người tham gia</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderTourDetail.map((detail, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{tour[detail.tourId]?.tourName || 'N/A'}</td>
                                    <td>{detail.numberOfPeople}</td>
                                    <td>{detail.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={'3'}>Tổng tiền:</td>
                                <td>{orderTour.totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerOrderTourDetail
