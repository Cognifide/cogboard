import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { addWidget } from '../actions/actionCreators';
import { makeIdCreator, mapFormValuesToWidgetData } from './helpers';

import Button from '@material-ui/core/Button';
import CancelButton from './CancelButton';
import WidgetForm from './WidgetForm';

const createWidgetId = makeIdCreator('widget');

const createWidgetData = (formValues, allWidgets, currentBoard) => ({
  id: createWidgetId(allWidgets),
  type: 'widget',
  status: 'UNKNOWN',
  boardId: currentBoard,
  ...mapFormValuesToWidgetData(formValues)
});

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const AddWidget = ({ closeDialog, currentBoard }) => {
  const initialData = {
    title: 'Default widget',
    contentType: 'DefaultWidget',
  };
  const allWidgets = useSelector(
    ({ widgets }) => widgets.allWidgets
  );
  const dispatch = useDispatch();

  const handleAddClick = (values) => () => {
    const widgetData = createWidgetData(values, allWidgets, currentBoard);

    dispatch(addWidget(widgetData));
    closeDialog();
  }

  return (
    <WidgetForm
      initialData={initialData}
      renderActions={values =>
        <>
          <Button
            onClick={handleAddClick(values)}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
          <StyledCancelButton handleCancelClick={closeDialog} />
        </>
      }
    />
  );
};

export default AddWidget;