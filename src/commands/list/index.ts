import fs from 'fs';
import { Command } from '@oclif/core';
import { getSlicerPath } from '../../helpers/os';
import path from 'path';

export default class List extends Command {
  static description = 'List all installed packages';

  async run() {
    const slicerPath = getSlicerPath();
    // Check the path exists
    if (!fs.existsSync(slicerPath)) {
      this.error(`Slicer path does not exist: ${slicerPath}`);
    }
    // Check the path is a directory
    if (!fs.lstatSync(slicerPath).isDirectory()) {
      this.error(`Slicer path is not a directory: ${slicerPath}`);
    }
    // Get all files in path
    const printerDefinitions = fs
      .readdirSync(slicerPath + '/printer')
      .filter((file) => file.endsWith('.ini'))
      .map((file) => file.split(' - ')[0])
      .filter((value, index, self) => self.indexOf(value) === index);
    this.log(`Found ${printerDefinitions.length} printer definitions:`);
    this.log(printerDefinitions.join('\n'));

    const filamentDefinitions = fs
      .readdirSync(slicerPath + '/filament')
      .filter((file) => file.endsWith('.ini'))
      .map((file) => path.basename(file, '.ini'));
    this.log(`Found ${filamentDefinitions.length} filament definitions:`);
    this.log(filamentDefinitions.join('\n'));
  }
}
