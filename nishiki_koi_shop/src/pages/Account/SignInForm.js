import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'; // Nhập Link và useNavigate
import '../../assets/css/Account/Register.css';
import {toast, ToastContainer} from "react-toastify";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // Tạo hook useNavigate để điều hướng

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password
            });

            // Thông báo thành công
            // setSuccess('Đăng nhập thành công!');
            toast.success('Đăng nhập thành công!');
            setError('');
            sessionStorage.setItem('userId', JSON.stringify(response.data.id))
            navigate('/')
        } catch (err) {
            console.error(err.message);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Đã xảy ra lỗi trong quá trình đăng ký.');
            } else {
                setError('Đã xảy ra lỗi không xác định.');
                toast.warning('Đã xảy ra lỗi không xác định!');
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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/*{error && <p className="error-text">{error}</p>}*/}
                    <button className={'submit-Form'} type="submit">Đăng nhập</button>
                </form>

                {/* Liên kết Quay lại */}
                <Link to="/" className="back-link">Quay lại trang trước</Link>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default SignInForm;
