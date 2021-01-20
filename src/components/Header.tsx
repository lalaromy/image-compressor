import React from "react"
import "../styles/styles.css"

export default function Header(props: any): JSX.Element {

  return (
    <div className="header">
      <img className="bonsai" src="../bonsai.png" alt="Bonsai" />
      <h1>compress in zen ...</h1>
    </div>
  )
}