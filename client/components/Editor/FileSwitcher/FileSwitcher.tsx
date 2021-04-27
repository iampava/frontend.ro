import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faCloudDownloadAlt,
  faFileUpload,
  faFolderPlus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEdit, faFileAlt, faFolder, faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { uuid, nextUntitledFilename } from '~/services/Utils';
import HResizable from '../HResizable/HResizable';
import SweetAlertService from '~/services/sweet-alert/SweetAlert.service';
import FileIcons from '~/services/utils/FileIcons';
import FolderStructure, { ExerciseFile, ExerciseFolder, NewSourceFile } from '~/services/utils/FolderStructure';
import FilesList from '../FileList/FilesList';
import FolderBrowse from '../FolderBrowser/FolderBrowse';
import Feedbacks from '../Feedbacks';
import Button from '~/components/Button';

import styles from './FileSwitcher.module.scss';

const MIN_WIDTH_PX = 150;
const INITIAL_WIDTH_PX = 250;

interface Props {
  readOnly: boolean,
  maxHeight: number,
  selectedFileKey: string;
  folderStructure: FolderStructure,
  onResize: (px: number) => void
  onSelect?: (key: string) => void
  onDownload?: () => Promise<void>
  onFolderAdd?: (key: string, asset: any) => void;
  onFolderRename?: (key: string, name: string) => void;
  onFolderDelete?: (key: string) => void;
  onFileAdd?: (key: string, asset: any, cb: () => void) => void
  onFileRename?: (key: string, name: string) => void;
  onFileDelete?: (key: string) => void;
  feedbacks?: any;
}

interface State {
  ctxMenuKey: string;
  ctxMenuType: 'FILE' | 'FOLDER';
  renamedAsset: (ExerciseFile | ExerciseFolder) & { type: 'FILE' | 'FOLDER' };
  isCollapsed: boolean;
  isGeneratingArchive: boolean;
  dropdownStyle: Record<string, any>
}

class FileSwitcher extends React.Component<Props, State> {
  private fileSwitcherRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.state = {
      ctxMenuKey: null,
      ctxMenuType: null,
      renamedAsset: null,
      isCollapsed: false,
      isGeneratingArchive: false,
      dropdownStyle: { display: 'none' },
    };

