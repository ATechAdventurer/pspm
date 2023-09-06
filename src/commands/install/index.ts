import {
  readFileSync,
  readdirSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
  createWriteStream,
} from 'node:fs';
import path from 'node:path';
import { Args, Command } from '@oclif/core';

import { z } from 'zod';
import decompress from 'decompress';
import axios from 'axios';
import { pspmConfigSchema, pspmRecordSchema, pspmSchema } from '../../schemas/pspm.schema';
import { getSlicerPath } from '../../helpers/os';
import { defaultRecord } from '../../constants/record';
import { isGithubURL } from '../../helpers/packages';
import { Ini } from '../../helpers/ini';
import os from 'node:os';

export default class Install extends Command {
  static description = 'Install a package';

  static examples = [`$ <%= config.bin %> <%= command.id %>`];

  static args = {
    install: Args.string({
      description: 'Path to install',
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Install);
    const { install } = args;

    const slicerPath = getSlicerPath();
    // Check the path exists
    if (!slicerPath) {
      this.error(`Slicer path does not exist: ${slicerPath}`);
    }

    // Check if a .pspm.json file exists in the slicerDirectory
    const pspmPath = path.join(slicerPath.toString(), '.pspm.json');
    if (!existsSync(pspmPath)) {
      writeFileSync(pspmPath, JSON.stringify(defaultRecord));
    }

    // Get contenst of .pspm.json
    const pspmConfig = pspmConfigSchema.parse(JSON.parse(readFileSync(pspmPath).toString()));

    let packagePath: string;
    // Check if install is a URL or a path
    console.log(install);
    if (isGithubURL(install)) {
      // Check the .pspm.json to see if the package is already installed via URL
      if (pspmConfig.installed.some((installed) => installed.url === install)) {
        this.error(`Package is already installed: ${install}`);
      }
      const url = `${install.endsWith('/') ? install : install + '/'}archive/refs/heads/main.zip`;

      mkdirSync(path.resolve(this.config.cacheDir, 'downloads'), { recursive: true });
      const tmpDestination = path.resolve(this.config.cacheDir, 'downloads', 'temp.zip');
      const unzipDestination = path.resolve(this.config.cacheDir, 'downloads');

      const writer = createWriteStream(tmpDestination);

      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      const files = await decompress(tmpDestination, unzipDestination);
      packagePath = path.resolve(unzipDestination, files[0].path);
    } else {
      packagePath = path.resolve(install);
    }

    if (!packagePath) {
      this.error(`Package path does not exist: ${packagePath}`);
    }
    // Check if packagePath is a directory
    if (!readdirSync(packagePath)) {
      this.error(`Package path is not a directory: ${packagePath}`);
    }
    // Check if a pspm.json file exists
    if (!readFileSync(path.join(packagePath, 'pspm.json'))) {
      this.error(`No pspm.json file found in package path: ${packagePath}`);
    }
    // Check if a pspm.json file is valid
    const packageManifest = pspmSchema.parse(
      JSON.parse(readFileSync(path.join(packagePath, 'pspm.json')).toString()),
    );
    let printerDirectories: string[] = [];
    let filamentFiles: string[] = [];
    // Check if a printers directory exists
    if (existsSync(path.join(packagePath, 'printers'))) {
      printerDirectories = readdirSync(path.join(packagePath, 'printers'), {
        withFileTypes: true,
      })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
      this.log(`Found ${printerDirectories.length} printers:`);
      this.log(printerDirectories.join('\n'));
    }
    if (existsSync(path.join(packagePath, 'filaments'))) {
      filamentFiles = readdirSync(path.join(packagePath, 'filaments'));
      this.log(`Found ${filamentFiles.length} filaments:`);
      this.log(filamentFiles.map((file) => file.replace('.ini', '')).join('\n'));
    }

    this.log(`Installing package from ${packageManifest.name}`);

    // Check if package is already installed
    if (pspmConfig.installed.find((installed) => installed.name === packageManifest.name)) {
      this.error(`Package is already installed: ${packageManifest.name}`);
    }

    const installedManifest: z.infer<typeof pspmRecordSchema> = {
      ...packageManifest,
      ownedFiles: [],
    };
    // Iterate over each printer directory
    for (const printerDirectory of printerDirectories) {
      const printerIniPath = path.join(packagePath, 'printers', printerDirectory, 'printer.ini');
      const printerIniContent = new Ini(
        readFileSync(printerIniPath, 'utf-8').replace(/\\n/g, '<TEMP_NEWLINE>'),
      );

      const assetsPath = path.join(slicerPath.toString(), '/assets');
      if (!existsSync(assetsPath)) {
        mkdirSync(assetsPath, { recursive: true });
      }
      if (!readdirSync(assetsPath).includes(printerDirectory)) {
        mkdirSync(path.join(assetsPath, printerDirectory));
      }

      // If files bed.stl and/or bed.png is found copy them to slicerPath/assets/<printerDirectory name>/base.stl/png
      for (const fileName of ['bed.stl', 'bed.png']) {
        const filePath = path.join(packagePath, 'printers', printerDirectory, fileName);
        if (readdirSync(path.join(packagePath, 'printers', printerDirectory)).includes(fileName)) {
          const installPath = path.join(
            slicerPath.toString(),
            'assets',
            printerDirectory,
            fileName,
          );
          
          const replacedPath = installPath.replace(slicerPath.toString(), '');
          console.log({
            installPath,
            slicerPath,
            replacedPath
          })
          installedManifest.ownedFiles.push(replacedPath);
          copyFileSync(filePath, installPath);
        }
        let foundFilePath = path.join(slicerPath.toString(), 'assets', printerDirectory, fileName);
        if(os.platform() === "win32") {
          foundFilePath = foundFilePath.replace(/\\/g, '//')
          console.log(foundFilePath)
        }
        switch (fileName) {
          case 'bed.stl':
            printerIniContent.set(
              'bed_custom_model',
               foundFilePath
            );
            break;
          case 'bed.png':
            printerIniContent.set(
              'bed_custom_texture',
              foundFilePath
            );
            break;
        }
      }

      const printerWritePath = path.join(
        slicerPath.toString(),
        'printer',
        `${printerDirectory}.ini`,
      );
      const replacedPath = printerWritePath.replace(slicerPath.toString(), '');
      installedManifest.ownedFiles.push(replacedPath);
      writeFileSync(printerWritePath, printerIniContent.toString());
    }

    // Iterate over each filament file and copy it to slicerPath/filaments/<filamentName>.ini
    if (existsSync(path.join(packagePath, 'filaments'))) {
      for (const filamentFile of filamentFiles) {
        const filamentWritePath = path.join(slicerPath.toString(), 'filament', filamentFile);
        const replacedPath = filamentWritePath.replace(slicerPath.toString(), '');
        installedManifest.ownedFiles.push(
          replacedPath
        );
        copyFileSync(path.join(packagePath, 'filaments', filamentFile), filamentWritePath);
      }
    }

    // Write installedManifest to .pspm.json
    pspmConfig.installed.push(installedManifest);

    writeFileSync(pspmPath, JSON.stringify(pspmConfig));
  }
}
