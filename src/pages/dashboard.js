/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import Table from '../components/table';
import axios from 'axios';

const DashBoard = ()=>{
    const [globalStatistics, setGlobalStatistics] = useState()
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const result = useMemo(() => data?.filter((item) =>
    item?.Country.includes(search)
  ),)

    const columns = useMemo(() => [
        {
          Header:'Countries',
          accessor: 'Country',
        },
        {
            Header:'Cases',
            accessor: 'TotalConfirmed',
        },
        {
            Header:'Deaths',
            accessor: 'TotalDeaths',
        },
        {
            Header:'Recovered',
            accessor: 'TotalRecovered',
        },
    ])
   
    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }

    useEffect(()=>{
        axios.get('https://api.covid19api.com/summary')
        .then(data => {
        setGlobalStatistics(data.data.Global)
        setData(data.data.Countries)
        }).catch((error)=> console.log(error))
    }, [])

    return (
        <>
        <h1>Covid Statistics</h1>
        <h2>Global Statistics</h2>
        <ul> 
         <li>Cases: {globalStatistics?.TotalConfirmed}</li>
         <li>Deaths: {globalStatistics?.TotalDeaths}</li>
         <li>Recovered: {globalStatistics?.TotalRecovered}</li>
         </ul>
         <h2> Statistics per Country</h2>
            <label>
                Search by Country:
                <input type="text" onChange={handleSearch} />
            </label>
         {data?.length ?
         <Table data= {result} columns= {columns}/>
         :(<></>)
         }
        </>
            )

}

export default DashBoard