
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Các mảng temp để chứa dữ liệu từ API
/*export const tempTour = [];
export const tempFarm = [];

// Hàm lấy dữ liệu từ server hiện có của bạn
const fetchData = async () => {
    try {
        // Lấy dữ liệu từ API tours
        const tourResponse = await axios.get('http://localhost:8080/api/v1/tours/get-all-tours');
        tempTour.push(...tourResponse.data);

        // Lấy dữ liệu từ API farms
        const farmResponse = await axios.get('http://localhost:8080/api/v1/farms/get-all-farm');
        tempFarm.push(...farmResponse.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const App = () => {
    const [linkedData, setLinkedData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await fetchData();

            // Kết hợp dữ liệu từ tour và farm dựa trên farm_id
            const combinedData = tempTour.map(tour => {
                const farm = tempFarm.find(f => f.farm_id === tour.farm_id);
                return { ...tour, farmDetails: farm };
            });

            setLinkedData(combinedData);
        };

        loadData();
    }, []);

    return (
        <div>
            <h1>Tour and Farm Data</h1>
            <pre>{JSON.stringify(linkedData, null, 2)}</pre>
        </div>
    );
};
export default App;*/
export const tempTour = [
    {
        id: 'KOI-E-3306-11-01',
        name: 'Natalya Farm',
        address: 'tổ 2 phường Hắc Ám quận Hắc Hóa TP.Hỗn Mang',
        summary: 'The farm of Natalya',
        dateStart: '2024-10-12',
        dateEnd: '2024-10-15',
        description: 'Owner is Natalya',
        price: 15000000,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJPckVC7idMmRmmhA2MYQmXWleLw_yZx8_w&s'
    },
    {
        id: 'KOI-E-3306-22-11',
        name: 'VanHein Farm',
        address: 'tổ 5 đường Thánh Chiến Huyện Thánh Đường quận Đồng Bằng TP.Quang Vinh',
        summary: 'The farm of Natalya',
        dateStart: '2024-10-12',
        dateEnd: '2024-10-15',
        description: 'Owner is Vanhein',
        price: 45000000,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSfdIPNwHF-zNrjBfdr2g-cJmvpK9DWCoAw&s'
    },
    {
        id: 'KOI-E-3306-32-01',
        name: 'Natalya Farm',
        address: 'tổ 2 phường Hắc Ám quận Hắc Hóa TP.Hỗn Mang',
        summary: 'The farm of VanHein',
        dateStart: '2024-10-12',
        dateEnd: '2024-10-15',
        description: 'Owner is Natalya',
        price: 12500000,
        imageUrl: 'https://sieuthicakoi.vn/uploads/images/6323e7e55b3f4d51fbebf924/cach-nuoi-ca-koi-ngoai-troi.webp'
    },
    {
        id: 'KOI-E-3306-00-01',
        name: 'Hao Farm',
        address: '403/98/52',
        summary: 'The farm of Hao',
        dateStart: '2024-10-12',
        dateEnd: '2024-10-15',
        description: 'Owner is Natalya',
        price: 25000000,
        imageUrl: 'https://res.cloudinary.com/dxda6158s/image/upload/Farm_3_xmqjca.jpg'
    },
    {
        id: 'KOI-E-3306-00-01',
        name: 'Yorn Farm',
        address: '403/98/52',
        summary: 'The farm of Yorn',
        dateStart: '2024-10-12',
        dateEnd: '2024-10-15',
        description: 'Owner is Natalya',
        price: 159900000,
        imageUrl: 'https://res.cloudinary.com/dxda6158s/image/upload/Farm_9_kqlhmq.jpg'
    },
]

export const tempFarm = [
    {
        id: 'KOI-E-3306-11-01',
        name: 'Natalya Farm',
        description: 'This farm is come from the Chaotic',
        price: 14000000,
        maxJoiner: 60,
    },
    {
        id: 'KOI-E-3306-22-11', name: 'VanHein Farm',
        description: 'This farm is come from the Light Tower',
        price: 15000000,
        maxJoiner: 60,
    },
    {
        id: 'KOI-E-3306-32-11', name: 'Yorn Farm',
        description: 'This farm is come from the Light Tower',
        price: 22000000,
        maxJoiner: 60,
    },
]

