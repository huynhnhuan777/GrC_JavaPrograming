import './App.css';
import './assets/root.css';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";

import Home from './pages/Home/Home';
import Header from './components/Header';
import Page404 from "./pages/Page404";
import Farm from "./pages/Farm";
import Contact from "./pages/Feedback/Contact";
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
import HomeAdmin from "./pages/Admin/HomeAdmin";
import OrdersAdmin from "./pages/Admin/OrdersAdmin";
import OrderDetailAdmin from "./pages/Admin/OrderDetailAdmin";


const AutoScrollToTop = () => {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};


const App = () => {
    const [roleSerial, setRoleSerial] = useState(0); /*0:customer, 1: staff, 2: manager*/

    sessionStorage.setItem('user', JSON.stringify(tempUsers[1]));

    useEffect(() => {
        const temp = JSON.parse(sessionStorage.getItem('user'));
        if (temp.role === 'customer') {
            setRoleSerial(0);
        } else if (temp.role === 'manager') {
            setRoleSerial(2);
        }
    }, []);

    return (<div className="App">
        {roleSerial === 0 ? (<>
                <BrowserRouter basename="/">
                    <AutoScrollToTop/>
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/farm'} element={<Farm/>}/>
                        <Route path={'/fish'} element={<Fish/>}/>
                        <Route path={'/fish/:id'} element={<FishDetail/>}/>
                        <Route path={'/contact'} element={<Contact/>}/>
                        <Route path={'/about-us'} element={<AboutUs/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'/payment'} element={<Payment/>}/>
                        <Route path={'/account'} element={<Account/>}/>
                        <Route path={'/tours'} element={<Tours/>}/>
                        <Route path={'/tours/:id'} element={<Tour/>}/>
                        <Route path={'/register'} element={<RegisterForm/>}/>
                        <Route path={'/*'} element={<Page404/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </>

        ) : (<>
            <BrowserRouter basename={'/admin'}>
                <Routes>
                    <Route path={'/'}
                           element={<AdminLayout
                               childCompo={<HomeAdmin/>}
                               title={'Tổng quan'}>
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
                </Routes>
            </BrowserRouter>
        </>)}
    </div>);
};

export default App;
