import React from 'react';
import { object, array, string } from 'prop-types';

import { Caption, WidgetButton } from '../../styled';
import { capitalize } from '../../../utils/common';
import { Typography } from '@material-ui/core';
import { PopoverWithControls } from '../../PopoverWithControls';

const bundleArrayToComponents = array => (
  <>
    {array.map(object => (
      <Typography
        key={object['symbolicName'] + object['id']}
        component="span"
        variant="body2"
      >
        {object['name']} - {object['state']} (id: {object['id']}, symbolicName:{' '}
        {object['symbolicName']})
      </Typography>
    ))}
  </>
);

const BundlesInfoWithPopover = ({ bundleArray, name }) =>
  bundleArray.length ? (
    <PopoverWithControls
      title={`${name} bundles: ${bundleArray.length}`}
      body={bundleArrayToComponents(bundleArray)}
    />
  ) : null;

const AemBundleInfoWidget = ({
  url,
  bundleStatus,
  excludedBundles,
  inactiveBundles
}) => (
  <>
    <div>
      {Object.keys(bundleStatus).map(key => (
        <Caption key={key}>
          {capitalize(key)}: {bundleStatus[key]}
        </Caption>
      ))}
      <BundlesInfoWithPopover bundleArray={excludedBundles} name="Excluded" />
      <BundlesInfoWithPopover bundleArray={inactiveBundles} name="Inactive" />
    </div>
    <WidgetButton href={url}>Bundles</WidgetButton>
  </>
);

AemBundleInfoWidget.propTypes = {
  url: string.isRequired,
  bundleStatus: object.isRequired,
  excludedBundles: array.isRequired,
  inactiveBundles: array.isRequired
};

AemBundleInfoWidget.defaultProps = {
  bundleStatus: {},
  excludedBundles: [],
  inactiveBundles: []
};

export default AemBundleInfoWidget;
