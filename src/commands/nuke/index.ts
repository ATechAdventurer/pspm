import { Command } from "@oclif/core";
import { getSlicerPath } from "../../helpers/os";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { pspmConfigSchema } from "../../schemas/pspm.schema";
import { rm } from "node:fs/promises";

export default class Nuke extends Command {
    static description = "Nuke all installed packages";
    
    static examples = [`$ <%= config.bin %> <%= command.id %>`];
    
    async run(): Promise<void> {
        const slicerPath = getSlicerPath();
        if (!slicerPath) {
            this.error(`Slicer path does not exist: ${slicerPath}`);
        }

        const pspmPath = path.join(slicerPath.toString(), ".pspm.json");
        if (!existsSync(pspmPath)) {
            this.error(`.pspm.json does not exist: ${pspmPath}`);
        }
        const config = pspmConfigSchema.parse(JSON.parse(readFileSync(pspmPath).toString()));

        const filesToDelete = [
            ".pspm.json",
        ];
        for (const record of config.installed) {
            filesToDelete.push(...record.ownedFiles);
        }

        const fileDeleteJob = filesToDelete.map((file) => rm(path.join(slicerPath.toString(), file)));
        await Promise.all(fileDeleteJob);
    }
}
