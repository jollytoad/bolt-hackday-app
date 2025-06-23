import { useState, useEffect } from 'react';
import { Todo, FilterType } from '../types/todo';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);

  // Fetch todos from Supabase
  const fetchTodos = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTodos = data.map(todo => ({
        ...todo,
        created_at: new Date(todo.created_at),
        updated_at: new Date(todo.updated_at),
      }));

      setTodos(formattedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load todos when user changes
  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [user]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('todos_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newTodo = {
              ...payload.new,
              created_at: new Date(payload.new.created_at),
              updated_at: new Date(payload.new.updated_at),
            } as Todo;
            setTodos(prev => [newTodo, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedTodo = {
              ...payload.new,
              created_at: new Date(payload.new.created_at),
              updated_at: new Date(payload.new.updated_at),
            } as Todo;
            setTodos(prev =>
              prev.map(todo =>
                todo.id === updatedTodo.id ? updatedTodo : todo
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setTodos(prev => prev.filter(todo => todo.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const addTodo = async (text: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .insert({
          text: text.trim(),
          user_id: user.id,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    if (!user) return;

    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = async (id: string, newText: string) => {
    if (!user) return;

    const trimmedText = newText.trim();
    if (!trimmedText) {
      deleteTodo(id);
      return;
    }

    try {
      const { error } = await supabase
        .from('todos')
        .update({ text: trimmedText })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const clearCompleted = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', user.id)
        .eq('completed', true);

      if (error) throw error;
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  const toggleAll = async () => {
    if (!user) return;

    const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
    
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !allCompleted })
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling all todos:', error);
    }
  };

  // Filtered todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    stats,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
  };
};