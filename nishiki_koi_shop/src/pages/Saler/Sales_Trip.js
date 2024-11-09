import React, { useState } from 'react';
import '../../assets/css/Tour/sale_trip.css';

const SaleTrip = () => {
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState('');

    const addTrip = () => {
        setTrips([...trips, newTrip]);
        setNewTrip('');
    };

    const deleteTrip = (index) => {
        setTrips(trips.filter((_, i) => i !== index));
    };

    const editTrip = (index, updatedTrip) => {
        const updatedTrips = [...trips];
        updatedTrips[index] = updatedTrip;
        setTrips(updatedTrips);
    };

    const sendForApproval = () => {
        // Logic gửi phê duyệt
        alert('Gửi quản lý duyệt chuyến đi!');
    };

    const searchTrip = (query) => {
        // Logic tìm kiếm chuyến đi
        return trips.filter(trip => trip.includes(query));
    };

    return (
        <div className="sale-trip">
            <h2>Quản lý Chuyến đi</h2>

            <div className="trip-actions">
                <input
                    type="text"
                    placeholder="Nhập tên chuyến đi"
                    value={newTrip}
                    onChange={(e) => setNewTrip(e.target.value)}
                />
                <button onClick={addTrip}>Thêm chuyến đi</button>
                <button onClick={sendForApproval}>Gửi quản lý duyệt</button>
            </div>

            <div className="trip-list">
                {trips.map((trip, index) => (
                    <div key={index} className="trip-item">
                        <span>{trip}</span>
                        <button onClick={() => deleteTrip(index)}>Xóa</button>
                        <button onClick={() => editTrip(index, prompt('Chỉnh sửa chuyến đi:', trip))}>Sửa</button>
                    </div>
                ))}
            </div>

            <div className="trip-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm chuyến đi"
                    onChange={(e) => searchTrip(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SaleTrip;
