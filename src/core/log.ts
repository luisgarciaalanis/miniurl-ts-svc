import winston from 'winston';

/**
 * Creates a logger that can be used by the application.
 * @returns application logger.
 */
function logger(): winston.Logger {
    const console = new winston.transports.Console();
    return winston.clear().add(console);
};

export const log = logger();
