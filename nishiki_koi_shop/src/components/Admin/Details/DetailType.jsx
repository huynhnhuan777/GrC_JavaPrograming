import {handleSubmit, useHookTypeForm} from "../../../utils/handleFuncs";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

const DetailType = ({type}) => {
    const formData = useHookTypeForm();
    const navigate = useNavigate();
    const [count, setCount] = useState(0);


    const handleCancelUpdate = () => {
        formData.resetForm();
        navigate('/types');
    }

    function resetForm() {
        formData.values.name = type.name;
        formData.values.description = type.description !== null ? type.description : '';
    }

    const handleResetForm = () => {
        resetForm();
        toast.success('Hiển thị dữ liệu thành công!');
        setCount(count + 1);
    }

    useEffect(() => {
        resetForm();
    }, [type]);

    useEffect(() => {
        setCount(count + 1);
    }, [])

    return (
        <>
            <h3>Thông tin về loại cá {type.name}</h3>
            <form className={'form-field'}
                  onSubmit={(e) => {
                      handleSubmit(e, formData,
                          `http://localhost:8080/api/v1/manager/fish-types/update/${type.id}`,
                          sessionStorage.getItem('token'),
                          'PUT',
                          null,
                          '/admin/types')
                  }}
                  style={{boxShadow: 'none'}}>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{marginRight: '5px'}}>
                        <legend>ID</legend>
                        <input className={'textInput'}
                               defaultValue={type.id}
                               disabled={true}
                               readOnly={true}
                        />
                    </fieldset>
                    <fieldset className={'fieldset'} style={{marginLeft: '5px'}}>
                        <legend>Tên</legend>
                        <input className={'textInput'}
                               type={'text'}
                               name={'name'}
                               value={formData.values.name}
                               required={true}
                               onChange={formData.handleChange}
                        />
                    </fieldset>
                </div>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'}>
                        <legend>Mô tả</legend>
                        <textarea className={'textareaInput'}
                                  name={'description'}
                                  value={formData.values.description}
                                  required={true}
                                  onChange={formData.handleChange}
                        />
                    </fieldset>
                </div>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'}>
                        <legend>Ngày tạo</legend>
                        <input type={'date'} className={'textInput'} defaultValue={type.createdDate} disabled={true}/>
                    </fieldset>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{display:'flex', justifyContent: 'center',alignItems: 'center'}}>
                        <button className={'featureBtn'} type={'submit'}>Cập nhật</button>
                        <button className={'featureBtn'} type={'button'} onClick={handleCancelUpdate}>Hủy bỏ</button>
                        <button className={'featureBtn'} type={'button'} onClick={handleResetForm}>Làm mới</button>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </>
    )
}
export default DetailType