export const koiProducts = [
    {
        id: 'KF-2203-3303-1',
        name: 'Koi Fish 1',
        description: 'Beautiful Koi 1',
        price: '$200',
        imageUrl: 'https://media.la34.com.vn/upload/image/201810/medium/46263_koi2.jpg'
    },
    {
        id: 'KF-2203-3303-2',
        name: 'Koi Fish 2',
        description: 'Beautiful Koi 2',
        price: '$250',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/53-copy.jpg?v=1480156373075'
    },
    {
        id: 'KF-2203-3303-3',
        name: 'Koi Fish 3',
        description: 'Beautiful Koi 3',
        price: '$300',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/75-copy.jpg?v=1480156644996'
    },
    {
        id: 'KF-2203-3303-4',
        name: 'Koi Fish 4',
        description: 'Beautiful Koi 4',
        price: '$350',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/72-copy.jpg?v=1480156608949'
    },
    {
        id: 'KF-2203-3303-5',
        name: 'Koi Fish 5',
        description: 'Beautiful Koi 5',
        price: '$400',
        imageUrl: 'https://media.la34.com.vn/upload/image/201810/medium/46263_koi2.jpg'
    },
    {
        id: 'KF-2203-3303-6',
        name: 'Koi Fish 6',
        description: 'Beautiful Koi 6',
        price: '$450',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/53-copy.jpg?v=1480156373075'
    },
    {
        id: 'KF-2203-3303-7',
        name: 'Koi Fish 7',
        description: 'Beautiful Koi 7',
        price: '$500',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/75-copy.jpg?v=1480156644996'
    },
    {
        id: 'KF-2203-3303-8',
        name: 'Koi Fish 8',
        description: 'Beautiful Koi 8',
        price: '$550',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/72-copy.jpg?v=1480156608949'
    },
    {
        id: 'KF-2203-3303-9',
        name: 'Koi Fish 9',
        description: 'Beautiful Koi 9',
        price: '$600',
        imageUrl: 'https://media.la34.com.vn/upload/image/201810/medium/46263_koi2.jpg'
    },
    {
        id: 'KF-2203-3303-10',
        name: 'Koi Fish 10',
        description: 'Beautiful Koi 10',
        price: '$650',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/53-copy.jpg?v=1480156373075'
    },
    {
        id: 'KF-2203-3303-11',
        name: 'Koi Fish 11',
        description: 'Beautiful Koi 11',
        price: '$700',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/75-copy.jpg?v=1480156644996'
    },
    {
        id: 'KF-2203-3303-12',
        name: 'Koi Fish 12',
        description: 'Beautiful Koi 12',
        price: '$750',
        imageUrl: 'https://bizweb.dktcdn.net/100/004/358/files/72-copy.jpg?v=1480156608949'
    },
];

export const tripItems = [
    {
        farmName: 'Nông trại A',
        imageUrl: 'https://i.ytimg.com/vi/pUADEpL3DNM/maxresdefault.jpg',
    },
    {
        farmName: 'Nông trại B',
        imageUrl: 'https://www.kodamakoifarm.com/wp-content/uploads/2021/12/Taro.jpg',
    },
    {
        farmName: 'Nông trại C',
        imageUrl: 'https://www.kodamakoifarm.com/wp-content/uploads/2019/07/taro-koi-japan-v1.jpg',
    },
    {
        farmName: 'Nông trại D',
        imageUrl: 'https://www.koikoimatsuda.jp/en/set_pics/home02.JPG',
    },
];

export const tempUsers = [
    {id: 'user-1101-1121', name: 'CaoNhatHao', role: 'customer'},
    {id: 'admin-1101-2211', name: 'Haoca.oi', role: 'manager'}
]

export const revenueWeeklyAnalyst = [
    {day: 'Mon', revenue: 1200},
    {day: 'Tues', revenue: 1500},
    {day: 'Wed', revenue: 800},
    {day: 'Thur', revenue: 1700},
    {day: 'Frid', revenue: 2000},
    {day: 'Sat', revenue: 2200},
    {day: 'Sun', revenue: 1300},
];

