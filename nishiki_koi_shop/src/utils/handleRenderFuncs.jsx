import {toast} from "react-toastify";
import '../assets/css/Admin/Page/Manage/AdminUser.css'

export const handleRenderSelectCard = (currChoice, statusArray, isDisabled) => {
    let temp;
    if (isDisabled) temp = Array(statusArray.length).fill(false);
    else temp = Array(statusArray.length).fill(true);

    let checkCurr = false;
    for (let i = 0; i < statusArray.length; i++) {
        if (statusArray[i] === currChoice) {
            checkCurr = true;
        }
        if (checkCurr) {
            temp[i] = true;
        }
    }

    const handleChangeOption = () => {
        toast.success('Thay đổi trạng thái thành công');
    }

    return (
        <select className={'select-status'} onChange={handleChangeOption} style={{textAlign: 'center'}}>
            {statusArray.map((item, index) => (
                <option key={index} value={item} disabled={!temp[index]}
                        selected={item === currChoice}>{item}</option>
            ))}
        </select>
    )
}