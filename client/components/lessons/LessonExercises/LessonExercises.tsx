import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConnectedProps, connect } from 'react-redux';
import LessonHeading from '../LessonHeading/LessonHeading';
import LessonExerciseService from '~/services/LessonExercise.service';
import { LessonExercise } from '~/redux/user/types';
import Spinner from '~/components/Spinner';
import ExercisePreview from '~/components/ExercisePreview';
import { RootState } from '~/redux/root.reducer';
import { Submission } from '~/redux/exercise-submissions/types';
import { SUBMISSION_STATUS } from '~/../shared/SharedConstants';
import ExerciseService from '~/services/Exercise.service';

import styles from './LessonExercises.module.scss';

interface Props {
  lessonId: string
}

function LessonExercises({ user, lessonId }: Props & ConnectedProps<typeof connector>) {
  const isLoggedIn = !!user.info;

  const [submissions, setSubmissions] = useState<Submission[]>(undefined);
  const [exercises, setExercises] = useState<LessonExercise[]>(undefined);

  useEffect(() => {
    LessonExerciseService
      .getAllExercisesForLessons(lessonId)
      .then((exercises) => setExercises(exercises))
      .catch((err) => {
        console.error('[LessonExercises.useEffect]', err);
        setExercises([]);
      });

    if (isLoggedIn) {
      ExerciseService
        .getSolvedExercises()
        .then((resp) => setSubmissions(resp))
        .catch((err) => console.error(err));
    } else {
      setSubmissions([]);
    }
  }, []);

  if (!Array.isArray(exercises) || !Array.isArray(submissions)) {
    return (
      <div id="exercitii" className={styles.exercises}>
        <Spinner showText />
      </div>
    );
  }

  const mergedData: Submission[] = [];
  exercises.forEach((ex) => {
    const matchedSubmission = submissions.find((sub) => sub.exercise._id === ex._id);

    if (matchedSubmission) {
      mergedData.push(matchedSubmission);
    } else {
      mergedData.push({
        code: '',
        _id: ex._id,
        exercise: ex,
        feedbacks: [],
        status: null,
        user: user.info,
        submittedAt: null,
        updatedAt: null,
      });
    }
  });

  console.log('XXX', mergedData);

  return (
    <div className={`${styles.exercises} ${exercises.length === 0 ? styles['exercises--empty'] : ''}`}>
      <section>
        <LessonHeading as="h3" id="exercitii">
          Exerciții
        </LessonHeading>

        {exercises.length > 0 ? (
          <div className={styles['exercises-wrapper']}>
            {mergedData.map((sub) => (
              <ExercisePreview
                key={sub.exercise._id}
                exercise={sub.exercise}
                isPrivate={false}
                feedbackCount={sub.feedbacks.filter((f) => f.type === 'improvement').length}
                isApproved={sub.status === SUBMISSION_STATUS.DONE}
                viewMode="STUDENT"
                readOnly={[
                  SUBMISSION_STATUS.AWAITING_REVIEW,
                  SUBMISSION_STATUS.DONE,
                ].includes(sub.status)}
                href={`/rezolva/${sub.exercise._id}`}
              />
            ))}
          </div>
        ) : (
          <p className="mb-0">
            <strong> În curând vom adăuga exerciții </strong>
            {' '}
            la această lecție.
            Până atunci poți să rezolvi celelalte
            {' '}
            <Link href="/exercitii">
              <a className="text-bold">
                exerciții disponibile
              </a>
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    user: state.user,
  };
}

const connector = connect(mapStateToProps);

export default connector(LessonExercises);
