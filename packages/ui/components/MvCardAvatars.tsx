import React from 'react'
import { TProfile } from '../types'

export const CardAvatars:React.FC<{avatars:TProfile[]}> = ({avatars}) => {
    return (
        <div className="mt-2 flex-shrink-0 sm:mt-2 sm:ml-0">
                    <div className="flex overflow-hidden -space-x-1">
                      {avatars.map((applicant) => (
                        <img
                          key={applicant.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      ))}
                    </div>
                  </div>
    )
}
