import { log } from '../log';

/**
 * Setting represent a single application setting.
 */
export class Setting {
    /**
     * Setting constructor.
     * @param key setting name.
     * @param required true if the setting is a required setting.
     * @param isSecret true if the setting should be treated as a secret (useful when logging).
     */
    public constructor(
        public key: string,
        public required: boolean,
        public isSecret: boolean
    ) {}

    /**
     * Returns the value of a setting.
     *
     * @param setting name of the setting.
     * @returns the value of a setting or an empty string if it does not exist.
     */
    public valueOf(setting: string) {
        return process.env[setting] || '';
    }

    /**
     * Checks if a setting exists.
     *
     * @param setting name of the setting.
     * @returns {boolean} true if it exists, false otherwise.
     */
    public exist(setting: string): boolean {
        return !!process.env[setting];
    }

    /**
     * Checks to see if the setting is valid.
     *
     * @returns {boolean} true if its valid, false otherwise.
     */
    public valid(): boolean {
        const found = this.exist(this.key);

        if (!found && this.required) {
            log.error(`Setting ${this.key} is missing.`);
            return false;
        }

        if (!found && !this.required) {
            return true;
        }

        if (this.isSecret) {
            log.info(`Setting ${this.key} found.`);
        } else {
            log.info(`Setting ${this.key}: ${this.valueOf(this.key)}`);
        }

        return found;
    }
}
