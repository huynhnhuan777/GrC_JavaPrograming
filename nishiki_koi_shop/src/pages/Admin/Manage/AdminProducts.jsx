import AddNewProd from "../../../components/Admin/Modals/AddNewProd";
import {useEffect, useState} from "react";
import {ToolManager} from "../../../components/ToolManager";
import '../../../assets/css/Admin/Page/Manage/AdminProducts.css'
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import {ToastContainer} from "react-toastify";

const AdminProducts = () => {
    const [fishData, setFishData] = useState([]);
    const [farmData, setFarmData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    const [status, setStatus] = useState(false);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(fishData.length);
    const [id, setId] = useState(-1);

    const handleGetFarmName = (id) => {
        if (id) {
            const farm = farmData.find(f => f.farmId === id);
            return farm ? farm.name : 'unknown';
        } else return null;
    }

    const handleGetTypeName = (id) => {
        if (id) {
            const type = typeData.find(t => t.fishTypeId === id);
            return type ? type.name : 'unknown';
        } else return null;
    }

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish/get-all-fishes', sessionStorage.getItem('token'), setFishData, setChooseOne);
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, null);
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types', sessionStorage.getItem('token'), setTypeData, null);
    }, []);

    return (
        <div className={'ad-prod-container'}>
            <div className={'ad-prod-content'}>
                <ToolManager setStatus={setStatus} itemLength={fishData.length}
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
                        <div className={'prod-tool'} style={{fontWeight: 'bold'}}></div>
                    </div>
                    {fishData && fishData.map((item, index) => (
                        <div key={index} className={'item-prod'}>
                            <div className={'prod-id'}>{item.fishId}</div>
                            <div className={'prod-name'}>{item.name === null ? 'empty' : item.name}</div>
                            <div className={'prod-desc'}
                                 style={{minHeight:'10px'}}>{item.description === null ? 'empty' : item.description}</div>
                            <div className={'prod-quantity'}>{item.quantity}</div>
                            <div className={'prod-size'}>{item.size}</div>
                            <div className={'prod-price'}>{item.price}</div>
                            <div className={'prod-farm'}>{handleGetFarmName(item.farmId)}</div>
                            <div className={'prod-type'}>{handleGetTypeName(item.fishTypeId)}</div>
                            <div className={'prod-tool'}>
                                <input className={'check-box'} type={'checkbox'}
                                       style={{width: '20px', height: '20px', borderRadius:'100%'}}
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