import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {handleGetObjById} from "../../../utils/handleFuncs";
import '../../../assets/css/Admin/Page/AdminDetail.css'
import UpdateFarm from "../../../components/Admin/Modals/Update/UpdateFarm";
import DetailProduct from "../../../components/Admin/Details/DetailProduct";
import DetailFarm from "../../../components/Admin/Details/DetailFarm";

const AdminShowDetail = () => {
    const {obj, id} = useParams();
    const [farmData, setFarmData] = useState([]);
    const [fishData, setFishData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        if (obj === 'farms')
            handleGetObjById(`http://localhost:8080/api/v1/manager/farm/${id}`, sessionStorage.getItem('token'), setFarmData);
        if (obj === 'products') {
            handleGetObjById(`http://localhost:8080/api/v1/manager/farm/get-all-farm`, sessionStorage.getItem('token'), setFarmData);
            handleGetObjById(`http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types`, sessionStorage.getItem('token'), setTypeData);
            handleGetObjById(`http://localhost:8080/api/v1/manager/fish/${id}`, sessionStorage.getItem('token'), setFishData);
        }
    }, [])

    return (
        <div className={'ad-show-detail-container'}>
            <div className={'ad-show-detail-content'}>
                <div className={'show-detail-obj'}>
                    {obj === 'products' ?
                        <DetailProduct fishData={fishData}
                                       farmsData={farmData}
                                       typeData={typeData}
                        />
                        :
                        (obj === 'farms' ?
                            <DetailFarm farmData={farmData}/>
                            :
                            '')
                    }
                </div>
            </div>
        </div>
    )
}
export default AdminShowDetail;