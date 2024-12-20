import React, {useRef, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import '../assets/css/Component/Header.css'
import logoBrand from '../assets/img/logo.png'
import axios from "axios";


const Header = () => {

    const [isActive, setIsActive] = useState(null);
    const [list, setList] = useState([]);
    const [menu, setMenu] = useState([]);
    const navRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState([false, false]);
    const [isSticky, setIsSticky] = useState(false);
    const [isMinimize, setIsMinimize] = useState(false);

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const [linkMenu, setLinkMenu] = useState([
        ['consult-order', 'consult-trip', 'policy'],
        ['account', 'orders', 'cart', 'booking'],
        ['sign-in', 'sign-up'],
    ])

    const handleAutoScroll = () => {
        if (window.scrollY > 50) {
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
        setIsExpanded([false, false]);
    }

    const handleExpandNav = () => {
        const temp = [...isExpanded];
        temp[0] = !temp[0];
        console.log(temp[0]);
        setIsExpanded(temp);
    }

    const handleShowSearchField = () => {
        const temp = [...isExpanded];
        temp[1] = !temp[1];
        setIsExpanded(temp);
    }

    const handleSignOut = () => {
        sessionStorage.removeItem('user');
        window.location.assign('/');
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

    useEffect(() => {
        const check = sessionStorage.getItem('user');
        if (check !== 'undefined' || check !== null) {
            setUser(JSON.parse(sessionStorage.getItem('user')));
        }
    }, [])

    return (
        <div className='header-container'>
            <div ref={navRef} className={`header-content ${isSticky ? 'sticky' : ''}`}>
                <button className={isMinimize ? 'icon-nav-show' : 'icon-nav'}
                        onClick={handleExpandNav}>{isExpanded[0] ? '×' : '☰'}</button>
                <button className={isMinimize ? 'icon-nav-show search-btn' : 'icon-nav'}
                        onClick={handleShowSearchField}>{isExpanded[1] ? '×' : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                )}</button>
                <div className={'header-navigation'}>
                    <Link to={'/'} className={'logo-brand'}>
                        <img className={'logo-header'} src={logoBrand} alt={'logo-brand'}/>
                    </Link>

                    {/*the code belows is for nav and sub-nav*/}
                    <ul className={`navigation ${isExpanded[0] ? 'show-nav' : 'hidden-nav'} `}>
                        <li><Link to={'/'} onClick={handleCloseNavBar}>Trang chủ</Link></li>
                        <li><Link to={'/fish'}>Giống cá</Link></li>
                        <li><Link to={'/farms'} onClick={handleCloseNavBar}>Trang trại</Link></li>
                        <li><Link to={'/tours'}>Chuyến đi</Link></li>
                        <li
                            onMouseEnter={() => HandleMouseEnter(['Tư vấn đơn hàng', 'Tư vấn chuyến đi', 'Chính sách'])}
                            onMouseLeave={() => HandleMouseLeave()}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "inherit",
                                height: "inherit",
                                color: "white"
                            }}>Liên hệ
                            </div>
                            <ul className={'sub-nav'}>
                                {list.map((item, index) => (
                                    <li key={index} className={isActive ? 'show' : 'hidden'}>
                                        <Link to={`/${linkMenu[0][index]}`} onClick={handleCloseNavBar}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        {user && Object.keys(user).length !== 0 ?
                            <li
                                onMouseEnter={() => HandleMouseEnter(['Thông tin cá nhân', 'Đơn hàng', 'Giỏ hàng', 'Đăng xuất'])}
                                onMouseLeave={() => HandleMouseLeave()}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: "inherit",
                                    height: "inherit",
                                    color: "white"
                                }}>{(user.username)}</div>
                                <ul className={'sub-nav'}>
                                    {list.map((item, index) => (
                                        <li key={index} className={isActive ? 'show' : 'hidden'}>
                                            {item === 'Đăng xuất'
                                                ? (<Link to={'/'} onClick={() => handleSignOut()}>{item} < /Link>)
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
                                <div style={{
                                    width: 'inherit',
                                    height: 'inherit',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: "white"
                                }}>Tài khoản
                                </div>
                                <ul className={'sub-nav'}>
                                    {list.map((item, index) => (
                                        <li key={5 * index} className={isActive ? 'show' : 'hidden'}>
                                            {item === 'Đăng kí' ? (
                                                <Link to={'/sign-up'}>{item}</Link> // Điều hướng đến trang đăng ký
                                            ) : (
                                                <Link to={`/${linkMenu[2][index]}`}>{item}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        }
                        <li><Link to={'/about-us'} onClick={handleCloseNavBar}>Về KOI-E</Link></li>
                    </ul>
                </div>
                <div className={`search-zone ${isExpanded[1] ? 'show-nav' : 'hidden-nav'}`}>
                    {/*this form will be a search feature (wait for api provider)*/}
                    <form className={'form-field'} style={{flexDirection: 'row'}}>
                        <input className={'search-input'} type={'text'} placeholder={'  Tìm kiếm gì ư?'}/>
                        <button className={'btn-search'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Header