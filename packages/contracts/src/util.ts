import { ResultInterface } from '@blockstack/clarity'

export namespace Clarity {
  export function uint(val: number): string {
    return `u${BigInt(val).toString()}`;
  }

  export function int(val: number): string {
    return `${BigInt(val).toString()}`;
  }

  export function principal(val: string): string {
    return `'${val}`;
  }

  function getWrappedResult(input: ResultInterface<string, unknown>, r: RegExp): string {
    if (input.result) {
      const match = r.exec(input.result);
      if (!match) {
        // console.debug(input)
        throw new Error(`Unable to unwrap result: ${input.result}`);
      }
      return match[1];
    }
    throw new Error(`Unable to unwrap result: ${input}`);
  };
  
  export function unwrapUInt(input: ResultInterface<string, unknown>): BigInt {
    const match = getWrappedResult(input, /^(?:\(?ok\s)?u(\d+)\)?$/);
    return BigInt(match);
  }
  
  export function unwrapInt(input: ResultInterface<string, unknown>): BigInt {
    const match = getWrappedResult(input, /^(?:\(?ok\s)?(\d+)\)?$/);
    return BigInt(match);
  }

  export function unwrapBool(input: ResultInterface<string, unknown>): boolean {
    const match = getWrappedResult(input, /^(?:\(ok\s)?(true|false)\)?$/);
    return match === 'true';
  }
}




