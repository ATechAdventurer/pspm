export class Ini {
    
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    public get(key: string) {
        // Find a line that starts with the key
        const regex = new RegExp(`^${key}\\s*=\\s*(.*)$`, 'm');
        const match = this.content.match(regex);
        // If a match is found, return the value after the equals sign
        if (match) {
            return match[1].trim();
        }
        // If no match is found, return null
        return null;
    }

    public set(key: string, value: string) {
        // Find a line that starts with the key
        const regex = new RegExp(`^${key}\\s*=\\s*(.*)$`, 'm');
        const match = this.content.match(regex);
        // If a match is found, replace the value after the equals sign
        if (match) {
            this.content = this.content.replace(regex, `${key} = ${value}`);
        } else {
            // If no match is found, append the key and value to the end of the file
            this.content += `\n${key} = ${value}`;
        }
    }

    public toString() {
        return this.content.replace(/<TEMP_NEWLINE>/g, '\\n');
    }
}
