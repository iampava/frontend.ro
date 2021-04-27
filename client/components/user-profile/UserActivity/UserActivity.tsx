import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ExercisePreview from '~/components/ExercisePreview';
import PageContainer from '~/components/PageContainer';
import { Submission } from '~/redux/exercise-submissions/types';
import { RootState } from '~/redux/root.reducer';
import { UserState } from '~/redux/user/types';
import ExerciseService from '~/services/Exercise.service';
import NoActivity from '../NoActivity/NoActivity';
import { SUBMISSION_STATUS } from '~/../shared/SharedConstants';
import styles from './UserActivity.module.scss';

interface Props {
  profileUser: UserState['info']
}

function UserActivity({ profileUser, currentUser }: ConnectedProps<typeof connector> & Props) {
  const isOwnProfile = currentUser.info && currentUser.info.username === profileUser.username;
  const [solvedExercises, setSolvedExercises] = useState<Submission[]>(undefined);
  const [createdExercises, setCreatedExercises] = useState(undefined);

  useEffect(() => {
    // Solved exercises
    if (isOwnProfile) {
      ExerciseService
        .getSolvedExercises()
        .then((resp) => setSolvedExercises(resp))
        .catch((err) => console.error(err));
    } else {
      setSolvedExercises([]);
    }

    // Created exercises
    const createdExercisesPromise = isOwnProfile
      ? ExerciseService.getCreatedExercises()
      : ExerciseService.getPublicCreatedExercises(profileUser.username);

    createdExercisesPromise.then((resp) => {
      setCreatedExercises(resp);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  if (!createdExercises || !solvedExercises) {
    // Loading
    return null;
  }

  if (createdExercises.length === 0 && !isOwnProfile) {
    return <NoActivity user={profileUser} />;
  }

  return (
    <PageContainer>
      <h2>
        Exerciții rezolvate
      </h2>
      {}
      <div className={styles['exercises-wrapper']}>
        {solvedExercises.map((submission: Submission, index) => (
          <ExercisePreview
            key={submission._id}
            exercise={submission.exercise}
            href={`rezolva/${submission.exercise._id}`}
            viewMode="STUDENT"
            feedbackCount={submission.feedbacks.filter((f) => f.type === 'improvement').length}
            isApproved={submission.status === SUBMISSION_STATUS.DONE}
            readOnly={[
              SUBMISSION_STATUS.AWAITING_REVIEW,
              SUBMISSION_STATUS.DONE,
            ].includes(submission.status)}
          />
        ))}
        {solvedExercises.length === 0 && (
          <Link href="/exercitii">
            <a className="d-flex align-items-center justify-content-center no-underline text-center">
              <FontAwesomeIcon icon={faPlus} width="32" height="32" />
              <span> Rezolvă un exercițiu </span>
            </a>
          </Link>
        )}
      </div>
      <hr />
      <h2> Exerciții create </h2>
      <div className={styles['exercises-wrapper']}>
        {createdExercises.map((ex, index) => (
          <ExercisePreview
            key={ex._id}
            exercise={ex}
            href={`exercitii/${ex._id}`}
            isPrivate={ex.private}
            viewMode={isOwnProfile ? 'TEACHER' : 'STUDENT'}
            feedbackCount={0}
            isApproved={false}
            readOnly={false}
          />
        ))}
        {isOwnProfile && (
          <Link href="/exercitii/creeaza">
            <a className="d-flex align-items-center justify-content-center no-underline text-center">
              <FontAwesomeIcon icon={faPlus} width="32" height="32" />
              <span> Creează un nou exercițiu </span>
            </a>
          </Link>
        )}

      </div>
    </PageContainer>
  );
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.user,
  };
}

const connector = connect(mapStateToProps);

export default connector(UserActivity);
