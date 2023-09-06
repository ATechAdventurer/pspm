import { SlicerSupport } from '../interfaces/slicersupport.interface';

export const slicers: Record<string, SlicerSupport> = {
  'prusa-slicer': {
    name: 'Prusa Slicer',
    path: {
      darwin: '~/Library/Application Support/PrusaSlicer',
      win32: '%APPDATA%/PrusaSlicer',
      linux: '~/.config/PrusaSlicer',
    },
  },
};
