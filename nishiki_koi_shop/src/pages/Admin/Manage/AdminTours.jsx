import {useEffect, useState} from "react";
import AddNewTour from "../../../components/Admin/Modals/AddNewTour";
import '../../../assets/css/Admin/Page/Manage/AdminTours.css'
import {handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import {ToolManager} from "../../../components/ToolManager";
import {ToastContainer} from "react-toastify";

const AdminTours = () => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState(-1);

    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/tour/get-all-tour', sessionStorage.getItem('token'), setData, setChooseOne);
    },[])

    useEffect(() => {
        console.log(data);
    },[data])

    return (
        <div className={'ad-tour-container'}>
            <div className={'ad-tour-content'}>
                <ToolManager setStatus={setStatus} itemLength={data.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
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

                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default AdminTours