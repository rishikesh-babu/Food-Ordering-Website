import React, { useEffect, useState } from 'react'
import axiosInstance from '../config/axiosInstance'
import { useDispatch } from 'react-redux'

function getFetch(url, savedata) {

    const [data, setData] = useState()
    const [isloading, setIsLoading] = useState(true)
    const [err, setErr] = useState()
    const dispatch = useDispatch()

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
                dispatch(savedata(res?.data?.data))
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
