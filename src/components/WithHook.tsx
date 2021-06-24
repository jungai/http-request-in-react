import React, { FC, useEffect, useState } from "react"
import { useFetchApi } from '../hooks/useFetchApi'

const WithHook: FC = () => {
    const { data, loading, error, refetch, setPath, setQueryParams } = useFetchApi<any>({ initialPath: 'https://jsonplaceholder.typicode.com/comments'})
    
    return (
        <div>
            <button style={{ marginBottom: '1em' }} onClick={() => refetch()}>refetch</button>
            <button style={{ marginBottom: '1em' }} onClick={() => setQueryParams({ postId: 1})}>query postId = 1</button>
            <button style={{ marginBottom: '1em' }} onClick={() => setPath('https://jsonplaceholder.typicode.com/todos/1')}>new url</button>
            { loading ? <div>loading....</div> : <div>{JSON.stringify(data, null, 2)}</div>}
            { error && <div>{JSON.stringify(error)}</div> }
        </div>
    )
}

export default WithHook