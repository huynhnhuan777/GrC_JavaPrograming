import {
    handleSubmit,
    useHookProdForm
} from "../../../utils/handleFuncs";
import {useEffect, useRef, useState} from "react";
import '../../../assets/css/Admin/Component/DetailObj/DetailProduct.css'
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {handleRenderSelectCard} from "../../../utils/handleRenderFuncs";

const DetailProduct = ({fish, farms, types}) => {
    const formData = useHookProdForm();
    const navigate = useNavigate();
    const [isReset, setIsReset] = useState(false);
    const fileInputRef = useRef(null);

    const handleCancelUpdate = () => {
        formData.resetForm();
        navigate('/products');
    }

    function resetForm() {
        formData.values.name = fish.name;
        formData.values.price = fish.price;
        formData.values.description = fish.description;
        formData.values.size = fish.size;
        formData.values.quantity = fish.quantity;
        formData.values.fishTypeId = fish.fishTypeId;
        formData.values.farmId = fish.farmId;
        formData.values.image = new File([], "");
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
    }, [fish]);

    useEffect(() => {
        setIsReset(false);
    }, [formData])

    return (
        <>
            <h3>Thông tin về giống cá {fish.name}</h3>
            <form className={'form-field'}
                  encType="multipart/form-data"
                  onSubmit={(e) => {
                      handleSubmit(e, formData,
                          `http://localhost:8080/api/v1/manager/fish/update/${fish.id}`,
                          sessionStorage.getItem('token'),
                          'PUT',
                          null,
                          '/admin/products')
                  }}
                  style={{boxShadow: 'none'}}>
                <div className={'form-part'}>
                    <div className={'form-content'}
                         style={{flexDirection: 'row', boxShadow: 'none', margin: '0 0 10px 0'}}>
                        <fieldset className={'fieldset'} style={{marginRight: '5px'}}>
                            <legend>ID</legend>
                            <input className={'textInput'}
                                   defaultValue={fish.id}
                                   disabled={true}
                                   readOnly={true}
                                // onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}
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
                                      defaultValue={formData.values.description}
                                      required={true}
                                      onChange={formData.handleChange}
                            />
                        </fieldset>
                    </div>
                    <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                            <legend>Kích thước (cm)</legend>
                            <input className={'textInput'}
                                   type={'number'}
                                   name={'size'}
                                   defaultValue={formData.values.size}
                                   required={true}
                                   onChange={formData.handleChange}
                            />
                        </fieldset>
                        <fieldset className={'fieldset'} style={{margin: '0 0 0 5px'}}>
                            <legend>Số lượng</legend>
                            <input className={'textInput'}
                                   type={'number'}
                                   name={'quantity'}
                                   defaultValue={formData.values.quantity}
                                   required={true}
                                   onChange={formData.handleChange}
                            />
                        </fieldset>
                    </div>
                    <div className={'form-content'} style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                            <legend>Thuộc nông trại</legend>
                            {formData && handleRenderSelectCard({
                                name: 'farmId',
                                currChoice: formData.values.farmId,
                                arrayData: farms,
                                isDisabled: false,
                                useHook: formData
                            })
                            }
                        </fieldset>
                        <fieldset className={'fieldset'} style={{margin: '0 0 0 5px'}}>
                            <legend>Phân loại</legend>
                            {formData && handleRenderSelectCard({
                                    name: 'type',
                                    currChoice: formData.values.fishTypeId,
                                    arrayData: types,
                                    isDisabled: false,
                                    useHook: formData
                                }
                            )}
                        </fieldset>
                    </div>
                    <div className={'form-content'}
                         style={{flexDirection: 'row', boxShadow: 'none', margin: '10px 0 0 0'}}>
                        <fieldset className={'fieldset'}>
                            <legend>Giá</legend>
                            <input className={'textInput'}
                                   type={'number'}
                                   name={'price'}
                                   defaultValue={formData.values.price}
                                   required={true}
                                   onChange={formData.handleChange}
                            />
                        </fieldset>
                    </div>
                </div>
                <div className={'form-part'}>
                    <div className={'form-content'}
                         style={{flexDirection: 'row', alignItems: 'center', boxShadow: 'none', margin: '10px 0'}}>
                        <fieldset className={'fieldset'} style={{margin: '0 5px 0 0'}}>
                            <legend>Hình ảnh sản phẩm</legend>
                            <img style={{padding: '5px 0'}}
                                 src={formData.values.image.name === "" ? fish.image : formData.values.image}
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
export default DetailProduct;