import React, { useState } from 'react';
import '../assets/css/CustomerAccount.css';
import { useNavigate } from 'react-router-dom';


function CustomerAccount(){
    const navigate = useNavigate();

    // Dữ liệu khách hàng có thể được lấy từ API sau
    const [customer, setCustomer] = useState({
        fullName: 'Nhuan',
        birthdate: '19/19/1999',
        address: 'Quận 12',
        email: 'khongbiet@gmail.com',
        phone: '0123456789',
    });

    // Xử lý cập nhật thông tin
    const handleUpdate = () => {
        // Thực hiện cập nhật API sau này
        console.log("Thông tin khách hàng đã được cập nhật", customer);
    };

    // Xử lý quên mật khẩu
    const handleForgotPassword = () => {
        // Thực hiện gửi yêu cầu quên mật khẩu sau này
        console.log("Yêu cầu quên mật khẩu đã được gửi");
    };

    // Nút xem lịch sử mua hàng
    const handleViewOrderHistory = () => {
        navigate('/order-history');
    };

    // Xử lý thay đổi thông tin nhập vào form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };

    return (
        <div className="customer-info-container">
            <h2>Thông tin khách hàng</h2>
            <form className="customer-info-form">
                <div className="form-group">
                    <label>Họ và tên : </label>
                    <input
                        type="text"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sinh nhật : </label>
                    <input
                        type="text"
                        name="birthdate"
                        value={customer.birthdate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Địa chỉ : </label>
                    <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email : </label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Điện thoại : </label>
                    <input
                        type="text"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="button" onClick={handleUpdate}>Cập nhật thông tin</button>
                    <button type="button" onClick={handleForgotPassword}>Thay đổi mật khẩu mật khẩu</button>
                    <button type="button" onClick={handleViewOrderHistory}>Xem lịch sử mua hàng</button>
                </div>
            </form>
        </div>
    );
}

export default CustomerAccount;
