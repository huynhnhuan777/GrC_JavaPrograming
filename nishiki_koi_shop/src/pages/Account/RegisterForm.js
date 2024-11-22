import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'; // Nhập Link và useNavigate
import '../../assets/css/Account/Register.css';
import {handleRenderSelectCard} from "../../utils/handleRenderFuncs";
import {handleSubmit, useHookCartForm} from "../../utils/handleFuncs";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // Tạo hook useNavigate để điều hướng

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (password !== confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                username,
                email,
                password,
                confirmPassword,
            });

            // Thông báo thành công
            setSuccess('Đăng ký thành công!');
            setError('');

            navigate('/sign-in');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Đã xảy ra lỗi trong quá trình đăng ký.');
            } else {
                setError('Đã xảy ra lỗi không xác định.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="image-section">
                <img src="https://bizweb.dktcdn.net/100/004/358/files/ca-koi-chat-luong.jpg?v=1493347499773"
                     alt="Koi Fish"/>
            </div>
            <div className="form-section">
                <h2>Chào Mừng Bạn Đến Với Hệ Thống Bán Cá Koi Lớn Nhất Việt Nam!</h2>

                {success && <p className="success-text">{success}</p>}

                <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <fieldset className="fieldset">
                            <legend>Tên người dùng</legend>
                            <input
                                className="textInput"
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </fieldset>
                    </div>
                    <div className="form-group">
                        <fieldset className="fieldset">
                            <legend>Email</legend>
                            <input
                                className="textInput"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                required
                            />
                        </fieldset>
                    </div>
                    <div className="form-group">
                        <fieldset className="fieldset">
                            <legend >Mật khẩu</legend>
                            <input
                                className="textInput"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </fieldset>
                    </div>
                    <div className="form-group">
                        <fieldset className="fieldset">
                            <legend>Xác nhận mật khẩu</legend>
                            <input
                                className="textInput"
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </fieldset>
                    </div>

                    {error && <p className="error-text">{error}</p>}
                    <button className={'submit-form'} type="submit">Đăng Ký</button>
                </form>

                {/* Liên kết ra đăng nhập */}
                <Link to="/sign-in" className="back-link">Đã có tài khoản ? Đăng nhập</Link>
            </div>
        </div>
    );
};

export default RegisterForm;