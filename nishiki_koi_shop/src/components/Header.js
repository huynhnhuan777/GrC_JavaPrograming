import React, {useRef, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../assets/css/Header.css'
import logoBrand from '../assets/img/logo.png'


const Header = () => {

    const [isActive, setIsActive] = useState(null);
    const [list, setList] = useState([]);
    const [menu, setMenu] = useState([]);
    const navRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isMinimize, setIsMinimize] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const [linkMenu, setLinkMenu] = useState([
        ['customer-support', 'policy'],
        ['profile', 'orders', 'history', 'cart'],
        ['sign-in', 'sign-up'],
    ])

    const handleAutoScroll = () => {
        if (window.scrollY > 300) {
            setIsSticky(true);
        } else setIsSticky(false);
    }

    const handleMinimizeNav = () => {
        if (window.innerWidth <= 960) {
            setIsMinimize(true);
        } else setIsMinimize(false);
    }

    const addItem = (newItem) => {
        setList(prevItems => [...prevItems, newItem]);
    };

    const HandleMouseLeave = () => {
        setIsActive(null);
        setList([]);
        setMenu([]);
    }

    const HandleMouseEnter = (li) => {
        setIsActive(li);
        setMenu(li);
    }
    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to RegisterForm
    };

    const handleCloseNavBar = () => {
        setIsActive(false);
        setIsExpanded(false);
    }
    const handleExpandNav = () => {
        setIsExpanded(prevState => !prevState);
    }

    const handleSignOut = () => {
        sessionStorage.removeItem('user');
    }

    useEffect(() => {
        handleMinimizeNav();
        window.addEventListener('resize', handleMinimizeNav);
        return () => {
            window.removeEventListener('resize', handleMinimizeNav);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleAutoScroll);
        return () => {
            window.removeEventListener('scroll', handleAutoScroll);
        };
    }, []); // Đăng ký sự kiện cuộn chỉ một lần

    useEffect(() => {
        if (isActive) {
            let index = 0;
            const interval = setInterval(() => {
                addItem(`${menu[index]}`);
                index++;
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
            }, menu.length * 100);
            return () => clearInterval(interval);
        }
    }, [isActive, menu]);

    return (
        <div className='header-container'>
            <div className='header-slogan'>
                <p>Hệ thống phân phối cá Koi chuẩn Nhật số 100 Việt Nam</p>
                {user ? 'Xin chào, ' + user[0].name :
                    <p><Link to={'login'}>Đăng nhập đi nào!</Link> - <Link to={'/register'}>Đăng kí ngay thôi</Link>
                    </p>}
            </div>

            <button className={isMinimize ? 'icon-nav-show' : 'icon-nav'}
                    onClick={handleExpandNav}>{isExpanded ? '×' : '☰'}</button>

            <div ref={navRef} className={`header-navigation ${isSticky ? 'sticky' : ''}`}>
                <div className={'logo-brand'}>
                    <Link to={'/'}>
                        <img className={'logo-header'} src={logoBrand} alt={'logo-brand'}/>
                    </Link>
                </div>

                {/*the code belows is for nav and sub-nav*/}
                <ul className={`navigation ${isExpanded ? 'show-nav' : 'hidden-nav'} `}>
                    <li><Link to={'/'} onClick={handleCloseNavBar}>Trang chủ</Link></li>
                    <li
                    ><Link to={'/list'}>Giống cá</Link>

                    </li>
                    <li
                    ><Link to={'/farm'} onClick={handleCloseNavBar}>Trang trại</Link>
                    </li>
                    <li><Link to={'/tour'}>Chuyến đi</Link></li>
                    <li
                        onMouseEnter={() => HandleMouseEnter(['CSKH', 'Chính sách'])}
                        onMouseLeave={() => HandleMouseLeave()}
                    ><Link to={'/contact'} onClick={handleCloseNavBar}>Liên hệ</Link>
                        <ul className={'sub-nav'}>
                            {list.map((item, index) => (
                                <li key={index} className={isActive ? 'show' : 'hidden'}>
                                    <Link to={`/${linkMenu[0][index]}`} onClick={handleCloseNavBar}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    {user ?
                        <li
                            onMouseEnter={() => HandleMouseEnter(['Thông tin cá nhân', 'Đơn hàng', 'Lịch sử', 'Giỏ hàng', 'Đăng xuất'])}
                            onMouseLeave={() => HandleMouseLeave()}
                        ><Link to={'/account'} onClick={handleCloseNavBar}>{user[0].name}</Link>
                            <ul className={'sub-nav'}>
                                {list.map((item, index) => (
                                    <li key={1 * index} className={isActive ? 'show' : 'hidden'}>
                                        {item === 'Đăng xuất'

                                            ? (<Link to={'/'} onClick={() => handleSignOut()}>{item} </Link>)
                                            : (<Link to={`/${linkMenu[3][index]}`}>{item}</Link>)

                                            ? (<Link to={'/'} onClick={() => handleSignOut()}
                                                     onClick={handleCloseNavBar}>{item} < /Link>)
                                            : (<Link to={`/${linkMenu[1][index]}`}
                                                     onClick={handleCloseNavBar}>{item}</Link>)

                                        }
                                    </li>
                                ))}
                            </ul>
                        </li>
                        :
                        <li
                            onMouseEnter={() => HandleMouseEnter(['Đăng nhập', 'Đăng kí'])}
                            onMouseLeave={() => HandleMouseLeave()}

                        >
                            <Link to={'/account'}>Tài khoản</Link>
                            <ul className={'sub-nav'}>
                                {list.map((item, index) => (
                                    <li key={5 * index} className={isActive ? 'show' : 'hidden'}>
                                        {item === 'Đăng kí' ? (
                                            <Link to={'/register'}>{item}</Link> // Điều hướng đến trang đăng ký
                                        ) : (
                                            <Link to={`/${linkMenu[4][index]}`}>{item}</Link>
                                        )}

                        ><Link to={'/account'} onClick={handleCloseNavBar}>Tài khoản</Link>
                            <ul className={'sub-nav'}>
                                {list.map((item, index) => (
                                    <li key={2 * index} className={isActive ? 'show' : 'hidden'}>
                                        <Link to={`/${linkMenu[2    ][index]}`} onClick={handleCloseNavBar}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    }
                    <li><Link to={'/about-us'} onClick={handleCloseNavBar}>Về KOI-E</Link></li>
                </ul>
                {/*this is the end of this nav */}

                {/*this form will be a search feature (wait for api provider)*/}
                <form className={'form-field'}>
                    <input className={'search-input'} type={'text'} placeholder={'  Tìm kiếm gì ư?'}/>
                    <button className={'btn-search'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-binoculars-fill" viewBox="0 0 16 16">
                            <path
                                d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Header