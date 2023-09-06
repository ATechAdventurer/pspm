import fs from 'node:fs';
import { Command } from '@oclif/core';
import path from 'node:path';
import { getSlicerPath } from '../../helpers/os';

export default class Export extends Command {
  static description = 'Export a set of Profiles, Printers, and Materials';
  static hidden = true;
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
      .readdirSync(`${slicerPath}/printer`)
      .filter((file) => file.endsWith('.ini'))
      .map((file) => file.split(' - ')[0])
      .filter((value, index, self) => self.indexOf(value) === index);
    this.log(`Found ${printerDefinitions.length} printer definitions:`);
    this.log(printerDefinitions.join('\n'));

    const filamentDefinitions = fs
      .readdirSync(`${slicerPath}/filament`)
      .filter((file) => file.endsWith('.ini'))
      .map((file) => path.basename(file, '.ini'));
    this.log(`Found ${filamentDefinitions.length} filament definitions:`);
    this.log(filamentDefinitions.join('\n'));
  }
}
