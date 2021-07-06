import React from 'react';
import SEOTags from '~/components/SEOTags';
import Lesson, {
  LessonContributors,
  LessonCover,
  LessonHeading,
  LessonTip,
  LessonResources,
} from '~/components/lessons';
import { CatalinPopusoi } from '~/services/contributors';
import Highlight from '~/components/Highlight/Highlight';

/** TODO: Change cover path when available */
import coverSvg from '~/public/images/lessons/audio-and-video__cover.svg';

const contributors = [CatalinPopusoi];
const chapters = [
  { title: 'O simpla analogie', id: 'analogie' },
  { title: 'Ce este HTML?', id: 'intro' },
  { title: 'Elemente', id: 'elemente' },
  { title: 'Atribute', id: 'atribute' },
  { title: 'Relații de rudenie', id: 'relatii' },
  { title: 'Resurse & exerciții', id: 'exercitii' },
];

export default function AboutHtmlLesson() {
  return (
    <>
      <SEOTags
        title="Despre HTML | Lecție HTML"
        shareImage="TBD"
        description="Învață principiile de bază ale acestui limbaj și scrie primele linii de cod."
        url="https://FrontEnd.ro/html/despre-html"
      />
      <Lesson id="despre-html" title="Despre HTML" chapters={chapters}>
        <LessonContributors className="absolute" contributors={contributors} />
        <LessonCover resizeOffset={250}>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: coverSvg,
            }}
          />
        </LessonCover>
        <p>
          La baza oricarei aplicatii web stau, de obicei, trei limbaje:
          {' '}
          <strong>HTML</strong>
          {', '}
          <strong>CSS</strong>
          {' si '}
          <strong>Javascript</strong>
          . Probabil va intrebati de ce e nevoie de toate.
        </p>
        <p>
          Raspunsul este ca fiecare are propriul scop bine definit.
        </p>
        <section>
          <LessonHeading as="h3" id="analogie">
            O simpla analogie
          </LessonHeading>
          <p>
            Pentru o intelegere mai buna, ne putem gandi la constructia unei case.
          </p>
          <p>
            Fundatia, peretii si acoperisul fac parte din structura de baza a
            casei, fara de care nu putem ajunge la un rezultat final. Corespondentul
            acestei structuri in cazul unei aplicatii web este
            {' '}
            <em>HTML</em>
            . Asa cum o casa incepe cu fundatia, constructia unei aplicatii web incepe
            cu HTML.
          </p>
          <p>
            Dupa ce structura de baza este gata, urmeaza sa definim culorile folosite,
            plasamentul geamurilor si a usilor si alte lucruri ce tin de design.
            Pentru un programator front-end, acesta este pasul in care se introduce
            {' '}
            <em>CSS</em>
            -ul.
          </p>
          <p>
            La final, trebuie ca geamurile, usile si becurile puse la pasul anterior sa
            functioneze corespunzator si sa putem interactiona cu ele. Asa cum probabil
            ati ghicit, in cazul unei aplicatii web, aceste operatii ii revin
            {' '}
            <em>Javascript</em>
            -ului.
          </p>
          <p>
            Noi ne vom concentra astazi pe primul limbaj dintre cele trei enumerate
            mai sus, si anume HTML.
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="intro">
            Ce este HTML?
          </LessonHeading>
          <p>
            <strong>HTML (Hyper Text Markup Language)</strong>
            {' '}
            este limbajul standard de markup folosit pentru a defini
            structura de baza a unei pagini web. Nu este un limbaj de
            programare propriu-zis, ci doar un limbaj descriptiv, bazat pe
            {' '}
            <em>XML</em>
            .
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="elemente">
            Elemente
          </LessonHeading>
          <p>
            Orice fisier HTML este construit din elemente, numite si
            <strong>tags</strong>
            . Ele sunt formate din perechi de forma
            {' '}
            <strong className="formatted">{'<element> </element>'}</strong>
            . Primul se numeste
            {' '}
            <strong>opening tag</strong>
            , iar al doilea
            {' '}
            <strong>closing tag</strong>
            . In interiorul acestei perechi, putem avea alte elemente sau
            continut de tip text, precum in exemplul de mai jos.
          </p>

          <Highlight
            className="my-5"
            language="html"
            code={`
<section>
  <h1>Section title</h1>
  <p>Section description</p>
</section>
`}
          />
          <p>
            Concret, elementul
            {' '}
            <strong className="formatted">{'<section>'}</strong>
            {' '}
            are drept continut alte doua elemente (
            <strong className="formatted">{'<h1>'}</strong>
            {' si '}
            <strong className="formatted">{'<p>'}</strong>
            ), in timp ce aceste doua elemente au in interior continut
            de tip text.
          </p>
          <LessonTip>
            Exista si elemente care nu au nevoie de continut (de exemplu,
            {' elementul '}
            <strong className="formatted">input</strong>
            ). Acestea se numesc
            {' '}
            <strong>self-closing tags</strong>
            , iar modul de scriere este putin diferit, si anume
            {' '}
            <strong className="formatted">{'<element />'}</strong>
            .
          </LessonTip>
        </section>
        <section>
          <LessonHeading as="h3" id="atribute">
            Atribute
          </LessonHeading>
          <p>
            Fiecare element poate avea o serie de atribute prin care noi putem fie
            sa controlam comportamentul acestuia, fie sa il identificam ulterior in
            CSS sau JS. Atributele sunt perechi de tip
            {' '}
            <strong className="formatted">cheie=“valoare”</strong>
            {' '}
            care sunt scrise in interiorul unui opening tag.
          </p>
          <p>
            Revenind la analogia de la inceput, daca ne gandim la un bec, atribute
            posibile ar putea fi tipul becului (LED sau incandescent), culoarea becului,
            intensitatea acestuia, marimea, etc.
          </p>
          <p>
            In HTML, un element bec care este de
            {' '}
            <strong>tip LED</strong>
            , de
            {' '}
            <strong>culoare albastra</strong>
            , ar putea fi scris dupa cum urmeaza:
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<bec tip=“LED” culoare="albastru” />
`}
          />
          <LessonTip>
            Becul nu este un element valid in HTML. Exemplul de mai sus a fost
            scris doar pentru a continua analogia inceputa in primele paragrafe.
          </LessonTip>

          <p>
            Hai sa vedem si cum putem folosi doua elemente existente si foarte intalnite:
            {' '}
            <strong>titlul</strong>
            {' si '}
            <strong>paragraful</strong>
            .
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<h1>Acesta este un titlu</h1>
<p>Acesta este un paragraf</p>
`}
          />
          <p>Acum, vom adauga si cateva atribute pe aceste elemente:</p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<h1 id=“main-title”>Acesta este un titlu</h1>
