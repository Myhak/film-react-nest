import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
  });

  describe('formatMessage', () => {
    it('should contain level and message fields', () => {
      const result = logger.formatMessage('log', 'hello');
      expect(result).toContain('level=log');
      expect(result).toContain('message=hello');
    });

    it('should separate fields with tab character', () => {
      const result = logger.formatMessage('warn', 'test');
      const fields = result.trimEnd().split('\t');
      expect(fields.length).toBeGreaterThanOrEqual(2);
    });

    it('should end with newline character', () => {
      const result = logger.formatMessage('info', 'msg');
      expect(result.endsWith('\n')).toBe(true);
    });

    it('should include optionalParams when provided', () => {
      const result = logger.formatMessage('error', 'fail', 'Context');
      expect(result).toContain('optionalParams=');
    });

    it('should omit optionalParams field when none provided', () => {
      const result = logger.formatMessage('log', 'msg');
      expect(result).not.toContain('optionalParams=');
    });
  });

  describe('log methods write TSKV to stdout', () => {
    const levels = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'] as const;

    levels.forEach((level) => {
      it(`${level}() should write to stdout with correct level`, () => {
        logger[level]('test message');
        expect(stdoutSpy).toHaveBeenCalledTimes(1);
        const output = stdoutSpy.mock.calls[0][0] as string;
        expect(output).toContain(`level=${level}`);
        expect(output).toContain('message=test message');
        expect(output.endsWith('\n')).toBe(true);
      });
    });
  });
});
