import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

function CharacterListing() {
    const token = '4HUOMUlkDRMViG417tug';

    const navigate = useNavigate();

    const [availableCharacters, setAvailableCharacters] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageAvailable, setTotalPageAvailable] = useState();
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [gender, setGender] = useState('');

    const [searchName, setSearchName] = useState('');
    const [sort, setSort] = useState('asc');
    const [race, setRace] = useState('');
    const [offset, setOffset] = useState(1);

    // axios.get(`https://the-one-api.dev/v2/character?gender=${gender}`, {


    // useEffect(() => {
    //     axios.get(`https://the-one-api.dev/v2/character?gender=${gender}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             setAvailableCharacters(res?.data?.docs);
    //             setTotalPageAvailable(res?.data?.total);
    //         })
    //         .catch(err => console.log(err));
    // }, [gender]);

    // useEffect(() => {
    //     axios.get(`https://the-one-api.dev/v2/character?race=${race}&&gender=${gender}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             setAvailableCharacters(res?.data?.docs);
    //             setTotalPageAvailable(res?.data?.total);
    //         })
    //         .catch(err => console.log(err));
    // }, [race]);

    useEffect(() => {
        axios.get(`https://the-one-api.dev/v2/character?limit=${limitPerPage}&&page=${currentPage}?offset=${currentPage}&&gender=${gender}&&race=${race}&&sort=name:${sort}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                setAvailableCharacters(res?.data?.docs);
                setTotalPageAvailable(res?.data?.pages);
                setOffset(1);
                setCurrentPage(res?.data?.page);
            })
            .catch(err => console.log(err));
    }, [currentPage, limitPerPage, sort, gender, race]);

    const HandlePagination = (page) => {
        console.log('current page : ', page);
        setCurrentPage(page)
    }

    const HandleSearch = () => {
        console.log('searching...');
        axios.get(`https://the-one-api.dev/v2/character?name=${searchName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);
                setAvailableCharacters(res?.data?.docs);
                // setCurrentPage(res?.data?.page);
                setTotalPageAvailable(res?.data?.pages);
            })
            .catch(err => console.log(err));
    }

    const HandlePaginationPrev = () => {
        if (offset - 1 > 0) {
            setOffset(offset - 1)
        }
    }
    const HandlePaginationNext = () => {
        if (offset + 1 < totalPageAvailable) {
            setOffset(offset + 1)
        }
    }

    const character_list = [
        {
            name: <h3><b>ID</b></h3>,
            cell: (row, index) => (currentPage - 1) * 5 + index + 1,
        },
        {
            name: <h3><b>Name</b></h3>,
            cell: row => (
                <div class="row-select row-select-name" >
                    <>{row?.name}</>
                </div >
            )
        },
        {
            name: <h3><b>Race</b></h3>,
            cell: row => (
                <div class="row-select row-select-race" >
                    <>{row?.race}</>
                </div >
            )
        },
        {
            name: <h3><b>Gender</b></h3>,
            cell: row => (
                <div class="row-select row-select-gender" >
                    <>{row?.gender}</>
                </div >
            )
        },
        {
            name: <h3><b>Action</b></h3>,
            cell: row => (
                <div class="row-select row-select-action" >
                    <button onClick={() => { navigate(`/${row?.name}`) }}>Details</button>
                </div >
            )
        }
    ]

    return (
        <div className="App">
            <div className='top-header'>
                <h1>Characters</h1>
            </div>

            <div className='actions-table-wrap'>
                <div className='sub-section-1'>
                    <div className='search'>
                        <h3>Search</h3>
                        <div className='input-wrap'>
                            <input
                                type='text'
                                className='search-input'
                                onChange={(e) => { setSearchName(e?.target?.value) }}
                                placeholder='Search by name'
                            />
                            <img src='./search.svg' className='search-icon' />
                        </div>
                    </div>

                    <div className='sortby'>
                        <h3>Sort By</h3>
                        <div className='sortby-wrap'>
                            <select name="character-name" id="character-name" className='charactername-sort' onChange={(e) => { setSort(e?.target?.value) }}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className='sub-section-2'>
                    <div className='race-wrap'>
                        <h3>Race</h3>
                        <select className='race-select' onChange={(e) => { setRace(e?.target?.value); setCurrentPage(1) }}>
                            <option value="Elves">Elves</option>
                            <option value="Men">Men</option>
                            <option value="Dwarves"> Dwarves</option>
                            <option value="Hobbits">Hobbits</option>
                            <option value="Ents">Ents</option>
                            <option value="Orcs">Orcs</option>
                            <option value="Trolls">Trolls</option>

                        </select>
                    </div>
                    <div className='gender-wrap'>
                        <h3>Gender</h3>
                        <select className='gender-select' onChange={(e) => { setGender(e?.target?.value); setCurrentPage(1) }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="">Any</option>
                        </select>
                    </div>
                    <div className='submit-button'>
                        <button type='button' onClick={HandleSearch}>SUBMIT</button>
                    </div>
                </div>

            </div>

            <div className='app-body'>

                <DataTable
                    columns={character_list}
                    data={availableCharacters}
                />
            </div>




            <div className='app-pagination'>
                <div className='page-list-wrrap' >
                    <div className='prev-btn' onClick={() => { HandlePaginationPrev() }} > <h2>{'<'}</h2></div>
                    <div className='page-list'>
                        {
                            (totalPageAvailable) ? (
                                <>
                                    {
                                        Array.apply(0, Array(totalPageAvailable)).map(function (x, i) {
                                            if (i < totalPageAvailable) {
                                                return (
                                                    <>
                                                        <div className='pages-box'>
                                                            <button onClick={() => { HandlePagination(i + offset) }}>{i + offset}</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </>
                            ) : (<></>)
                        }
                    </div>
                    <div className='next-btn' onClick={() => { HandlePaginationNext() }} > <h2>{'>'}</h2></div>
                </div>

                <div className='page-limit'>
                    <h3>Limit</h3>
                    <select className='page-limit-select' onChange={(e) => { setLimitPerPage(e?.target?.value) }}>
                        <option value='10'>select</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default CharacterListing