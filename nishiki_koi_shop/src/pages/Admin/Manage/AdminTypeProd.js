import {useEffect, useState} from "react";
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import {ToolManager} from "../../../components/Admin/ToolManager";
import '../../../assets/css/Admin/Page/Manage/AdminTypeProd.css'
import {ToastContainer} from "react-toastify";
import AddNewType from "../../../components/Admin/Modals/New/AddNewType";

const AdminTypeProd = () => {
    const [typeData, setTypeData] = useState([])
    const [status, setStatus] = useState(false)
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll();
    const [id, setId] = useState(-1);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types', sessionStorage.getItem("token"), setTypeData, setChooseOne);
    }, [])

    return (
        <div className={'ad-prod-container'}>
            <div className={'ad-prod-content'}>
                <ToolManager setStatus={setStatus} itemLength={typeData.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                             nameItem={'type'}
                             baseUrl={'types'}
                />
                {status && <AddNewType setStatus={setStatus}/>}
                <div className={'list-prod'}>
                    <div className={'item-prod'} style={{minHeight: '30px'}}>
                        <div className={'type-id'} style={{fontWeight: 'bold'}}>ID</div>
                        <div className={'type-name'} style={{fontWeight: 'bold'}}>Tên</div>
                        <div className={'type-desc'} style={{fontWeight: 'bold'}}>Mô tả</div>
                    </div>
                    {typeData && typeData.map((item, index) => (
                        <div key={index} className={'item-prod'}>
                            <div className={'type-id'}>{item.id}</div>
                            <div className={'type-name'}>{item.name === null ? 'empty' : item.name}</div>
                            <div className={'type-desc'}
                                 style={{minHeight: '10px'}}>{item.description === null ? 'empty' : item.description}</div>
                            <div className={'type-tool'}>
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
export default AdminTypeProd