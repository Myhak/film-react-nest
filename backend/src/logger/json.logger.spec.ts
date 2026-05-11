import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('formatMessage', () => {
    it('should return valid JSON with level and message', () => {
      const result = logger.formatMessage('log', 'hello');
      const parsed = JSON.parse(result);
      expect(parsed.level).toBe('log');
      expect(parsed.message).toBe('hello');
    });

    it('should include optionalParams in output', () => {
      const result = logger.formatMessage('error', 'oops', 'ctx');
      const parsed = JSON.parse(result);
      expect(parsed.optionalParams).toEqual(['ctx']);
    });

    it('should produce valid JSON for all data types', () => {
      const result = logger.formatMessage('warn', { code: 42 });
      expect(() => JSON.parse(result)).not.toThrow();
    });
  });

  describe('log methods call console.log with correct JSON', () => {
    const levels = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'] as const;

    levels.forEach((level) => {
      it(`${level}() should call console.log with JSON containing level="${level}"`, () => {
        logger[level]('test message', 'SomeContext');
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        const output = consoleSpy.mock.calls[0][0];
        const parsed = JSON.parse(output);
        expect(parsed.level).toBe(level);
        expect(parsed.message).toBe('test message');
      });
    });
  });
});
