import React, { useState, useEffect } from 'react';
import '../../assets/css/Account/Account.css';
import { useNavigate } from 'react-router-dom';
import PasswordUpdateModal from './PasswordUpdateModal';
import { handleGetObjById, handleSubmit } from '../../utils/handleFuncs';
import axios from 'axios';

const Account = () => {
    const [customer, setCustomer] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        handleGetObjById(`http://localhost:8080/api/v1/users/myInfo`, token, setCustomer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleUpdateInfo = async () => {
        await axios.put(
            `http://localhost:8080/api/v1/users/update/${customer.id}`,
            customer,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        setIsEditingInfo(false);
    };

    return (
        <div className='customer-info-change-container'>
            <PasswordUpdateModal
                showPasswordModal={showPasswordModal}
                setShowPasswordModal={setShowPasswordModal}
            />
            <div className='customer-info-change-content'>
                <h2>Thông Tin Cá Nhân</h2>
                <form className='customer-info-change-form' onSubmit={handleUpdateInfo}>
                    <div className='customer-form-group'>
                        <label>Họ và tên</label>
                        <input type='text'
                            name='fullName'
                            value={customer.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className='customer-form-group'>
                        <label>Số điện thoại</label>
                        <input
                            type='text'
                            name='phoneNumber'
                            value={customer.phoneNumber}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className='customer-form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={customer.email}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className='customer-form-group'>
                        <label>Địa chỉ</label>
                        <input
                            type='text'
                            name='address'
                            value={customer.address}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className="customer-button-group">
                        {isEditingInfo ? (
                            <>
                                <button type="button" className="cancel-update-button" onClick={() => setIsEditingInfo(false)}>Hủy</button>
                                <button type="submit">Lưu</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setIsEditingInfo(true)}>Sửa</button>
                        )}
                    </div>
                </form>
            </div>
            <div className='customer-info-change-content' style={{ width: "20vw", height: "35vh" }}>
                <h2>Tài Khoản</h2>
                <form className='customer-info-change-form'>
                    <div className='customer-form-group'>
                        <label>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={customer.username}
                            disabled={true}
                        />
                    </div>
                    <div className='customer-form-group'>
                        <label>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            value={'password'}
                            disabled={true}
                        />
                    </div>
                    <div className="customer-button-group">
                        <button type="button" onClick={() => setShowPasswordModal(true)}>Đổi mật khẩu</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Account;
