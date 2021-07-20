import React from 'react';
import SEOTags from '~/components/SEOTags';
import { getLessonById } from '~/services/Constants';
import Lesson, {
  LessonTip,
  LessonCover,
  LessonFigure,
  LessonHeading,
  LessonContributors,
  LessonQuote,
  LessonFirstSentence,
} from '~/components/lessons';
import SideBySidePictures from '~/components/SideBySidePictures';

function Containers() {
  const lessonInfo = getLessonById('containere');

  const chapters = [
    {
      title: 'De ce avem nevoie de aceste elemente?',
      id: 'why',
    }, {
      title: 'Header, Main și Footer',
      id: 'header-main-footer',
    }, {
      title: 'Nav',
      id: 'nav',
    }, {
      title: 'Aside',
      id: 'aside',
    }, {
      title: 'Div',
      id: 'div',
    },
  ];
  // SEO image must be exactly 1200x630
  const seoImage = '/seo/containers_1200w.jpg';
  const coverImage = '/seo/containers_2400w.jpg';

  return (
    <>
      <SEOTags
        description={lessonInfo.description}
        title={`${lessonInfo.title} | Lecție HTML`}
        url={`https://FrontEnd.ro/${lessonInfo.url}`}
        shareImage={seoImage}
      >
        <link rel="preload" as="image" href={coverImage} />
      </SEOTags>
      <Lesson id={lessonInfo.id} title={lessonInfo.title} chapters={chapters} withExercises>
        <LessonContributors className="absolute" contributors={lessonInfo.contributors} />
        <LessonCover>
          <img alt="TODO" src={coverImage} />
        </LessonCover>
        <LessonFirstSentence>
          Am parcurs câteva elemente de bază, dar nu am vorbit despre cum le organizăm pentru
          a crea layout-uri mai complexe. Aici intervin elementele de tip “container”.
        </LessonFirstSentence>
        <section>
          <LessonHeading as="h2" id={chapters[0].id}>
            {chapters[0].title}
          </LessonHeading>
          <p>
            Fiecare pagina Web are un layout specific - adica o structura
            generala dupa care elementele sunt aranjate. Spre exemplu,
            pagina
            {' '}
            <a href="https://developer.mozilla.org"> Mozilla Developer Network</a>
            {' '}
            de mai jos are 4 mari sectiuni:
          </p>
          <LessonFigure
            withBorder
            alt="Mozilla Developer Network Layout"
            src="/images/lessons/containers/MDN-layout.png"
          />
          <LessonFigure
            withBorder
            alt="CodePen Layout"
            src="/images/lessons/containers/CodePen-layout.png"
          />
        </section>
      </Lesson>
    </>
  );
}

export default Containers;
