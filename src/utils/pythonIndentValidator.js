/**
 * Lightweight Python indentation checker for Monaco editor markers.
 * Mirrors common CPython IndentationError cases (not a full parser).
 */

function measureIndent(rawLine, tabSize = 4) {
  let col = 0;
  let i = 0;
  for (; i < rawLine.length; i++) {
    const ch = rawLine[i];
    if (ch === ' ') col += 1;
    else if (ch === '\t') col += tabSize - (col % tabSize);
    else break;
  }
  return { col, contentStart: i, indentPrefix: rawLine.slice(0, i) };
}

function stripTrailingComment(line) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === '#' && !inSingle && !inDouble) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line.trimEnd();
}

function lineOpensBlock(line) {
  const code = stripTrailingComment(line).trim();
  if (!code) return false;
  if (code.endsWith('\\')) return false;
  return code.endsWith(':');
}

/**
 * @returns {{ line: number, column: number, message: string }[]}
 */
export function validatePythonIndentation(source, tabSize = 4) {
  if (!source || !source.trim()) return [];

  const diagnostics = [];
  const lines = source.split('\n');
  const indentStack = [0];
  let prevOpensBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const { col, indentPrefix } = measureIndent(raw, tabSize);

    if (indentPrefix.includes(' ') && indentPrefix.includes('\t')) {
      diagnostics.push({
        line: lineNo,
        column: 1,
        message:
          'IndentationError: inconsistent use of tabs and spaces in indentation'
      });
      prevOpensBlock = lineOpensBlock(trimmed);
      continue;
    }

    const currentIndent = col;
    const stackTop = indentStack[indentStack.length - 1];

    if (prevOpensBlock && currentIndent <= stackTop) {
      diagnostics.push({
        line: lineNo,
        column: 1,
        message:
          currentIndent === stackTop
            ? 'IndentationError: expected an indented block'
            : 'IndentationError: unindent does not match any outer indentation level'
      });
      prevOpensBlock = lineOpensBlock(trimmed);
      continue;
    }

    if (currentIndent > stackTop) {
      if (!prevOpensBlock) {
        diagnostics.push({
          line: lineNo,
          column: 1,
          message: 'IndentationError: unexpected indent'
        });
      } else {
        indentStack.push(currentIndent);
      }
    } else if (currentIndent < stackTop) {
      while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
      }
      if (currentIndent !== indentStack[indentStack.length - 1]) {
        diagnostics.push({
          line: lineNo,
          column: 1,
          message:
            'IndentationError: unindent does not match any outer indentation level'
        });
      }
    }

    prevOpensBlock = lineOpensBlock(trimmed);
  }

  return diagnostics;
}

export function hasPythonIndentErrors(source, tabSize = 4) {
  return validatePythonIndentation(source, tabSize).length > 0;
}
