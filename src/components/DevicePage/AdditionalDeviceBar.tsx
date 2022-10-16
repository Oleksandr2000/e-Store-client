import React from 'react';
import Slider from '../Slider';
import { useAppSelector } from '../../hooks';
import Revievs from '../Revievs';

const AdditionalDeviceBar = () => {
  const { sale } = useAppSelector((store) => store.device);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const isLoadingItems = useAppSelector((store) => store.device.status) === 'loading';

  return (
    <div className="additional-bar">
      <div className="additional-bar__nav">
        <div
          className={
            activeTab === 0
              ? 'additional-bar__link additional-bar__link_active'
              : 'additional-bar__link'
          }
          onClick={() => setActiveTab(0)}>
          Reviews
        </div>
        <div
          className={
            activeTab === 1
              ? 'additional-bar__link additional-bar__link_active'
              : 'additional-bar__link'
          }
          onClick={() => setActiveTab(1)}>
          Sale
        </div>
      </div>
      <div className="additional-bar__content">
        <div className="additional-bar__tab" hidden={activeTab !== 0}>
          <Revievs />
        </div>
        <div className="additional-bar__tab" hidden={activeTab !== 1}>
          <Slider items={sale} loading={isLoadingItems} title={''} />
        </div>
      </div>
    </div>
  );
};

export default AdditionalDeviceBar;
