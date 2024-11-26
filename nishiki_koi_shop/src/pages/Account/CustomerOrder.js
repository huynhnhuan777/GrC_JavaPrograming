import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {handleGetAllProd} from '../../utils/handleFuncs'
import '../../assets/css/Account/CustomerOrder.css'

function CustomerOrder() {
    const [orderFish, setOrderFish] = useState([])
    const [orderTour, setOrderTour] = useState([])
    const token = sessionStorage.getItem('token')
    const userId = JSON.parse(sessionStorage.getItem('user')).id

    useEffect(() => {
        handleGetAllProd(`http://localhost:8080/api/v1/order-fishes/history/user/${userId}`, token, setOrderFish, null)
        handleGetAllProd(`http://localhost:8080/api/v1/order-tours/history/user/${userId}`, token, setOrderTour, null)
    }, []);

    useEffect(() => {
        console.log(orderFish)
    }, [orderFish])

    return (
        <div className={'customer-order-container'}>
            <div className={'customer-order-content'}>
                <h2>Đơn hàng cá Koi</h2>
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Tình trạng</th>
                        <th>Ngày tạo đơn</th>
                        <th>Ngày giao hàng</th>
                        <th>Phương thức thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderFish.length > 0 ? (
                        orderFish.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.orderFishId}</td>
                                <td>{order.status}</td>
                                <td>{order.createdDate}</td>
                                <td>{order.deliveryDate ? order.deliveryDate : 'Đang tính toán'}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.totalAmount ? order.totalAmount.toLocaleString('vi-VN') : ''} đ</td>
                                <td><Link to={`/order-fish/${order.orderFishId}`}>Chi tiết</Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8"><p>Bạn chưa có đơn hàng cá Koi nào</p></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className={'customer-order-content'}>
                <h2>Đơn hàng chuyến đi</h2>
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Tình trạng</th>
                        <th>Ngày tạo đơn</th>
                        <th>Ngày bắt đầu</th>
                        <th>Phương thức thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderTour.length > 0 ? (
                        orderTour.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.orderTourId}</td>
                                <td>{order.status}</td>
                                <td>{order.createdDate}</td>
                                <td>{order.tourStartDate}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.totalAmount}</td>
                                <td><Link to={`/order-tour/${order.orderTourId}`}>Chi tiết</Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8"><p>Bạn chưa có chuyến đi nào</p></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerOrder
