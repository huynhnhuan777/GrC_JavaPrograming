import AddNewProd from "../../../components/Admin/Modals/AddNewProd";
import {useEffect, useState} from "react";
import {ToolManager} from "../../../components/ToolManager";
import '../../../assets/css/Admin/Page/Manage/AdminProducts.css'
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import {ToastContainer} from "react-toastify";

const AdminProducts = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);
    const [id, setId] = useState(-1);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish/get-all-fishes', sessionStorage.getItem('token'), setData, setChooseOne);
    }, []);

    return (
        <div className={'ad-prod-container'}>
            <div className={'ad-prod-content'}>
                <ToolManager setStatus={setStatus} itemLength={data.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                />
                {status && <AddNewProd setStatus={setStatus}/>}
                <div className={'list-prod'}>
                    <div className={'item-prod'}>
                        <div className={'prod-id'} style={{fontWeight: 'bold'}}>ID</div>
                        <div className={'prod-name'} style={{fontWeight: 'bold'}}>Tên</div>
                        <div className={'prod-desc'} style={{fontWeight: 'bold'}}>Mô tả</div>
                        <div className={'prod-quantity'} style={{fontWeight: 'bold'}}>Số lượng</div>
                        <div className={'prod-size'} style={{fontWeight: 'bold'}}>Kích thước</div>
                        <div className={'prod-price'} style={{fontWeight: 'bold'}}>Giá</div>
                        <div className={'prod-farm'} style={{fontWeight: 'bold'}}>Trang trại</div>
                        <div className={'prod-type'} style={{fontWeight: 'bold'}}>Loại</div>
                        <div className={'tool'} style={{fontWeight: 'bold'}}></div>
                    </div>
                    {data && data.map((item, index) => (
                        <div key={index} className={'item-pro'}>
                            <div className={'pro-id'}>{item.proId}</div>
                            <div className={'pro-name'}>{item.proName === null ? 'empty' : item.proName}</div>
                            <div className={'pro-desc'} style={{height: '100px'}}>{item.proDescription}</div>
                            <div className={'pro-quantity'}>{item.location}</div>
                            <div className={'pro-size'}>{item.contactInfo}</div>
                            <div className={'pro-price'}>{item.createdDate}</div>
                            <div className={'pro-farm'}>{item.imageUrl}</div>
                            <div className={'pro-type'}>{item.imageUrl}</div>
                            <div className={'tool'}>
                                <input className={'check-box'} type={'checkbox'}
                                       style={{width: '15px', height: '15px'}}
                                       onClick={() => handleChooseOne(chooseOne, setChooseOne, index, Number(item.proId), setId)}
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
export default AdminProducts