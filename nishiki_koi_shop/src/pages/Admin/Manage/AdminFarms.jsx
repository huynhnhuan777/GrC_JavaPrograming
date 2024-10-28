import {useState} from "react";
import AddNewFarm from "../../../components/Admin/Modals/AddNewFarm";

const AdminFarms = () => {
    const [status, setStatus] = useState(false);
    const handleAddNewProd = () => {
        setStatus(true);
    }

    return (
        <div>
            <button onClick={handleAddNewProd}>Thêm</button>
            {status && <AddNewFarm setStatus={setStatus}/>}
        </div>
    )
}
export default AdminFarms