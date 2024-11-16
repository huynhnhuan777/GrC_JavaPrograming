import {
    handleSubmit,
    useHookFarmForm
} from "../../../utils/handleFuncs";
import {useEffect, useRef, useState} from "react";
import '../../../assets/css/Admin/Component/DetailObj/DetailProduct.css'
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const DetailFarm = ({farmData}) => {
    const formData = useHookFarmForm();
    const [isReset, setIsReset] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    function resetForm() {
        Object.keys(farmData).map(key => {
            if (key !== 'image')
                formData.values[key] = farmData[key];
            else formData.values[key] = new File([], "");
        })
    }

    useEffect(() => {
        // console.log('data: ', farmData);
        // console.log('farm: ', farmsData);
        // console.log('type: ', typeData);
        console.log(formData.values);
    }, [formData])

    const handleCancelUpdate = () => {
        navigate('/products');
    }

    const handleResetForm = () => {
        resetForm();
        toast.success('Hiển thị dữ liệu thành công!');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsReset(true);
    }

    useEffect(() => {
        if (formData.values.image.name !== "") {
            toast.success('Getting file successfully.')
        }
    }, [formData.values.image]);

    useEffect(() => {
        resetForm();
    }, [farmData]);

    useEffect(() => {
        setIsReset(false);
    }, [formData])

    return (
        <>
            <h3>Thông tin về nông trại {farmData.name}</h3>
            <form className={'form-field'}
                  encType={'multipart/form-data'}
                  onSubmit={(e) => handleSubmit(e,
                      formData,
                      `http://localhost:8080/api/v1/manager/farm/update/${farmData.id}`,
                      sessionStorage.getItem('token'),
                      'PUT',
                      null,
                      '/admin/farms'
                  )}
                  style={{boxShadow: 'none'}}>
                <div className={'form-part'}>
                    <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'} style={{marginRight: '5px'}}>
                            <legend>ID</legend>
                            <input className={'textInput'}
                                   defaultValue={farmData.id}
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
                                   onChange={formData.handleChange}/>
                        </fieldset>
                    </div>
                    <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'}>
                            <legend>Mô tả</legend>
                            <textarea className={'textareaInput'}
                                      name={'description'}
                                      value={formData.values.description}
                                      required={true}
                                      onChange={formData.handleChange}/>
                        </fieldset>
                    </div>
                    <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'}>
                            <legend>Địa chỉ</legend>
                            <input className={'textInput'}
                                   type={'text'}
                                   name={'location'}
                                   value={formData.values.location}
                                   required={true}
                                   onChange={formData.handleChange}/>
                        </fieldset>
                    </div>
                    <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                            <legend>Thông tin liên hệ</legend>
                            <input className={'textInput'}
                                   type={'text'}
                                   name={'contactInfo'}
                                   value={formData.values.contactInfo}
                                   required={true}
                                   onChange={formData.handleChange}/>
                        </fieldset>
                        <fieldset className={'fieldset'} style={{margin: '0 0 0 5px'}}>
                            <legend>Ngày tạo</legend>
                            <input className={'textInput'}
                                   type={'date'}
                                   name={'createdDate'}
                                   value={formData.values.createdDate}
                                   disabled={true}
                            />
                        </fieldset>
                    </div>
                </div>
                <div className={'form-part'}>
                    <div className={'form-content'}
                         style={{boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'} style={{margin: '0 5px 0 0', padding: '5px'}}>
                            <legend>Hình ảnh sản phẩm</legend>
                            <img style={{padding: '5px 0'}}
                                 src={formData.values.image.name === "" ? farmData.image : formData.values.image}
                                 alt=""/>
                        </fieldset>
                        <input className={'fileInput'}
                               type={'file'}
                               name={'image'}
                               style={{marginLeft: '5px'}}
                               ref={fileInputRef}
                               onChange={(e) => formData.setFieldValue('image', e.target.files[0])}/>
                    </div>
                </div>
                <div className={'optionBtns'}>
                    <button className={'featureBtn'} type={'submit'}>Cập nhật</button>
                    <button className={'featureBtn'} type={'button'} onClick={handleCancelUpdate}>Hủy bỏ</button>
                    <button className={'featureBtn'} type={'button'} onClick={handleResetForm}>Làm mới</button>
                </div>
            </form>
            <ToastContainer/>
        </>
    )
}
export default DetailFarm;