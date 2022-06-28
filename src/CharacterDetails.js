import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function CharacterDetails() {
    const token = '4HUOMUlkDRMViG417tug';

    const params = useParams();
    const navigate = useNavigate();

    console.log('params : ', params?.name);

    const [response, setResponse] = useState();

    useEffect(() => {
        axios.get(`https://the-one-api.dev/v2/character?name=${params?.name}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res?.data?.docs[0]);
                setResponse(res?.data?.docs[0]);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="App">
                <div className='top-header'>
                    <span className='character-details-header'>
                        <h1>Characters</h1>
                        <h1>&nbsp;{'>'}&nbsp;</h1>
                        <h1>{params?.name}</h1>
                    </span>
                </div>

                <div className='details-body'>
                    <div className='details-name details-common-style'>
                        <h3>Name  </h3>
                        <h3 style={{ paddingLeft: '25px' }}>:</h3>
                        <h3>{params?.name}</h3>
                    </div>
                    <div className='details-wikiURL details-common-style'>
                        <h3>WikiURL  </h3>
                        <h3 style={{ paddingLeft: '0px' }}>:</h3>
                        <h3>{response?.wikiUrl}</h3>
                    </div>
                    <div className='details-race details-common-style'>
                        <h3>Race </h3>
                        <h3 style={{ paddingLeft: '32px' }}>:</h3>
                        <h3>{response?.race}</h3>
                    </div>
                    <div className='details-gender details-common-style'>
                        <h3>Gender</h3>
                        <h3 style={{ paddingLeft: '12px' }}>:</h3>
                        <h3>{response?.gender}</h3>
                    </div>
                    <div className='details-height details-common-style'>
                        <h3>Height</h3>
                        <h3 style={{ paddingLeft: '15px' }}>:</h3>
                        <h3>{response?.height}</h3>
                    </div>
                    <div className='details-hair details-common-style'>
                        <h3>Hair </h3>
                        <h3 style={{ paddingLeft: '38px' }}>:</h3>
                        <h3>{response?.hair}</h3>
                    </div>
                    <div className='details-realm details-common-style'>
                        <h3>Realm </h3>
                        <h3 style={{ paddingLeft: '20px' }}>:</h3>
                        <h3>{response?.realm}</h3>
                    </div>
                    <div className='details-birth details-common-style'>
                        <h3>Birth </h3>
                        <h3 style={{ paddingLeft: '30px' }}>:</h3>
                        <h3>{response?.birth}</h3>
                    </div>
                    <div className='details-spouse details-common-style'>
                        <h3>Spouse </h3>
                        <h3 style={{ paddingLeft: '12px' }}>:</h3>
                        <h3>{response?.spouse}</h3>
                    </div>
                    <div className='details-death details-common-style'>
                        <h3>Death</h3>
                        <h3 style={{ paddingLeft: '25px' }}>:</h3>
                        <h3>{response?.death}</h3>
                    </div>

                </div>

                <div className='close-btn-wrap'>
                    <button className='close-btn' onClick={() => { navigate(`/`) }}>Close</button>
                </div>
            </div>
        </>
    )
}

export default CharacterDetails