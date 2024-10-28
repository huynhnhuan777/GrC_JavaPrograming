import {useState} from "react";
import {sampleOrders} from "../store/sampleTest";
import {toast} from "react-toastify";

export const useChooseAll = (itemLength) => {
    const [chooseAll, setChooseAll] = useState(false);
    const [chooseOne, setChooseOne] = useState(Array(itemLength).fill(false));

    const handleChooseAll = () => {
        if (chooseAll) {
            toast.success('Đã hủy chọn toàn bộ!');
            setChooseAll(false);
            const temp = Array(sampleOrders.length).fill(false);
            setChooseOne(temp);

            let checkInput = document.getElementsByClassName('check-box');
            for (let i = 0; i < checkInput.length; i++) {
                checkInput[i].checked = false;
            }
        } else {
            toast.success('Đã chọn hết!');
            setChooseAll(true);
            const temp = Array(sampleOrders.length).fill(true);
            setChooseOne(temp);

            let checkInput = document.getElementsByClassName('check-box');
            for (let i = 0; i < checkInput.length; i++) {
                checkInput[i].checked = true;
            }
        }
    }
    return {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll};
}