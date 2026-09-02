export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  // Add todo operations
  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  // Complete todo operations
  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  // Update todo operations
  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",

  // UI operations
  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_FILTER_ERROR: "CLEAR_FILTER_ERROR",
  RESET_FILTERS: "RESET_FILTERS",
};

// Initial state
export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "createdAt",
  sortDirection: "asc",
  filterTerm: "",
  dataVersion: 0,
};

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: "",
      };

    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todos,
        isTodoListLoading: false,
        error: "",
        filterError: "",
      };

    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        error: action.payload.isFilterError ? "" : action.payload.message,
        filterError: action.payload.isFilterError ? action.payload.message : "",
      };

    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        error: "",
        todoList: [action.payload.newTodo, ...state.todoList],
      };

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.tempId ? action.payload.savedTodo : todo,
        ),
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.tempId,
        ),
        error: action.payload.message,
      };

    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        error: "",
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                isCompleted: true,
              }
            : todo,
        ),
      };

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.originalTodo.id
            ? action.payload.originalTodo
            : todo,
        ),
        error: action.payload.message,
      };

    case TODO_ACTIONS.UPDATE_TODO_START:
      return {
        ...state,
        error: "",
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.editedTodo.id
            ? {
                ...action.payload.editedTodo,
              }
            : todo,
        ),
      };

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
      };

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.originalTodo.id
            ? action.payload.originalTodo
            : todo,
        ),
        error: action.payload.message,
      };

    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload.filterTerm,
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    case TODO_ACTIONS.CLEAR_FILTER_ERROR:
      return {
        ...state,
        filterError: "",
      };

    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: "",
        sortBy: "createdAt",
        sortDirection: "asc",
        filterError: "",
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
