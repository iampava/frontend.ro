import React from 'react';
import Head from 'next/head';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';
import { LessonTip } from '~/components/lessons';

export default function ContentShifting() {
  const title = 'Content shifting';

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
          <p>
            Imaginea nu are specificate atributele
            {' '}
            <strong>width</strong>
            {' '}
            și
            {' '}
            <strong>height</strong>
            ,
            deci întreg conținutul se mută atunci când imaginea s-a încărcat complet.
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<section>
  <h2> Turnul Eiffel</h2>
  <div style="display: flex">
    <img 
      src="https://frontend.ro/api/demo/slow-image" 
      style="margin-right: 1em; max-height: 250px" 
      alt="Eiffel tower during night" />
    <p>
      Cel mai popular obiectiv turistic din Paris, capitala Franței.
    </p>
  </div>
</section>`}
          />
          <LessonTip>
            Am simulat o conexiune înceată prin întârzierea artificială a răspunsului de la server.
          </LessonTip>
        </Demo>
        <Footer />
      </>
    </>
  );
}
