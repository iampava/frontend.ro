import React from 'react';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import SEOTags from '~/components/SEOTags';
import Lesson, {
  LessonContributors,
  LessonCover,
  LessonHeading,
  LessonTip,
  LessonFigure,
  LessonResources,
} from '~/components/lessons';
import { Diana } from '~/services/contributors';
import Highlight from '~/components/Highlight/Highlight';
import coverSvg from '~/public/images/lessons/lists__cover.svg';
import LivePreviewDemo from '~/components/LivePreviewDemo';

const contributors = [Diana];
const chapters = [
  { title: 'Tipuri de liste', id: 'tipuri-de-liste' },
  {
    title: 'Liste neordonate',
    id: 'liste-neordonate',
  },
  { title: 'Liste ordonate', id: 'liste-ordonate' },
  {
    title: 'Atributele acceptate de listele ordonate',
    id: 'atributele-acceptate-de-listele-ordonate',
  },
  { title: 'Sub-liste', id: 'sub-liste' },
  { title: 'Bonus tips și concluzii', id: 'bonus-tips-si-concluzii' },
  { title: 'Exerciții', id: 'exercitii' },
];

export default function ListsLesson() {
  return (
    <>
      <SEOTags
        title="Liste | Lecție HTML"
        shareImage="https://frontend.ro/seo/html-lists.jpg"
        description="Învață despre tipurile de liste în HTML"
        url="https://FrontEnd.ro/html/liste"
      />
      <Lesson title="Liste" chapters={chapters}>
        <LessonContributors className="absolute" contributors={contributors} />
        <LessonCover>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{
            __html: coverSvg,
          }}
          />
        </LessonCover>
        <p>
          Listele sunt folosite pentru a grupa informații, astfel încât să fie
          clar asociate între ele și ușor de citit.
        </p>
        <p>
          În dezvoltarea modernă a web-ului, listele sunt elemente HTML
          utilizate frecvent atât pentru navigație cât și pentru conținut
          general, contribuind la crearea unui document bine structurat,
          accesibil și ușor de întreținut.
        </p>
        <section>
          <LessonHeading as="h3" id="tipuri-de-liste">
            Tipuri de liste
          </LessonHeading>
          <p>Există două tipuri de liste des folosite în HTML:</p>
          <ul className="with--bullets">
            <li className="mb-4">
              <strong className="formatted">Liste neordonate</strong>
              {' '}
              -
              utilizate pentru a grupa un set de elemente ce nu necesită o
              anumită ordine
            </li>
            <li>
              <strong className="formatted">Liste ordonate</strong>
              {' '}
              - utilizate
              pentru a grupa un set de elemente ce au o ordine specifică
            </li>
          </ul>
          <p>
            Fiecare tip de listă are un înțeles și un scop specific într-o
            pagină web. Să le luam pe rînd:
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="liste-neordonate">
            Liste neordonate
          </LessonHeading>
          <p>
            Sunt utilizate cînd un set de elemente pot fi folosite în orice
            ordine, ca în lista de cumpărături de mai jos:
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Listă neordonată"
            demo="/demo/html/liste-neordonate"
            code={`
<ul>
  <li> pâine </li>
  <li> cafea </li>
  <li> lapte </li>
  <li> unt </li>
</ul>
`}
          />
          <LessonTip>
            Observă cum ne folosim de 2 tipuri de elemente pentru a defini o
            listă: în exterior avem
            {' '}
            <strong className="formatted">{'<ul>'}</strong>
            {' '}
            (unordered list)
            pentru a defini lista, iar apoi fiecare element în propriul tag
            {' '}
            <strong className="formatted">{'<li>'}</strong>
            {' '}
            (list item) .
          </LessonTip>
          <p>
            Cu o stilizare potrivită, listele neordonate sunt folosite la
            {' '}
            <strong>
              realizarea meniurilor paginilor web
            </strong>
            .
            {' '}
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            {' '}
            e un exemplu bun, ei folosind liste neordonate pentru meniul de
            navigare:
          </p>
          <LessonFigure
            withBorder
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/github_unordered-list.jpeg"
            alt="GitHub folosește o listă neordonată în meniul de navigație"
          />
          <LessonTip>
            Deși nu am ajuns încă la partea de CSS, e bine să știm că listele
            neordonate au ca și stil implicit niște buline. Putem să le
            personalizăm folosind propria noastră imagine sau putem renunța la
            ele cu totul. Vom discuta mai multe în cadrul capitolului de
            stilizare.
          </LessonTip>
        </section>
        <section>
          <LessonHeading as="h3" id="liste-ordonate">
            Liste ordonate
          </LessonHeading>
          <p>
            Listele ordonate afișează elementele enumerate într-o ordine
            specifică, fie că este vorba de enumerări cu cifre arabe, cifre
            romane sau litere. Un exemplu potrivit ar fi instrucțiunile pentru a
            găti o prăjitură:
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Listă ordonată"
            demo="/demo/html/liste-ordonate"
            code={`
<ol>
  <li> Cumpără ingredientele necesare </li>
  <li> Amestecă ingredientele </li>
  <li> Pune amestecul într-un vas de gătit </li>
  <li> Coace în cuptor prăjitura timp de o oră </li>
  <li> Scoate prăjitura din cuptor </li>
</ol>     
`}
          />
          <p>
            Acestea au o structura similară cu cele neordonate, singura
            diferență fiind tag-ul:
            {' '}
            <strong className="formatted">{'<ol>'}</strong>
            {' '}
            (ordered list). E
            evident că dacă vom schimba ordinea elementelor din cadrul listei,
            aceasta nu va mai avea nici un sens.
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="atributele-acceptate-de-listele-ordonate">
            Atributele acceptate de listele ordonate
          </LessonHeading>
          <p>
            Dacă vrem ca enumerarea elementelor din listă să se facă cu un
            anumit tip de cifră sau cu litere, ne putem folosi de atributul
            {' '}
            <strong className="formatted"> type</strong>
            . Acesta acceptă ca
            valori:
          </p>
          <ul className="with--bullets">
            <li className="mb-4">
              {' '}
              <strong className="formatted">1</strong>
              {' '}
              – pentru enumerare cu
              {' '}
              cifre arabe;
            </li>
            <li className="mb-4">
              {' '}
              <strong className="formatted">i</strong>
              {' '}
              sau
              {' '}
              <strong className="formatted">I</strong>
              {' '}
              – pentru enumerare cu
              cifre romane mici, respectiv mari
            </li>
            <li className="mb-4">
              {' '}
              <strong className="formatted">a</strong>
              {' '}
              sau
              {' '}
              <strong className="formatted">A</strong>
              {' '}
              – pentru enumerare cu
              litere mici, respectiv mari.
            </li>
          </ul>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Atributul 'type' pentru liste ordonate"
            demo="/demo/html/atributul-type-pentru-liste-ordonate"
            code={`
<ol type="I">
  <li> Pornește laptopul </li>
  <li> Deschide Visual Studio Code </li>
  <li> Începe să codezi </li>
</ol>
`}
          />
          <p>
            Dacă vrem ca lista să înceapă enumerarea de la cifra/litera cea mai
            avansată și să se termine cu prima, vom folosi atributul
            {' '}
            <strong className="formatted">reversed</strong>
            {' '}
            .
          </p>
          <LivePreviewDemo
            className="row"
            alt="Atributul 'reversed' pentru liste ordonate"
            demo="/demo/html/atributul-reversed-pentru-liste-ordonate"
            language="html"
            code={`
<ol reversed type="A">
  <li> Pornește laptopul </li>
  <li> Deschide Visual Studio Code </li>
  <li> Începe să codezi </li>
</ol>  
            `}
          />
          <p>
            Putem opta chiar să enumerăm elementele unei liste ordonate începând
            de la un anumit număr/literă. Pentru asta ne vom folosi de atributul
            {' '}
            <strong className="formatted">start</strong>
            {' '}
            dând ca valoare numărul
            sau litera de la care vrem sa începem numărătoarea:
          </p>
          <LivePreviewDemo
            className="row"
            alt="Atributul 'start' pentru liste ordonate"
            demo="/demo/html/atributul-start-pentru-liste-ordonate"
            language="html"
            code={`
 <ol>
  <li> Pornește laptopul </li>
  <li> Deschide Visual Studio Code </li>
  <li> Începe să codezi </li>
</ol>
<p> După ce ai terminat nu uita să:</p>
<ol start="4">
  <li> Dai 'push' pe GitHub </li>
  <li> Arăți rezultatul prietenilor tăi! </li>
</ol>
`}
          />
        </section>
        <section>
          <LessonHeading as="h3" id="sub-liste">
            Sub-liste
          </LessonHeading>
          <p>
            O listă poate conține o altă listă. Acest lucru este foarte util
            dacă vrem să reprezentăm un meniu de navigare pe mai multe nivele:
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Sub-liste"
            demo="/demo/html/sub-liste"
            code={`
<ol>
  <li> 
    FrontEnd
    <ol>
      <li> HTML </li>
      <li> CSS </li>
      <li> JavaScript </li>
    </ol>
  </li>
  <li> Back-end </li>
  <li> Mobile development </li>
</ol>
`}
          />
          <p>
            În exemplul de mai sus am inclus o listă ordonată în cadrul
            unei liste neordonate, dar putem foarte bine să includem orice tip
            de listă în oricare altul. Ce e important să reținem este că nivelul
            de nesting să nu fie mai mare de 3 căci lucrurile pot deveni
            confuze.
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="bonus-tips-si-concluzii">
            Bonus tips și concluzii
          </LessonHeading>
          <p>
            Există și un al treilea tip de listă pe care-l vei întâlni mai rar
            dar e totuși bine să-l știi:
            {' '}
            <strong className="formatted">{'<dl>'}</strong>
            {' '}
            (description list).
            Îl vom folosi când definim termeni sau asociem perechi de valori, ca
            în exemplul de mai jos:
          </p>
          <LivePreviewDemo
            className="row"
            alt="Liste de descrieri"
            demo="/demo/html/liste-de-descrieri"
            language="html"
            code={`
<dl>
  <dt> HTML </dt>
  <dd> Hyper Text Markup Language </dd>

  <dt> CSS </dt>
  <dd> Cascading Style Sheets </dd>
</dl>`}
          />

          <div className="dots" />

          <p>
            Pentru a alege ce tip de listă să folosim ne putem adresa două
            întrebări:
          </p>
          <dl>
            <dt className="text-bold">
              Definesc termeni sau asociez alte perechi nume/valoare?
            </dt>
            <dd className="mb-4">
              {' '}
              Dacă da, vom folosi o listă de descrieri.
              {' '}
            </dd>

            <dt className="text-bold">
              Este importantă ordinea elementelor din listă?
            </dt>
            <dd>
              {' '}
              Dacă da, folosim o listă ordonată, altfel vom folosi o listă
              neordonată.
              {' '}
            </dd>
          </dl>
          <LessonTip icon={faThumbsUp}>
            Iar pe final, nu uita că elementele
            {' '}
            <strong>{'<ul>'}</strong>
            ,
            <strong>{'<ol>'}</strong>
            {' '}
            și
            {' '}
            <strong>{'<dl>'}</strong>
            {' '}
            ajută atât în cazul
            screen-readere-lor cât și pe ceilalți developeri care vor înțelege
            mai ușor codul tău. Hai să le folosim când e vorba de liste.
          </LessonTip>
        </section>
        <div className="dots" />
        <LessonResources
          className="my-5"
          links={[
            {
              text: 'Documentația completă a <ul> pe MDN',
              url:
                'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul',
            },
            {
              text: 'Documentația completă a <ol> pe MDN',
              url:
                'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol',
            },
            {
              text: 'Documentația completă a <dl> pe MDN',
              url:
                'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl',
            },
          ]}
        />
      </Lesson>
    </>
  );
}
