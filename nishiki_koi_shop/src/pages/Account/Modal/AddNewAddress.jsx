import {useEffect, useState} from "react";
import admin from "../../../utils/xml/api_full_administration.json";
import {toast} from "react-toastify";
import '../../../assets/css/Account/Modal/AddNewAddress.css'
import {handleSubmit, useHookTourForm, useHookUserForm} from "../../../utils/handleFuncs";

const AddNewAddress = ({setStatus, setUser}) => {

    const [tempSample, setTempSample] = useState([]);
    const [tempDistrict, setTempDistrict] = useState([]);
    const [tempWard, setTempWard] = useState([]);

    const [validCity, setValidCity] = useState(false);
    const [validDistrict, setValidDistrict] = useState(false);
    const [validWard, setValidWard] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("user")));

    const user = useHookUserForm();
    const [address, setAddress] = useState({city: '', district: '', ward: '', numberHouse: ''});

    const handleGetCity = (e) => {
        setValidCity(true);
        const cityID = e.target.value;
        let cityObject = [];
        for (let i = 0; i < tempSample.length; i++) {
            if (tempSample[i].id === cityID) {
                cityObject = tempSample[i].data2;
                setAddress(prevState => ({...prevState, city: tempSample[i].name}) || {...prevState, city: ''});
            }
        }
        setTempDistrict(cityObject);
    }

    const handleGetDistrict = (e) => {
        const districtID = e.target.value;
        setValidDistrict(true);
        let districtObject = [];
        for (let i = 0; i < tempDistrict.length; i++) {
            if (tempDistrict[i].id === districtID) {
                districtObject = tempDistrict[i].data3;
                setAddress(prevState => ({...prevState, district: tempDistrict[i].name}) || {
                    ...prevState,
                    district: ''
                });
            }
        }
        setTempWard(districtObject);
    }

    const handleGetWard = (e) => {
        setValidWard(true);
        const wardID = e.target.value;
        for (let i = 0; i < tempWard.length; i++) {
            if (tempWard[i].id === wardID) {
                setAddress(prevState => ({...prevState, ward: tempWard[i].name}) || {...prevState, ward: ''});
            }
        }
    }

    const handleGetNumberHouse = (e) => {
        setAddress(prevState => ({...prevState, numberHouse: e.target.value}) || {...prevState, numberHouse: ''});
    }

    const handleSubmitAddress = () => {
        if (!validCity) {
            toast.error("Tính để shipper đi hết 63 tỉnh thành à?");
            return;
        }
        if (!validDistrict) {
            toast.error("Ship cho cả thành phố hay gì?");
            return;
        }
        if (!validWard) {
            toast.error("Mua 1 con cả quận cùng hưởng à?");
            return;
        }
        toast.success('Vui lòng đợi trong giây lát');
        user.values.fullName = userInfo.fullName;
        user.values.username = userInfo.username;
        user.values.email = userInfo.email;
        user.values.phoneNumber = userInfo.phoneNumber;
        user.values.address = address.numberHouse + ', ' + address.ward + ', ' + address.district + ', ' + address.city;
        user.values.roleName = userInfo.roleName;

        setUser(prevState => ({...prevState, address: user.values.address}));

        handleSubmit(null, user, `http://localhost:8080/api/v1/users/update/${userInfo.id}`, sessionStorage.getItem('token'), "PUT", null, null);
        setStatus(false);
    }

    const handleCloseDialog = () => {
        setStatus(false);
    }

    useEffect(() => {
        try {
            setTempSample(admin.data);
        } catch (error) {
            console.error('ERROR: ', error.message());
        }
    }, [tempSample]);

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo]);

    return (
        <div className={'add-new-address-container'}>
            <div className={'newAddress'}>
                <h3 style={{padding: "10px"}}>Vui lòng ghi địa chỉ giao hàng mới:</h3>
                <form className={'form-address'}>
                    <div style={{marginRight: "10px", width: '45%'}}>
                        <fieldset className={'fieldset'}>
                            <legend>Tỉnh/Thành phố</legend>
                            <select className={'selectInput'} onChange={handleGetCity}>
                                <option defaultValue={-1}></option>
                                {tempSample ?
                                    (
                                        tempSample.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    ) : (console.log('Error: can not fetch data from static api file'))
                                }
                            </select>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Quận/Huyện</legend>
                            <select className={'selectInput'} onChange={handleGetDistrict}>
                                <option defaultValue={-1}></option>
                                {tempDistrict ?
                                    (
                                        tempDistrict.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    ) : ''
                                }
                            </select>
                        </fieldset>
                    </div>
                    <div style={{marginLeft: "10px", width: '45%'}}>
                        <fieldset className={'fieldset'}>
                            <legend>Xã/Phường/Thị trấn</legend>
                            <select className={'selectInput'} onChange={handleGetWard}>
                                <option defaultValue={-1}></option>
                                {tempWard ? (
                                    tempWard.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                ) : ''}
                            </select>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <legend>Số nhà + đường</legend>
                            <input className={'textInput'} type={'text'} onChange={handleGetNumberHouse}/>
                        </fieldset>
                    </div>
                </form>
                <button className={'featureBtn'} onClick={handleSubmitAddress}>Thêm</button>
                <button className={'featureBtn'} onClick={handleCloseDialog}>Đóng</button>
            </div>
        </div>
    )
}
export default AddNewAddress;