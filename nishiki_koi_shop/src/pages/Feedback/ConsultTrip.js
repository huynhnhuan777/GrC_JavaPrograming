import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Feedback/ConsultTrip.css';

const ConsultTrip = () => {
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState({ name: '', date: '', details: '' });

    // Hàm xử lý tạo chuyến đi mới
    const handleCreateTrip = () => {
        setTrips([...trips, newTrip]);
        setNewTrip({ name: '', date: '', details: '' });
    };

    return (
        <div className="consult-trip-container">
            <h1>Trang Nhân viên Tư vấn - Chuyến đi</h1>

            <div className="trip-actions">
                <h2>Tạo Chuyến đi mới</h2>
                <input
                    type="text"
                    placeholder="Tên chuyến đi"
                    value={newTrip.name}
                    onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Ngày khởi hành"
                    value={newTrip.date}
                    onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
                />
                <textarea
                    placeholder="Mã chuyến đi"
                    value={newTrip.details}
                    onChange={(e) => setNewTrip({ ...newTrip, details: e.target.value })}
                />
                <button onClick={handleCreateTrip}>Tạo Chuyến đi mới</button>
            </div>

            <div className="trip-list">
                <h2>Danh sách Chuyến đi</h2>
                <ul>
                    {trips.map((trip, index) => (
                        <li key={index}>
                            <p>Tên: {trip.name}</p>
                            <p>Ngày khởi hành: {trip.date}</p>
                            <p>Chi tiết: {trip.details}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <Link to="/consult-order" className="switch-page-link">
                Chuyển sang Trang Tư vấn Đơn hàng
            </Link>
        </div>
    );
};

export default ConsultTrip;
