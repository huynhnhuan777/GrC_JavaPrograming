import React, { useEffect, useState } from 'react';
import '../../assets/css/Account/PasswordUpdateModal.css';
import axios from 'axios';

function PasswordUpdateModal({ showPasswordModal, setShowPasswordModal }) {
    const [passwordChange, setPasswordChange] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordChange(prevPasswordChange => ({
            ...prevPasswordChange,
            [name]: value
        }));
    };

    const handleUpdatePassword = async () => {
        await axios.put(
            "http://localhost:8080/api/v1/users/change-password",
            passwordChange,
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    };

    if (!showPasswordModal) return null;

    return (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Xác minh đổi mật khẩu</h3>
                <form className='customer-info-change-form' onSubmit={handleUpdatePassword}>
                    <div className='customer-form-group'>
                        <label>Mật khẩu cũ</label>
                        <input
                            type='password'
                            name='oldPassword'
                            value={passwordChange.oldPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='customer-form-group'>
                        <label>Mật khẩu mới</label>
                        <input
                            type='password'
                            name='newPassword'
                            value={passwordChange.newPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='customer-form-group'>
                        <label>Xác nhận mật khẩu mới</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={passwordChange.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="customer-button-group">
                        <button type="button" className='cancel-update-button' onClick={() => setShowPasswordModal(false)}>Hủy</button>
                        <button type="submit">Xác nhận</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordUpdateModal;