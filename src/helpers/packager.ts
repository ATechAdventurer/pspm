import { writeFile, readFile, copyFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { Ini } from './ini';
import { exists, existsSync } from 'node:fs';

export async function createPackage(name: string, printers: string[], filaments: string[]) {
  // Create a temporary directory to build the package in
  const packagePath = path.join(tmpdir(), 'pspm-package');
  console.log({ packagePath, printers, filaments });
  if (existsSync(packagePath)) {
    await rm(packagePath, { recursive: true });
  }

  await mkdir(packagePath, { recursive: true });

  const tasks = [];
  // Create a pspm.json file in the temporary directory
  tasks.push(createPackageManifest(packagePath, name, '0.0.1'));

  // Create a printers directory in the temporary directory
  if (printers.length > 0) {
    tasks.push(createPrintersDirectory(packagePath, printers));
  }
  // Create a filaments directory in the temporary directory
  if (filaments.length > 0) {
    tasks.push(createFilamentsDirectory(packagePath, filaments));
  }

  await Promise.all(tasks);
}

async function createPackageManifest(tmpPath: string, name: string, version: string) {
  const packageManifest = {
    name,
    version,
  };

  await writeFile(path.join(tmpPath, 'pspm.json'), JSON.stringify(packageManifest));
}

async function createPrintersDirectory(tmpPath: string, printers: string[]) {
  await mkdir(path.join(tmpPath, 'printers'), { recursive: true });
  await Promise.all(printers.map((printer) => createPrinterFile(tmpPath, printer)));
}

async function createPrinterFile(tmpPath: string, printerPath: string) {
  const printerName = path.basename(printerPath, '.ini');

  const printerDestination = path.join(tmpPath, 'printers', printerName);
  // Make a folder for the printer
  await mkdir(printerDestination, { recursive: true });
  // Open the printer file
  const contents = await readFile(printerPath, 'utf-8');
  const printer = new Ini(contents);

  // Look to see if the printer has a texture we need to extract
  const texturePath = printer.get('bed_custom_texture');

  if (texturePath) {
    // Extract the texture
    await copyFile(path.resolve(texturePath), path.join(printerDestination, 'bed.png'));
  }

  // Look to see if the printer has a custom bed model we need to extract
  const modelPath = printer.get('bed_custom_model');
  if (modelPath) {
    // Extract the model
    await copyFile(path.resolve(modelPath), path.join(printerDestination, 'bed.stl'));
  }

  // Copy the printer file to the temporary directory
  await copyFile(path.resolve(printerPath), path.join(printerDestination, 'printer.ini'));
}

async function createFilamentsDirectory(tmpPath: string, filaments: string[]) {
  await mkdir(path.join(tmpPath, 'filaments'), { recursive: true });
  await Promise.all(filaments.map((filament) => moveFilamentFile(tmpPath, filament)));
}

async function moveFilamentFile(tmpPath: string, filament: string) {
  const filamentName = path.basename(filament, '.ini');
  const filamentDestination = path.join(tmpPath, 'filaments');
  await copyFile(path.resolve(filament), path.join(filamentDestination, `${filamentName}.ini`));
}
