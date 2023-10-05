import { Setting } from './Setting';

/**
 * AppSettings is used to check for application settings sanity as well as to get settings values.
 */
class AppSettings {
    // Constants for the application enviroment variables.
    public dbUsername = 'miniurlDBUsername';

    public dbPassword = 'miniurlDBPassword';

    public dbHost = 'miniurlDBHost';

    public dbPort = 'miniurlDBPort';

    public dbSchema = 'miniurlDBSchema';

    public settings = [
        new Setting(this.dbUsername, true, false),
        new Setting(this.dbPassword, true, true),
        new Setting(this.dbHost, true, false),
        new Setting(this.dbPort, true, false),
        new Setting(this.dbSchema, true, false)
    ];

    /**
     * Checks that the application settings are present and ready to be used.
     *
     * @returns true if the application settings are valid, false otherwise.
     */
    public ok(): boolean {
        let result = true;
        this.settings.forEach((setting) => {
            if (!setting.valid()) {
                result = false;
            }
        });

        return result;
    }

    /**
     * Returns the value of a setting.
     *
     * @param setting name of the setting.
     * @returns the value of a setting or an empty string if it does not exist.
     */
    public valueOf(setting: string): string {
        return process.env[setting] ?? '';
    }

    /**
     * Checks if a setting exists.
     *
     * @param {*} setting name of the setting.
     * @returns {boolean} true if it exists, false otherwise.
     */
    public exist(setting: string) {
        return process.env[setting] !== null;
    }
}

export const appSettings = new AppSettings();
