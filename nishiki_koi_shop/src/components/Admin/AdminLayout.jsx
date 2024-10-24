import {Link} from "react-router-dom";
import '../../assets/css/Admin/Component/adminLayout.css'
import adminAvatar from  '../../assets/img/adminAvatar.jpg'

const AdminLayout = ({childCompo,title}) => {
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
                            <li><Link to={'/'}>Trang chủ</Link></li>
                            <li><Link to={'/orders'}>Đơn hàng</Link></li>
                            <li><Link to={'/report'}>Báo cáo</Link></li>
                            <li><Link to={'/manage'}>Quản lí</Link>
                                <ul className={'controller-sub-navbar'}>
                                    <li><Link to={'/products'}>Sản phẩm</Link></li>
                                    <li><Link to={'/farms'}>Trang trại</Link></li>
                                    <li><Link to={'/tours'}>Chuyến đi</Link></li>
                                    <li><Link to={'/users'}>Người dùng</Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/'}>Đăng xuất</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={'main-layout'}>{childCompo}</div>
            </div>
        </div>
    )
}
export default AdminLayout