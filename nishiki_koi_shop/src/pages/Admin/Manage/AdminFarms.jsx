import {useEffect, useState} from "react";
import {ToolManager} from "../../../components/ToolManager";
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import '../../../assets/css/Admin/Page/Manage/AdminFarm.css'
import AddNewFarm from "../../../components/Admin/Modals/AddNewFarm";
import {ToastContainer} from "react-toastify";


const AdminFarms = () => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState(-1);

    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setData, setChooseOne);
    }, []);

    console.log(data)

    return (
        <div className={'ad-farm-container'}>
            <div className={'ad-farm-content'}>
                <ToolManager setStatus={setStatus} itemLength={data.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                />
                {status && <AddNewFarm setStatus={setStatus}/>}
                <div className={'list-farm'}>
                    <div className={'item-farm'}>
                        <div className={'farm-id'} style={{fontWeight: 'bold'}}>ID</div>
                        <div className={'farm-name'} style={{fontWeight: 'bold'}}>Tên trang trại</div>
                        <div className={'farm-desc'} style={{fontWeight: 'bold'}}>Mô tả</div>
                        <div className={'farm-location'} style={{fontWeight: 'bold'}}>Vị trí</div>
                        <div className={'farm-contact'} style={{fontWeight: 'bold'}}>Liên hệ</div>
                        <div className={'farm-date'} style={{fontWeight: 'bold'}}>Ngày tạo</div>
                        <div className={'farm-url'} style={{fontWeight: 'bold'}}>URL ảnh</div>
                        <div className={'farm-tool'} style={{fontWeight: 'bold'}}></div>
                    </div>
                    {data && data.map((item, index) => (
                        <div key={index} className={'item-farm'}>
                            <div className={'farm-id'}>{item.farmId}</div>
                            <div className={'farm-name'}>{item.farmName === null ? 'empty' : item.farmName}</div>
                            <div className={'farm-desc'} style={{height: '100px'}}>{item.farmDescription}</div>
                            <div className={'farm-location'}>{item.location}</div>
                            <div className={'farm-contact'}>{item.contactInfo}</div>
                            <div className={'farm-date'}>{item.createdDate}</div>
                            <div className={'farm-url'}>{item.imageUrl}</div>
                            <div className={'farm-tool'}>
                                <input className={'check-box'} type={'checkbox'}
                                       style={{width: '15px', height: '15px'}}
                                       onClick={() => handleChooseOne(chooseOne, setChooseOne, index, Number(item.farmId), setId)}
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
export default AdminFarms