import logo from './logo.svg';
import './App.css';
import './assets/root.css'
import Home from './pages/Home'
import Header from './components/Header'
import Page404 from "./pages/Page404";
import Farm from "./pages/Farm";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import ListFish from "./pages/ListFish";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import {useEffect} from "react";

const AutoScrollToTop=()=>{
    const {pathname}=useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);
    return null;
};

function App() {
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
                    <Route path={'/account'} element={<Account/>}/>
                    <Route path={'/about-us'} element={<AboutUs/>}/>
                    <Route path={'/*'} element={<Page404/>}/>
                </Routes>
            </BrowserRouter>

            <BrowserRouter basename="/">
                <Footer/>
                <Routes>
                    <Route path={'/test'} element={<Account/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
