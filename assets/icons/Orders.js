import React from 'react'
import { Svg, Rect, Path } from 'react-native-svg'

function Orders({ size, primaryColor, color }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none">
            {/* <Path d="M2 22H13C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.36745 4 4.49744 7.50005 4 12" stroke={color || "#141B34"} strokeWidth="1.5" strokeLinecap="round" />
            <Path d="M18.5 5.5L19.5 4.5M5.5 4.5L6.5 5.5" stroke={color || "#141B34"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path opacity="0.8" d="M16.5001 9.00003L13.5608 11.9394M13.5608 11.9394C13.2893 11.6679 12.9143 11.5 12.5001 11.5C11.6717 11.5 11.0001 12.1716 11.0001 13C11.0001 13.8285 11.6717 14.5 12.5001 14.5C13.3285 14.5 14.0001 13.8285 14.0001 13C14.0001 12.5858 13.8322 12.2108 13.5608 11.9394Z" stroke={primaryColor || "#141B34"} strokeWidth="1.5" strokeLinecap="round" />
            <Path d="M12.5 3.5V2" stroke={color || "#141B34"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M10.5 2H14.5" stroke={color || "#141B34"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path opacity="0.8" d="M2 15H5" stroke={primaryColor || "#141B34"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M2 19H7" stroke={color || "#141B34"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> */}
            <Path d="M13 22C12.1818 22 11.4002 21.6588 9.83691 20.9764C8.01233 20.18 6.61554 19.5703 5.64648 19H2M13 22C13.8182 22 14.5998 21.6588 16.1631 20.9764C20.0544 19.2779 22 18.4286 22 17V6.5M13 22L13 11M4 6.5L4 9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M9.32592 9.69138L6.40472 8.27785C4.80157 7.5021 4 7.11423 4 6.5C4 5.88577 4.80157 5.4979 6.40472 4.72215L9.32592 3.30862C11.1288 2.43621 12.0303 2 13 2C13.9697 2 14.8712 2.4362 16.6741 3.30862L19.5953 4.72215C21.1984 5.4979 22 5.88577 22 6.5C22 7.11423 21.1984 7.5021 19.5953 8.27785L16.6741 9.69138C14.8712 10.5638 13.9697 11 13 11C12.0303 11 11.1288 10.5638 9.32592 9.69138Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M18.1366 4.01563L7.86719 8.98485" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M2 13H5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M2 16H5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}

export default Orders;