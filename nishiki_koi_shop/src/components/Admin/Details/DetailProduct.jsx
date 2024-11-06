import {
    handleGetElementFromInp,
    handleSubmit,
    handleUploadImage,
    useHookProdForm
} from "../../../utils/handleFuncs";
import {useEffect, useState} from "react";
import '../../../assets/css/Admin/Component/DetailObj/DetailProduct.css'
import {useNavigate} from "react-router-dom";

const DetailProduct = ({data}) => {
    const {formData, setFormData} = useHookProdForm();
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setFormData(data);  // Set formData only if data is not empty
        }
    }, [data, setFormData]);

    // useEffect(() => {
    //     console.log('form: ', formData);
    //     console.log('data: ', data);
    // }, [data, formData])

    const handleCancleUpdate = () => {
        navigate('/products');
    }

    const handleReset = () => {
        window.location.reload();
    }

    return (
        <>
            <h3>Thông tin về giống cá {data.name}</h3>
            <form className={'form-field'}
                  onSubmit={(e) => handleSubmit(e, formData, "", sessionStorage.getItem('token'), null, '/admin/products')}
                  style={{boxShadow: 'none'}}>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{marginRight: '5px'}}>
                        <legend>ID</legend>
                        <input className={'textInput'}
                               value={data.fishId}
                               disabled={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                    <fieldset className={'fieldset'} style={{marginLeft: '5px'}}>
                        <legend>Tên</legend>
                        <input className={'textInput'}
                               type={'text'}
                               name={'name'}
                               value={formData.name || ''}
                               required={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                </div>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'}>
                        <legend>Mô tả</legend>
                        <textarea className={'textareaInput'}
                                  name={'description'}
                                  value={formData.description}
                                  required={true}
                                  onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                </div>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                        <legend>Kích thước (cm)</legend>
                        <input className={'textInput'}
                               type={'number'}
                               name={'size'}
                               value={formData.size}
                               required={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                    <fieldset className={'fieldset'} style={{margin: '0 0 0 5px'}}>
                        <legend>Số lượng</legend>
                        <input className={'textInput'}
                               type={'number'}
                               name={'quantity'}
                               value={formData.quantity}
                               required={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                </div>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'}>
                        <legend>Giá</legend>
                        <input className={'textInput'}
                               type={'number'}
                               name={'price'}
                               value={formData.price}
                               required={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                </div>
                <div className={'form-content'}
                     style={{flexDirection: 'row', alignItems: 'flex-end', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                        <legend>Đường dẫn hình ảnh</legend>
                        <input className={'textInput'}
                               type={'text'}
                               name={'image'}
                               value={formData.image}
                               onChange={(e) => handleUploadImage(e, setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_FISH)}/>
                    </fieldset>
                    <input type={'file'} className={'fileInput'} style={{marginLeft: '5px'}}/>
                </div>
                <div className={'optionBtns'}>
                    <button className={'featureBtn'} type={'submit'}>Cập nhật</button>
                    <button className={'featureBtn'} onClick={handleCancleUpdate}>Hủy bỏ</button>
                    <button className={'featureBtn'} onClick={handleReset}>Làm mới</button>
                </div>
            </form>
        </>
    )
}
export default DetailProduct;