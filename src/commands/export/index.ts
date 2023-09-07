import fs from 'node:fs';
import { Command } from '@oclif/core';
import path from 'node:path';
import * as inquirer from 'inquirer';
import { getSlicerPath } from '../../helpers/os';
import { createPackage } from '../../helpers/packager';

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

    const prompts: inquirer.DistinctQuestion<inquirer.Answers>[] = [
      {
        type: 'input',
        name: 'exportName',
        message: 'What is the name of this export?',
      },
    ];
    // Get all files in path
    const printerDefinitions = fs
      .readdirSync(`${slicerPath}/printer`)
      .filter((file) => file.endsWith('.ini'))
      .map((file) => ({
        name: path.basename(file, '.ini'),
        value: path.join(slicerPath.toString(), 'printer', file),
      }));

    const filamentDefinitions = fs
      .readdirSync(`${slicerPath}/filament`)
      .filter((file) => file.endsWith('.ini'))
      .map((file) => ({
        name: path.basename(file, '.ini'),
        value: path.join(slicerPath.toString(), 'filament', file),
      }));

    if (printerDefinitions.length > 0) {
      prompts.push({
        type: 'checkbox',
        name: 'printers',
        message: 'Select printers to export',
        choices: printerDefinitions,
      });
    }

    if (filamentDefinitions.length > 0) {
      prompts.push({
        type: 'checkbox',
        name: 'filaments',
        message: 'Select filaments to export',
        choices: filamentDefinitions,
      });
    }

    const answers = await inquirer.prompt(prompts);

    const { exportName, printers = [], filaments = [] } = answers;

    await createPackage(exportName, printers, filaments);
  }
}
