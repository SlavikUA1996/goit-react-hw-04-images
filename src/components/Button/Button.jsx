import './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onloadMore }) => {
  return (
    <div className='button-section' onClick={onloadMore}>
      <button type="button">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};