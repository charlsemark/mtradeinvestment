'use client'

import { PulseLoader } from "react-spinners"

export default function ComponentLevelLoader({ text, color, loading, size }){
    return(
        <span className="flex items-center gap-2 text-base">
            {text}
            <PulseLoader
              color={color}
              loading={loading}
              size={size || 10}
              data-testid="loader"
            />
        </span>
    )
}