import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLightbulb, faPen } from '@fortawesome/free-solid-svg-icons';

import { GITHUB_URL } from '~/services/Constants';
import PageContainer from '~/components/PageContainer';
import Button from '~/components/Button';

import styles from './NoSubmissionsYet.module.scss';

function NoSubmissionsYet() {
  const [help, setHelp] = useState<'code' | 'lessons' | 'exercises'>(null);

  return (
    <PageContainer className={styles['no-submissions-yet']}>
      <h1> Vreau să ajut</h1>
      <h2>
        Ne bucuram ca-ti place ideea si ca vrei sa te implici. Uite cele 3 moduri prin care o poti
        face acum:
      </h2>
      <div className={`${styles['help-wrapper']} d-flex  justify-content-between align-items-center`}>
        <Button
          onClick={() => setHelp('code')}
          className={`${help === 'code' ? 'btn--blue ' : 'btn--transparent '} btn align-items-center`}
        >
          <FontAwesomeIcon height="24" width="32" className="mr-2" icon={faCode} />
          Vreau să codez
          la platformă
        </Button>

        <Button
          onClick={() => setHelp('lessons')}
          className={`${help === 'lessons' ? 'btn--blue ' : 'btn--transparent '}btn align-items-center`}
        >
          <FontAwesomeIcon height="24" width="32" className="mr-2" icon={faPen} />
          Vreau să scriu lecții
        </Button>

        <Link href="/exercitii/creeaza">
          <a className={`${help === 'exercises' ? 'btn--blue ' : 'btn--transparent '}btn align-items-center`}>
            <FontAwesomeIcon height="24" width="32" className="mr-2" icon={faLightbulb} />
            Vreau să creez exerciții
          </a>
        </Link>
      </div>
      {help && (
        <div className={styles['help-explanation']}>
          {help === 'code' && (
            <>
              <h3> Codează la platformă </h3>
              <p>
                Tot codul este
                {' '}
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">open-source pe GitHub</a>
                ,
                deci cel mai ușor mod de a începe este pornind de la secțiunea
                {' '}
                <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer">issues</a>
                .
              </p>
              <p>
                Dacă nu avem
                {' '}
                <em>pending-issues</em>
                {' '}
                sau dacă ai vreo idee de funcționalitate
                mai mare, dă-ne un semn și hai s-o facem realitate! 💪
              </p>
            </>
          )}

          {help === 'lessons' && (
            <>
              <h3> Scrie lecții </h3>
              <p>
                Aruncă un ochi
                {' '}
                <Link href="/lectii">
                  <a>
                    aici
                  </a>
                </Link>
                {' '}
                pentru a vedea toate lecțiile scrise deja, cât și cele pe care
                ne dorim să le scriem dar n-am apucat încă.
              </p>
              <p>
                Dar nu trebuie să te rezumi doar la ce e acolo. Dacă ai idei de subiecte pe care noi
                nu le-am menționat, cu atât mai bine. Dă-ne un semn și să trecem la treabă! 🔥
              </p>
            </>
          )}
          {help === 'exercises' && (
            <>
              <h3> Creează exerciții </h3>
              <p>
                La finalul fiecărei lecții găsești o serie de exerciții specifice pentru
                acel capitol. Dacă ai idei de exerciții mai interesante/utile,
                așteptăm submisii noi împreună cu soluțiile lor.
              </p>
            </>
          )}
        </div>
      )}
    </PageContainer>
  );
}

export default NoSubmissionsYet;
