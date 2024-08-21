import React from 'react'
import '../../css/outlinedBtn.css'

export default function OutlineBtn({ title, bgColor, bottom, color, bdColor, fontsize, padding, width, onClick }) {

  return (
    <div>
      <button
        style={{
          width: width ? width : '',
          padding: padding ? padding : '10px',
          fontSize: fontsize ? fontsize : '16px',
          borderColor: bdColor ? bdColor : 'var(--primary-color)',
          backgroundColor: bgColor ? bgColor : '',
          color: color ? color : '',
          marginBottom: bottom ? bottom : ''
        }}
        className='outlined-btn'
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  )
}
