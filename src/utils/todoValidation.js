export const MAX_TODO_LENGTH = 100;

export function isValidTodoTitle(title) {
  const trimmed = title.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_TODO_LENGTH;
}

export function getTodoTitleError(title) {
  const trimmed = title.trim();
  if (trimmed.length === 0) return "Todo cannot be empty.";
  if (trimmed.length > MAX_TODO_LENGTH) {
    return `Todo must be ${MAX_TODO_LENGTH} characters or fewer.`;
  }
  return "";
}
