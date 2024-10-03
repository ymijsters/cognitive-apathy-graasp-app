import { AllSettingsType } from '../context/SettingsContext';

export type ExperimentResult = {
  settings?: AllSettingsType;
  data?: { trials: object[] };
};
