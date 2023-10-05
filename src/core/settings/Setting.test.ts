import { Setting } from './Setting';

describe('Test Setting...', () => {
    let env = {};
    /**
     * Backup the environment variables before each test.
     */
    beforeEach(() => {
        env = { ...process.env };
    });

    /**
     * Restore the environment variables after each test.
     */
    afterEach(() => {
        process.env = { ...env };
    });

    /**
     * Test the validation of settings.
     */
    describe('Valid() functionality', () => {
        interface validTestData {
            envVarValue: string;
            required: boolean;
            isSecret: boolean;
            result: boolean;
        }
        const testData: validTestData[] = [
            { envVarValue: 'frodo', required: true, isSecret: true, result: true },
            { envVarValue: 'frodo', required: true, isSecret: false, result: true },
            { envVarValue: 'frodo', required: false, isSecret: true, result: true },
            { envVarValue: 'frodo', required: false, isSecret: false, result: true },
            { envVarValue: '', required: true, isSecret: false, result: false },
            { envVarValue: '', required: true, isSecret: true, result: false },
            { envVarValue: '', required: false, isSecret: false, result: true }
        ];

        const descriptionTpl = `Valid() should return $result when calles with setting named '$envVarValue', required = $required, is secret = $isSecret`;
        it.each(testData)(descriptionTpl, ({ envVarValue, required, isSecret, result }) => {
            process.env.USERNAME = envVarValue;
            const setting = new Setting('USERNAME', required, isSecret);

            expect(setting.valid()).toBe(result);
        });
    });

    /**
     * tests the existence of settings.
     */
    describe('exist functionality', () => {
        it('settings does not exist', () => {
            const setting = new Setting('USERNAME', true, false);
            expect(setting.exist('USERNAME')).toBe(false);
        });

        it('settings exist', () => {
            process.env.USERNAME = 'Amy';
            const setting = new Setting('USERNAME', true, false);
            expect(setting.exist('USERNAME')).toBe(true);
        });
    });

    /**
     * test the value extraction of settings.
     */
    describe('valueOf functionality', () => {
        it('settings exist', () => {
            process.env.USERNAME = 'frodo';
            const setting = new Setting('USERNAME', true, false);
            expect(setting.valueOf('USERNAME')).toBe('frodo');
        });

        it('settings does not exist', () => {
            const setting = new Setting('WHATEVER_INVALID_SETTING', true, false);
            expect(setting.valueOf('WHATEVER_INVALID_SETTING')).toBe('');
        });
    });
});
