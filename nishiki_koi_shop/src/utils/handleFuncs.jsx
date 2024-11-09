import {useState} from "react";
import {toast} from "react-toastify";
import {useFormik} from 'formik';

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

// Custom hook sử dụng Formik
export const useHookFarmForm = () => {
    return  useFormik({
        initialValues: {
            name: '',
            description: '',
            location: '',
            image: '',
            contactInfo: '',
        },
    });
};
// ------------------------------
export const useHookTourForm = () => {
    return useFormik({
        initialValues: {
            tourName: '',
            tourDescription: '',
            tourPrice: '',
            tourImage: '',
            tourStartDate: '',
            tourEndDate: '',
            tourCapacity: 0,
            farmId: 0,
        },
    })
};

/*----------------------------*/
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
            toast.warning('Lấy dữ liệu thất bại. Hãy kiểm tra lại đường truyền và thử lại!')
            return;
        }

        const data = await response.json();
        setData(data);
        if (setChooseOne !== null)
            setChooseOne(Array(data.length).fill(false));
    } catch (e) {
        toast.error('Kết nối đến server thất bại. Vui lòng liên hệ bộ phận kỹ thuật!');
        console.error("error: ", e.message);
    }
}
//-------------------------------------------
/**
 * Hàm gọi API GET để lấy dữ liệu.
 * @param {string} urlAPI - Đường dẫn của API.
 * @param {string} token - Token xác thực.
 * @param {function} setData - Hàm để lưu dữ liệu nhận được.
 * @param {function} [setChooseOne] - Hàm để đặt trạng thái chọn nếu có.
 */
// export async function handleGetData(urlAPI, token, setData, setChooseOne) {
//     try {
//         const response = await fetch(urlAPI, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//
//         if (!response.ok) {
//             console.log('Cannot fetch data, status:', response.status);
//             return;
//         }
//
//         const data = await response.json();
//         setData(data); // Cập nhật dữ liệu bằng hàm setData
//
//         if (setChooseOne) {
//             // Nếu có hàm setChooseOne, khởi tạo giá trị ban đầu cho nó
//             setChooseOne(Array(data.length).fill(false));
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error.message);
//     }
// }

// ---------------------------------------
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

export const handleSubmit = async (e, formData, urlAPI, token, setStatus, urlCurrPage) => {
    e.preventDefault();

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
            method: 'POST',
            body: formDataToSend,
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