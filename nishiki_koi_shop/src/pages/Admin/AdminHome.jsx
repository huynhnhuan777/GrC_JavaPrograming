import {LineChart, Line, CartesianAxis, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from "recharts";
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from "recharts";
import '../../assets/css/Admin/Home/adminHome.css'
import {
    revenueWeeklyAnalyst,
    revenueMonthlyAnalyst,
    revenueYearlyAnalyst,
    orderStatus,
    visitorAnalyst,
    outstandingTour,
    outstandingFish,
    outstandingFarm
} from "../../store/sampleTest";

const AdminHome = () => {

    const renderLineChart = (data, dataKey, key) => {
        return (
            <LineChart width={500} height={200} data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                <Line type={'monotone'} dataKey={dataKey} stroke={'#8884d8'}/>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey={key}/>
                <YAxis/>
                <Tooltip/>
            </LineChart>
        )
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const renderPieChart = (data, dataKey, key) => {
        return (
            <PieChart width={500} height={200}>
                <Pie dataKey={dataKey}
                     startAngle={180}
                     endAngle={0}
                     data={data}
                     nameKey={key}
                     cx={'50%'}
                     cy={'100%'}
                     outerRadius={150}
                     fill={'green'}
                     label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
            </PieChart>
        )
    }

    return (
        <div className={'home-admin-container'}>
            <div className={'home-admin-content'}>
                <div className={'process-revenue'}>
                    <h4>Thống kê tổng doanh thu</h4>
                    <div className={'revenue-content'}>
                        {renderLineChart(revenueWeeklyAnalyst, 'revenue', 'day')}
                        <h5>Doanh thu theo tuần</h5>
                    </div>
                    <div className={'revenue-content'}>
                        {renderLineChart(revenueMonthlyAnalyst, 'revenue', 'day')}
                        <h5>Doanh thu theo tháng</h5>
                    </div>
                    <div className={'revenue-content'}>
                        {renderLineChart(revenueYearlyAnalyst, 'revenue', 'month')}
                        <h5>Doanh thu theo năm</h5>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <div className={'process-order'} style={{margin: '20px 0'}}>
                        <h4>Tỉ lệ xử lí hóa đơn</h4>
                        {renderPieChart(orderStatus, 'value', 'type')}
                        <p style={{
                            marginLeft: '100px',
                            display: "flex",
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <div style={{width: "20px", height: "20px", backgroundColor: "#0088FE"}}></div>
                            : Đang chờ
                        </p>
                        <p style={{
                            marginLeft: '100px',
                            display: "flex",
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <div style={{width: "20px", height: "20px", backgroundColor: "#00C49F"}}></div>
                            : Đã nhận
                        </p>
                        <p style={{
                            marginLeft: '100px',
                            display: "flex",
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <div style={{width: "20px", height: "20px", backgroundColor: "#FFBB28"}}></div>
                            : Đang vận chuyển
                        </p>
                        <p style={{
                            marginLeft: '100px',
                            display: "flex",
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <div style={{width: "20px", height: "20px", backgroundColor: "#FF8042"}}></div>
                            : Hủy
                        </p>
                    </div>
                    <div className={'process-tour-order'} style={{marginBottom: '20px'}}>
                        <h4>Số lượng khách tham quan trang trại trong 1 năm</h4>
                        {renderLineChart(visitorAnalyst, 'visitors', 'month')}
                    </div>
                </div>
                <div className={'process-products-view'}>
                    <h4>Tổng hợp sản phẩm/ nông trại/ chuyến đi nổi bật trong năm</h4>
                    <div className={'outstanding-prod'}>
                        {renderLineChart(outstandingFish, 'quantitySold', 'name')}
                        <h4>Top 5 cá nổi bật</h4>
                    </div>
                    <div className={'outstanding-farm'}>

                        {renderLineChart(outstandingFarm, 'quantitySold', 'name')}
                        <h4>Top 5 farms nổi bật</h4>
                    </div>
                    <div className={'outstanding-tour'}>
                        {renderLineChart(outstandingTour, 'quantitySold', 'name')}
                        <h4>Top 5 tours nổi bật</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminHome