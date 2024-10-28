import {useState} from "react";
import AddNewTour from "../../../components/Admin/Modals/AddNewTour";

const AdminTours = () => {
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
export default AdminTours