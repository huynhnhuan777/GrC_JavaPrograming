import '../../../assets/css/Admin/Component/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleGetAllProd,
    handleGetElementFromInp,
    handleSubmit,
    handleUploadImage, useChooseAll,
    useHookProdForm
} from "../../../utils/handleFuncs";
import axios from "axios";
import {toast} from "react-toastify";

const AddNewProd = ({setStatus}) => {
    const {formData, setFormData} = useHookProdForm();
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [farmData, setFarmData] = useState([]);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);

    const handleGetFile = async (e) => {
        await handleUploadImage(e.target.files[0], setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_FISH);
    }

    const handleCancelForm = (e) => {
        e.preventDefault();
        setStatus(false);
    }

    useEffect(() => {
        if (imageUrl !== '') {
            toast.success('Cacthed this file!')
            setFormData({
                ...formData,
                image: imageUrl
            })
        }
    }, [imageUrl]);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, setChooseOne);
    }, []);

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm sản phẩm mới</h3>
                <form className={'form-field'}
                      onSubmit={(e) => handleSubmit(e, formData, "http://localhost:8080/api/v1/manager/fish/create-fish", sessionStorage.getItem('token'), setStatus,'/admin/products')}
                      style={{flexDirection: 'column'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        width: 'inherit'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '35%'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Tên sản phẩm</legend>
                                <input className={'textInput'} type={'text'} name={'name'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mức giá</legend>
                                <input className={'textInput'} type={'text'} name={'price'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Số lượng tồn</legend>
                                <input className={'textInput'} type={'text'} name={'quantity'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '35%'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Kích thước sản phẩm</legend>
                                <input className={'textInput'} type={'text'} name={'size'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Trang trại</legend>
                                <select className={'selectInput'} name={'farmId'}
                                        onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}>
                                    <option defaultValue={-1}>Không</option>
                                    {farmData.map((item, index) => (
                                        <option key={index} value={item.id}>{item.farmName}</option>
                                    ))}
                                </select>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Phân loại</legend>
                                <select className={'selectInput'} name={'fishTypeId'}
                                        onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}>
                                    <option defaultValue={0}>1</option>
                                </select>
                            </fieldset>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '30%'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Hình ảnh sản phẩm</legend>
                                <input className={'textInput'} type={'file'} onChange={handleGetFile}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'} disabled={imageUrl === ''}>Xác nhận</button>
                        <button className={'featureBtn'} onClick={handleCancelForm}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
            <div style={{width: "inherit", height: 'inherit', position: 'absolute'}} className={'bg-close-dialog'}
                 onClick={handleCancelForm}></div>
        </div>
    )
}
export default AddNewProd
