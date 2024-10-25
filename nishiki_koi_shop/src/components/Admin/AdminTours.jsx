import {useState} from "react";
import AddNewTour from "./Modals/AddNewTour";

const AdminProducts = () => {
    const [status, setStatus] = useState(false);
    const handleAddNewProd = () => {
        setStatus(true);
    }

    return (
        <div>
            <button onClick={handleAddNewProd}>Thêm</button>
            {status && <AddNewTour setStatus={setStatus}/>}
        </div>
    )
}
export default AdminProducts