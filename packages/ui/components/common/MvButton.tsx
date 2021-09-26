import React from 'react'

const MvButton:React.FC<{onClick:()=>void,title:string}> = ({onClick,title}) => {
    return (
        <button className='btn' onClick={onClick}>
            {title}
        </button>
    )
}

export default MvButton
