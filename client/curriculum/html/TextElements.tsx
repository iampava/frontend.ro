import React from 'react';
import Link from 'next/link';
import SEOTags from '~/components/SEOTags';
import Lesson, {
  LessonContributors,
  LessonCover,
  LessonFigure,
  LessonHeading,
  LessonTip,
} from '~/components/lessons';
import { Diana } from '~/services/contributors';
import Highlight from '~/components/Highlight/Highlight';
import coverSvg from '~/public/images/lessons/text-elements__cover.svg';
import LivePreviewDemo from '~/components/LivePreviewDemo';

const contributors = [Diana];
const chapters = [
  { title: 'Titluri (Headings)', id: 'titluri' },
  { title: 'Paragrafe', id: 'paragrafe' },
  { title: 'Elementul <hr>', id: 'elementul-hr' },
  { title: 'Citate', id: 'citate' },
  { title: 'Elementele <em> & <strong>', id: 'em-strong' },
  { title: 'Exerciții', id: 'exercitii' },
];

export default function TextsLesson() {
  return (
    <>
      <SEOTags
        title="Texte | Lecție HTML"
        shareImage="https://frontend.ro/seo/html-text-elements.jpg"
        description="Avem la dispoziție mai multe elemente când vine vorba de texte, iar aici învățăm când și cum să le folosim."
        url="https://FrontEnd.ro/html/texte"
      />
      <Lesson title="Texte" chapters={chapters}>
        <LessonContributors className="absolute" contributors={contributors} />
        <LessonCover resizeOffset={150}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{
            __html: coverSvg,
          }}
          />
        </LessonCover>
        <p>
          Acest articol explică modul în care HTML poate fi utilizat pentru a structura o
          pagină de text prin adăugarea de titluri și paragrafe,
          accentuarea cuvintelor și multe altele.
        </p>
        <section>
          <LessonHeading as="h3" id="titluri">
            Titluri (Headings)
          </LessonHeading>
          <p>
            HTML oferă șase elemente pentru titluri (headings), care pot fi marcate
            utilizînd tagurile:
            {' '}
            <strong className="formatted">{'<h1>'}</strong>
            ,
            {' '}
            <strong className="formatted">{'<h2>'}</strong>
            ,
            {' '}
            <strong className="formatted">{'<h3>'}</strong>
            ,
            {' '}
            <strong className="formatted">{'<h4>'}</strong>
            ,
            {' '}
            <strong className="formatted">{'<h5>'}</strong>
            {' '}
            și
            {' '}
            <strong className="formatted">{'<h6>'}</strong>
            .
          </p>
          <p>
            <strong className="formatted">
              {'<h1>'}
            </strong>
            {' '}
            este folosit pentru titlul principal al
            paginii, următoarele fiind utilizate pentru a marca subtitluri în
            ordinea importanței lor. Este recomandat să avem
            {' '}
            <strong>
              un singur
              {' <h1>'}
            </strong>
            {' '}
            în pagină, pentru a arăta motoarelor de
            căutare care este subiectul principal al paginii.
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Toate cele 6 headinguri"
            demo="/demo/html/titluri"
            code={`
<h1> Texte | Lecție HTML </h1>`}
          />
          <p>
            În principiu
            {' '}
            <strong className="formatted">{'<h1>'}</strong>
            {' '}
            va avea fontul cel mai mare, iar
            {' '}
            <strong className="formatted">
              {'<h6>'}
            </strong>
            {' '}
            cel mai mic,
            deși aceasta nu este neapărat o regulă bătută în cuie.

            Fiecare browser vine cu propriile stiluri asupra elementelor de bază,
            însă mai târziu vom vedea cum putem adăuga propriile stiluri via
            {' '}
            <Link href="/css/intro">
              <a>
                CSS
              </a>
            </Link>
            .
          </p>
          <p>
            Atunci când realizăm structura unei pagini este bine să luăm în
            considerare câteva bune practici:
          </p>
          <LessonTip>
            Să ne asiguram că atunci cînd folosim titluri, ținem cont de ordinea
            lor in ierarhie. Adică, dacă am folosit un
            {' '}
            <strong>h3</strong>
            {' '}
            ce
            reprezintă un subtitlu în pagină, nu vom folosi după acesta un
            {' '}
            <strong>h2</strong>
            {' '}
            să reprezentăm un sub-subtitlu. Nu ar avea nici
            un sens să facem asta, nu?
          </LessonTip>
          <LessonTip>
            Deși avem 6 headings la dispoziție, nu ar trebui să folosim mai mult
            de 3 per pagină. Dacă totuși simțim nevoia de a folosi mai multe
            titluri, poate e momentul să facem o nouă pagină?!
          </LessonTip>
        </section>
        <section>
          <LessonHeading as="h3" id="paragrafe">
            Paragrafe
          </LessonHeading>
          <p>
            Elementele de tip paragraf sunt marcate cu ajutorul tag-ului
            {' '}
            <strong className="formatted">{'<p>'}</strong>
            . Vom folosi acest element pentru a insera paragrafe de text fără
            vreo proprietate sau înțeles special.
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Paragrafe și titluri"
            demo="/demo/html/paragrafe-titluri"
            code={`
<p> Acesta este un paragraf cu câteva cuvinte. </p>`}
          />
          <p>
            De fiecare dată când va întâlni tag-ul
            {' '}
            <strong className="formatted">{'<p>'}</strong>
            , browser-ul va afișa
            conținutul acestuia începînd cu o nouă linie (spunem că paragrafele
            sunt elemente de tip
            {' '}
            <a target="_blank" rel="noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements">
              block
            </a>
            ). Același lucru se întâmplă și cu titlurile, după cum poți vedea în demo-ul de mai jos.
          </p>
          <div className="dots" />
          <p>
            Dacă ai experimentat cu codul până acum, poate ai observat că dând
            {' '}
            <strong className="formatted">Enter</strong>
            {' '}
            într-un paragraf, nu va afișa textul pe o nouă linie.
            Ca să obținem asta putem fie să folosim un nou paragraf, fie
            tag-ul
            {' '}
            <strong className="formatted">
              {'<br>'}
            </strong>
            .
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Elementul <br>"
            demo="/demo/html/elementul-br"
            code={`
<p>
  Azi am codat împreună cu <br>
  Alex, <br>
  Diana și <br>
  Antonia.
</p>
            `}
          />
        </section>
        <section>
          <LessonHeading as="h3" id="elementul-hr">
            {'Elementul <hr>'}
          </LessonHeading>
          <p>
            Elementul
            {' '}
            <strong className="formatted">
              {'<hr>'}
            </strong>
            {' '}
            (horizontal line)
            este un separator între
            secțiuni/elemente din pagină.
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Elementul <hr> (horizontal-line)"
            demo="/demo/html/elementul-hr"
            code={`
<p> O primă regulă în această casă: Întotdeauna zâmbește! </p>
<hr>
<p> A doua regulă: Vino cu prăjituri! </p>
            `}
          />
        </section>
        <section>
          <LessonHeading as="h3" id="citate">
            Citate
          </LessonHeading>
          <p>
            Atunci când vrem să marcăm un text mai lung preluat dintr-o anumită
            sursă ne vom folosi de tag-ul
            {' '}
            <strong className="formatted">{'<blockquote>'}</strong>
            .
            Acest tag vine la pachet cu o indentare default.
          </p>
          <LivePreviewDemo
            className="row"
            language="html"
            alt="Citate"
            demo="/demo/html/citate"
            code={`
<blockquote 
  cite="https://en.wikipedia.org/wiki/A_journey_of_a_thousand_miles_begins_with_a_single_step"
>
  <p> Călătoria de 1000 mile începe cu un singur pas. </p>
</blockquote>          
            `}
          />
          <p>
            Dacă avem nevoie să marcăm un citat mai scurt, vom folosi tag-ul
            {' '}
            <strong className="formatted">{'<q>'}</strong>
            (quote).
          </p>
          <LessonTip>
            După cum poți observa mai sus, ambele elemente au atributul
            {' '}
            <strong className="formatted">cite</strong>
            {' '}
            pe care îl folosim pentru a marca sursa citatului.
          </LessonTip>
        </section>
        <section>
          <LessonHeading as="h3" id="em-strong">
            {'Elementele <em> & <strong>'}
          </LessonHeading>
          <p>
            În limbajul obișnuit, subliniem adesea cuvinte pentru a modifica
            sensul unei propoziții și dorim să marcăm anumite cuvinte ca fiind
            importante sau diferite într-un fel.
          </p>
          <p>
            HTML oferă diverse elemente
            semantice pentru a ne permite să marcăm conținutul textual cu astfel
            de efecte.
            .
            Unul dintre aceste elemente este tag-ul
            {' '}
            <strong className="formatted">
              {'<em>'}
            </strong>
            {' '}
            .
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<p>
  Sunt <em> foarte bucuros </em> că ai primit jobul!
</p>        
            `}
          />
          <p>
            Mai avem la dispoziție și tag-ul
            {' '}
            <strong className="formatted">
              {'<strong>'}
            </strong>
            {' '}
            , folosit pentru a marca un element ca fiind
            foarte important. Fiind un element semantic, acesta este recunoscut
            de cititoarele de ecrane și redat cu o tonalitate diferită a vocii.
          </p>
          <p>
            Deși browserele afișează acest element îngroșat (bolduit),
            {' '}
            <strong>nu ar trebui să folosim</strong>
            {' '}
            <span className="formatted">
              {'<strong>'}
            </span>
            {' '}
            doar pentru a obține acest rezultat. Pentru a face asta
            vom folosi un element de tip
            {' '}
            <span className="formatted">
              {'<span>'}
            </span>
            {' '}
            pe care vom aplica stiluri CSS.
          </p>
        </section>
      </Lesson>
    </>
  );
}
