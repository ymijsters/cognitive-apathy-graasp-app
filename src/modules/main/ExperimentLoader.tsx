/* eslint-disable */
import { FC, useEffect, useRef } from 'react';

import { DataCollection, JsPsych } from 'jspsych';

import { AllSettingsType } from '../context/SettingsContext';
import { run } from '../experiment/experiment';

type ExperimentProps = {
  onCompleteExperiment: (
    data: DataCollection,
    settings: AllSettingsType,
  ) => void;
  settings: AllSettingsType;
};

export const ExperimentLoader: FC<ExperimentProps> = ({
  onCompleteExperiment,
  settings,
}) => {
  const jsPsychRef = useRef<null | Promise<JsPsych>>(null);

  const assetPath = {
    images: [
      'assets/images/hand.png',
      'assets/images/left.jpg',
      'assets/images/right.jpg',
      'assets/images/tip.png',
    ],
    audio: [],
    video: [
      'assets/videos/calibration-2-video.mp4',
      'assets/videos/calibration-part1.mp4',
      'assets/videos/calibration-part2.mp4',
      'assets/videos/tutorial_video_no_stimuli.mp4',
      'assets/videos/validation-video.mp4',
      'assets/videos/validation.mp4',
    ],
    misc: ['assets/locales/en/ns1.json', 'assets/locales/fr/ns1.json'],
  };

  const onFinish = (data: DataCollection): void => {
    console.log('In Experiment Loader');
    onCompleteExperiment(data, settings);
  };

  useEffect(() => {
    if (!jsPsychRef.current) {
      console.log(`In Experiment Component`);
      jsPsychRef.current = run({
        assetPaths: assetPath,
        input: settings,
        onFinish: onFinish,
      });
    }
  }, []);

  return (
    <div>
      <div className="jspsych-content-wrapper">
        <div id="jspsych-content" className="jspsych-content" />
      </div>
    </div>
  );
};
