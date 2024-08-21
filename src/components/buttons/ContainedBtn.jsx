import React from 'react'
import '../../css/containedbtn.css'

export default function ContainedBtn({ title, color, disabled, width, fontWeight, fontSize, padding, margin, onClick, btnIsDisabled }) {
  let btnClasses = ""
  if (btnIsDisabled) {
      btnClasses = "disabled"
  } else {
      btnClasses = "contained-btn"
  }
  
  return (
    <div style={{ width: width ? width : '130px', margin: margin ? margin : '0 0' }}>
      <button style={{
        padding: padding ? padding : '10px',
        fontSize: fontSize ? fontSize : '16px',
        fontWeight: fontWeight ? fontWeight : '500',
        width: width ? width : '130px',
        color: color ? color : '',
        // backgroundColor: disabled ? 'gray' : ''
      }}
        className={btnClasses}
        onClick={onClick}
        disabled={btnIsDisabled}
      >
        {title}
      </button>
    </div>
  )
}
