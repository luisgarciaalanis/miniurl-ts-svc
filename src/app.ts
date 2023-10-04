require('amd-loader');
import { log } from './core/log';
import { appSettings } from './core/settings/AppSettings';

class App {
    public static async Run() {
        // Check applications settings are ok.
        if (!appSettings.ok()) {
            log.error('Applications settings are not ok!');
            return;
        }
        
        console.log('Works!');
    }
}

App.Run();