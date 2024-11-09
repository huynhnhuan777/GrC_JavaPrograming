import {useState} from "react";
import {toast} from "react-toastify";
import {type} from "@testing-library/user-event/dist/type";

export const useHookDetailTitle = () => {
    const [title, setTitle] = useState("");
    return {title, setTitle};
}

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
        setId(idItem);
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
        fishTypeId: '',
        farmId: ''
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
        if (setChooseOne !== null)
            setChooseOne(Array(data.length).fill(false));
    } catch (e) {
        console.error("error: ", e.message);
    }
}

export async function handleGetObjById(urlAPI, token, setData) {
    try {
        const response = await fetch(urlAPI, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        ;
        if (!response.ok) {
            console.log('can not fetch data');
            return;
        }
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error("error: ", error.message);
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
        sessionStorage.setItem('publicId', data.public_id);
        if (imageUrl !== null || imageUrl !== '')
            setImageUrl(data.secure_url);
        else throw new Error('Can not upload image');
    } catch (e) {
        console.error('error: ', e.message);
    }
}

/**
 * handleSubmit is a function that will send data (from form in front-end) to server (to back-end).
 *
 * @since 0.1.0
 * @param {HTMLFormElement} e : catch the change event of any element in form (enter the text,...)
 * @param {Object} formData : store all property to apply and send to sever (if you want to know the structure,
 * see the database and logic in handles)
 * @param {String} urlAPI : API for your activity
 * @param {String} token : the authenticate token when user log in (it is provided by server - security)
 * @param {String} method : any method (GET,DELETE,...)
 * @param {useState} setStatus : this is set the new value to status (hook useState in parent component), using for effect (if needed)
 * @param {String} urlCurrPage :the name of current page. For example, you are in farm page, turn on the pop-up to add ne farm and send,
 * them you will return to the last current page you stay (farm).
 * @return none
 * **/
export const handleSubmit = async (e, formData, urlAPI, token, method, setStatus, urlCurrPage) => {
    e.preventDefault();
    console.log(formData);
    try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        const response = await fetch(urlAPI, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ContentType: "application/json"
            },
            method: method,
            body: formDataToSend,
        });

        if (response.ok) {
            console.log('successfully!');
            if (setStatus !== null)
                setStatus(false);
            window.location.assign(urlCurrPage)
        } else {
            toast.error('Lỗi không xác định: Vui lòng kiểm tra các trường dữ liệu!');
        }
    } catch (e) {
        console.error("ERROR: ", e.message);
    }
}

/**
 * handleDeleteObj is a function that delete an object in database. Example: in our database, we have fish, tour and farm,
 * so we can delete (remove from database) any object (only one with this function) - in database is remove one record.
 *
 * @since 0.1.0
 * @param {String} item : name of object, example: fish, farm,... (optional follow your define)
 * @param {Int} idItem : id of object (id property of any record that you want to remove it.
 * @param {String} token : the authenticate token when user log in (it is provided by server - security)
 * In this function, we defined APIs in it, so you can not change it easily. We will update later to resolve this.
 * */
export const handleDeleteObj = async (item, idItem, token) => {
    let urlAPI = '';
    switch (item) {
        case 'fish': {
            urlAPI = `http://localhost:8080/api/v1/manager/fish/delete/${idItem}`;
            break;
        }
        case 'farm': {
            urlAPI = `http://localhost:8080/api/v1/manager/farm/delete/${idItem}`;
            break;
        }
    }
    try {
        const response = await fetch(urlAPI, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ContentType: "application/json"
            },
            method: 'DELETE',
        })

        if (!response.ok) {
            toast.error('Xóa không thành công: đã có lỗi xảy ra!');
        } else {
            toast.success('Xóa thành công');
            window.location.reload();
        }
    } catch (e) {
        console.error('error: ', e.message);
    }
}