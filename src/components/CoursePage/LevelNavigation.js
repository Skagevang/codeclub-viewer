import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Col from 'react-bootstrap/lib/Col';
import {getTranslator} from '../../selectors/translate';
import LevelIcon from '../LevelIcon';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './LevelNavigation.scss';
import CollapsiblePanel from '../CollapsiblePanel';
import scrollToComponent from 'react-scroll-to-component';
import {lessonListId} from './LessonList';

const handleClick = event => {
  scrollToComponent(document.getElementById(lessonListId(event.currentTarget.dataset.level)), {align: 'top'});
};

const LevelNavigation= ({levels}) => {
  useStyles(styles);

  const t = useSelector(state => getTranslator(state));
  const isStudentMode = useSelector(state => state.isStudentMode);

  const levelListItems = levels.map(level => (
    <ListGroupItem key={level} data-level={level} onClick={handleClick}>
      <span className={styles.name}>
        <LevelIcon {...{level}}/>{t('general.levels.' + level)}
      </span>
    </ListGroupItem>
  ));
  const bsStyle = isStudentMode ? 'student' : 'teacher';
  const header = t('coursepage.levelnavigation');
  return (
    <div>
      <Col xsHidden>
        <Panel {...{bsStyle}}>
          <Panel.Heading><Panel.Title>{header}</Panel.Title></Panel.Heading>
          <ListGroup>
            {levelListItems}
          </ListGroup>
        </Panel>
      </Col>
      <Col smHidden mdHidden lgHidden>
        <CollapsiblePanel initiallyExpanded={false} {...{bsStyle, header}}>
          <ListGroup>
            {levelListItems}
          </ListGroup>
        </CollapsiblePanel>
      </Col>
    </div>
  );
};

LevelNavigation.propTypes = {
  levels: PropTypes.array,
};

export default LevelNavigation;
