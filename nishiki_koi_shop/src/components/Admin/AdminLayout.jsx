import {Link} from "react-router-dom";
import '../../assets/css/Admin/Component/adminLayout.css'
import adminAvatar from '../../assets/img/adminAvatar.jpg'

const AdminLayout = ({childCompo, title}) => {
    const handleSignOut = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        window.location.assign('/')
    }
    return (
        <div className={'admin-layout-container'}>
            <div className={'admin-layout-content'}>
                <div className={'layout-header'}>{title}</div>
                <div className={'layout-controller-routes'}>
                    <div className={'admin-avatar'}>
                        <img className={'avatar'} src={adminAvatar} alt={'avatar'}/>
                    </div>
                    <div className={'admin-controller-navbar'}>
                        <ul className={'controller-navbar'}>
                            <li><Link to={'/admin'}>Trang chủ</Link></li>
                            <li><Link to={'/admin/orders'}>Đơn hàng</Link></li>
                            <li><Link to={'/admin/report'}>Báo cáo</Link></li>
                            <li><Link to={'/admin/feedback'}>Phản hồi</Link></li>
                            <li style={{padding: "15px", color: "white"}}>Quản lí
                                <ul className={'controller-sub-navbar'}>
                                    <li><Link to={'/admin/products'}>Giống cá</Link></li>
                                    <li><Link to={'/admin/farms'}>Nông trại</Link></li>
                                    <li><Link to={'/admin/types'}>Phân loại cá</Link></li>
                                    <li><Link to={'/admin/tours'}>Chuyến đi</Link></li>
                                    <li><Link to={'/admin/users'}>Người dùng</Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/'} onClick={handleSignOut}>Đăng xuất</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={'main-layout'}>{childCompo}</div>
            </div>
        </div>
    )
}
export default AdminLayout