export const revenueMonthlyAnalyst = [
    {day: '1', revenue: 1000},
    {day: '2', revenue: 1200},
    {day: '3', revenue: 1100},
    {day: '4', revenue: 900},
    {day: '5', revenue: 1500},
    {day: '6', revenue: 1400},
    {day: '7', revenue: 1600},
    {day: '8', revenue: 1700},
    {day: '9', revenue: 1800},
    {day: '10', revenue: 1300},
    {day: '11', revenue: 1200},
    {day: '12', revenue: 1100},
    {day: '13', revenue: 1500},
    {day: '14', revenue: 1400},
    {day: '15', revenue: 1300},
    {day: '16', revenue: 1200},
    {day: '17', revenue: 1600},
    {day: '18', revenue: 1700},
    {day: '19', revenue: 1800},
    {day: '20', revenue: 1400},
    {day: '21', revenue: 1300},
    {day: '22', revenue: 1500},
    {day: '23', revenue: 1600},
    {day: '24', revenue: 1700},
    {day: '25', revenue: 1800},
    {day: '26', revenue: 1900},
    {day: '27', revenue: 2000},
    {day: '28', revenue: 2100},
    {day: '29', revenue: 2200},
    {day: '30', revenue: 2300},
];
export const revenueYearlyAnalyst = [
    {month: 'Jan', revenue: 12000},
    {month: 'Feb', revenue: 11000},
    {month: 'Mar', revenue: 15000},
    {month: 'Apr', revenue: 13000},
    {month: 'May', revenue: 16000},
    {month: 'Jun', revenue: 14000},
    {month: 'Jul', revenue: 17000},
    {month: 'Aug', revenue: 18000},
    {month: 'Sep', revenue: 19000},
    {month: 'Oct', revenue: 20000},
    {month: 'Nov', revenue: 21000},
    {month: 'Dec', revenue: 22000},
];

export const orderStatus = [
    { type: 'Pending', value: 10 },
    { type: 'Shipped', value: 70 },
    { type: 'Delivered', value: 19 },
    { type: 'Cancelled', value: 1 },
];

export const visitorAnalyst = [
    { month: 'Jan', visitors: 1500 },
    { month: 'Feb', visitors: 1200 },
    { month: 'Mar', visitors: 1800 },
    { month: 'Apr', visitors: 2000 },
    { month: 'May', visitors: 2500 },
    { month: 'Jun', visitors: 2300 },
    { month: 'Jul', visitors: 3000 },
    { month: 'Aug', visitors: 2700 },
    { month: 'Sep', visitors: 2200 },
    { month: 'Oct', visitors: 2400 },
    { month: 'Nov', visitors: 1900 },
    { month: 'Dec', visitors: 2600 },
];

export const outstandingFish = [
    { name: 'Salmon', quantitySold: 500 },
    { name: 'Tuna', quantitySold: 450 },
    { name: 'Catfish', quantitySold: 400 },
    { name: 'Trout', quantitySold: 350 },
    { name: 'Mackerel', quantitySold: 300 },
];

export const outstandingFarm = [
    { name: 'Dairy', quantitySold: 600 },
    { name: 'Organic', quantitySold: 550 },
    { name: 'Fruit Orchard', quantitySold: 500 },
    { name: 'Poultry', quantitySold: 450 },
    { name: 'Fish', quantitySold: 400 },
];

export const outstandingTour = [
    { name: 'Sightseeing', quantitySold: 700 },
    { name: 'Mountain', quantitySold: 650 },
    { name: 'Cultural', quantitySold: 600 },
    { name: 'Beach', quantitySold: 550 },
    { name: 'Wildlife', quantitySold: 500 },
];

export const sampleOrders = [
    {
        username: "Alice",
        orderId: "ORD001",
        price: 120.5,
        status: "PENDING"
    },
    {
        username: "Bob",
        orderId: "ORD002",
        price: 89.99,
        status: "APPROVED"
    },
    {
        username: "Charlie",
        orderId: "ORD003",
        price: 45.0,
        status: "REJECTED"
    },
    {
        username: "David",
        orderId: "ORD004",
        price: 220.75,
        status: "PENDING"
    },
    {
        username: "Eva",
        orderId: "ORD005",
        price: 150.0,
        status: "CANCELLED"
    },
    {
        username: "Frank",
        orderId: "ORD006",
        price: 310.99,
        status: "APPROVED"
    },
    {
        username: "Grace",
        orderId: "ORD007",
        price: 78.25,
        status: "PENDING"
    },
    {
        username: "Hannah",
        orderId: "ORD008",
        price: 95.5,
        status: "REJECTED"
    },
    {
        username: "Ian",
        orderId: "ORD009",
        price: 145.9,
        status: "APPROVED"
    },
    {
        username: "Jack",
        orderId: "ORD010",
        price: 500.0,
        status: "CANCELLED"
    }
];






