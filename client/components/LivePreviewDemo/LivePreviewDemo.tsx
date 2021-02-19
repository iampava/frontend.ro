import React, { useRef, useState } from 'react';

import BasicEditorLazy from '../Editor/BasicEditor/BasicEditor.lazy';
import FolderStructure from '~/services/utils/FolderStructure';

import { uuid } from '~/services/Utils';

import IframeDemo from './IframeDemo';

import styles from './LivePreviewDemo.module.scss';

interface Props {
  code: string;
  language: Language;
  alt?: string;
  demo?: string;
  className?: string;
}

interface FilePreview {
  key: string;
  name: string;
  content: string;
}

type Language = 'html' | 'css' | 'json' | 'javascript';

export default function LivePreviewDemo({
  code, language, alt, demo, className,
}: Props) {
  const codeRef = useRef(null);
  const [value, setValue] = useState(code);

  const defaultFile: FilePreview = {
    key: uuid(),
    name: `demo.${language}`,
    content: code,
  };

  /**
  ➤ Calling setValue in onEditorChange, causes a re-render of the component which recreates
  folderStructure everytime
  ➤ folderStructure is sent to editor this way
  ➤ something crashes in the editor
  So to avoid this to happen, we use React.useMemo() to create folderStructure only once,
  at the beginning and we'll have the same value of it.
 */

  const folderStructure = React.useMemo(
    () => new FolderStructure({
      folders: [],
      files: [defaultFile],
    }),
    [],
  );

  const onEditorChange = (e) => {
    const { content } = e.files[0];

    setValue(content);
  };

  return (
    <div className={`${styles['live-preview']} my-5`}>
      <div className={className}>
        <BasicEditorLazy
          ref={codeRef}
          folderStructure={folderStructure}
          onChange={onEditorChange}
          showFileSwitcher={false}
        />
        <IframeDemo sourceCode={value} />
      </div>
      <figcaption>
        {alt}
        {demo && (
        <>
          <br />
          <a href={demo} target="_blank" rel="noreferrer">Demo complet</a>
        </>
        )}
      </figcaption>
    </div>
  );
}
