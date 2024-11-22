import {useEffect, useState} from "react";
import AddNewTour from "../../../components/Admin/Modals/New/AddNewTour";
import '../../../assets/css/Admin/Page/Manage/AdminTours.css'
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import {ToolManager} from "../../../components/Admin/ToolManager";
import {toast, ToastContainer} from "react-toastify";

const AdminTours = () => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    const [farmData, setFarmData] = useState(null);
    const [id, setId] = useState(-1);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);
    const [isFetching, setIsFetching] = useState(false);

    const handleGetFarmName = (id) => {
        if (farmData) {
            const farm = farmData.find(f => f.id === id);
            return farm ? farm.name : 'unknown';
        } else return null;
    }

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/tour/get-all-tour', sessionStorage.getItem('token'), setData, setChooseOne);
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, null);
    }, [])

    useEffect(() => {
        if (Array.isArray(farmData) && farmData.length === 0 && isFetching === true) {
            toast.error('Dữ liệu cần thiết về trang trại không tồn tại!')
        }
    }, [isFetching]);

    return (
        <div className={'ad-tour-container'}>
            <div className={'ad-tour-content'}>
                <ToolManager setStatus={setStatus} itemLength={data.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                             nameItem={'tour'}
                             baseUrl={'tours'}
                             urlAPI={`http://localhost:8080/api/v1/manager/tour/delete/${id}`}
                />
                {status && <AddNewTour setStatus={setStatus}/>}
                <div className={'list-tour'}>
                    <div className={'item-tour'}>
                        <div className={'tour-id'} style={{fontWeight: 'bold'}}>ID</div>
                        <div className={'tour-name'} style={{fontWeight: 'bold'}}>Tên chuyến đi</div>
                        <div className={'tour-desc'} style={{fontWeight: 'bold'}}>Mô tả</div>
                        <div className={'tour-start-date'} style={{fontWeight: 'bold'}}>Ngày khởi hành</div>
                        <div className={'tour-end-date'} style={{fontWeight: 'bold'}}>Ngày kết thúc</div>
                        <div className={'tour-capacity'} style={{fontWeight: 'bold'}}>Số chỗ</div>
                        <div className={'tour-price'} style={{fontWeight: 'bold'}}>Giá</div>
                        <div className={'tour-farm'} style={{fontWeight: 'bold'}}>Thuộc trang trại</div>
                        <div className={'tour-tool'} style={{fontWeight: 'bold'}}></div>
                    </div>

                    {data && data.map((item, index) => (
                        <div key={index} className={'item-tour'}>
                            <div className={'tour-id'}>{item.id}</div>
                            <div className={'tour-name'}>{item.name}</div>
                            <div className={'tour-desc'}>{item.description}</div>
                            <div className={'tour-start-date'}>{item.startDate}</div>
                            <div className={'tour-end-date'}>{item.endDate}</div>
                            <div className={'tour-capacity'}>{item.capacity}</div>
                            <div className={'tour-price'}>{item.price}</div>
                            <div className={'tour-farm'}>{handleGetFarmName(item.farmId)}</div>
                            <div className={'tour-tool'}>
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
export default AdminTours