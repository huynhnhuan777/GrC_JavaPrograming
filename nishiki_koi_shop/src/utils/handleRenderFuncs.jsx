import {toast} from "react-toastify";
import '../assets/css/Admin/Page/Manage/AdminUser.css'
import {handleGetElementFromInp} from "./handleFuncs";
import {useEffect} from "react";

export const handleChangeOption = () => {
    toast.success('Thay đổi trạng thái thành công');
}

/**
 *
 * @param {String} name  set name for input card (select card)
 * @param {String} currChoice  current value of object
 * @param {Array} arrayData an array of object (for example: farm in farms)
 * @param {boolean} isDisabled  decide about block or unblock selection
 * @param useHook custom hook
 * @returns {JSX.Element}
 */
export const handleRenderSelectCard = ({name, currChoice, arrayData, isDisabled, useHook}) => {
    let temp;
    if (isDisabled) temp = Array(arrayData.length).fill(false);
    else temp = Array(arrayData.length).fill(true);

    let checkCurr = false;
    if (!isNaN(currChoice)) {
        for (let i = 0; i < arrayData.length; i++) {
            if (arrayData[i].id === currChoice) { //compare num=num
                checkCurr = true;
            }
            if (checkCurr) {
                temp[i] = true;
            }
        }

        return (
            <select className={'select-status'}
                    name={name}
                    onChange={useHook.handleChange}
                    value={currChoice !== '-1' ? currChoice : undefined}
                    style={{textAlign: 'center', width: '100%', borderRadius: '5px'}}>
                <option value={'-1'}>---</option>
                {arrayData.map((item, index) => (
                    <option key={index} value={item.id} disabled={!temp[index]}>{item.name}</option>
                ))}
            </select>
        )
    } else {
        for (let i = 0; i < arrayData.length; i++) {
            if (arrayData[i] === currChoice) { //compare num=num
                checkCurr = true;
            }
            if (checkCurr) {
                temp[i] = true;
            }
        }

        return (
            <select className={'select-status'}
                    name={name}
                    onChange={useHook.handleChange}
                    // value={currChoice}
                    style={{textAlign: 'center', width: '100%', borderRadius: '5px'}}>
                {arrayData.map((item, index) => (
                    <option key={index} value={item} disabled={!temp[index]}>{item}</option>
                ))}
            </select>
        )
    }

}