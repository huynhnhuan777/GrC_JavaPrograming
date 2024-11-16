import Tooltip from "@mui/material/Tooltip";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import '../../assets/css/Admin/Component/ToolManager.css'
import {handleDeleteObj, handleGetAllProd} from "../../utils/handleFuncs";

export const ToolManager = ({setStatus, useHook, idItem, nameItem, baseUrl}) => {
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useHook;
    const navigate = useNavigate();
    const handleAddNewProd = () => {
        setStatus(true);
    }
    const handleEditProd = (id, baseUrl) => {
        if (id === -1) toast.warning('Chưa chọn gì mà đòi sửa à? Phá quá ha!');
        else navigate(`/${baseUrl}/detail/${id}`);
    }

    return (
        <div className={'tool-manager'}>
            <Tooltip title={'Chọn hết'}>
                <div className={'feature-btn mg-y-m'}>
                    <input style={{width: '20px', height: '20px'}} type={'checkbox'} onClick={handleChooseAll}/>
                </div>
            </Tooltip>
            <Tooltip title={'Lọc theo tên'}>
                <div className={'feature-btn mg-y-m'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-funnel" viewBox="0 0 16 16">
                        <path
                            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                    </svg>
                </div>
            </Tooltip>
            <Tooltip title={'sắp xếp A-Z'}>
                <div className={'feature-btn mg-y-m'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/>
                        <path
                            d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                    </svg>
                </div>
            </Tooltip>
            <Tooltip title={'sắp xếp Z-A'}>
                <div className={'feature-btn mg-y-m'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                        <path
                            d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z"/>
                        <path fillRule="evenodd"
                              d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z"/>
                        <path
                            d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                    </svg>
                </div>
            </Tooltip>
            <Tooltip title={'xóa'}>
                <div className={'feature-btn mg-y-m'}
                     onClick={() => handleDeleteObj(nameItem, idItem, sessionStorage.getItem('token'))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </div>
            </Tooltip>
            <Tooltip title={'Thêm mới'}>
                <div className={'feature-btn mg-y-m'} onClick={handleAddNewProd}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-plus-square" viewBox="0 0 16 16">
                        <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </Tooltip>
            <Tooltip title={'Chỉnh sửa'}>
                <div className={'feature-btn mg-y-m'} onClick={() => handleEditProd(idItem, baseUrl)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </div>
            </Tooltip>
        </div>
    )
}