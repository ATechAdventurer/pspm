import os, { platform } from 'node:os';
import { PathLike } from 'node:fs';
import path from 'node:path';
import { slicers } from '../constants/slicers';

function expandTilde(filePath: string) {
  if (filePath[0] === '~') {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
}

function expandAppData(filePath: string) {
  return filePath.replace(/%APPDATA%/g, process.env.APPDATA as string);
}

export function getSlicerPath(): PathLike {
  const osPlatform = platform() as 'darwin' | 'win32' | 'linux' | string;
  let slicerPath: string;
  switch (osPlatform) {
    case 'darwin':
    case 'linux':
      slicerPath = expandTilde(slicers['prusa-slicer'].path[osPlatform]);
      break;
    case 'win32':
      slicerPath = expandAppData(slicers['prusa-slicer'].path[osPlatform]);
      break;
    default:
      throw new Error(`Unsupported platform: ${osPlatform}`);
  }
  return path.resolve(
    slicerPath
  );
}
