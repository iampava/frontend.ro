import React from 'react';
import Head from 'next/head';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Demo from '~/components/demo';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { LessonTip } from '~/components/lessons';
import LivePreviewDemo from '~/components/LivePreviewDemo';

export default function FixedSizeImage() {
  const title = 'O imagine cu dimensiuni fixe';

  return (
    <>
      <Head>
        <title>
          {title}
          {' '}
          | DEMO - FrontEnd.ro
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header demoPage />
        <Demo title={title}>
          <LivePreviewDemo
            language="html"
            code={`
<header style="
  display: flex; 
  justify-content: space-between; 
  align-items: center;
">
  <img 
    height="70"
    width="212" 
    src="https://FrontEnd.ro/logo.png" 
    alt="FrontEnd.ro logo" 
  />
  <h2> Home </h2>
</header>`}
          />
          <LessonTip icon={faQuestionCircle}>
            Atributul
            {' '}
            <strong>style</strong>
            {' '}
            este folosit pentru a stiliza
            elementele. Încă nu am ajuns la acel capitol deci nu-ți fă griji
            dacă nu înțelegi acel cod.
            <br />
            {' '}
            <br />
            Totuși va trebui să copii exemplul in intregime dacă vrei același
            rezultat.
          </LessonTip>
        </Demo>
        <Footer />
      </>
    </>
  );
}
