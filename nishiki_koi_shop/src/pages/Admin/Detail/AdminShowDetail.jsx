import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {handleGetObjById} from "../../../utils/handleFuncs";
import '../../../assets/css/Admin/Page/AdminDetail.css'
import UpdateFarm from "../../../components/Admin/Modals/Update/UpdateFarm";
import DetailProduct from "../../../components/Admin/Details/DetailProduct";

const AdminShowDetail = () => {
    const {obj, id} = useParams();
    const [data, setData] = useState([]);
    const [isHandle, setIsHandle] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (obj === 'farms')
            handleGetObjById(`http://localhost:8080/api/v1/manager/farm/${id}`, sessionStorage.getItem('token'), setData);
        if (obj==='products')
            handleGetObjById(`http://localhost:8080/api/v1/manager/fish/${id}`, sessionStorage.getItem('token'), setData);
    }, [])

    return (
        <div className={'ad-show-detail-container'}>
            <div className={'ad-show-detail-content'}>
                {status && <UpdateFarm formData={data} setStatus={setStatus}/>}
                <div className={'show-detail-obj'}>
                    <DetailProduct data={data}/>

                </div>
            </div>
        </div>
    )
}
export default AdminShowDetail;