<p class=“text”>Acesta este un paragraf</p>
`}
          />
          <LessonTip>
            Vei invata mai multe despre aceste atribute intr-o lectie viitoare.
            Ce trebuie sa stii pentru moment este ca atributul
            {' '}
            <strong className="formatted">id</strong>
            {' '}
            este folosit pentru a identifica in mod unic un element pe o pagina HTML,
            in timp ce atributul
            {' '}
            <strong className="formatted">class</strong>
            {' '}
            va putea identifica mai multe elemente.
          </LessonTip>
        </section>
        <section>
          <LessonHeading as="h3" id="relatii">
            Relații de rudenie
          </LessonHeading>
          <p>
            Bineinteles ca o aplicatie web nu contine doar unul sau doua elemente.
            In majoritatea cazurilor, avem nevoie de zeci sau sute de elemente doar
            pentru o singura pagina. Aceste elemente sunt adaugate pe baza unor
            {' '}
            <strong>relatii de rudenie</strong>
            .
          </p>
          <p>Exista trei tipuri de elemente, in functie de aceste relatii:</p>
          <ul className="with--bullets">
            <li>
              elemente de tip parinte -
              {' '}
              <strong>parent elements</strong>
            </li>
            <li>
              elemente de tip copil -
              {' '}
              <strong>child elements</strong>
            </li>
            <li>
              elemente de tip frate / sora -
              {' '}
              <strong>sibling elements</strong>
            </li>
          </ul>
          <p>
            In exemplul de mai sus, titlul (
            <strong className="formatted">h1</strong>
            ) si paragraful (
            <strong className="formatted">p</strong>
            ) sunt siblings, pentru ca se afla pe acelasi nivel.
          </p>
          <p>
            Mai jos, se poate observa relatia de tip
            {' '}
            <strong className="formatted">parinte-copil</strong>
            , unde elementul
            {' '}
            <strong className="formatted">{'<div>'}</strong>
            {' '}
            este parinte pentru elementul
            {' '}
            <strong className="formatted">{'<p>'}</strong>
            .
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<div>
  <p>Acesta este un paragraf</p>
</div>
`}
          />
        </section>
        <div className="dots" />
        <section>
          <LessonHeading as="h3" id="exercitii">
            Resurse si exerciții
          </LessonHeading>
          <p>
            Ceea ce am prezentat mai sus este doar varful iceberg-ului.
            In lectiile urmatoare vei invata care este structura de baza a unei
            aplicatii web, cum sa iti validezi HTML-ul scris, precum si informatii
            mai detaliate despre diverse elemente. Pana atunci, iti vom lasa mai jos
            o lista de resurse cu elemente si atribute de baza, precum si cateva
            exercitii prin care sa exersezi ceea ce tocmai ai invatat.
          </p>
          <LessonResources
            className="my-5"
            links={[
              {
                text: 'Lista completa de elemente HTML de pe MDN',
                url:
                  'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
              },
              {
                text: 'Lista completa de atribute posibile de pe MDN',
                url:
                  'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
              },
            ]}
          />
        </section>
      </Lesson>
    </>
  );
}
