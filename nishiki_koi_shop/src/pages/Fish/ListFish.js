import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from "react-paginate";
import {koiProducts} from "../../store/sampleTest";
import '../../assets/css/Fish/listFish.css'

const handleSaveFishInfo = (info) => {
    sessionStorage.setItem('infoFish', JSON.stringify(info));
}

function ListFish({currItems}) {
    return (
        <>
            {currItems && currItems.map((item, index) => (
                <div key={index} className={'fish-card'}>
                    <div className={'thumbnail-fish'}>
                        <img src={item.imageUrl} alt={'thumbnail-fish'}/>
                    </div>
                    <div className={'summary-fish'}>
                        <p style={{color: 'var(--text-color)', fontWeight: 'bold'}}>{item.name}</p>
                        <p>{item.price}</p>
                        <Link to={'/fish/' + item.id} style={{color: 'green', fontWeight: 'bold'}}
                              onClick={() => handleSaveFishInfo(item)}>Xem thêm </Link>
                    </div>
                </div>
            ))}
        </>
    );
}

function PaginatedItems({itemsPerPage}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = koiProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(koiProducts.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % koiProducts.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className={'list-fish-content'}>
                <ListFish currItems={currentItems}/>
            </div>
            <div className={'controler-paginate'}>
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
    return (
        < div className="list-fish-container">
            <PaginatedItems itemsPerPage={8}/>
        </div>
    )
}

export default Fish;
