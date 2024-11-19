import React, { useEffect, useState } from "react";
import "../../assets/css/Farms.css";
import { toast, ToastContainer } from "react-toastify";
import { handleGetAllProd } from "../../utils/handleFuncs";

const Tours = () => {
    const [farmData, setFarmData] = useState([]); // Dữ liệu lấy từ API
    const [farmFilter, setFarmFilter] = useState(""); // Bộ lọc theo tên trang trại
    const [selectedFarm, setSelectedFarm] = useState(null); // Trạng thái trang trại được chọn

    // Lấy dữ liệu trang trại từ API
    useEffect(() => {
        handleGetAllProd(
            "http://localhost:8080/api/v1/farms/get-all-farm",
            sessionStorage.getItem("token"),
            setFarmData,
            () => {} // Không cần setChooseOne trong trường hợp này
        );
    }, []);

    // Lọc trang trại theo tên
    const filteredFarms = farmData.filter((farm) =>
        farm.name.toLowerCase().includes(farmFilter.toLowerCase())
    );

    return (
        <div className="tours-container">
            <h1 style={{fontSize:"50px", fontWeight:"700"}}>Danh sách Trang trại</h1>

            {/* Bộ lọc */}
            <input
                type="text"
                placeholder="Tìm theo tên trang trại..."
                value={farmFilter}
                onChange={(e) => setFarmFilter(e.target.value)}
                className="farm-filter"
            />

            {/* Hiển thị danh sách trang trại */}
            <div className="farm-list">
                {filteredFarms.length > 0 ? (
                    filteredFarms.map((farm) => (
                        <div key={farm.id} className="farm-item">
                            <img
                                src={farm.image}
                                alt={farm.name}
                                className="farm-image"
                            />
                            <h2>{farm.name}</h2>
                            <p>
                                <strong>Địa điểm:</strong> {farm.location}
                            </p>
                            <button
                                className="view-more-btn"
                                onClick={() => setSelectedFarm(farm)}
                            >
                                Xem thêm
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Không tìm thấy trang trại nào.</p>
                )}
            </div>

            {/* Hiển thị chi tiết trang trại */}
            {selectedFarm && (
                <div className="farm-detail">
                    <div className="farm-detail-content">
                        <h2>Chi tiết Trang trại</h2>
                        <img style={{width: "700px", height: "500px"}}
                             src={selectedFarm.image}
                             alt={selectedFarm.name}
                             className="farm-detail-image"
                        />
                        <p><strong>Tên:</strong> {selectedFarm.name}</p>
                        <p><strong>Địa điểm:</strong> {selectedFarm.location}</p>
                        <p><strong>Thông tin liên hệ:</strong> {selectedFarm.contactInfo}</p>
                        <p><strong>Mô tả:</strong> {selectedFarm.description}</p>
                        <button
                            className="close-btn"
                            onClick={() => setSelectedFarm(null)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

            {/* Toast thông báo */}
            <ToastContainer />
        </div>
    );
};

export default Tours;
