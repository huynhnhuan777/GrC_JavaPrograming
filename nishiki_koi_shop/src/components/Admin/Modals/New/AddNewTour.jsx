import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleGetAllProd, handleSubmit,
    useHookTourForm
} from "../../../../utils/handleFuncs";
import {toast} from "react-toastify";
import {handleRenderSelectCard} from "../../../../utils/handleRenderFuncs";

const AddNewTour = ({setStatus}) => {
    const formData = useHookTourForm();
    const [farmData, setFarmData] = useState([]);
    const handleCancelForm = (e) => {
        e.preventDefault();
        formData.resetForm();
        setStatus(false);
    }

    useEffect(() => {
        if (formData.values.image !== null) {
            toast.success('Getting file successfully.');
        }
    }, [formData.values.image]);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, null);
    }, []);

    // useEffect(() => {
    //     console.log(farmData);
    // }, [])

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm chuyến đi mới</h3>
                <form className={'form-field'}
                      encType={'multipart/form-data'}
                      onSubmit={(e) => handleSubmit(e,
                          formData,
                          "http://localhost:8080/api/v1/manager/tour/create-tour",
                          sessionStorage.getItem('token'),
                          "POST",
                          setStatus,
                          '/admin/tours'
                      )}>
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
                                <input className={'textInput'} type={'text'} name={'name'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Giá</legend>
                                <input className={'textInput'} type={'number'} name={'price'}
                                       onChange={formData.handleChange}/>
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
                                <input className={'textInput'} type={'text'} name={'capacity'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Ngày khởi hành</legend>
                                <input className={'textInput'} type={'date'} name={'startDate'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Ngày kết thúc</legend>
                                <input className={'textInput'} type={'date'} name={'endDate'}
                                       onChange={formData.handleChange}/>
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
                                {handleRenderSelectCard('farmId',
                                    '-1',
                                    farmData,
                                    false,
                                    formData)}
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Hình ảnh sản phẩm</legend>
                                <input className={'textInput'}
                                       name={'image'}
                                       type={'file'}
                                       onChange={(e) => formData.setFieldValue('image', e.target.files[0])}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'}
                                type={'submit'}
                                disabled={formData.values.image === null}>Xác nhận
                        </button>
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
export default AddNewTour
