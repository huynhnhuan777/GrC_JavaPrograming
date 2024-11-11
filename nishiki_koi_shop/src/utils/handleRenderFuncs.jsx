import {toast} from "react-toastify";
import '../assets/css/Admin/Page/Manage/AdminUser.css'
import {handleGetElementFromInp} from "./handleFuncs";

export const handleChangeOption = () => {
    toast.success('Thay đổi trạng thái thành công');
}

export const handleRenderSelectCard = (name, currChoice, arrayData, isDisabled, useHook) => {
    let temp;
    if (isDisabled) temp = Array(arrayData.length).fill(false);
    else temp = Array(arrayData.length).fill(true);

    const {formData, setFormData} = useHook;

    let checkCurr = false;
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData[i].id === currChoice) { //compare string -string
            checkCurr = true;
        }
        if (checkCurr) {
            temp[i] = true;
        }
    }

    if (currChoice !== -1) {
        setFormData({
            ...formData,
            [name]: currChoice
        })
    }

    return (
        <select className={'select-status'}
                name={name}
                onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}
                style={{textAlign: 'center', width: '100%', borderRadius: '5px'}}>
            <option defaultValue={-1} value={-1} selected={true}>Không</option>
            {arrayData.map((item, index) => (
                <option key={index} value={item.id} disabled={!temp[index]}
                        selected={item === currChoice}>{item.name}</option>
            ))}
        </select>
    )
}