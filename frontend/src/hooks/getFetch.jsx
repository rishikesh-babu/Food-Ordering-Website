import React, { useEffect, useState } from 'react'
import axiosInstance from '../config/axiosInstance'

function getFetch(url) {

    const [data, setData] = useState() 
    const [isloading, setIsLoading] = useState(true)
    const [err, setErr] = useState()

    useEffect(() => {
        fetchData()
    }, [url])

    function fetchData() {
        axiosInstance({
            method: "GET",
            url: url,
        })
            .then((res) => {
                setData(res?.data?.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log('err :>> ', err);
                setErr(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return [data, isloading, err]

}

export default getFetch
