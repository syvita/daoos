import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import MvLoader from '../app/MvLoader'

const MvRedirect:React.FC<{path:string}> = ({path}) => {
    const router=useRouter()
    useEffect(() => {
        router.replace(path)
    }, )
    return (
        <MvLoader/>
    )
}

export default MvRedirect
