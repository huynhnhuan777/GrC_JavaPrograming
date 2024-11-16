import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {handleGetObjById} from "../../../utils/handleFuncs";
import '../../../assets/css/Admin/Page/AdminDetail.css'
import DetailProduct from "../../../components/Admin/Details/DetailProduct";
import DetailFarm from "../../../components/Admin/Details/DetailFarm";
import DetailType from "../../../components/Admin/Details/DetailType";

const AdminShowDetail = () => {
    const {obj, id} = useParams();
    const [farmData, setFarmData] = useState([]);
    const [fishData, setFishData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        if (obj === 'farms')
            handleGetObjById(`http://localhost:8080/api/v1/manager/farm/${id}`, sessionStorage.getItem('token'), setFarmData);
        else if (obj === 'products') {
            handleGetObjById(`http://localhost:8080/api/v1/manager/farm/get-all-farm`, sessionStorage.getItem('token'), setFarmData);
            handleGetObjById(`http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types`, sessionStorage.getItem('token'), setTypeData);
            handleGetObjById(`http://localhost:8080/api/v1/manager/fish/${id}`, sessionStorage.getItem('token'), setFishData);
        } else if (obj === 'types') {
            handleGetObjById(`http://localhost:8080/api/v1/manager/fish-types/${id}`, sessionStorage.getItem('token'), setTypeData);
        }
    }, [])

    return (
        <div className={'ad-show-detail-container'}>
            <div className={'ad-show-detail-content'}>
                <div className={'show-detail-obj'}>
                    {obj === 'products' ?
                        <DetailProduct fish={fishData}
                                       farms={farmData}
                                       types={typeData}
                        />
                        :
                        (obj === 'farms' ?
                            <DetailFarm farmData={farmData}/>
                            :
                            (obj === 'types' ?
                                    <DetailType type={typeData}/>
                                    : ''
                            ))
                    }
                </div>
            </div>
        </div>
    )
}
export default AdminShowDetail;