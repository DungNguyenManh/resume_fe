/**
 * Represents a single line entry or group of output logs printed on the console screen.
 */
export interface TerminalLog {
  input: string;
  output: string[];
  isError?: boolean;
}

/**
 * Encapsulates the execution result of a terminal command strategy.
 */
export interface CommandResult {
  output: string[];
  isError?: boolean;
  clearScreen?: boolean;
}

/**
 * Execution strategy signature for terminal commands.
 * Receives an array of string parameters and returns a CommandResult.
 */
export type CommandStrategyFn = (args: string[]) => CommandResult;
