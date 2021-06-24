import ky from "ky";
import React, { FC, useEffect, useState } from "react"

const NormalWay: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<undefined | string>();

    const fetchTodo = async (path = 'https://jsonplaceholder.typicode.com/todos') => {
        try {
            setIsLoading(true)
            const data = await ky.get(path).json()
            console.log('data', data)
            setData(data)
            setIsLoading(false)
        } catch (err) {
            setError(err.message)
            // throw new Error(error)
        }
    }

    useEffect(() => {
        // IIFE
        (async () => {
            await fetchTodo()
        })() 
    }, [])
    
    return (
        <div>
            <button style={{ marginBottom: '1em' }} onClick={() => fetchTodo('https://jsonplaceholder.typicode.com/todos/1')}>click</button>
            { isLoading ? <div>loading....</div> : <div>{JSON.stringify(data)}</div>}
            { error && <div>{JSON.stringify(error)}</div> }
        </div>
    )
}

export default NormalWay