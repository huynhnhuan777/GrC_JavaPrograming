import {useEffect, useState} from "react";
import {ToolManager} from "../../../components/Admin/ToolManager";
import {handleChooseOne, handleGetAllProd, useChooseAll} from "../../../utils/handleFuncs";
import '../../../assets/css/Admin/Page/Manage/AdminFarm.css'
import AddNewFarm from "../../../components/Admin/Modals/New/AddNewFarm";
import {ToastContainer} from "react-toastify";


const AdminFarms = () => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);
    const [id, setId] = useState(-1);

    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setData, setChooseOne);
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className={'ad-farm-container'}>
            <div className={'ad-farm-content'}>
                <ToolManager setStatus={setStatus} itemLength={data.length}
                             useHook={{chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll}}
                             idItem={id}
                             nameItem={'farm'}
                             baseUrl={'farms'}
                />
                {status && <AddNewFarm setStatus={setStatus}/>}
                <div className={'list-farm'}>
                    <div className={'item-farm'} style={{minHeight:'30px'}}>
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
                            <div className={'farm-id'}>{item.id}</div>
                            <div className={'farm-name'}>{item.name === null ? 'empty' : item.name}</div>
                            <div className={'farm-desc'} style={{minHeight: '10px'}}>{item.description}</div>
                            <div className={'farm-location'}>{item.location}</div>
                            <div className={'farm-contact'}>{item.contactInfo}</div>
                            <div className={'farm-date'}>{item.createdDate}</div>
                            <div className={'farm-url'}>
                                <a href={item.image} target="_blank"
                                   rel="noopener noreferrer">Xem</a>
                            </div>
                            <div className={'farm-tool'}>
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
export default AdminFarms