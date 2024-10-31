import '../../../assets/css/Admin/Component/addNewProd.css'
import {useState} from "react";
import {handleGetElementFromInp, useHookUserForm} from "../../../utils/handleFuncs";

const AddNewUser = ({setStatus}) => {
    const {formData, setFormData} = useHookUserForm();
    const roleName = ['ROLE_CUSTOMER', 'ROLE_MANAGER','ROLE_SALE_STAFF','ROLE_DELIVERY_STAFF','ROLE_CONSULTING_STAFF'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData;
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await fetch("http://localhost:8080/api/v1/fish", {
                method: 'POST',
                body: formDataToSend
            });
            if (response.ok) {
                console.log('successfully!');
                setStatus(false);
            } else {
                console.log('False');
            }
        } catch (e) {
            console.error("ERROR: ", e.message());
        }
    }

    const handleCancelForm = (e) => {
        e.preventDefault();
        setStatus(false);
    }
    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm tài khoản mới</h3>
                <form className={'form-field'} onSubmit={handleSubmit}>
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
                                <legend>Tên tài khoản</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={(e)=>handleGetElementFromInp(e,{formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Tên người dùng</legend>
                                <input className={'textInput'} type={'text'} name={'startDate'}
                                       onChange={(e)=>handleGetElementFromInp(e,{formData,setFormData})}/>
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
                                <legend>Email</legend>
                                <input className={'textInput'} type={'text'} name={'size'}
                                       onChange={(e)=>handleGetElementFromInp(e,{formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Vai trò</legend>
                                <select className={'selectInput'} name={'roleName'} onChange={(e)=>handleGetElementFromInp(e,formData,setFormData)}>
                                    {roleName.map((item,index)=>(
                                        <option key={index} name={'roleName'} value={item}>{item}</option>
                                    ))}
                                </select>
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
                                <legend>Mật khẩu</legend>
                                <input className={'textInput'} type={'text'} name={'name'}
                                       onChange={handleGetElementFromInp}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'}>Xác nhận</button>
                        <button className={'featureBtn'} onClick={handleCancelForm}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
            <div style={{width: "inherit", height: 'inherit', position: 'absolute'}} className={'bg-close-dialog'}
                 onClick={handleCancelForm}></div>
        </div>
    )
}
export default AddNewUser
