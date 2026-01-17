import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface UseEditableFieldOptions {
  initialValue?: string | null;
  onSave?: (value: string) => void | Promise<void>;
  enabled?: boolean;
}

export function useEditableField({
  initialValue = '',
  onSave,
  enabled = true,
}: UseEditableFieldOptions) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || '');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const startEditing = () => {
    if (enabled) {
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setValue(initialValue || '');
    setIsEditing(false);
  };

  const saveEditing = async () => {
    if (value === initialValue) {
      setIsEditing(false);
      return;
    }

    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(value);
        setIsEditing(false);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        // On reste en mode édition en cas d'erreur
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      saveEditing();
    }
  };

  const handleBlur = () => {
    if (!isSaving) {
      saveEditing();
    }
  };

  return {
    // État
    isEditing,
    value,
    isSaving,
    inputRef,
    
    // Actions
    setValue,
    startEditing,
    cancelEditing,
    saveEditing,
    
    // Handlers
    handleKeyDown,
    handleBlur,
  };
}