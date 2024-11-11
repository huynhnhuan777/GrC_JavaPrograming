import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleGetAllProd, handleGetElement, handleGetElementFromInp,
    handleSubmit,
    handleUploadImage, useChooseAll,
    useHookFarmForm,
    useHookTourForm
} from "../../../../utils/handleFuncs";
import {toast} from "react-toastify";

const AddNewProd = ({setStatus}) => {
    const {formData, setFormData} = useHookTourForm();
    const [imageUrl, setImageUrl] = useState('');
    const [farmData, setFarmData] = useState([]);
    const [data, setData] = useState([]);

    const handleGetFile = async (e) => {
        await handleUploadImage(e.target.files[0], setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_TOUR);
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
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, null);
    }, []);

    useEffect(() => {
        console.log(farmData);
    }, [])

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm chuyến đi mới</h3>
                <form className={'form-field'}
                      onSubmit={(e) => handleSubmit(e, formData, "http://localhost:8080/api/v1/manager/tour/create-tour", sessionStorage.getItem('token'), setStatus, '/admin/tours')}>
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
                                <legend>Tên chuyến đi</legend>
                                <input className={'textInput'} type={'text'} name={'tourName'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'tourDescription'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Giá</legend>
                                <input className={'textInput'} type={'number'} name={'tourPrice'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
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
                                <legend>Số lượng tham gia</legend>
                                <input className={'textInput'} type={'text'} name={'tourCapacity'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Ngày khởi hành</legend>
                                <input className={'textInput'} type={'date'} name={'tourStartDate'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Ngày kết thúc</legend>
                                <input className={'textInput'} type={'date'} name={'tourEndDate'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
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
                                <legend>Thuộc nông trại</legend>
                                <select className={'selectInput'} name={'farmId'}
                                        onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}>
                                    <option defaultValue={-1}>Không</option>
                                    {farmData.map((item, index) => (
                                        <option key={index} value={item.farmId}>{item.name}</option>
                                    ))}
                                </select>
                            </fieldset>
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
            <div className={'bg-close-dialog'}
                 onClick={handleCancelForm}>
            </div>
        </div>
    )
}
export default AddNewProd
