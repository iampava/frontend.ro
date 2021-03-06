import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Spinner from '~/components/Spinner';
import Markdown from '~/components/Markdown';
import { RootState } from '~/redux/root.reducer';
import { withAuthModal } from '~/services/Hooks';
import TableOfContents from '~/components/TableOfContents';
import PageContainer from '~/components/PageContainer';
import StatusBanner from './StatusBanner/StatusBanner';
import SubmissionService from '~/services/Submission.service';
import { UserState, LessonExercise } from '~/redux/user/types';
import { SUBMISSION_STATUS } from '~/../shared/SharedConstants';
import LessonExerciseService from '~/services/LessonExercise.service';
import SweetAlertService from '~/services/sweet-alert/SweetAlert.service';
import PageWithAsideMenu from '~/components/layout/PageWithAsideMenu/PageWithAsideMenu';

import styles from './SolveExercise.module.scss';
import { getLessonById } from '~/services/Constants';
import CompleteEditorLazy from '../Editor/CompleteEditor/CompleteEditor.lazy';
import Feedbacks from '../Editor/Feedbacks';
import Button from '../Button';

interface Props {
  exerciseId: string;
}

interface Submission {
  _id?: string;
  user: UserState['info'];
  exercise: LessonExercise;
  code: string;
  assignee: UserState['info'];
  status: string;
  feedbacks: {
    _id: string;
    type: string;
    body: string;
  }[]
}

