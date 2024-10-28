import '../../../assets/css/Admin/Component/addNewProd.css'
import {useState} from "react";

const AddNewProd = ({setStatus}) => {

    const [formData, setFormData] = useState({
        description: '',
        startDate:'',
        endDate:'',
        max:'',
        name:'',
        price:'',
        farmID:'',
        image: null,
    })

    const handleGetElement = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleGetFile = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        })
    }

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
                <h3>Thêm sản phẩm mới</h3>
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
                                <legend>Mô tả </legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={handleGetElement}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Ngày khởi hành</legend>
                                <input className={'textInput'} type={'date'} name={'startDate'}
                                       onChange={handleGetElement}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Ngày trở về</legend>
                                <input className={'textInput'} type={'date'} name={'endDate'}
                                       onChange={handleGetElement}/>
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
                                <input className={'textInput'} type={'text'} name={'size'}
                                       onChange={handleGetElement}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Giá</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={handleGetElement}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Đến trang trại</legend>
                                <select className={'selectInput'} name={'farmID'} onChange={handleGetElement}>
                                    <option defaultValue={-1}>Không</option>
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
                                <legend>Tên</legend>
                                <input className={'textInput'} type={'text'} name={'name'}
                                       onChange={handleGetElement}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Hình ảnh sản phẩm</legend>
                                <input className={'textInput'} type={'file'} onChange={handleGetFile}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'}>Xác nhận</button>
                        <button className={'featureBtn'} onClick={handleCancelForm}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
            <div style={{width: "inherit", height: 'inherit',position:'absolute'}} className={'bg-close-dialog'}
                 onClick={handleCancelForm}></div>
        </div>
    )
}
export default AddNewProd
