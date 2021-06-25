import React, { FC, useEffect, useState } from "react"
import { useFetchApi } from '../hooks/useFetchApi'
import { useMutateApi } from '../hooks/useMutateApi'

const WithHook: FC = () => {
    const { data: getData, loading: getLoading, error: getError, refetch, setPath, setQueryParams } = useFetchApi<any>({ initialPath: 'https://jsonplaceholder.typicode.com/posts/1'})
    const { callApi, loading, data, error } = useMutateApi({
        path:  'https://jsonplaceholder.typicode.com/posts',
        method: 'post',
        reqBody: {
            title: 'iu is my no1',
            body: '❤️',
            userId: 1
        }
    });

    const { callApi: putApi, loading: putLoading, data: putData, error: putError } = useMutateApi({
        path:  'https://jsonplaceholder.typicode.com/posts/1',
        method: 'put',
        reqBody: {
            id: 1,
            title: 'iu is my no1',
            body: '❤️',
            userId: 1
        }
    });
    
    return (
        <div>
            {/* get */}
            <button style={{ marginBottom: '1em' }} onClick={() => refetch()}>refetch</button>
            <button style={{ marginBottom: '1em' }} onClick={() => setQueryParams({ postId: 1})}>query postId = 1</button>
            <button style={{ marginBottom: '1em' }} onClick={() => setPath('https://jsonplaceholder.typicode.com/todos/1')}>new url</button>
            { getLoading ? <div>loading....</div> : <div>{JSON.stringify(getData, null, 2)}</div>}
            { getError && <div>{JSON.stringify(getError)}</div> }

            <hr />
            {/* post , put */}
            <button onClick={callApi} disabled={loading}>post</button>
            { loading ? <div>loading....</div> : <div>{JSON.stringify(data, null, 2)}</div>}
            { error && <div>{JSON.stringify(error)}</div> }

            <hr />

            <button onClick={putApi} disabled={putLoading}>put</button>
            { putLoading ? <div>loading....</div> : <div>{JSON.stringify(putData, null, 2)}</div>}
            { putError && <div>{JSON.stringify(putError)}</div> }


        </div>
    )
}

export default WithHook