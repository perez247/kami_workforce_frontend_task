import { TrimSentencePipe } from './trim-sentence.pipe';

describe('TrimSentencePipe', () => {
  let pipe: TrimSentencePipe;

  it('create an instance', () => {
    const pipe = new TrimSentencePipe();
    expect(pipe).toBeTruthy();
  });

  beforeEach(() => {
    pipe = new TrimSentencePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original value if it is shorter than or equal to the default length (20)', () => {
    const shortText = 'Short text';
    expect(pipe.transform(shortText)).toBe(shortText);

    const exactLengthText = '12345678901234567890'; // 20 characters
    expect(pipe.transform(exactLengthText)).toBe(exactLengthText);
  });

  it('should trim the string and append "..." if it exceeds the default length (20)', () => {
    const longText = 'This is a very long sentence that exceeds the default length.';
    expect(pipe.transform(longText)).toBe('This is a very long ...');
  });

  it('should use the specified length from arguments', () => {
    const longText = 'This is a long sentence.';
    expect(pipe.transform(longText, 10)).toBe('This is a ...');
  });

  it('should return the original string if the specified length is greater than the string length', () => {
    const text = 'Short text';
    expect(pipe.transform(text, 50)).toBe(text);
  });

  it('should handle edge cases gracefully', () => {
    expect(pipe.transform('', 5)).toBe(''); // Empty string input
    expect(pipe.transform('a', 1)).toBe('a'); // Single character string
    expect(pipe.transform('abcd', 0)).toBe('abcd'); // Zero length argument will return the whole value, if you don't want any value them just put the ... manually
    expect(pipe.transform('abcd', -5)).toBe('abcd'); // Negative will use the default value
    expect(pipe.transform('abcd', NaN)).toBe('abcd'); // NaN length argument
    expect(pipe.transform('abcd', Infinity)).toBe('abcd'); // Infinity length argument
  });
});
