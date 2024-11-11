import {
    handleGetElementFromInp,
    handleSubmit,
    handleUploadImage,
    useHookProdForm
} from "../../../utils/handleFuncs";
import {useEffect, useState} from "react";
import '../../../assets/css/Admin/Component/DetailObj/DetailProduct.css'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {handleRenderSelectCard} from "../../../utils/handleRenderFuncs";

const DetailProduct = ({farmData}) => {
    const {formData, setFormData} = useHookProdForm();
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleGetFile = async (e) => {
        await handleUploadImage(e.target.files[0], setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_FISH);
    }

    useEffect(() => {
        if (farmData && Object.keys(farmData).length > 0) {
            setFormData(farmData);  // Set formData only if data is not empty
        }
    }, [farmData, setFormData]);

    useEffect(() => {
        // console.log('data: ', farmData);
        // console.log('farm: ', farmsData);
        // console.log('type: ', typeData);
        console.log(formData);
    }, [formData])

    const handleCancleUpdate = () => {
        navigate('/products');
    }

    const handleReset = () => {
        window.location.reload();
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

    return (
        <>
            <h3>Thông tin về nông trại {farmData.name}</h3>
            <form className={'form-field'}
                  onSubmit={(e) => handleSubmit(e, formData, `http://localhost:8080/api/v1/manager/farm/update/${farmData.id}`, sessionStorage.getItem('token'), 'PUT', null, '/admin/farms')}
                  style={{boxShadow: 'none'}}>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{marginRight: '5px'}}>
                        <legend>ID</legend>
                        <input className={'textInput'}
                               value={farmData.id}
                               disabled={true}
                               readOnly={true}
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
                    <fieldset className={'fieldset'}>
                        <legend>Địa chỉ</legend>
                        <input className={'textInput'}
                               type={'text'}
                               name={'location'}
                               value={formData.location}
                               required={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                </div>
                <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                        <legend>Thông tin liên hệ</legend>
                        <input className={'textInput'}
                               type={'text'}
                               name={'contactInfo'}
                               value={formData.contactInfo}
                               required={true}
                               onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                    </fieldset>
                    <fieldset className={'fieldset'} style={{margin: '0 0 0 5px'}}>
                        <legend>Ngày tạo</legend>
                        <input className={'textInput'}
                               type={'date'}
                               name={'createdDate'}
                               value={formData.createdDate}
                               disabled={true}
                        />
                    </fieldset>
                </div>

                <div className={'form-content'}
                     style={{flexDirection: 'row', alignItems: 'flex-end', boxShadow: 'none', margin: '10px 0'}}>
                    <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                        <legend>Đường dẫn hình ảnh</legend>
                        <input className={'textInput'}
                               type={'text'}
                               name={'image'}
                               value={formData.image}/>
                    </fieldset>
                    <input className={'fileInput'}
                           type={'file'}
                           name={'setImage'}
                           style={{marginLeft: '5px'}}
                           onChange={handleGetFile}/>
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