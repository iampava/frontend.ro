import React from 'react';
import Link from 'next/link';
import SEOTags from '~/components/SEOTags';
import Lesson, {
  LessonContributors,
  LessonCover,
  LessonFigure,
  LessonHeading,
  LessonResources,
  LessonTable,
  LessonTableProps,
  LessonTip,
} from '~/components/lessons';
import { Pava } from '~/services/contributors';
import Highlight from '~/components/Highlight/Highlight';
import SideBySidePictures from '~/components/SideBySidePictures';
import coverSvg from '~/public/images/lessons/images__cover.svg';
import LivePreviewDemo from '~/components/LivePreviewDemo';

const contributors = [Pava];
const chapters = [
  { title: 'Elementul <img>', id: 'elementul-img' },
  { title: 'Width & Height', id: 'width-height' },
  { title: 'Lazy loading', id: 'lazy-loading' },
  { title: 'Imagini responsive', id: 'imagini-responsive' },
  { title: 'Elementul <picture>', id: 'elementul-picture' },
  { title: 'Exerciții', id: 'exercitii' },
];

const sizesTable: LessonTableProps = {
  head: ['JPG', 'WebP', 'AVIF'],
  side: ['4000 x 2666', '2000 x 1333', '800 x 533'],
  rows: [
    [
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__high.jpg" target="_blank" rel="noreferrer">2.7MB</a>',
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__high.webp" target="_blank" rel="noreferrer">2MB</a>',
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__high.avif" target="_blank" rel="noreferrer">376kb</a>',
    ],
    [
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__med.jpg" target="_blank" rel="noreferrer">947kb</a>',
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__med.webp" target="_blank" rel="noreferrer">838kb</a>',
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__med.avif" target="_blank" rel="noreferrer">181kb</a>',
    ],
    [
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__med.jpg" target="_blank" rel="noreferrer">169kb</a>',
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__med.webp" target="_blank" rel="noreferrer">150kb</a>',
      '<a href="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__med.avif" target="_blank" rel="noreferrer">35kb</a>',
    ],
  ],
};

