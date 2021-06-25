import React from 'react'
import { useQuery } from 'react-query'
import { getPosts } from '../data_services/get_posts'
import ky from 'ky'

const ReactQuery: React.FC = () => {
    const { isLoading, data, error } = useQuery<any, Error>('getPosts', () => getPosts(ky)())

    if (isLoading) return (<div>loading...</div>)

    if (error) return (<div>{error.message}</div>)

    return (
        <div>
            <div>hello</div>
            <hr />
            {JSON.stringify(data, null, 2)}
        </div>
    )
} 

export default ReactQuery