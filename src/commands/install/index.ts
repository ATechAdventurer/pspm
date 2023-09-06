import { Args, Command } from '@oclif/core';
import { readFileSync, readdirSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import { pspmSchema } from '../../schemas/pspm.schema';
import { getSlicerPath } from '../../helpers/os';
import ini from 'ini';

export default class Install extends Command {
  static description = 'Install a package';
  static examples = [`$ <%= config.bin %> <%= command.id %>`];
  static args = {
    // url: Args.url({
    //   description: 'URL to install',
    //   required: !true,
    // }),
    packagePath: Args.directory({
      description: 'Path to install',
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Install);
    const { packagePath } = args;
    // const packagePath = path.join(cwd(), '../pspm-example');
    // Check if packagePath exists
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
    let packageManifest;
    try {
      packageManifest = pspmSchema.parse(
        JSON.parse(readFileSync(path.join(packagePath, 'pspm.json')).toString()),
      );
    } catch (error) {
      this.error(`Invalid pspm.json file: ${error}`);
    }
    let printerDirectories: string[] = [];
    let filamentFiles: string[] = [];
    // Check if a printers directory exists
    if (readdirSync(path.join(packagePath, 'printers'))) {
      printerDirectories = readdirSync(path.join(packagePath, 'printers'), {
        withFileTypes: true,
      })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
      this.log(`Found ${printerDirectories.length} printers:`);
      this.log(printerDirectories.join('\n'));
    }
    if (readdirSync(path.join(packagePath, 'filaments'))) {
      filamentFiles = readdirSync(path.join(packagePath, 'filaments'));
      this.log(`Found ${filamentFiles.length} filaments:`);
      this.log(filamentFiles.map((file) => file.replace('.ini', '')).join('\n'));
    }

    this.log(`Installing package from ${packageManifest.name}`);

    const slicerPath = getSlicerPath();
    // Check the path exists
    if (!slicerPath) {
      this.error(`Slicer path does not exist: ${slicerPath}`);
    }

    // Iterate over each printer directory
    printerDirectories.forEach((printerDirectory) => {
      const printerIniPath = path.join(packagePath, 'printers', printerDirectory, 'printer.ini');
      const printerIniContent = readFileSync(printerIniPath, 'utf-8');

      // Chqck if printer.ini is valid
      let printerIni: Record<string, string>;
      try {
        printerIni = ini.parse(printerIniContent);
      } catch (error) {
        this.error(`Invalid printer.ini file: ${error}`);
      }

      const assetsPath = path.join(slicerPath.toString(), '/assets');
      if (!existsSync(assetsPath)) {
        mkdirSync(assetsPath, { recursive: true });
      }
      if (!readdirSync(assetsPath).includes(printerDirectory)) {
        mkdirSync(path.join(assetsPath, printerDirectory));
      }

      // If files bed.stl and/or bed.png is found copy them to slicerPath/assets/<printerDirectory name>/base.stl/png
      ['bed.stl', 'bed.png'].forEach((fileName) => {
        const filePath = path.join(packagePath, 'printers', printerDirectory, fileName);
        if (readdirSync(path.join(packagePath, 'printers', printerDirectory)).includes(fileName)) {
          copyFileSync(
            filePath,
            path.join(
              slicerPath.toString(),
              'assets',
              printerDirectory,
              `bed.${fileName.split('.')[1]}`,
            ),
          );
        }
        switch (fileName) {
          case 'bed.stl':
            printerIni[
              'bed_custom_model'
            ] = `${slicerPath.toString()}/assets/${printerDirectory}/bed.stl`;
            break;
          case 'bed.png':
            printerIni[
              'bed_custom_texture'
            ] = `${slicerPath.toString()}/assets/${printerDirectory}/bed.png`;
            break;
        }
      });
      writeFileSync(
        path.join(slicerPath.toString(), 'printer', `${printerDirectory}.ini`),
        ini.stringify(printerIni),
      );
    });

    // Iterate over each filament file and copy it to slicerPath/filaments/<filamentName>.ini
    filamentFiles.forEach((filamentFile) => {
      copyFileSync(
        path.join(packagePath, 'filaments', filamentFile),
        path.join(slicerPath.toString(), 'filament', filamentFile),
      );
    });
  }
}
