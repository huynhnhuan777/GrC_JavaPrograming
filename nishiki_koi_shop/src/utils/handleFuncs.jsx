import {useState} from "react";
import {toast} from "react-toastify";

export const useChooseAll = (itemLength) => {
    const [chooseAll, setChooseAll] = useState(false);
    const [chooseOne, setChooseOne] = useState(Array(itemLength).fill(false));

    const handleChooseAll = () => {
        if (chooseAll) {
            toast('Đã hủy chọn toàn bộ!');
            setChooseAll(false);
            const temp = Array(itemLength).fill(false);
            setChooseOne(temp);

            let checkInput = document.getElementsByClassName('check-box');
            for (let i = 0; i < checkInput.length; i++) {
                checkInput[i].checked = false;
            }
        } else {
            toast.success('Đã chọn hết!');
            setChooseAll(true);
            const temp = Array(itemLength).fill(true);
            setChooseOne(temp);

            let checkInput = document.getElementsByClassName('check-box');
            for (let i = 0; i < checkInput.length; i++) {
                checkInput[i].checked = true;
            }
        }
    }
    return {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll};
}

export const handleChooseOne = (chooseOne, setChooseOne, index, idItem, setId) => {
    // Create a copy of chooseOne to avoid mutating state directly
    const temp = [...chooseOne];
    if (temp[index]) {
        toast('Đã hủy chọn thành công');
        setId(-1);
    } else {
        toast.success('Đã chọn thành công');
        setId(idItem)
    }

    // Toggle the value at the specified index
    temp[index] = !temp[index];

    // Update the state with the new array
    setChooseOne(temp);
}


export const useHookUserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        roleName: '',
        createdDate: '',
        password: '',
    })
    return {formData, setFormData};
}

export const useHookProdForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        size: '',
        quantity: '',
        fishTypeId:'',
        farmId:''
    })
    return {formData, setFormData}
}

export const useHookFarmForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        image: '',
        contactInfo: '',
    })
    return {formData, setFormData}
}

export const useHookTourForm = () => {
    const [formData, setFormData] = useState({
        tourName: '',
        tourDescription: '',
        tourPrice: '',
        tourImage: '',
        tourStartDate: '',
        tourEndDate: '',
        tourCapacity: 0,
        farmId: 0,
    })
    return {formData, setFormData}
}

export const handleGetElementFromInp = (e, useHook) => {
    const {formData, setFormData} = useHook;
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
}

export async function handleGetAllProd(urlAPI, token, setData, setChooseOne) {
    try {
        const response = await fetch(urlAPI, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            console.log('can not fetch data');
            return;
        }

        const data = await response.json();
        setData(data);
        setChooseOne(Array(data.length).fill(false));
    } catch (e) {
        console.error("error: ", e.message);
    }
}

export const handleUploadImage = async (file, setImageUrl, upload_preset) => {
    const fData = new FormData();
    fData.append('file', file);
    fData.append('upload_preset', upload_preset);
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dxda6158s/image/upload`, {
            method: 'POST',
            body: fData,
        });
        const data = await response.json();
        const imageUrl = data.secure_url;
        if (imageUrl !== null || imageUrl !== '')
            setImageUrl(data.secure_url);
        else throw new Error('Can not upload image');
    } catch (e) {
        console.error('error: ', e.message);
    }
}

export const handleSubmit = async (e, formData, urlAPI, token, setStatus,urlCurrPage) => {
    e.preventDefault();

    try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        const response = await fetch(urlAPI, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: formDataToSend
        });

        if (response.ok) {
            console.log('successfully!');
            setStatus(false);
            window.location.assign(urlCurrPage)
        } else {
            console.log('False');
        }
    } catch (e) {
        console.error("ERROR: ", e.message);
    }
}

export const handleGetElement = (e, setFormData, formData) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
}