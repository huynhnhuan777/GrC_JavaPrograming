import {Link} from "react-router-dom";
import AddNewProd from "./Modals/AddNewProd";
import {useState} from "react";

const AdminProducts = () => {
    const [status, setStatus] = useState(false);
    const handleAddNewProd = () => {
        setStatus(true);
    }

    return (
        <div>
            <button onClick={handleAddNewProd}>Thêm</button>
            {status && <AddNewProd setStatus={setStatus}/>}
        </div>
    )
}
export default AdminProducts