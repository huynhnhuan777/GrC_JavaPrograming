import './App.css';
import './assets/root.css';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";

import Home from './pages/Home/Home';
import Header from './components/Header';
import Page404 from "./pages/Page404";
import Farms from "./pages/Farm/Farms";
import Contact from "./pages/Contact/Contact";
import ConsultOrder from "./pages/Feedback/ConsultOrder";
import ConsultTrip from "./pages/Feedback/ConsultTrip";
import Fish from "./pages/Fish/ListFish";
import Footer from "./components/Footer";
import AboutUs from "./pages/Feedback/AboutUs";
import Cart from "./pages/Account/shoppingCart";
import Payment from "./pages/Account/payment";
import RegisterForm from './pages/Account/RegisterForm';
import Account from "./pages/Account/Account";
import CustomerOrder from './pages/Account/CustomerOrder';
import CustomerOrderFishDetail from './pages/Account/CustomerOrderFishDetail';
import CustomerOrderTourDetail from './pages/Account/CustomerOrderTourDetail';
import Tours from "./pages/Tour/Tours";
import Tour from "./pages/Tour/Tour";
import FishDetail from "./pages/Fish/FishDetail";
import FarmDetail from './pages/Farm/FarmDetail';  // trang chi tiết của từng trang trại

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
import AdminShowDetail from "./pages/Admin/Detail/AdminShowDetail";
import AdminTypeProd from "./pages/Admin/Manage/AdminTypeProd";

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

    return (
        <div className="App">
            <BrowserRouter>
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
                            <Route path={'/consult-order'} element={<ConsultOrder />} />
                            <Route path={'/consult-trip'} element={<ConsultTrip />} />
                            <Route path={'/cart'} element={<Cart/>}/>
                            <Route path={'/payment'} element={<Payment/>}/>
                            <Route path={'/account'} element={<Account/>}/>
                            <Route path={'/orders'} element={<CustomerOrder/>}/>
                            <Route path={'/order-fish/:id'} element={<CustomerOrderFishDetail/>}/>
                            <Route path={'/order-tour/:id'} element={<CustomerOrderTourDetail/>}/>
                            <Route path={'/tours'} element={<Tours/>}/>
                            <Route path={'/tours/:id'} element={<Tour/>}/>
                            <Route path={'/farms'} element={<Farms/>}/>
                            <Route path={'/farms/:id'} element={<FarmDetail/>} />
                            <Route path={'/sign-up'} element={<RegisterForm/>}/>
                            <Route path={'/sign-in'} element={<SIgnInForm/>}/>
                            <Route path={'/*'} element={<Page404/>}/>
                        </Routes>
                        <Footer/>
                    </>
                ) : (
                    <Routes>
                        <Route path={'/admin/'}
                               element={<AdminLayout
                                   childCompo={<AdminHome/>}
                                   title={'Tổng quan'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/report'}
                               element={<AdminLayout
                                   childCompo={<AdminReports/>}
                                   title={'Báo cáo doanh thu'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/orders'}
                               element={<AdminLayout
                                   childCompo={<OrdersAdmin/>}
                                   title={'Quản lý hóa đơn'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/orders/:id'}
                               element={<AdminLayout
                                   childCompo={<OrderDetailAdmin/>}
                                   title={'Thông tin hóa đơn chi tiết'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/products'}
                               element={<AdminLayout
                                   childCompo={<AdminProducts/>}
                                   title={'Quản lí sản phẩm'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/farms'}
                               element={<AdminLayout
                                   childCompo={<AdminFarms/>}
                                   title={'Quản lí trang trại'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/tours'}
                               element={<AdminLayout
                                   childCompo={<AdminTours/>}
                                   title={'Quản lí chuyến đi'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/users'}
                               element={<AdminLayout
                                   childCompo={<AdminUser/>}
                                   title={'Quản lí tài khoản người dùng'}>
                               </AdminLayout>}
                        />
                        <Route path={'/admin/:obj/detail/:id'}
                               element={<AdminLayout
                                   childCompo={<AdminShowDetail/>}
                                   title={'Chi tiết đối tượng'}>
                               </AdminLayout>}
                        />

                        <Route path={'/admin/types'}
                               element={<AdminLayout
                                   childCompo={<AdminTypeProd/>}
                                   title={'Quản lí các câp phân loại giống cá'}>
                               </AdminLayout>}
                        />
                        <Route path={'/*'} element={<Page404/>}/>
                    </Routes>
                )}
            </BrowserRouter>
        </div>
    );
};

export default App;
