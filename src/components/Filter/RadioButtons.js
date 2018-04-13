import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './RadioButtons.scss';
import {getTranslator} from '../../selectors/translate';
import {setShowPlaylists} from '../../reducers/showPlaylists';
import {resetFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const RadioButtons = ({showPlaylists, language, t, setShowPlaylists, resetFilter, collapseAllFilterGroups}) => {
  const RadioButton = ({checked, onChange, text}) =>
    <label className={styles.label}>
      <input type='radio' name='radioGroup' {...{checked, onChange}}/>
      <span className={styles.marginLeft}>{text}</span>
    </label>;
  return (
    <form>
      <RadioButton
        checked={showPlaylists}
        onChange={() => {
          setShowPlaylists(true);
          resetFilter('language', language);
          collapseAllFilterGroups(true);
        }}
        text={t('filter.radio.playlists')}
      />
      <RadioButton checked={!showPlaylists} onChange={() => setShowPlaylists(false)} text={t('filter.radio.lessons')}/>
    </form>
  );
};

RadioButtons.propTypes = {
  // mapStateToProps
  showPlaylists: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setShowPlaylists: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showPlaylists: state.showPlaylists,
  language: state.language,
  t: getTranslator(state),
});

const mapDispatchToProps = {
  setShowPlaylists,
  resetFilter,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RadioButtons));