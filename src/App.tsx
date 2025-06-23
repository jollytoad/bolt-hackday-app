import React from 'react';
import { CheckSquare, LogOut } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useTodos } from './hooks/useTodos';
import { signOut } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilters } from './components/TodoFilters';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { user, loading: authLoading } = useAuth();
  const {
    todos,
    filter,
    setFilter,
    stats,
    loading: todosLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
  } = useTodos();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TodoFlow
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-600 text-lg">
              Welcome back, {user.email}
            </p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Todo Form */}
        <TodoForm onAdd={addTodo} />

        {/* Filters & Stats - Now above the list */}
        <div className="mb-6">
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
            onToggleAll={toggleAll}
          />
        </div>

        {/* Todo List - Now full width */}
        <div className="space-y-3">
          {todosLoading ? (
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl">
              <LoadingSpinner />
            </div>
          ) : todos.length > 0 ? (
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl">
              <EmptyState filter={filter} hasAnyTodos={stats.total > 0} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with React, TypeScript, Tailwind CSS & Supabase</p>
        </div>
      </div>
    </div>
  );
}

export default App;