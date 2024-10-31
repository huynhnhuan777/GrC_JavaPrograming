import './App.css';
import './assets/root.css';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";

import Home from './pages/Home/Home';
import Header from './components/Header';
import Page404 from "./pages/Page404";
import Farms from "./pages/Farms";
import Contact from "./pages/Contact/Contact";
import Fish from "./pages/Fish/ListFish";
import Footer from "./components/Footer";
import AboutUs from "./pages/Feedback/AboutUs";
import Cart from "./pages/Account/shoppingCart";
import Payment from "./pages/Account/payment";
import RegisterForm from './pages/Account/RegisterForm';
import Account from "./pages/Account/Account";
import Tours from "./pages/Tour/Tours";
import Tour from "./pages/Tour/Tour";
import FishDetail from "./pages/Fish/FishDetail";

import {tempUsers} from "./store/sampleTest";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import OrdersAdmin from "./pages/Admin/Order/OrdersAdmin";
import OrderDetailAdmin from "./pages/Admin/Order/OrderDetailAdmin";
import SIgnInForm from "./pages/Account/SignInForm";
import AdminTours from "./pages/Admin/Manage/AdminTours";
import AdminFarms from "./pages/Admin/Manage/AdminFarms";
import AdminProducts from "./pages/Admin/Manage/AdminProducts";
import AdminUser from "./pages/Admin/Manage/AdminUser";
import AdminReports from "./components/Admin/AdminReports";
import Policy from "./pages/Contact/Policy";
import {jwtDecode} from "jwt-decode";


const AutoScrollToTop = () => {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const data = jwtDecode(sessionStorage.getItem('token'));
            if (data)
                setRole(data.role);
        }
    }, []);

    let basename = '/';
    if (role !== null && role !== '') {
        if (role === 'ROLE_MANAGER') basename = '/admin';
    } else basename = '/';

    return (
        <div className="App">
            <BrowserRouter basename={role === 'ROLE_MANAGER' ? '/admin' : '/'}>
                {(role === 'ROLE_CUSTOMER' || role === null || role === '') ? (
                    <>
                        <AutoScrollToTop/>
                        <Header/>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'/farms'} element={<Farms/>}/>
                            <Route path={'/fish'} element={<Fish/>}/>
                            <Route path={'/fish/:id'} element={<FishDetail/>}/>
                            <Route path={'/contact'} element={<Contact/>}/>
                            <Route path={'/policy'} element={<Policy/>}/>
                            <Route path={'/about-us'} element={<AboutUs/>}/>
                            <Route path={'/cart'} element={<Cart/>}/>
                            <Route path={'/payment'} element={<Payment/>}/>
                            <Route path={'/account'} element={<Account/>}/>
                            <Route path={'/tours'} element={<Tours/>}/>
                            <Route path={'/tours/:id'} element={<Tour/>}/>
                            <Route path={'/sign-up'} element={<RegisterForm/>}/>
                            <Route path={'/sign-in'} element={<SIgnInForm/>}/>
                            <Route path={'/*'} element={<Page404/>}/>
                        </Routes>
                        <Footer/>
                    </>
                ) : (
                    <Routes>
                        <Route path={'/'}
                               element={<AdminLayout
                                   childCompo={<AdminHome/>}
                                   title={'Tổng quan'}>
                               </AdminLayout>}
                        />
                        <Route path={'/report'}
                               element={<AdminLayout
                                   childCompo={<AdminReports/>}
                                   title={'Báo cáo doanh thu'}>
                               </AdminLayout>}
                        />
                        <Route path={'/orders'}
                               element={<AdminLayout
                                   childCompo={<OrdersAdmin/>}
                                   title={'Quản lý hóa đơn'}>
                               </AdminLayout>}
                        />
                        <Route path={'/orders/:id'}
                               element={<AdminLayout
                                   childCompo={<OrderDetailAdmin/>}
                                   title={'Thông tin hóa đơn chi tiết'}>
                               </AdminLayout>}
                        />
                        <Route path={'/products'}
                               element={<AdminLayout
                                   childCompo={<AdminProducts/>}
                                   title={'Quản lí sản phẩm'}>
                               </AdminLayout>}
                        />
                        <Route path={'/farms'}
                               element={<AdminLayout
                                   childCompo={<AdminFarms/>}
                                   title={'Quản lí trang trại'}>
                               </AdminLayout>}
                        />
                        <Route path={'/tours'}
                               element={<AdminLayout
                                   childCompo={<AdminTours/>}
                                   title={'Quản lí chuyến đi'}>
                               </AdminLayout>}
                        />
                        <Route path={'/users'}
                               element={<AdminLayout
                                   childCompo={<AdminUser/>}
                                   title={'Quản lí tài khoản người dùng'}>
                               </AdminLayout>}
                        />
                    </Routes>
                )}
            </BrowserRouter>
        </div>
    );
};


export default App;
