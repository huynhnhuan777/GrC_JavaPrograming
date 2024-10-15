import './App.css';
import './assets/root.css';
import Home from './pages/Home/Home';
import Header from './components/Header';
import Page404 from "./pages/Page404";
import Farm from "./pages/Farm";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Contact from "./pages/Feedback/Contact";
import ListFish from "./pages/ListFish";
import Footer from "./components/Footer";
import AboutUs from "./pages/Feedback/AboutUs";
import {useEffect, useState} from "react";
import Cart from "./pages/Account/shoppingCart";
import Payment from "./pages/Account/payment";
import RegisterForm from './pages/Account/RegisterForm';
import Account from "./pages/Account/Account";

const AutoScrollToTop = () => {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const AppContent = () => {
    const {pathname} = useLocation(); // Lấy route hiện tại

    return (
        <>
            {/* Chỉ hiển thị Header và Footer khi không ở trang đăng kí */}
            {pathname !== '/register' && <Header/>}
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/farm'} element={<Farm/>}/>
                <Route path={'/list'} element={<ListFish/>}/>
                <Route path={'/contact'} element={<Contact/>}/>
                <Route path={'/about-us'} element={<AboutUs/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/account'} element={<Account/>}/>
                <Route path={'/payment'} element={<Payment/>}/>
                <Route path={'/register'} element={<RegisterForm/>}/>
                <Route path={'/*'} element={<Page404/>}/>
            </Routes>
            {pathname !== '/register' && <Footer/>}
        </>
    );
}

const App = () => {
    const [tempUser, setTempUser] = useState([
        {id: 'user_1101_1121', name: 'CaoNhatHao'}
    ]);

    sessionStorage.setItem('user', JSON.stringify(tempUser));

    return (
        <div className="App">
            <BrowserRouter basename="/">
                <AutoScrollToTop/>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/farm'} element={<Farm/>}/>
                    <Route path={'/list'} element={<ListFish/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                    <Route path={'/about-us'} element={<AboutUs/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/payment'} element={<Payment/>}/>
                    <Route path={'/account'} element={<Account/>}/>
                    <Route path={'/register'} element={<RegisterForm/>}/>
                    <Route path={'/*'} element={<Page404/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default App;
