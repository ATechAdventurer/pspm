import { platform } from 'os';
import { slicers } from '../constants/slicers';
import { PathLike } from 'fs';
import os from 'os';
import path from 'path';

function expandTilde(filePath: string) {
  if (filePath[0] === '~') {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
}

export function getSlicerPath(): PathLike {
  return path.resolve(
    expandTilde(slicers['prusa-slicer'].path[platform() as 'darwin' | 'win32' | 'linux']),
  );
}