    this.fileSwitcherRef = React.createRef();
  }

  componentDidMount() {
    const { onResize } = this.props;

    onResize(INITIAL_WIDTH_PX);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  closeMenu = () => {
    this.setState({
      ctxMenuKey: null,
      ctxMenuType: null,
      dropdownStyle: { display: 'none' },
    });

    document.removeEventListener('click', this.closeMenu);
  }

  selectFile = (key: string) => {
    const { onSelect } = this.props;
    const { renamedAsset } = this.state;

    if (!renamedAsset || key !== renamedAsset.key) {
      /** Editing a file's name & clicking on another file */
      (document.activeElement as HTMLElement).blur();
    }

    if (onSelect) {
      onSelect(key);
    }
  }

  enterEditMode = (key) => {
    const { folderStructure } = this.props;

    let renamedAsset = folderStructure.getFile(key).file;
    if (renamedAsset) {
      renamedAsset = { ...renamedAsset, type: 'FILE' };
    } else {
      renamedAsset = { ...folderStructure.getFolder(key).folder, type: 'FOLDER' };
    }

    this.setState({ renamedAsset });

    setTimeout(() => {
      (this.fileSwitcherRef.current.querySelector(`[data-key="${key}"] input`) as HTMLElement).focus();
    }, 0);
  }

  onRename = ({ target }) => {
    const { value } = target;
    const { renamedAsset } = this.state;

    this.setState({
      renamedAsset: { ...renamedAsset, name: value },
    });
  }

  onDownload = () => {
    const { onDownload } = this.props;

    this.setState({ isGeneratingArchive: true });

    onDownload()
      .catch(() => {
        SweetAlertService.toast({
          type: 'error',
          text: 'Oups, generating the archive failed. Give it another try!',
        });
      })

      .finally(() => this.setState({ isGeneratingArchive: false }));
  }

  saveAsset = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { renamedAsset } = this.state;
    const { onFileRename, onFolderRename } = this.props;

    if (renamedAsset.type === 'FOLDER') {
      onFolderRename(renamedAsset.key, renamedAsset.name);
    } else {
      onFileRename(renamedAsset.key, renamedAsset.name);
    }

    this.setState({ renamedAsset: null });
  }

  openMenu = (e, isFolder = false) => {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('click', this.closeMenu);

    const { clientX, clientY } = e;

    const bbox = this.fileSwitcherRef.current.getBoundingClientRect();

    this.setState({
      dropdownStyle: {
        top: `${clientY - bbox.y}px`,
        left: `${clientX - bbox.x}px`,
      },
    });

    this.setState({
      ctxMenuKey: e.target.dataset.key,
      ctxMenuType: isFolder ? 'FOLDER' : 'FILE',
    });
    document.addEventListener('click', this.closeMenu);
  }

  newFile = (parentKey = null) => {
    const { folderStructure, onFileAdd } = this.props;
    const renamedAsset = NewSourceFile(nextUntitledFilename(folderStructure
      .getFolder(parentKey).folder.files.map((f) => f.name)));

    this.setState({ renamedAsset: { ...renamedAsset, type: 'FILE' } });
    onFileAdd(parentKey, renamedAsset, () => {
      this.selectFile(renamedAsset.key);
    });
  }

  newFolder = (parentKey = null) => {
    const { folderStructure, onFolderAdd } = this.props;
    const renamedAsset = {
      key: uuid(),
      files: [],
      folders: [],
      name: nextUntitledFilename(folderStructure.getFolder(parentKey).folder.folders.map((f) => f.name), 'Untitled folder'),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.setState({ renamedAsset: { ...renamedAsset, type: 'FOLDER' } });
    onFolderAdd(parentKey, renamedAsset);
  }

  toggleCollapse = () => {
    const { isCollapsed } = this.state;
    const { onResize } = this.props;

    this.setState(
      {
        isCollapsed: !isCollapsed,
      },
      () => {
        if (isCollapsed) {
          onResize(INITIAL_WIDTH_PX);
        } else {
          onResize(0);
        }
      },
    );
  }

  onResize = ({ dx, onResize }) => {
    let newWidth = Number(this.fileSwitcherRef.current.style.width.split('px')[0]) + dx;
    newWidth = Math.min(Math.max(newWidth, MIN_WIDTH_PX), window.innerWidth / 2);

    this.fileSwitcherRef.current.style.width = `${newWidth}px`;

    onResize(newWidth);
  }

  deleteFileOrFolder(key) {
    const { ctxMenuType } = this.state;
    const { onFolderDelete, onFileDelete } = this.props;

    if (ctxMenuType === 'FOLDER') {
      onFolderDelete(key);
    } else {
      onFileDelete(key);
    }
  }

  render() {
    const {
      readOnly,
      maxHeight,
      folderStructure,
      selectedFileKey,
      feedbacks: feedbacksProp,
    } = this.props;

    const {
      ctxMenuKey,
      isCollapsed,
      ctxMenuType,
      dropdownStyle,
      isGeneratingArchive,
    } = this.state;

    let { renamedAsset } = this.state;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    renamedAsset = renamedAsset || { key: null };

    const files = folderStructure.files.map((f) => ({ ...f, icon: FileIcons.getIcon(f.name) }));
    const feedbacks = new Feedbacks(null, feedbacksProp || []).getTypesByFileKey();

    return (
      <div
        className={`
          ${styles['file-switcher']}
          ${readOnly ? styles['is--read-only'] : ''}
          ${isCollapsed ? styles['is--collapsed'] : ''}`}
        ref={this.fileSwitcherRef}
        style={{ width: `${INITIAL_WIDTH_PX}px`, minWidth: `${MIN_WIDTH_PX}px`, maxHeight: `${maxHeight}px` }}
      >
        {isCollapsed && (
          <Button onClick={this.toggleCollapse} title="Browse files" className={`${styles['toggle-button']}`}>
            <img src={FileIcons.getIconUrl('svg')} alt="File SVG icon" />
          </Button>
        )}
        <div className={styles.controls}>
          <div>
            {!readOnly && (
              <Button onClick={() => this.newFile()} title="New file">
                <FontAwesomeIcon icon={faPlus} width="18" height="18" />
              </Button>
            )}
            {!readOnly && (
              <Button onClick={() => this.newFolder()} title="New folder">
                <FontAwesomeIcon icon={faFolderPlus} width="18" height="18" />
              </Button>
            )}
            <Button
              onClick={this.onDownload}
              loading={isGeneratingArchive}
              title="Download to device"
            >
              <FontAwesomeIcon icon={faCloudDownloadAlt} width="18" height="18" />
            </Button>
          </div>
          <Button onClick={this.toggleCollapse} title="Collapse panel">
            <FontAwesomeIcon icon={faChevronLeft} width="18" height="18" />
          </Button>
        </div>
        {/* <Scroll className="is--fliped-x"> */}
        <div>
          {folderStructure.folders.map((folder, index) => (
            <FolderBrowse
              key={folder.key}
              folderKey={folder.key}
              folderStructure={folderStructure}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              feedbacks={feedbacks}
              readOnly={readOnly}
              selectFile={this.selectFile}
              selectedFileKey={selectedFileKey}
              renamedAsset={renamedAsset}
              ctxMenuKey={ctxMenuKey}
              openMenu={this.openMenu}
              enterEditMode={this.enterEditMode}
              onRename={this.onRename}
              saveAsset={this.saveAsset}
            />
          ))}
          <FilesList
            readOnly={readOnly}
            files={files}
            feedbacks={feedbacks}
            selectedFileKey={selectedFileKey}
            ctxMenuKey={ctxMenuKey}
            selectFile={this.selectFile}
            enterEditMode={this.enterEditMode}
            openMenu={this.openMenu}
            renamedAsset={renamedAsset}
            onRename={this.onRename}
            saveAsset={this.saveAsset}
          />
        </div>
        {/* </Scroll> */}
        <ul className={styles['dropdown-menu']} style={dropdownStyle}>
          {ctxMenuType === 'FOLDER' && (
            <>
              <li>
                <Button onClick={() => this.newFile(ctxMenuKey)}>
                  <FontAwesomeIcon icon={faFileAlt} width="18" height="18" />
                  New file
                </Button>
              </li>
              <li>
                <Button onClick={() => this.newFolder(ctxMenuKey)}>
                  <FontAwesomeIcon icon={faFolder} width="18" height="18" />
                  New folder
                </Button>
              </li>
            </>
          )}
          <li>
            <Button onClick={() => this.enterEditMode(ctxMenuKey)}>
              <FontAwesomeIcon icon={faEdit} width="18" height="18" />
              Rename
            </Button>
          </li>
          <li>
            <Button onClick={() => this.deleteFileOrFolder(ctxMenuKey)}>
              <FontAwesomeIcon icon={faTrashAlt} width="18" height="18" />
              Delete
            </Button>
          </li>
        </ul>
        <HResizable onResize={this.onResize} />
      </div>
    );
  }
}

export default FileSwitcher;
