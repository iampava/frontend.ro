import React, { useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useRouter } from 'next/router';
import Form from '../Form';
import Login from '../login';
import MarkdownTextarea from '../MarkdownTextarea';
import { RootState } from '~/redux/root.reducer';
import PrivacyControls from './PrivacyControls/PrivacyControls';
import SweetAlertService from '~/services/sweet-alert/SweetAlert.service';

import svgCover from './dev-focus.svg';
import styles from './NewExercise.module.scss';
import ExerciseService from '~/services/Exercise.service';
import ChapterControls from './ChapterControls/ChapterControls';
import LessonSelect from './LessonSelect/LessonSelect';
import BasicEditorLazy from '../Editor/BasicEditor/BasicEditor.lazy';
import FolderStructure from '~/services/utils/FolderStructure';
import { ChapterType } from '~/redux/exercise-submissions/types';
import { UserState } from '~/redux/user/types';
import {
  MediaUploadResp,
  FileDictionary,
  uploadFiles,
  uploadMedia,
} from '.';

function NewExercise({ user }: ConnectedProps<typeof connector>) {
  const router = useRouter();

  const markdownWrapper = useRef(null);
  const exampleRef = useRef(null);
  const solutionRef = useRef(null);

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);
  const [solutionError, setSolutionError] = useState(false);
  const [showExampleEditor, setShowExampleEditor] = useState(false);
  const [showSolutionEditor, setShowSolutionEditor] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const filesToUpload = useRef<FileDictionary>({});

  const onMarkdownInput = (text) => {
    setBody(text);
    setBodyError(false);
  };

  const updateMarkdownWithUploadedFiles = (newMarkdown, newFiles) => {
    setBody(newMarkdown);
    Object.keys(newFiles).forEach((fileId) => {
      filesToUpload.current[fileId] = newFiles[fileId];
    });
  };

  const onSubmit = (formData) => {
    if (user.info) {
      createExercise(formData, user.info);
    } else {
      SweetAlertService.content(
        Login,
        'Autentifică-te',
        {
          onSuccess(userInfo: UserState['info']) {
            SweetAlertService.closePopup();
            createExercise(formData, userInfo);
          },
        },
      );
    }
  };

  const createExercise = async (
    formData: {
      type: ChapterType,
      private: 'true' | 'false'
    },
    userInfo: UserState['info'],
  ) => {
    if (!validateRequiredData()) {
      return;
    }

    let newBody = body;
    setIsCreating(true);

    try {
      const uploadInfo = await uploadMedia(body, filesToUpload.current);
      newBody = replaceMarkdownWithUploads(uploadInfo);
    } catch (err) {
      SweetAlertService.toast({
        type: 'error',
        text: err.message || 'Fișierul nu a putut fi încărcat. Încearcă din nou!',
      });
      return;
    }

    try {
      await ExerciseService.createExercise({
        suggestion,
        body: newBody,
        type: formData.type,
        private: formData.private === 'true',
        example: exampleRef.current ? exampleRef.current.getFolderStructure() : null,
        solution: solutionRef.current ? solutionRef.current.getFolderStructure() : null,
      });

      SweetAlertService.toast({
        type: 'success',
        text: 'Exercițiul a fost creat cu succes!',
      });

      router.push(`/${userInfo.username}`);
    } catch (err) {
      SweetAlertService.toast({
        text: err?.message || 'Oops! Nu am putut crea exercițiul',
        type: 'error',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const validateRequiredData = () => {
    let isValid = true;

    if (!body) {
      setBodyError(true);
      markdownWrapper.current.scrollIntoView();
      isValid = false;
    }

    if (!solutionRef.current) {
      setSolutionError(true);
      isValid = false;
    } else {
      let folderStructure: FolderStructure = solutionRef.current.getFolderStructure();
      if (!folderStructure) {
        setSolutionError(true);
        isValid = false;
      }
    }

    return isValid;
  };

  const replaceMarkdownWithUploads = (uploadedInfo: MediaUploadResp[]) => {
    let newBody = body;

    Object.keys(filesToUpload.current).forEach((id) => {
      const uploadInfo = uploadedInfo.find((info) => info.name === id);

      if (!uploadInfo) {
        newBody = newBody.replaceAll(filesToUpload.current[id].markdownToReplace, '');
      } else {
        newBody = newBody.replaceAll(
          filesToUpload.current[id].markdownToReplace,
          `![${uploadInfo.name}](${uploadInfo.url})`,
        );
      }
    });

    setBody(newBody);
    return newBody;
  };

  return (

    <div>
      <section className={`${styles.cta} relative`}>
        <div>
          <h1> Creează un nou exercițiu</h1>
          <h2>
            Îl poți folosi în propriile traininguri sau,
            {' '}
            <strong className="text-blue">dacă vrei să contribui la acest proiect</strong>
            ,
            sugerează acest exercițiu pentru una dintre lecțiile noastre.
          </h2>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{
          __html: svgCover,
        }}
        />
      </section>
      <main className={styles['new-exercise']}>
        <Form withStyles={false} onSubmit={onSubmit} className="relative" id="createForm">
          <div ref={markdownWrapper} className="relative">
            <MarkdownTextarea
              title="Descrie exercițiul"
              markdown={body}
              onUpload={(files, cursorPosition) => uploadFiles(
                files, cursorPosition, body, updateMarkdownWithUploadedFiles,
              )}
              onInput={onMarkdownInput}
            />
            {bodyError && <p className={`${styles['error-message']} text-right text-bold absolute`}> Nu poți crea un exercițiu fără descriere 👆</p>}
          </div>
        </Form>
        <div className={styles['example-wrapper']}>
          {
            showExampleEditor
              ? (
                <>
                  <h3> Cod de început </h3>
                  <BasicEditorLazy ref={exampleRef} />
                </>
              )
              : (
                <button
                  className="btn btn--light"
                  type="button"
                  onClick={() => setShowExampleEditor(true)}
                >
                  Adaugă cod de început
                </button>
              )
          }
        </div>
        <div className={`${styles['example-wrapper']} relative`}>
          {
            showSolutionEditor
              ? (
                <>
                  <h3> Soluție</h3>
                  <BasicEditorLazy ref={solutionRef} />
                  {solutionError && (
                    <p className={`${styles['error-message']} absolute text-right text-bold`}>
                      Nu poți crea un exercițiu fără soluție 👆
                    </p>
                  )}
                </>
              )
              : (
                <button
                  type="button"
                  className={`btn ${solutionError ? 'btn--danger' : 'btn--light'}`}
                  onClick={() => setShowSolutionEditor(true)}
                >
                  Adaugă soluția exercițiului
                </button>
              )
          }
        </div>
        <ChapterControls form="createForm" />
        <PrivacyControls form="createForm" isPrivate={isPrivate} onPrivacyChange={setIsPrivate} />
        <footer className="d-flex align-items-center justify-content-between">
          <LessonSelect onChange={(value) => setSuggestion(value.label)} />
          <div>
            <button
              form="createForm"
              type="submit"
              disabled={isCreating}
              className={`btn btn--blue ${isCreating ? 'btn--loading' : ''}`}
            >
              Creează
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    user: state.user,
  };
}

const connector = connect(mapStateToProps);

export default connector(NewExercise);
