import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleSubmit,
    useHookTypeForm
} from "../../../../utils/handleFuncs";
import {toast, ToastContainer} from "react-toastify";

const AddNewProd = ({setStatus}) => {
    const formData = useHookTypeForm();

    const handleCancelForm = async (e) => {
        e.preventDefault();
        setStatus(false);
    }

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm dòng cá mới</h3>
                <form className={'form-field'}
                      encType="multipart/form-data"
                      onSubmit={(e) => handleSubmit(e,
                          formData,
                          "http://localhost:8080/api/v1/manager/fish-types/create",
                          sessionStorage.getItem('token'),
                          'POST',
                          setStatus,
                          '/admin/types')}
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
                            width: '80%',
                            margin: '0 5px 0 0'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Tên dòng cá</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'name'}
                                       required={true}
                                       onChange={formData.handleChange}/>
                            </fieldset>

                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <textarea className={'textareaInput'} name={'description'}
                                          onChange={formData.handleChange}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'} disabled={formData.values.image === null}>Xác
                            nhận
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
export default AddNewProd
