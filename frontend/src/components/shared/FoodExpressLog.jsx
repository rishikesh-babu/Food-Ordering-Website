import React from 'react'

export default function FoodExpressLog() {
  return (
    <div>
  {/* <?xml version="1.0" encoding="UTF-8"?> */}
<svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    {/* <!-- Background Circle --> */}
    <circle cx="50" cy="50" r="45" fill="orange" stroke="red" stroke-width="5"/>
    
    {/* <!-- Spoon & Fork Icon --> */}
    <g fill="white">
        <rect x="42" y="25" width="5" height="30" rx="2"/>
        <rect x="50" y="25" width="5" height="30" rx="2"/>
        <rect x="58" y="25" width="5" height="30" rx="2"/>
        <circle cx="53" cy="18" r="6"/>
    </g>
    
    {/* <!-- Delivery Motion Lines --> */}
    <line x1="5" y1="50" x2="25" y2="50" stroke="red" stroke-width="4" stroke-linecap="round"/>
    <line x1="5" y1="60" x2="20" y2="60" stroke="red" stroke-width="3" stroke-linecap="round"/>
    
    {/* <!-- Text 'Food Express' --> */}
    <text x="100" y="60" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="red">
        Food Express
    </text>
</svg>


    </div>
  )
}
