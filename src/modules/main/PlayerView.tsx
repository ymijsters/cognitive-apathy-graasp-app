import { useCallback } from 'react';

import { DataCollection } from 'jspsych';

import { mutations } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';

import { AllSettingsType, useSettings } from '../context/SettingsContext';
import { ExperimentLoader } from './ExperimentLoader';

const PlayerView = (): JSX.Element => {
  const { mutate: postAppData } = mutations.usePostAppData();
  const settingSavedState = useSettings();

  const onCompleteExperiment = useCallback(
    (data: DataCollection, settings: AllSettingsType): void => {
      postAppData({
        data: { data, settings },
        type: 'a-type',
      });
    },
    [postAppData],
  );

  return (
    <div data-cy={PLAYER_VIEW_CY}>
      <ExperimentLoader
        onCompleteExperiment={onCompleteExperiment}
        settings={settingSavedState}
      />
    </div>
  );
};
export default PlayerView;
