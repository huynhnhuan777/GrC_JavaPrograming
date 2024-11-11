import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleGetElementFromInp,
    handleSubmit,
    handleUploadImage,
    useHookFarmForm
} from "../../../../utils/handleFuncs";
import {toast, ToastContainer} from "react-toastify";

const AddNewFarm = ({setStatus}) => {
    const formData = useHookFarmForm();
    const [imageUrl, setImageUrl] = useState('');

    const handleGetFile = async (e) => {
        await handleUploadImage(e.target.files[0], setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_FARM);
    }

    const handleCancelForm = (e) => {
        e.preventDefault();
        setStatus(false);
    }

    useEffect(() => {
        if (formData.values.image !== null) {
            toast.success('Getting file successfully!')
        }
    }, [formData.values.image]);

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm sản phẩm mới</h3>
                <form className={'form-field'}
                      encType="multipart/form-data"
                      onSubmit={(e) => handleSubmit(e,
                          formData,
                          'http://localhost:8080/api/v1/manager/farm/create-farm',
                          sessionStorage.getItem('token'),
                          'POST',
                          setStatus,
                          'farms')}>
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
                            width: '35%',
                            margin: '0 5px 0 0'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Tên trang trại</legend>
                                <input className={'textInput'} type={'text'} name={'name'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Địa chỉ trang trại</legend>
                                <input className={'textInput'} type={'text'} name={'location'}
                                       onChange={formData.handleChange}/>
                            </fieldset>

                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '35%',
                            margin: '0 5px 0 5px'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Thông tin liên hệ</legend>
                                <input className={'textInput'} type={'text'} name={'contactInfo'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '30%',
                            margin: '0 0 0 5px'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Hình ảnh trang trại</legend>
                                <input className={'textInput'} type={'file'}
                                       onChange={(e) => formData.setFieldValue('image', e.target.files[0])}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'}
                                disabled={formData.values.image === ''}>Xác nhận
                        </button>
                        <button className={'featureBtn'} onClick={handleCancelForm}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
            <div className={'bg-close-dialog'}
                 onClick={handleCancelForm}></div>
            <ToastContainer/>
        </div>
    )
}
export default AddNewFarm