export default function ImagesLesson() {
  return (
    <>
      <SEOTags
        title="Imagini | Lecție HTML"
        shareImage="https://frontend.ro/seo/html-images.jpg"
        description="Învață să adaugi și să optimizezi imagini în paginile Web."
        url="https://FrontEnd.ro/html/imagini"
      />
      <Lesson title="Imagini" chapters={chapters}>
        <LessonContributors className="absolute" contributors={contributors} />
        <LessonCover>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{
            __html: coverSvg,
          }}
          />
        </LessonCover>
        <p>
          Cred că putem cu toții admite că un Internet fără imagini ar
          fi destul de plictisitor. Deci hai să
          încheiem așteptarea și să vedem cum adăugăm imagini
          în site-urile noastre și care sunt cele mai bune practici legate de acest subiect.
        </p>
        <section>
          <h2> The Basics </h2>
          <LessonHeading as="h3" id="elementul-img">
            {'Elementul <img>'}
          </LessonHeading>
          <p>
            Primul și cel mai comun mod de a adăuga o imagine este folosind elementul
            {' '}
            <strong>img</strong>
            {' '}
            alături de 2 atribute:
          </p>
          <ul className="with--bullets">
            <li>
              <strong>src</strong>
              : pentru a specifica URL-ul imaginii
            </li>
            <li>
              <strong>alt</strong>
              : pentru a descrie conținutul imaginii - în caz că aceasta nu poate fi încărcată
            </li>
          </ul>
          <Highlight
            className="my-5"
            language="html"
            code={`
<img 
  src="golden-retrieve-and-ball.jpg" 
  alt="Golden retriever biting blue ball"
/>`}
          />
          <p>
            Dacă imaginea se află la acel URL și avem conexiune la internet
            vom obține o pagină ca în imaginea din stânga. Însă, dacă
            browserul nu a putut încărca imaginea, vom vedea descrierea
            text ca în exemplul din dreapta.
          </p>
          <SideBySidePictures
            img1={{
              src: 'https://d3tycb976jpudc.cloudfront.net/demo-assets/golden-retriever-and-ball.jpg',
              alt: 'Imagine încărcată cu succes într-o pagină Web',
              demo: '/demo/html/imagine-incarcata-cu-succes',
            }}
            img2={{
              src: '/images/lessons/images/image-alt.png',
              alt: 'Descrierea text a imaginii, dacă aceasta nu a putut fi încărcată',
              demo: '/demo/html/text-alternativ-imagine',
            }}
          />
          <p>
            Este foarte important să nu uităm de atributul
            {' '}
            <strong>alt</strong>
            .
            Pe lângă cazul menționat mai sus, acesta ajută și persoanele cu dizabilități
            ce consumă conținut Web via screen readere.
            {/* Uite un demo folosind progamul XXX? */}
          </p>

          {/* TODO: add audio demo */}
          {/* <AudioPlayer className="my-5" src="" title="Web captions demo" /> */}

          <LessonTip>
            De aceea, o pagină ce conține imagini
            {' '}
            <strong>fără atributul alt</strong>
            {' '}
            nu este
            {' '}
            <Link href="/html/validarea-paginilor-html">
              <a>
                considerată validă
              </a>
            </Link>
            .
          </LessonTip>
        </section>
        <section>
          <LessonHeading as="h3" id="width-height">
            Width & Height
          </LessonHeading>
          <p>
            De multe ori imaginile de pe site-uri își vor adapta dimensiunea în funcție de
            ecranul dispozitivului folosit: mai mici pe telefoane și tablete, mai mari
            pe laptop-uri și desktop-uri.
          </p>
          <p>
            În galeria de mai jos avem 2 imagini pe fiecare rând, fiecare ocupând
            exact 45% din lățimea ecranului - indiferent care e aceasta.
          </p>
          <LessonFigure
            withBorder
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/fixed-gallery.png"
            alt="Galerie cu 2 imagini pe fiecare rând"
            demo="/demo/html/galerie-imagini-fixa"
          />
          <p>
            Însă există situații în care o imagine va avea aceleași dimensiuni fixe indiferent
            de dispozitiv. Un exemplu ar putea fi logo-ul unei companii
            aflat de obicei în
            {' '}
            <strong className="formatted">{'<header>'}</strong>
            {' '}
            -ul paginii.
          </p>
          {/* <LessonFigure
            withBorder
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/fixed-size-image.png"
            alt="Imagine cu dimensiunile fixe"
            demo="/demo/html/imagine-cu-dimensiuni-fixe"
          /> */}
          <p>
            În astfel de cazuri, în care
            {' '}
            <strong>știm dinainte dimensiunea</strong>
            {' '}
            , este recomandat
            să adăugam și atributele
            <strong> width </strong>
            și
            {' '}
            <strong> height </strong>
            .
          </p>
          <LivePreviewDemo
            language="html"
            className="row"
            alt="Imagine cu dimensiunile fixe"
            demo="/demo/html/imagine-cu-dimensiuni-fixe"
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
          <p>
            Astfel, browser-ul va ști dimensiunile imaginii înainte de a o descărca
            iar experiența utilizatorilor va fi extrem de fluidă. Astfel evităm
            situația de mai jos unde textul se re-aranjează după încărcarea imaginii
            - problemă cunoscută sub numele de
            {' '}
            <strong>content/layout shifting</strong>
            .
          </p>
          <LessonFigure
            isVideo
            withBorder
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/content-shift.mp4"
            alt="Conținutul text se re-aranjează după încărcarea imaginii"
            demo="/demo/html/content-shifting"
          />
        </section>
        <div className="dots" />
        <section>
          <p>
            Ce am arătat până acum reprezintă fundamentele imaginilor în HTML.
            Sunt lucrurile pe care le vei folosi în marea majoritate a cazurilor...
          </p>

          <p>
            Mai jos continuăm să discutăm despre diverse tehnici
            pentru a optimiza servirea imaginilor și a oferi cea mai
            bună experiență posibilă, care la randul ei va mări
            șansele ca
            {' '}
            <a href="https://web.dev/site-speed-and-business-metrics/" target="_blank" rel="noreferrer">
              proiectul/business-ul nostru să aibă succes.
            </a>
            .
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="lazy-loading">
            Lazy loading
          </LessonHeading>
          <blockquote>
            Most of the images on the web are downloaded,
            decoded and rendered only never to be seen, as [...]
            the user never scrolled that far.
            -
            {' '}
            <small>
              <a href="https://twitter.com/yoavweiss" target="_blank" rel="noopener noreferrer">Yoav Weiss</a>
            </small>
          </blockquote>
          <p>
            Citatul de mai sus a rămas - din păcate - la fel de adevărat...
            De câte ori nu ai deschis o pagină Web și apoi ai ieșit de acolo fără
            a citi mai mult de primul paragraf?
          </p>
          <p>
            În background însă, browser-ul a încărcat toate imaginile,
            ceea ce e o risipă pentru că noi nu le-am văzut pe toate.
            Ideal ar fi să încărcăm imaginile
            <strong>
              {' '}
              doar atunci când avem nevoie de ele
              {' '}
            </strong>
            .
            {/* , */}
            {/* cum se întâmplă în video-ul din dreapta. */}
          </p>
          {/* TODO: video demo */}
          {/* <h1> VIDEO DEMO </h1> */}
          <p>
            Pentru a rezolva această problemă vom
            folosi atributul
            {' '}
            <strong>loading</strong>
            {' '}
            și valoarea
            {' '}
            <strong>lazy</strong>
            .
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<img 
  alt="Eiffel tower during night"
  src="eiffel-tower-during-night.jpg"
  loading="lazy"
/>
`}
          />
          <p>
            Acum browserul va descărca imaginea doar când ne
            <em>"apropiem"</em>
            {' '}
            de ea. Fiecare browser are propriile metrici legate
            de ce înseamnă această apropiere, însă nu trebuie să ne batem
            capul cu asta. Regula generală e să adăugăm atributul
            {' '}
            <strong className="formatted">loading="lazy"</strong>
            {' '}
            dacă avem multe imagini în pagină.
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="imagini-responsive">
            Responsive images
          </LessonHeading>
          <p>
            Am pornit de la imagini simple, am optimizat experiența folosind
            atributele width/height iar apoi am reușit să incărcăm doar imaginile
            de care avem nevoie folosind atributul
            {' '}
            <strong className="formatted">
              loading
            </strong>
            . Acum e momentul să mergem un pas mai departe în călătoria spre performanță
            și să încărcăm imaginea cea mai potrivită din punct de vedere al rezoluției.
          </p>
          <p>
            De exemplu, să presupunem că avem o imagine care va acoperi întreaga pagină:
          </p>
          <LessonFigure
            withBorder
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/full-screen-image-illustration.jpg"
            alt="Imagine full-screen intr-o pagină Web"
          />
          <blockquote>
            La ce rezoluție salvăm imaginea pentru a fi 100% clară pe toate dispozitivele?
          </blockquote>
          <p>
            Știind că site-ul poate fi văzut atât de pe dispozitive mobile,
            cu ecrane mai mici, cât și de pe desktop-uri sau chiar televizoare,
            o primă soluție ar fi să salvăm imaginea la o rezoluție cât mai
            înaltă - să zicem 4K- pentru a ne asigura că totul e ok.
            {/* Pentru imaginea folosita ca demo in acest capitol inseamna o dimensiune de xMB. */}
          </p>
          <p>
            Deși soluția ar funcționa, ea nu e deloc eficientă, căci vom încărca
            mereu aceeași imagine de rezoluție înaltă și mulți MBs.
            Pe telefon de exemplu, unde ecranul e mai mic, nu avem nevoie
            de toți cei 8+ milioane de pixeli (3840 x 2160).
            Dacă luăm în calcul și conexiunea la internet, experiența poate arăta așa:
          </p>
          <LessonFigure
            isVideo
            withBorder
            demo="/demo/html/incarcarea-unei-imagini-mari"
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/huge-image-loading.mp4"
            alt="Încărcarea unei imagini mari pe o conexiune înceată"
          />
          <p>
            Ideal ar fi ca pe telefon să încărcăm exact aceeași imagine dar la o
            rezoluție mai mică, pe tabletă la o rezoluție mijlocie și la o rezoluție
            cât mai inaltă pe ecrane mari: desktop and beyond.
          </p>
          <p>
            Din fericire putem rezolva această problemă folosindu-ne de atributul
            {' '}
            <strong>srcset</strong>
            . Hai să luăm imaginea noastră și să facem resize la 3 rezoluții diferite:
          </p>
          <LessonFigure
            withBorder
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle_resize_infographic.jpg"
            alt="Aceeași imagine în 3 dimensiuni diferite"
          />
          <LessonTip>
            Pe Windows putem face resize cu
            {' '}
            <strong>Paint</strong>
            {' '}
            iar pe MacOS folosind
            {' '}
            <strong>
              <a href="https://support.apple.com/guide/preview/resize-rotate-or-flip-an-image-prvw2015/mac" target="_blank" rel="noreferrer">Preview App</a>
            </strong>
            {' '}
            .
          </LessonTip>
          <p>
            Apoi vom adăuga atributul srcset unde definim diferitele
            surse ale imaginii împreună cu dimensiunea (în lățime) a fiecăreia:
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<img srcset="
    /red_bycicle__high.jpg 4000w,
    /red_bycicle__med.jpg 2000w,
    /red_bycicle__low.jpg 800w,
  " 
  alt="Red bycicle wheel" 
/>`}
          />
          {/* <LessonTip icon={faQuestionCircle}>
            Atributul
            {' '}
            <strong>style</strong>
            {' '}
            este folosit pentru a adauga reguli
            CSS elementelor.
            {' '}
            Inca nu am ajuns la acel capitol deci e absolut normal sa nu stii ce face.
            <br />
            {' '}
            <br />
            Totusi, te rugam sa-l pui acolo, impreuna cu valoarea `max-width: 100%.
            Astfel ne asiguram ca imaginile nu vor iesi din pagina.
          </LessonTip> */}
          <p>
            Șiiii voilà. Dacă mergem în
            {' '}
            <a href="/intro/devtools">modul responsive</a>
            {' '}
            - și ținem tabul
            {' '}
            <strong>network</strong>
            {' '}
            deschis vom observa cum diferite surse ale imaginii
            se încarcă la rezoluții diferite.
          </p>
          <LessonFigure
            isVideo
            withBorder
            demo="/demo/html/atributul-srcset"
            src="https://d3tycb976jpudc.cloudfront.net/demo-assets/img-srcset.mp4"
            alt="Diferite surse ale imaginii se încarcă la rezoluții diferite"
          />
          <p>
            Te încurajăm să experimentezi și cu opțiunea
            {' '}
            <Link href="intro/devtools">
              <a target="_blank">
                DRP (Device Pixel Ratio)
              </a>
            </Link>
            {' '}
            De exemplu, cu o valoare
            de 2 și o lățime de 650px se va incărca imaginea
            {' '}
            <strong>red_bycicle__med.jpg</strong>
            .
          </p>
        </section>
        <section>
          <LessonHeading as="h3" id="elementul-picture">
            {'Elementul <picture>'}
          </LessonHeading>
          <p>
            După cum ai văzut până acum, elementul
            {' '}
            <strong className="formatted">{'<img>'}</strong>
            {' '}
            - deși destul de simplu în utilizare - ne oferă mai multe funcționalități
            care ne permit să optimizăm imaginile și experiența utilizatorilor.
            Cu toate acestea, a mai rămas totuși o ultimă optimizare,
            și anume folosirea unor formate moderne pentru imagini.
          </p>
          <blockquote>
            De ce am vrea alte formate? Nu sunt
            {' '}
            <strong>JPG</strong>
            {' '}
            sau
            {' '}
            <strong>PNG</strong>
            {' '}
            de ajuns?
          </blockquote>
          <p>
            Hmmm.... nu chiar. Există formate mai moderne precum
            {' '}
            <strong>WebP</strong>
            {' '}
            sau
            {' '}
            <strong>AVIF</strong>
            {' '}
            care
            oferă aceeași calitate a imaginii la o dimensiune mai mică.
            Uite diferențele de dimensiune ale acestei imagini în funcție de format:
          </p>
          <LessonTable {...sizesTable} className="my-5" />
          <p>
            După cum vezi formatele WebP și AVIF sunt mai mici decât JPG sau PNG,
            deci imaginile în acest format se vor incărca mai repede decât celelalte.
            Problema este că nu toate browserele înțeleg aceste noi formate.
          </p>
          <p>
            După cum vedem pe
            {' '}
            <a href="https://CanIUse.com" target="_blank" rel="noreferrer">Can I use...</a>
            - AVIF are suport doar în ultimele versiuni
            de Google Chrome în timp ce WebP este mai comun însă tot lipsește din
            IOS 13 sau Internet Explorer 11.
          </p>
          <SideBySidePictures
            direction="column"
            img1={{
              src: 'https://d3tycb976jpudc.cloudfront.net/demo-assets/caniuse-webp.png',
              alt: 'Suportul browserelor pentru formatul WebP',
              demo: 'https://caniuse.com/?search=webp',
            }}
            img2={{
              src: 'https://d3tycb976jpudc.cloudfront.net/demo-assets/caniuse-avif.png',
              alt: 'Suportul browserelor pentru formatul Avif',
              demo: 'https://caniuse.com/?search=avif',
            }}
          />
          <p>
            Deci avem nevoie de o modalitate prin care browsere care înțeleg
            {' '}
            <strong>WebP</strong>
            {' '}
            sau
            {' '}
            <strong> Avif</strong>
            {' '}
            să descarce aceste formate, în timp ce celelalte să rămână la JPG.
            Această tehnică se numește general
            {' '}
            <a href="/concepte/graceful-degradation">graceful degradation</a>
            .
          </p>
          <p>
            Thankfully, această soluție ne este permisă de tag-ul
            {' '}
            <strong className="formatted">{'<picture>'}</strong>
            {' '}
            ,
            unde putem specifica mai multe surse pentru o imagine și să lăsăm
            browserul să o aleagă pe cea pe care o înțelege.
          </p>
          <Highlight
            className="my-5"
            language="html"
            code={`
<picture>
  <source 
    srcset="
      red_bycicle__high.avif 4000w, 
      red_bycicle__med.avif 2000w, 
      red_bycicle__low.avif 800w" 
    type="image/avif">

  <source 
    srcset="
      red_bycicle__high.webp 4000w, 
      red_bycicle__med.webp 2000w, 
      red_bycicle__low.webp 800w"
    type="image/webp">

  <source 
    srcset="
      red_bycicle__high.jpg 4000w, 
      red_bycicle__med.jpg 2000w, 
      red_bycicle__low.jpg 800w" 
    type="image/jpeg">

  <img 
    alt="Red bycicle wheel"
    loading="lazy"
    srcset="
      red_bycicle__high.jpg 4000w, 
      red_bycicle__med.jpg 2000w, 
      red_bycicle__low.jpg 800w
    ">
</picture>`}
          />
        </section>
        <p>
          Ordinea elementelor
          {' '}
          <strong className="formatted">{'<source>'}</strong>
          {' '}
          este extrem de importantă căci browserul le va parcurge
          de sus-in-jos și o va alege pe prima compatibilă. De asemenea,
          în fiecare dintre ele trebuie adăugat - via atributul
          {' '}
          <strong>srcset</strong>
          {' '}
          - mai multe surse de dimensiuni diferite.
          Astfel browserul nu alege numai formatul cel mai bun, cât și
          dimensiunea optimă a imaginii. Best of both worlds! 💪
        </p>
        <p>
          PS: poate ai observat acel ultim
          {' '}
          <strong className="formatted">{'<img>'}</strong>
          {' '}
          tag. Ei bine, avem nevoie de el pentru
          a specifica descrierea imaginii - în caz că aceasta nu poate fi încărcată,
          cât și pentru eventuala adaugare a unor atribute extra - cum ar fi
          {' '}
          <strong>loading</strong>
          . Iar în cazurile mai rare în care utilizatorii folosesc browsere
          destul de vechi, ce nu înțeleg elementul
          {' '}
          <strong className="formatted">{'<picture>'}</strong>
          {' '}
          , acestea vor înțelege
          totuși tag-ul
          {' '}
          <strong className="formatted">{'<img>'}</strong>
          {' '}
          și îl vor arăta pe acesta.
        </p>
        <div className="dots" />
        <LessonResources
          className="my-5"
          links={[{
            text: 'Documentația completă a elementului <img> pe MDN',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img',
          }, {
            text: 'Documentația completă a elementului <picture> pe MDN',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture',
          }, {
            text: 'Mai multe detalii despre imagini Responsive',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture',
          },
          ]}
        />
      </Lesson>
    </>
  );
}
