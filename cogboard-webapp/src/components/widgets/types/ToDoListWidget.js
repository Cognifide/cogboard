import React from 'react';
import { array } from 'prop-types';
import { useDispatch } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { setToDoListState } from '../../../actions/thunks';
import { postWidgetContentUpdate } from '../../../utils/fetch';
// import { v4 } from 'uuid';
import styled from '@emotion/styled/macro';

const StyledCheckbox = styled(Checkbox)`
  margin-left: 15px;

  &.Mui-checked {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ToDoListWidget = ({ id, toDoListItems }) => {
  const dispatch = useDispatch();
  const handleChangeStatus = evt => {
    const clickedElementindex = toDoListItems.findIndex(
      elem => elem.id === evt.target.value
    );
    toDoListItems[clickedElementindex].itemChecked = evt.target.checked;

    dispatch(
      setToDoListState({
        id,
        content: {
          toDoListItems: toDoListItems
        },
        toDoListItems: toDoListItems
      })
    );

    postWidgetContentUpdate({
      id,
      content: {
        toDoListItems: toDoListItems
      },
      toDoListItems: toDoListItems
    }).catch(e => console.log(e));
  };

  const renderFormControlLabel = item => {
    return (
      <FormControlLabel
        key={item.id}
        control={
          <StyledCheckbox
            onChange={handleChangeStatus}
            value={item.id}
            checked={item.itemChecked}
          />
        }
        label={
          <Typography
            variant="subtitle1"
            style={item.itemChecked ? { textDecoration: 'line-through' } : {}}
          >
            {item.itemText}
          </Typography>
        }
      />
    );
  };

  const renderToDoListCheckBoxes = () => {
    const checkedItems = toDoListItems.filter(
      item => item.itemChecked === true
    );

    return (
      <>
        {toDoListItems.map(
          item => !item.itemChecked && renderFormControlLabel(item)
        )}
        {checkedItems.map(item => renderFormControlLabel(item))}
      </>
    );
  };

  return (
    <>
      <div style={{ overflow: 'auto' }}>
        <FormGroup column="true">{renderToDoListCheckBoxes()}</FormGroup>
      </div>
    </>
  );
};

ToDoListWidget.propTypes = {
  toDoListItems: array.isRequired
};

ToDoListWidget.defaultProps = {
  toDoListItems: []
};

export default ToDoListWidget;
