import React from 'react';
import Link from 'next/link';
import SEOTags from '~/components/SEOTags';
import Lesson, {
  LessonContributors,
  LessonCover,
  LessonHeading,
  LessonTip,
} from '~/components/lessons';
import { NicolaeMaties } from '~/services/contributors';
import Highlight from '~/components/Highlight/Highlight';
import coverSvg from '~/public/images/lessons/tags-classes-ids__cover.svg';

const contributors = [NicolaeMaties];
const chapters = [
  { title: 'Tag-uri', id: 'tags' },
  { title: 'Clase', id: 'classes' },
  { title: 'Id-uri', id: 'ids' },
];

export default function TagsClassesIds() {
  return (
    <>
      <SEOTags
        title="Tag-uri, clase si id-uri | Lecție CSS"
        shareImage="https://frontend.ro/seo/html-text-elements.jpg"
        description=""
        url="https://FrontEnd.ro/css/taguri-clase-si-iduri"
      />
      <Lesson title="Tag-uri, clase si id-uri" chapters={chapters}>
        <LessonContributors className="absolute" contributors={contributors} />
        <LessonCover>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{
            __html: coverSvg,
          }}
          />
        </LessonCover>
        <p>
          Acest articol explică modul prin care putem stiliza diferit
          elementele in funcție de tag-uri, clase sau id-uri.
        </p>
        <section>
          <LessonHeading as="h3" id="tags">
            Tag-urile
          </LessonHeading>
          <p>
            Atunci când construim un site și implicit stilurile pentru paginile
            din site este important să avem o consistență a stilurilor.
            De aceea ne putem folosi de tag-uri pentru a stiliza o anumită categorie de elemente,
            în cazul nostru ne vom folosi urmatorul exemplu:
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={
            `
              <button type=”button”>
                Închide formular
              </button>
              <button type=”button”>
                Aplică
              </button>
              <button type=”reset”>
                Resetează formular
              <button>
              
              <style>
                button {
                  font-style: italic;
                  background-color: blue;
                  color: white;
                }
              </style>
            `
          }
          />
          <p>
            În exemplu de mai sus avem două butoane care au stilul textului din interior italic,
            culoarea textului albă si fundalul albastru.
          </p>
          <p>
            De asemenea poate fi folosit și în JavaScript pentru a accesa și manipula elementele,
            acestea vor fi discutate pe larg în capitolul
            {' '}
            <Link href="/javascript/despre-javascript"><a>JavaScript</a></Link>
            .
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="classes">
            Clasele
          </LessonHeading>
          <p>
            Deși e o bună practică ca elementele de același tip (tag) să fie stilizate la fel,
            vrem totuși să avem și o varietate mai mare de stiluri din care să alegem.
          </p>
          <p>
            Luând în considerare următorul exemplu, același ca și în cazul tag-urilor,
            vrem să stilizam fiecare element diferit folosindu-ne de clase:
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={
            `
            <button type=”button” class=”btn-red”>
              Închide formular
            </button>
            <button type=”button” class=”btn-green”>
              Aplică
            </button>
            <button type=”reset”  class=”btn-red”>
              Resetează formular
            <button>
            `
          }
          />
          <p>
            <b>Cum selectam elementele cu ajutorul clasei în CSS?</b>
          </p>
          <p>
            Pentru a selecta o clasa specifică, va trebui sa scriem în CSS
            caracterul (.) urmat de numele clasei, în cazul nostru vom avea
            culori diferite pentru textul din interiorul butoanelor.
          </p>
          <Highlight
            className="my-5"
            language="css"
            code={
            `
              .btn-red {
                color: red;
              }

              .btn-green {
                color: green;
              }
            `
          }
          />
          <p>
            De asemenea clasele pot fi folosite și în JavaScript pentru a accesa și
            manipula elementele, acestea vor fi discutate pe larg în capitolul
            {' '}
            <Link href="/javascript/despre-javascript"><a>JavaScript</a></Link>
            .
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="ids">
            Id-urile
          </LessonHeading>
          <p>
            Am văzut mai sus ca în cazul claselor putem selecta mai multe elemente
            cu ajutorul aceleași clase, vom vedea în continuare cum putem selecta un singur
            element cu ajutorul id-urilor.
          </p>
          <p>
            Id-urile sunt folosite in CSS pentru a găsi și
            selecta un singur element din documentul HTML.
          </p>
          <p>
            Ca și în cazul tag-urilor și claselor ne vom folosi
            de aceleași elemente HTML pentru urmatorul exemplu:
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
              <button type=”button” class=”btn-red”>
                Închide formular
              </button>
              <button type=”button” id=”btn-green”>
                Aplică
              </button>
              <button type=”reset”  class=”btn-red”>
                Resetează formular
              <button>
            `}
          />
          <p>
            <b>Cum selectam elementele cu ajutorul id-ului în CSS?</b>
          </p>
          <p>
            La fel ca și în cazul clasei, numai ca în loc să precedam numele clasei cu (.)
            vom folosi (#). Exact, ăla de pe Instagram, exact ca în exemplul următor:
          </p>
          <Highlight
            className="my-5"
            language="css"
            code={`
              .btn-red {
                color: red;
              }

              #btn-green {
                color: green;
              }
            `}
          />
          <LessonTip>
            Diferența foarte importantă între id-uri și clase constă în faptul că
            id-ul poate fi atribuit unui singur element dintr-un singur fișier
            HTML ceea ce il face unic în pagină, spre deosebire de clasa ce
            poate fi atribuită mai multor elemente în același timp din același fișier.
            Dacă în cazul claselor puteam să atribuim aceași clasa mai multor elemente,
            în cazul id-urilor acest lucru este imposibil.
          </LessonTip>
          <p>
            De asemenea id-ul poate fi folosit și în JavaScript pentru a
            accesa și manipula elementele, acestea vor fi discutate pe larg la capitolul
            {' '}
            <Link href="/javascript/despre-javascript"><a>JavaScript</a></Link>
            .
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="exercises">
            Exerciții
          </LessonHeading>
          <p className="text-bold text-center">În curând!</p>
          <br />
        </section>
      </Lesson>
    </>
  );
}
