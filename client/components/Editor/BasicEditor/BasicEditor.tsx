import React from 'react';
import * as Monaco from '../monaco';
import FileIcons from '~/services/utils/FileIcons';
import InitForm from '../InitForm/InitForm';
import FolderStructure from '~/services/utils/FolderStructure';
import MonacoBase from '../Monaco.base';
import FileSwitcher from '../FileSwitcher/FileSwitcher';

import styles from '../Editor.module.scss';

// extends MonacoBase
class BasicMonacoEditor extends MonacoBase {
  constructor(props) {
    super(props);

    this.state = {
      folderStructure: new FolderStructure(props.folderStructure),
    };
  }

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    showFileSwitcher: true,
  }

  initEditor = () => {
    const { readOnly } = this.props;
    const { folderStructure, selectedFileKey } = this.state;

    if (!folderStructure.files.length && !folderStructure.folders.length) {
      return;
    }

    let { file } = folderStructure.getFile(selectedFileKey);

    this.editor = Monaco.create(this.editorRef.current, {
      readOnly,
      value: file ? file.content : '',
      scrollBeyondLastLine: false,
    });

    if (file) {
      this.onFileSelect(file.key);
      this.updateLanguageBasedOnFileName(file.name);
    }
  }

  onModelChange = () => {
    const { folderStructure } = this.state;
    const { onChange } = this.props;

    folderStructure.setContent(this.state.selectedFileKey, this.editor.getValue());

    if (onChange) {
      onChange(folderStructure);
    }

    this.setState({ folderStructure });
  }

  render() {
    const { readOnly, showFileSwitcher } = this.props;
    const {
      folderStructure, fileSwitcherWidth, selectedFileKey, isDropable,
    } = this.state;
    const selectedFile = folderStructure.getFile(selectedFileKey).file;

    return (
      <div
        className={`
        ${styles['editor-wrapper']}
        ${isDropable ? styles['is--dropable'] : ''}
      `}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        {folderStructure.files.length || folderStructure.folders.length ? (
          <>
            { showFileSwitcher
            && (
            <FileSwitcher
              maxHeight={500}
              folderStructure={folderStructure}
              selectedFileKey={selectedFileKey}
              readOnly={readOnly}
              onFileAdd={this.onFileAdd}
              onFolderAdd={this.onFolderAdd}
              onSelect={this.onFileSelect}
              onFileRename={this.onFileRename}
              onFolderRename={this.onFolderRename}
              onFileDelete={this.onFileDelete}
              onFolderDelete={this.onFolderDelete}
              onDownload={this.onDownload}
              onResize={this.onResize}
            />
            )}
            <div
              className={`
                ${styles.editor}
                ${selectedFileKey ? '' : styles['has--no-selected-file']}
              `}
              style={{
                width: `calc(100% - ${fileSwitcherWidth}px)`,
                maxWidth: `calc(100% - ${fileSwitcherWidth}px)`,
              }}
              ref={this.editorRef}
            />
            {selectedFile && (
              <p className={`${styles['selected-file']} d-flex justify-content-center align-items-center`} title={selectedFile.name}>
                <img width="20" src={FileIcons.getIconUrl(selectedFile.name)} alt="icon" />
                <span className="ellipsis-overflow">{selectedFile.name}</span>
              </p>
            )}
            <label className="upload-label pin-full d-flex justify-content-center align-items-center">
              <p>
                <span className="icon-check mr-2" />
                Drop to replace
              </p>
              <input className="pin-full" type="file" multiple onChange={this.onReplace} />
            </label>
          </>
        ) : (
          <InitForm createFirstFile={this.createFirstFile} uploadStructure={this.uploadStructure} />
        )}
      </div>
    );
  }
}

export default BasicMonacoEditor;
