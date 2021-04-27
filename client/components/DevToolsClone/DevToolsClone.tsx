import React, { useState } from 'react';
import { Checkbox } from '~/components/Form';
import styles from './DevToolsClone.module.scss';
import {
  BOX_SIZING,
  BoxModelItem,
  DEFAULTS,
  DIMENSION_LIMITS,
  BOX_SIZING_LABELS,
} from './helpers';

const DevToolsClone = () => {
  const [dimensions, setDimensions] = useState({
    margin: DEFAULTS.MARGIN,
    border: DEFAULTS.BORDER,
    padding: DEFAULTS.PADDING,
    content: DEFAULTS.CONTENT,
  });
  const [boxSizing, setBoxSizing] = useState(BOX_SIZING.CONTENT_BOX);

  const handleChange = (e) => {
    const { target: { name, value } } = e;
    const [minLimit, maxLimit] = DIMENSION_LIMITS[name];

    if (value < minLimit || value > maxLimit) return;

    setDimensions({
      ...dimensions,
      [name]: value === '' ? value : Number(value),
    });
  };

  const getContentWidth = () => {
    const { content } = dimensions;
    if (boxSizing === BOX_SIZING.CONTENT_BOX) {
      return content;
    }
    return content - dimensions.padding * 2 - dimensions.border * 2;
  };

  const getFinalSize = () => {
    const { content } = dimensions;
    if (boxSizing === BOX_SIZING.BORDER_BOX) {
      return content;
    }
    return content + dimensions.padding * 2 + dimensions.border * 2;
  };

  const getClassName = (boxModelItem: BoxModelItem) => {
    return `${styles.item} ${styles[`${boxModelItem}-colored`]}`;
  };

  const getInput = (boxModelItem: BoxModelItem) => {
    const inputId = `input-${boxModelItem}`;
    return (
      <label htmlFor={inputId}>
        {boxModelItem}
        {' '}
        -
        <input
          id={inputId}
          name={boxModelItem}
          type="number"
          value={dimensions[boxModelItem]}
          onChange={handleChange}
        />
      </label>
    );
  };

  const width = getContentWidth();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {
          Object.values(BOX_SIZING).map((boxSizingValue) => (
            <Checkbox
              key={boxSizingValue}
              type="radio"
              name="box-sizing-type"
              onChange={() => setBoxSizing(boxSizingValue as BOX_SIZING)}
              checked={boxSizing === boxSizingValue}
              value={boxSizingValue}
            >
              {BOX_SIZING_LABELS[boxSizingValue]}
            </Checkbox>
          ))
        }
      </header>
      <section className={styles.model}>
        <div className={getClassName('margin')}>
          {getInput('margin')}
          <div className={getClassName('border')}>
            {getInput('border')}
            <div className={getClassName('padding')}>
              {getInput('padding')}
              <div className={getClassName('content')}>
                {getInput('content')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div style={{ padding: dimensions.margin, boxSizing }} className={styles['margin-colored']}>
          <div
            className={styles['padding-colored']}
            style={{
              display: 'inline-block', boxSizing, border: `${dimensions.border}px solid #ffdc91`, padding: dimensions.padding,
            }}
          >
            <p style={{ width, height: width, boxSizing }} className={`${styles.content} ${styles['content-colored']}`}>Content</p>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>
          Lățimea și înălțimea finală:
          {' '}
          <strong>
            {getFinalSize()}
            px
          </strong>
        </p>
      </footer>
    </div>
  );
};

export default DevToolsClone;
