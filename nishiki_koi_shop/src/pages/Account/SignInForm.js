import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'; // Nhập Link và useNavigate
import '../../assets/css/Account/Register.css';
import {toast, ToastContainer} from "react-toastify";
import {jwtDecode} from "jwt-decode";
import {handleSubmit, useHookCartForm} from "../../utils/handleFuncs";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // Tạo hook useNavigate để điều hướng

    const handleGetInfoUser = async (urlAPI, token) => {
        try {
            const userResponse = await fetch(urlAPI, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userResponse.ok) {
                throw new Error("Failed to fetch user info");
            }

            // Chuyển đổi phản hồi thành JSON
            const userInfo = await userResponse.json();
            sessionStorage.setItem('user', JSON.stringify(userInfo));
        } catch (e) {
            console.error("Error: ", e.message);
            toast.error('Không thể lấy thông tin người dùng!');
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password
            });

            // Thông báo thành công
            if (!response) {
                console.log("cannot sign in");
                toast.warning('Lỗi 403: truy cập vào máy chủ không thành công!')
                return;
            }

            toast.success('Đăng nhập thành công!');
            setError('');

            // Lưu token vào sessionStorage (hoặc localStorage nếu bạn muốn)
            sessionStorage.setItem('token', response.data.token);
            const roleName = jwtDecode(response.data.token);

            // Gọi API để lấy thông tin customer
            if (roleName.role === 'ROLE_CUSTOMER') {
                await handleGetInfoUser('http://localhost:8080/api/v1/users/myInfo', response.data.token);
                window.location.assign('/')
            } else if (roleName.role === 'ROLE_MANAGER') {
                await handleGetInfoUser('http://localhost:8080/api/v1/manager/myInfo', response.data.token);
                window.location.assign('/admin')
            }
        } catch (err) {
            console.error(err.message);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Đã xảy ra lỗi trong quá trình đăng nhập.');
            } else {
                setError('Đã xảy ra lỗi không xác định.');
                toast.warning('Không thể kết nối đến máy chủ!');
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
                            <legend>Email</legend>
                            <input
                                className="textInput"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </fieldset>
                    </div>
                    <div className="form-group">
                        <fieldset className="fieldset">
                            <legend>Mật khẩu</legend>
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

                    {/*{error && <p className="error-text">{error}</p>}*/}
                    <button className={'submit-form'} type="submit">Đăng nhập</button>
                </form>

                {/* Liên kết ra đăng ký */}
                <Link to="/sign-up" className="back-link">Chưa có tài khoản ? Đăng ký</Link>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default SignInForm;
