import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import noop from 'lodash/noop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan, faCheck, faSpinner, faSync, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PageContainer from '~/components/PageContainer';
import SweetAlertService from '~/services/sweet-alert/SweetAlert.service';
import { withAuthModal } from '~/services/Hooks';
import { RootState } from '~/redux/root.reducer';
import UserService from '~/services/User.service';
import Button from '~/components/Button';
import { tasks, Task } from './GitGithubChallenge.model';
import GitHubService from '~/services/api/GitHub.service';
import ChallengesService from '~/services/api/Challenge.service';

import styles from './GitGithubChallenge.module.scss';

type TaskState = 'available' | 'loading' | 'error' | 'done' | 'disabled';

const OWNER = 'FrontEnd-ro';
const CHALLENGE_ID = 'git-github';
const REPO = 'git-github-practice-exercises';

function GitGithubChallenge({ user }: ConnectedProps<typeof connector>) {
  const router = useRouter();
  const [lastDoneTask, setLastDoneTask] = useState(null);
  const [errorForTask, setErrorForTask] = useState<{id: string, message: string}>(null);
  const [githubUsername, setGithubUsername] = useState(null);
  const [taskIdBeingVerified, setTaskIdBeingVerified] = useState(null);

  const indexOfLastDoneTask = tasks.findIndex((task) => task.id === lastDoneTask);

  const metaRef = useRef({});

  const verifyTask = async (task: Task) => {
    setTaskIdBeingVerified(task.id);
    setErrorForTask(null);

    try {
      const { isDone, errMessage, meta } = await task.verify({
        repo: REPO,
        owner: OWNER,
        username: githubUsername,
        // meta from previous task
        meta: metaRef.current[lastDoneTask],
      });

      if (isDone) {
        metaRef.current[task.id] = meta;
        setLastDoneTask(task.id);

        // TODO: what if this fails!!!???
        await ChallengesService.putLastDoneTask(CHALLENGE_ID, task.id, metaRef.current);
      } else {
        delete metaRef.current[task.id];
        setLastDoneTask(tasks[tasks.indexOf(task) - 1]?.id);
        setErrorForTask({
          id: task.id,
          message: errMessage,
        });
      }
    } catch (err) {
      // TODO: add error directly in the task
      console.error(err);
    }

    setTaskIdBeingVerified(null);
  };

  const handleGitHubRedirect = () => {
    if (router.query.error_description) {
      const errorDescription = Array.isArray(router.query.error_description)
        ? router.query.error_description[0]
        : router.query.error_description;

      SweetAlertService.toast({
        text: errorDescription,
        type: 'error',
        timer: 4000,
      });
    }

    router.replace(router.pathname);
  };

  useEffect(handleGitHubRedirect, []);

  useEffect(() => {
    if (user.info) {
      // If user is logged in then let's get his github credentials!
      setTaskIdBeingVerified(tasks[0].id);

      UserService
        .getGithubAccount()
        .then(async (githubUser) => {
          setGithubUsername(githubUser.login);
          GitHubService.init(githubUser.access_token);

          const { lastDoneTask, meta } = await ChallengesService.getLastDoneTask(CHALLENGE_ID);
          if (lastDoneTask) {
            metaRef.current = meta || {};
            setLastDoneTask(lastDoneTask);
          } else {
            await ChallengesService.startTask(CHALLENGE_ID);
            setLastDoneTask(tasks[0].id);
          }
        })
        .catch((err) => {
          console.log('ERROR', err);
          setLastDoneTask(null);
        })
        .finally(() => setTaskIdBeingVerified(null));
    }
  }, [user.info]);

  return (
    <PageContainer>
      <h1> Git & GitHub challenge 🚀</h1>
      <p>
        Dacă ai ajuns la acestă pagină înseamnă că faci parte
        din grupul de Alpha Testeri care ne ajută cu feedback,
        sau ne-ai stalkuit pe repo-ul din GitHub să vezi cum
        se numesc rutele 👀
      </p>
      <p>
        Mai jos găsești primul challenge interactiv al platformei noastre.
        Acesta conține challenge-uri ce se auto-validează ;)
      </p>

      {!user.info && (
      <Button variant="success" onClick={withAuthModal(!!user.info, noop)}>
        Autentifica-te ca sa incepi provocarea
      </Button>
      )}

      <ul className={styles['task-list']}>
        {tasks.map((task, index) => {
          let state: TaskState = 'available';
          const isDisabled = !user.info
          || indexOfLastDoneTask < index - 1
          || indexOfLastDoneTask >= index;

          if (isDisabled) {
            state = 'disabled';
          }

          if (indexOfLastDoneTask >= index) {
            state = 'done';
          } else if (taskIdBeingVerified === task.id) {
            state = 'loading';
          } else if (errorForTask?.id === task.id) {
            state = 'error';
          }

          let icon = <FontAwesomeIcon icon={faSync} />;

          if (state === 'done') {
            icon = <FontAwesomeIcon icon={faCheck} />;
          } else if (state === 'disabled') {
            icon = <FontAwesomeIcon icon={faBan} />;
          } else if (state === 'loading') {
            icon = <FontAwesomeIcon className="rotate" icon={faSpinner} />;
          } else if (state === 'error') {
            icon = <FontAwesomeIcon icon={faTimes} />;
          }

          return (
            <li className={`${styles.task} ${styles[`task--${state}`]}`} key={task.id}>
              <Button disabled={isDisabled} onClick={() => verifyTask(task)}>
                {icon}
              </Button>
              <div>
                {task.title}
                {/* <Button
                  style={{ marginLeft: '1em' }}
                  variant={indexOfLastDoneTask >= index ? 'success' : 'blue'}
                  loading={taskIdBeingVerified === task.id}
                  disabled={isDisabled}
                  onClick={() => verifyTask(task)}
                >
                  {indexOfLastDoneTask >= index ? 'DONE' : 'DO IT'}

                </Button> */}
                {errorForTask?.id === task.id && (
                <p className={styles.task__error}>
                  {errorForTask.message}
                </p>
              )}
              </div>
            </li>
          );
        })}
      </ul>

      {lastDoneTask === tasks[tasks.length - 1].id && (
        <>
          <hr />
          <h2> Hooooray! You're ALL DONE! 🎉🎉🎉 </h2>
        </>
      )}
    </PageContainer>
  );
}

function mapStateToProps(state: RootState) {
  return {
    user: state.user,
  };
}

const connector = connect(mapStateToProps);

export default connector(GitGithubChallenge);
