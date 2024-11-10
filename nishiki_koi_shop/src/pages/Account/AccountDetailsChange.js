import React, { useEffect, useState } from 'react';
import PasswordUpdateModal from './PasswordUpdateModal';
import '../../assets/css/Account/AccountDetailsChange.css';

function AccountDetailsChange() {
    const [customer, setCustomer] = useState({
        fullName: 'Nhuan',
        address: 'Quận 12',
        email: 'khongbiet@gmail.com',
        phone: '0123456789',
    });
    const [account, setAccount] = useState({ username: 'customer', password: 'password' });
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {
        loadUserDetails();
        loadAccount();
    }, []);

    const loadUserDetails = () => {
        // Call API
    };

    const loadAccount = () => {
        // Call API
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        // Call API
        setIsEditingInfo(false);
    };

    return (
        <div className='customer-info-change-container'>
            <PasswordUpdateModal
                account={account}
                showPasswordModal={showPasswordModal}
                setShowPasswordModal={setShowPasswordModal}
            />
            <div className='customer-info-change-content'>
                <h2>Thông Tin Cá Nhân</h2>
                <form className='customer-info-change-form' onSubmit={handleUpdateInfo}>
                    <div className='form-group'>
                        <label>Họ và tên</label>
                        <input type='text'
                            name='fullName'
                            value={customer.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Số điện thoại</label>
                        <input
                            type='text'
                            name='phone'
                            value={customer.phone}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={customer.email}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Địa chỉ</label>
                        <input
                            type='text'
                            name='address'
                            value={customer.address}
                            onChange={handleInputChange}
                            disabled={!isEditingInfo}
                        />
                    </div>
                    <div className="button-group">
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
            <div className='customer-info-change-content' style={{ width: "20vw", height: "35vh" }} >
                <h2>Tài Khoản</h2>
                <form className='customer-info-change-form'>
                    <div className='form-group'>
                        <label>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={account.username}
                            disabled={true}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            value={account.password}
                            disabled={true}
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={() => setShowPasswordModal(true)}>Đổi mật khẩu</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountDetailsChange;
