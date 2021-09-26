import React from 'react'
import { TProfile } from '../../types'
import Badge from './MvBadge'

export const CardAvatars:React.FC<{avatars:TProfile[]}> = ({avatars}) => {
    return (
        <div className="mt-2 flex-shrink-0 sm:mt-2 sm:ml-0">
                    <div className="flex overflow-hidden -space-x-1">
                      {avatars?.length ?avatars.map((applicant,key) => (
                        <img
                        
                          key={key}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      )):<Badge classnames='py-0.5 px-3' color='red'>0 votes</Badge>}
                    </div>
                  </div>
    )
}