function SolveExercise({ exerciseId, userInfo }: ConnectedProps<typeof connector> & Props) {
  const solutionRef = useRef(null);
  const [submission, setSubmission] = useState<Submission>(null);
  const [fetchError, setFetchError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lessonExercises, setLessonExercises] = useState<LessonExercise[]>([]);

  const readonly = submission && (
    submission.status === SUBMISSION_STATUS.DONE
    || submission.status === SUBMISSION_STATUS.AWAITING_REVIEW
  );

  const exerciseIndex = lessonExercises.findIndex((ex) => {
    return ex._id === submission?.exercise?._id;
  });

  const folderStructure = React.useMemo(() => {
    if (!submission) {
      return null;
    }

    return JSON.parse(submission.code || submission.exercise.example);
  }, [submission]);

  const submitSolution = async () => {
    const code = solutionRef.current.getFolderStructure();

    if (!code) {
      SweetAlertService.toast({
        timer: 5000,
        type: 'error',
        text: 'Hmm, dacă nu introduci o soluție pe ce să-ți dăm feedback?',
      });
      return;
    }

    if (submission.feedbacks.length > 0) {
      SweetAlertService.toast({
        timer: 5000,
        type: 'error',
        text: 'Mai sunt câteva feedback-uri nerezolvate.',
      });
      return;
    }

    setIsSubmitting(true);

    let updatedSubmission;
    if (submission._id) {
      updatedSubmission = await SubmissionService.updateSubmission(submission._id, {
        status: SUBMISSION_STATUS.AWAITING_REVIEW,
        code,
      });
    } else {
      updatedSubmission = await SubmissionService.submitSubmission(exerciseId, code);
    }

    setIsSubmitting(false);
    setSubmission(updatedSubmission);

    SweetAlertService.toast({
      type: 'success',
      text: 'Ai trimis soluția cu succes',
    });
  };

  const exitReadonly = () => {
    return SubmissionService.updateSubmission(submission._id, {
      status: SUBMISSION_STATUS.IN_PROGRESS,
    })
      .then(setSubmission)
      .catch((err) => {
        console.error('[exitReadonly]', err);
        SweetAlertService.toast({
          type: 'error',
          text: 'Oops! Nu am putut să edităm acest exercițiu. Încearcă din nou!',
        });
      });
  };

  const fetchExercise = () => {
    return LessonExerciseService
      .getLessonExercise(exerciseId)
      .then((exercise) => {
        setSubmission({
          user: null,
          exercise,
          code: null,
          feedbacks: [],
          assignee: null,
          status: SUBMISSION_STATUS.IN_PROGRESS,
        });
      })
      .catch((err) => {
        console.error('[fetchExercise]', err);
        setFetchError(true);
      });
  };

  const fetchSubmission = () => {
    return SubmissionService
      .getOwnSubmission(exerciseId)
      .then((submission) => {
        setSubmission(submission);
      })
      .catch((err) => {
        if (err.code === 404) {
          fetchExercise();
          return;
        }
        console.error('[fetchSubmission]', err);
        setFetchError(true);
      });
  };

  const fetchExercisesFromLesson = (lessonId) => {
    return LessonExerciseService
      .getAllExercisesForLessons(lessonId)
      .then((lessonExercises) => setLessonExercises(lessonExercises))
      .catch((err) => {
        // Do nothing since the default value is empty Array
        // so the UI is non-breaking
        console.error('[SolveExercise.fetchExercisesFromLesson]', err);
      });
  };

  const onFeedbackDone = (_id: string) => {
    console.log(_id, submission.feedbacks.filter((f) => f._id !== _id));
    setSubmission({
      ...submission,
      feedbacks: submission.feedbacks.filter((f) => f._id !== _id),
    });
  };

  useEffect(() => {
    const isLoggedIn = !!userInfo;

    if (isLoggedIn) {
      fetchSubmission();
    } else {
      fetchExercise();
    }
  }, [exerciseId]);

  useEffect(() => {
    if (submission) {
      fetchExercisesFromLesson(submission.exercise.lesson);
    }
  }, [submission]);

  if (fetchError) {
    return (
      <>
        <Header withNavMenu />
        <PageContainer className="text-center">
          <h1> Oops 😟</h1>
          <h2> Exercițiul e privat sau nu există </h2>

          <Link href="/">
            <a className="btn btn--blue">
              Navighează acasă
            </a>
          </Link>
        </PageContainer>
        <Footer />
      </>
    );
  }
  if (!submission) {
    return (
      <PageContainer className="relative">
        <Spinner showText />
      </PageContainer>
    );
  }

  return (
    <PageWithAsideMenu menu={{
      title: getLessonById(submission.exercise.lesson).title,
      Component: (
        <TableOfContents
          chapters={lessonExercises.map((lessonEx, index) => ({
            id: lessonEx._id,
            title: `Exercițiu #${index + 1}`,
            href: `/rezolva/${lessonEx._id}`,
          }))}
        />
      ),
    }}
    >
      {readonly && (
        <StatusBanner
          status={submission.status}
          onExitReadonly={exitReadonly}
        />
      )}
      <PageContainer className="relative">
        <h1 className="mb-0">
          Exercițiu
          {' '}
          {submission.exercise.type.toUpperCase()}
        </h1>
        <p className="m-0">
          Creat de
          {' '}
          <Link href={`/${submission.exercise.user.username}`}>
            <a>
              {submission.exercise.user.name || submission.exercise.user.username}
            </a>
          </Link>

        </p>
        <Markdown markdownString={submission.exercise.body} className={styles.bodyMarkdown} />
        <section>
          <h2> Rezolvă exercițiul </h2>
          <CompleteEditorLazy
            readOnly={readonly}
            key={exerciseId}
            ref={solutionRef}
            askTooltip={false}
            onFeedbackDone={onFeedbackDone}
            feedbacks={submission.feedbacks}
            folderStructure={folderStructure}
          />
        </section>
        <section className="my-5 d-flex align-items-center justify-content-between">
          <Button
            disabled={readonly}
            loading={isSubmitting}
            variant="success"
            onClick={withAuthModal(!!userInfo, submitSolution)}
          >
            {userInfo ? 'Trimite' : 'Autentifică-te și trimite soluția'}
          </Button>
          {
            (submission.status !== SUBMISSION_STATUS.IN_PROGRESS)
            && (exerciseIndex + 1 < lessonExercises.length) && (
              <Link href={`/rezolva/${lessonExercises[exerciseIndex + 1]._id}`}>
                <a className="btn btn--default no-underline">
                  Rezolvă următorul exercițiu!
                </a>
              </Link>
            )
          }
        </section>
      </PageContainer>
    </PageWithAsideMenu>
  );
}

function mapStateToProps(state: RootState) {
  return {
    userInfo: state.user.info,
  };
}

const connector = connect(mapStateToProps);

export default connector(SolveExercise);
