import React, { Fragment } from 'react';
import Upload from './components/Upload';
import "tailwindcss/tailwind.css"
import Header from './components/Header';

export default function App(props: any): JSX.Element {
  return (
    <Fragment>
      <Header />
      <Upload />
    </Fragment >
  )
}

