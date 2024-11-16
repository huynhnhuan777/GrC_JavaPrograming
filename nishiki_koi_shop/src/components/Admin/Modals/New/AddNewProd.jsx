import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleGetAllProd,
    handleSubmit,
    useChooseAll,
    useHookProdForm
} from "../../../../utils/handleFuncs";
import {toast} from "react-toastify";
import {handleRenderSelectCard} from "../../../../utils/handleRenderFuncs";

const AddNewProd = ({setStatus}) => {
    const formData = useHookProdForm();
    const [data, setData] = useState([]);
    const [farmData, setFarmData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);

    const handleCancelForm = async (e) => {
        e.preventDefault();
        setStatus(false);
    }

    useEffect(() => {
        if (formData.values.image.name !== "") {
            toast.success('Getting file successfully.');
        }
    }, [formData.values.image]);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, setChooseOne);
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types', sessionStorage.getItem('token'), setTypeData, null);
    }, []);

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm sản phẩm mới</h3>
                <form className={'form-field'}
                      encType="multipart/form-data"
                      onSubmit={(e) => handleSubmit(e,
                          formData,
                          "http://localhost:8080/api/v1/manager/fish/create-fish",
                          sessionStorage.getItem('token'),
                          'POST',
                          setStatus,
                          '/admin/products')}
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
                            width: '35%',
                            margin: '0 5px 0 0'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Tên sản phẩm</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'name'}
                                       required={true}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mức giá</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'price'}
                                       required={true}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Số lượng tồn</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'quantity'}
                                       required={true}
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
                                <legend>Kích thước sản phẩm (cm)</legend>
                                <input className={'textInput'}
                                       type={'number'}
                                       name={'size'}
                                       required={true}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={formData.handleChange}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Trang trại</legend>
                                {formData && handleRenderSelectCard({
                                        name: 'farmId',
                                        currChoice: '-1',
                                        arrayData: farmData,
                                        isDisabled: false,
                                        useHook: formData
                                    }
                                )}
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Phân loại</legend>
                                {handleRenderSelectCard({
                                        name: 'fishTypeId',
                                        currChoice: '-1',
                                        arrayData: typeData,
                                        isDisabled: false,
                                        useHook: formData
                                    }
                                )}
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
                                <legend>Hình ảnh sản phẩm</legend>
                                <input className={'textInput'}
                                       type={'file'}
                                       onChange={(e) => formData.setFieldValue('image', e.target.files[0])}/>
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
        </div>
    )
}
export default AddNewProd
