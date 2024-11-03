import {ToolManager} from "../../../components/ToolManager";
import {useEffect, useState} from "react";
import AddNewUser from "../../../components/Admin/Modals/AddNewUser";
import '../../../assets/css/Admin/Page/Manage/AdminUser.css'
import {handleChooseOne, useChooseAll, useHookDetailTitle} from "../../../utils/handleFuncs";
import {toast, ToastContainer} from "react-toastify";
import {handleRenderSelectCard} from "../../../utils/handleRenderFuncs";

const AdminUser = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const roleName = ['ROLE_CUSTOMER', 'ROLE_MANAGER', 'ROLE_SALE_STAFF', 'ROLE_DELIVERY_STAFF', 'ROLE_CONSULTING_STAFF'];
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);
    const [id, setId] = useState(-1);
    const {title, setTitle} = useHookDetailTitle();

    async function handleGetAllUser() {
        try {
            const response = await fetch('http://localhost:8080/api/v1/manager/users', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                console.log('cannot fetch data !');
                return;
            }
            const data = await response.json();
            setData(data);
            setChooseOne(Array(data.length).fill(false));
        } catch (e) {
            console.error("error: ", e.message);
        }
    }

    useEffect(() => {
        handleGetAllUser();//please don't care this warning
        setTitle(' người dùng');
    }, []);

    console.log(data)

    return (
        <div className={'ad-user-container'}>
            <div className={'ad-user-content'}>
                <ToolManager setStatus={setStatus} itemLength={data.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                             baseUrl={'users'}
                />

                {status && <AddNewUser setStatus={setStatus}/>}
                <div className={'list-user'}>
                    <div className={'item-user'}>
                        <div className={'user-id'} style={{fontWeight: 'bold'}}>ID</div>
                        <div className={'user-username'} style={{fontWeight: 'bold'}}>Tên tài khoản</div>
                        <div className={'user-fullName'} style={{fontWeight: 'bold'}}>Tên người dùng</div>
                        <div className={'user-roleName'} style={{fontWeight: 'bold'}}>Vai trò</div>
                        <div className={'user-address'} style={{fontWeight: 'bold'}}>Địa chỉ</div>
                        <div className={'user-email'} style={{fontWeight: 'bold'}}>Email</div>
                        <div className={'user-phonenumber'} style={{fontWeight: 'bold'}}>Số điện thoại</div>
                        <div className={'user-choice'} style={{fontWeight: 'bold'}}></div>
                    </div>
                    {data && data.map((item, index) => (
                        <div key={index} className={'item-user'}>
                            <div className={'user-id'}>{item.id}</div>
                            <div className={'user-username'}>{item.username}</div>
                            <div className={'user-fullName'}>{item.fullName === null ? 'Empty' : item.fullName}</div>
                            <div
                                className={'user-roleName'}>{handleRenderSelectCard(item.roleName, roleName, false)}
                            </div>
                            <div className={'user-address'}>{item.address === null ? 'Empty' : item.address}</div>
                            <div className={'user-email'}>{item.email}</div>
                            <div
                                className={'user-phonenumber'}>{item.phoneNumber === null ? 'Empty' : item.phoneNumber}</div>
                            <div className={'user-choice'}>
                                <input className={'check-box'} type={'checkbox'}
                                       style={{width: '15px', height: '15px'}}
                                       onClick={() => handleChooseOne(chooseOne, setChooseOne, index, Number(item.id), setId)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default AdminUser