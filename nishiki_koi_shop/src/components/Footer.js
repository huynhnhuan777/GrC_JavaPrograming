import React from "react";
import {Link} from "react-router-dom";
import '../assets/css/Footer.css'
import contact from "../pages/Contact";

const Footer = () => {
    return (
        <div className={'footer-container'}>
            <div className={'footer-copyright'}>
                <p>&copy; 2024 KOI-E. Tất cả các quyền được bảo lưu.</p>
            </div>
            <div className={'footer-content'}>
                <div className={'footer-part'}>
                    <img className={'banner'} src={''} alt={'banner'}/>
                    <div className={'summary'}>
                        <Link to={'/test'}>Giới thiệu Nishiki Koi</Link> | <Link to={''}>Trang trại</Link> |
                        Không gì là không thể, đến cửa hành của chúng tôi, các bạn sẽ được cung cấp hơn 100+ loại cá
                        chép Koi chuẩn Nhật 100% nguyên chất, đậm zin

                    </div>
                </div>
                <div className={'footer-part'}>
                    <div className={'title'}><h3>Về chúng tôi</h3></div>
                    <ul className={'menu'}>
                        <li><Link to={'/test'}>Giới thiệu Nishiki Koi</Link></li>
                        <li><Link to={''}>Showroom</Link></li>
                        <li><Link to={''}>Trang trại</Link></li>
                        <li><Link to={''}>Bản đồ</Link></li>
                        <li><Link to={''}>Liên hệ</Link></li>
                    </ul>
                </div>
                <div className={'footer-part'}>
                    <div className={'title'}><h3>Hỗ trợ</h3></div>
                    <ul className={'menu'}>
                        <li><Link to={''}>Hướng dẫn thanh toán</Link></li>
                        <li><Link to={''}>Hướng dẫn mua hàng</Link></li>
                        <li><Link to={''}>Chính sách vận chuyển</Link></li>
                        <li><Link to={''}>Vận chuyển cá Koi toàn quốc</Link></li>
                        <li><Link to={''}>Chính sách đổi trả hành</Link></li>
                        <li><Link to={''}>Chính sách bảo hành</Link></li>
                        <li><Link to={''}>Bảo mật thông tin khách hàng</Link></li>
                    </ul>
                </div>
                <div className={'footer-part'}>
                    <div className={'title'}><h3>Liên hệ</h3></div>
                    <ul className={'menu'}>
                        <li className={'contact'}>
                            <div className={'icon'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </div>
                            <p>C2 C3 C4 đường Tầm Thường. P. Bến Đỗ, Q. Đội Quần, TP. Mơ Mộng</p>
                        </li>
                        <li className={'contact'}>
                            <div className={'icon'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-telephone" viewBox="0 0 16 16">
                                    <path
                                        d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                </svg>
                            </div>
                            <p>0333444555</p>
                        </li>
                        <li className={'contact'}>
                            <div className={'icon'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-inbox" viewBox="0 0 16 16">
                                    <path
                                        d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"/>
                                </svg>
                            </div>
                            <p>thichgaialime@anime.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Footer