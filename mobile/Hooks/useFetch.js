import {useState, useEffect} from 'react'
import axios from "axios"

const baseURL = null
export function useFetch(url, dependencies = []) {
    const [data, setData] = useState(undefined)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${baseURL}/${url}`)
             .then(res => setData(res.data))
             .catch(() => setError(true))
             .finally(() => setLoading(false))
    }, dependencies)

    return {data, error, loading}
}