import { useCallback } from 'react';

import { DataCollection } from 'jspsych';

import { mutations } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';

import { useSettings } from '../context/SettingsContext';
import { ExperimentLoader } from './ExperimentLoader';

const PlayerView = (): JSX.Element => {
  const { mutate: postAppData } = mutations.usePostAppData();
  const settingSavedState = useSettings();

  const onCompleteExperiment = useCallback(
    (data: DataCollection): void => {
      postAppData({
        data: { data },
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
