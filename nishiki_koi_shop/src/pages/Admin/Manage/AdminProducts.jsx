import AddNewProd from "../../../components/Admin/Modals/New/AddNewProd";
import {useEffect, useState} from "react";
import {ToolManager} from "../../../components/Admin/ToolManager";
import '../../../assets/css/Admin/Page/Manage/AdminProducts.css'
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import {toast, ToastContainer} from "react-toastify";
import Loading from "../../../components/Modal/Loading";

const AdminProducts = () => {
    const [fishData, setFishData] = useState([]);
    const [farmData, setFarmData] = useState(null);
    const [typeData, setTypeData] = useState(null);

    const [isFetching, setIsFetching] = useState(false);

    const [status, setStatus] = useState(false);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(fishData.length);
    const [id, setId] = useState(-1);

    const [isLoading, setIsLoading] = useState({fish: false, farm: false, type: false});

    const handleGetFarmName = (id) => {
        if (id) {
            const farm = farmData.find(f => f.id === id);
            return farm ? farm.name : 'unknown';
        } else return null;
    }

    const handleGetTypeName = (id) => {
        if (id) {
            const type = typeData.find(t => t.id === id);
            return type ? type.name : 'unknown';
        } else return null;
    }

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish/get-all-fishes', sessionStorage.getItem('token'), setFishData, setChooseOne).then(() => setIsLoading(prevState => ({
            ...prevState,
            fish: true
        }) || ({...prevState, fish: false})));
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, null).then(() => setIsLoading(prevState => ({
            ...prevState,
            farm: true
        }) || ({...prevState, fish: false})));
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types', sessionStorage.getItem('token'), setTypeData, null).then(() => setIsLoading(prevState => ({
            ...prevState,
            type: true
        }) || ({...prevState, fish: false})));
        setIsFetching(true);
    }, []);

    useEffect(() => {
        if (Array.isArray(farmData) && farmData.length === 0 && isFetching === true) {
            toast.error('Dữ liệu cần thiết về trang trại không tồn tại!')
        }
    }, [isFetching]);

    useEffect(() => {
        if (Array.isArray(typeData) && typeData.length === 0 && isFetching) {
            toast.error('Dữ liệu cần thiết về phân loại không tồn tại!')
        }
    }, [isFetching])

    // useEffect(() => {
    //     console.log(farmData);
    //     console.log(isFetching);
    // }, [farmData]);

    return (
        isLoading.fish === false || isLoading.farm === false || isLoading.type === false ? <Loading/> :
            <div className={'ad-prod-container'}>
                <div className={'ad-prod-content'}>
                    <ToolManager setStatus={setStatus} itemLength={fishData.length}
                                 useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                                 idItem={id}
                                 nameItem={'fish'}
                                 baseUrl={'products'}
                                 urlAPI={`http://localhost:8080/api/v1/manager/fish/delete/${id}`}
                    />
                    {status && <AddNewProd setStatus={setStatus}/>}
                    <div className={'list-prod'}>
                        <div className={'item-prod'} style={{minHeight: '30px'}}>
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
                                <div className={'prod-id'}>{item.id}</div>
                                <div className={'prod-name'}>{item.name === null ? 'empty' : item.name}</div>
                                <div className={'prod-desc'}
                                     style={{minHeight: '10px'}}>{item.description === null ? 'empty' : item.description}</div>
                                <div className={'prod-quantity'}>{item.quantity}</div>
                                <div className={'prod-size'}>{item.size}</div>
                                <div className={'prod-price'}>{item.price}</div>
                                <div className={'prod-farm'}>{handleGetFarmName(item.farmId)}</div>
                                <div className={'prod-type'}>{handleGetTypeName(item.fishTypeId)}</div>
                                <div className={'prod-tool'}>
                                    <input className={'check-box'} type={'checkbox'}
                                           style={{width: '20px', height: '20px', borderRadius: '100%'}}
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
export default AdminProducts