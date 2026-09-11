import { useReducer, useEffect } from "react";
import { useSearchParams } from "react-router";
import TodoForm from "../features/Todos/TodoForm.jsx";
import TodoList from "../features/Todos/TodoList/TodoList.jsx";
import SortBy from "../shared/SortBy.jsx";
import useDebounce from "../utils/useDebounce.js";
import FilterInput from "../shared/FilterInput.jsx";
import StatusFilter from "../shared/StatusFilter.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from "../reducers/todoReducer.js";

export default function TodosPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const statusFilter = searchParams.get("status") || "all";
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchTodos = async () => {
      dispatch({
        type: TODO_ACTIONS.FETCH_START,
      });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 100,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);

        const resp = await fetch(`/api/tasks?${params}`, {
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });

        if (!resp.ok) {
          if (resp.status === 401) {
            throw new Error("unauthorized");
          }
          throw new Error("Failed to fetch todos");
        }

        const data = await resp.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,

          payload: {
            todos: Array.isArray(data.tasks) ? data.tasks : [],
          },
        });
      } catch (error) {
        const isFilterError =
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "asc";

        // decide which error should be displayed
        const message = isFilterError
          ? `Error filtering/sorting todos: ${error.message}`
          : `Error fetching todos: ${error.message}`;
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message,
            isFilterError,
          },
        });
      }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: {
        filterTerm: newTerm,
      },
    });
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,

      payload: {
        editedTodo,
      },
    });

    try {
      const resp = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to update todo");
      }
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,

        payload: {
          originalTodo,
          message: `Failed to update todo: ${error.message}`,
        },
      });
    }
  };

  const addTodo = async (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };
    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,

      payload: {
        newTodo,
      },
    });

    try {
      const resp = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to save todo");
      }

      const savedTodo = await resp.json();

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,

        payload: {
          tempId: newTodo.id,
          savedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,

        payload: {
          tempId: newTodo.id,

          message: `Failed to add todo: ${error.message}`,
        },
      });
    }
  };

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,

      payload: {
        id,
      },
    });

    try {
      const resp = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({ isCompleted: true }),
      });
      if (!resp.ok) {
        throw new Error("Failed to complete todo");
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,

        payload: {
          originalTodo,

          message: `Failed to complete todo: ${error.message}`,
        },
      });
    }
  }

  return (
    <div className="stack">
      {isTodoListLoading && <p>Loading todos...</p>}

      {error && (
        <div className="error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
          >
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div className="error" role="alert">
          <p>{filterError}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
          >
            Clear Filter Error
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
          >
            Reset Filters
          </button>
        </div>
      )}
      <div className="card row">
        <SortBy
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortByChange={(newSortBy) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: {
                sortBy: newSortBy,
                sortDirection,
              },
            })
          }
          onSortDirectionChange={(newSortDirection) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: {
                sortBy,
                sortDirection: newSortDirection,
              },
            })
          }
        />

        <FilterInput
          filterTerm={filterTerm}
          onFilterChange={handleFilterChange}
        />
        <StatusFilter />
      </div>

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
        statusFilter={statusFilter}
      />
    </div>
  );
}
