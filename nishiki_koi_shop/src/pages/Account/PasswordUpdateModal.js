import React, { useState } from 'react';
import '../../assets/css/Account/PasswordUpdateModal.css';

function PasswordUpdateModal({ account, showPasswordModal, setShowPasswordModal }) {
    const [passwordChange, setPasswordChange] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordChange({ ...passwordChange, [name]: value });
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        if (passwordChange.currentPassword !== account.password) {
            setError('Mật khẩu cũ không đúng');
            return;
        }

        if (passwordChange.newPassword !== passwordChange.confirmNewPassword) {
            setError('Mật khẩu mới không khớp');
            return;
        }

        // Call API

        setShowPasswordModal(false);
        setPasswordChange({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        setError('');
        window.location.reload();
    };

    if (!showPasswordModal) return null;

    return (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Xác minh đổi mật khẩu</h3>
                {error && <p>{error}</p>}
                <form className='customer-info-change-form' onSubmit={handleUpdatePassword}>
                    <div className='form-group'>
                        <label>Mật khẩu cũ</label>
                        <input
                            type='password'
                            name='currentPassword'
                            value={passwordChange.currentPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Mật khẩu mới</label>
                        <input
                            type='password'
                            name='newPassword'
                            value={passwordChange.newPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Xác nhận mật khẩu mới</label>
                        <input
                            type='password'
                            name='confirmNewPassword'
                            value={passwordChange.confirmNewPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" className='cancel-update-button' onClick={() => setShowPasswordModal(false)}>Hủy</button>
                        <button type="submit">Xác nhận</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordUpdateModal;