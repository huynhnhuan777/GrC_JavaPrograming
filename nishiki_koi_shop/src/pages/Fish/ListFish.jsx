import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from "react-paginate";
import '../../assets/css/Fish/listFish.css'
import {toast, ToastContainer} from "react-toastify";
import {handleGetAllProd} from "../../utils/handleFuncs";
import 'react-toastify/dist/ReactToastify.css';

const handleSaveFishInfo = (info) => {
    sessionStorage.setItem('infoFish', JSON.stringify(info));
}

function ListFish({currItems}) {
    return (
        <>
            {currItems !== null && currItems.map((item, index) => (
                <div key={index} className={'fish-card'}>
                    <div className={'thumbnail-fish'}>
                        <img src={item.image} alt={'thumbnail-fish'}/>
                    </div>
                    <div className={'summary-fish'}>
                        <p style={{color: 'var(--text-color)', fontWeight: 'bold'}}>{item.name}</p>
                        <p>{item.price.toLocaleString('vi-VN')} đ</p>
                        <Link to={'/fish/' + item.id} style={{color: 'green', fontWeight: 'bold'}}
                              onClick={() => handleSaveFishInfo(item)}>Xem thêm </Link>
                    </div>
                </div>
            ))}
        </>
    );
}

function PaginatedItems({itemsPerPage, fishData}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = fishData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(fishData.length / itemsPerPage);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % fishData.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };
    return (
        <>
            <div className={'list-fish-content'}>
                <ListFish currItems={currentItems}/>
            </div>
            <div className={'controller-paginate'}>
                <ReactPaginate
                    breakLabel="..."
                    className={'pageControl'}
                    pageClassName="pageNumber"
                    previousClassName={'prevPage'}
                    nextClassName={'nextPage'}
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}

const Fish = () => {
    const [farmId, setFarmId] = useState(-1);
    const [currIndex, setCurrIndex] = useState(-1);
    const [lastIndex, setLastIndex] = useState(-1);
    const [priceTour, setPriceTour] = useState([]);
    const [fishFilter, setFishFilter] = useState([]);

    const [farmData, setFarmData] = useState([]);
    const [fishData, setFishData] = useState([]);

    const handleChooseFarm = (e) => {
        setFarmId(Number(e.target.value));
    }

    const handleChoosePrice = (e) => {
        setPriceTour(JSON.parse(e.target.value));
    }

    const handleFilterResult = () => {
        setFishFilter([]);
        let check = false;
        const temp = [];

        for (let i = 0; i < fishData.length; i++) {
            if (priceTour[0] >= 0) {
                check = true;
                if (farmId !== -1) {
                    if (fishData[i].farmId === farmId && priceTour[0] <= fishData[i].price && fishData[i].price <= priceTour[1]) {
                        temp.push(fishData[i]);
                    }
                } else {
                    if (priceTour[0] <= fishData[i].price && fishData[i].price <= priceTour[1]) {
                        temp.push(fishData[i]);
                    }
                }
            } else if (farmId !== -1) {
                check = true;
                if (fishData[i].farmId === farmId) {
                    temp.push(fishData[i]);
                }
            } else if (priceTour[0] >= 0) {
                if (priceTour[0] <= fishData[i].price && fishData[i].price <= priceTour[1]) {
                    temp.push(fishData[i]);
                }
            }
        }

        if (temp.length === 0 && check) {
            setFishFilter(fishData);
            setCurrIndex(-1);
            setLastIndex(-1);
            toast.warning('Tìm kiếm thất bại, không tồn tại thứ bạn muốn xem!')
        } else if (temp.length === 0) {
            setFishFilter(fishData);
            toast.success('Lọc thành công!')
        } else if (temp.length !== 0) {
            setFishFilter(temp);
            toast.success('Lọc thành công!')
        }
    }

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/farms/get-all-farm', null, setFarmData, null);
        handleGetAllProd('http://localhost:8080/api/v1/fish', null, setFishData, null);
    }, []);

    useEffect(() => {
        //console.log(farmId);
    }, [farmId])

    useEffect(() => {
        setFishFilter(fishData);
    }, [fishData]);

    return (
        < div className="list-fish-container">
            <div className={'filter-zone'}>
                <div className={'filter-form'}>
                    <fieldset className={'fieldset'}>
                        <legend>Giá</legend>
                        <select className={'selectInput'} onChange={(e) => handleChoosePrice(e)}>
                            <option value={JSON.stringify([-1, 0])}>Không giới hạn</option>
                            <option value={JSON.stringify([0, 1000000])}> nhỏ hơn 1.000.000</option>
                            <option value={JSON.stringify([1000000, 2000000])}>từ 1.000.000 đến 2.000.000</option>
                            <option value={JSON.stringify([2000000, 3000000])}>từ 2.000.000 đến 3.000.000</option>
                            <option value={JSON.stringify([3000000, 4000000])}>đến 3.000.000 từ 4.000.000</option>
                            <option value={JSON.stringify([4000000, 100000000])}>lớn hơn 4.000.000</option>
                        </select>
                    </fieldset>
                    <fieldset className={'fieldset'}>
                        <legend>Trang trại</legend>
                        <select className={'selectInput'} onChange={handleChooseFarm}>
                            <option value={-1}>Tất cả</option>
                            {(farmData.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            )))}
                        </select>
                    </fieldset>
                    <button className={'featureBtn'} onClick={handleFilterResult}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </div>
            <PaginatedItems itemsPerPage={8} fishData={fishFilter}/>
            <ToastContainer/>
        </div>
    )
}
export default Fish;