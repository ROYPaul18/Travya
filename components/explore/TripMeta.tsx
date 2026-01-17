"use client";

import { Cormorant_Garamond } from 'next/font/google';
import { useEditableField } from '@/hooks/useEditableField';

interface Props {
  description?: string | null;
  startDate: Date;
  endDate: Date;
  editable?: boolean;
  onDescriptionChange?: (newDescription: string) => Promise<void> | void;
}

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export function TripMeta({
  description,
  editable = false,
  onDescriptionChange
}: Props) {
  const {
    isEditing,
    value,
    isSaving,
    inputRef,
    setValue,
    startEditing,
    handleKeyDown,
    handleBlur,
  } = useEditableField({
    initialValue: description,
    onSave: onDescriptionChange,
    enabled: editable,
  });

  const textStyle = {
    fontSize: "2.2rem",
    lineHeight: 1.4,
    color: "#333",
    fontWeight: 300,
  };
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="space-y-2 pb-4 sm:pb-6">
      <section className="py-[120px] max-w-[800px] mx-auto text-center">
        {isEditing && editable ? (
          <div className="relative">
            <textarea
              ref={(el) => {
                if (el) {
                  inputRef.current = el;
                  autoResize(el);
                }
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={isSaving}
              className={cormorant.className}
              style={{
                ...textStyle,
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                background: 'transparent',
                textAlign: 'center',
                minHeight: '100px',
                opacity: isSaving ? 0.6 : 1,
              }}
              placeholder="Ajoutez une description..."
            />
            {isSaving && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={startEditing}
            className={`${cormorant.className} ${editable
              ? 'cursor-text hover:bg-gray-50 rounded-lg px-4 py-2 transition-colors'
              : ''
              }`}
            style={textStyle}
          >
            {value || (editable ? "Cliquez pour ajouter une description..." : "")}
          </div>
        )}

        {editable && isEditing && !isSaving && (
          <p className="text-sm text-gray-400 mt-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Échap</kbd> pour annuler •
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs ml-1">Ctrl+Enter</kbd> pour sauvegarder
          </p>
        )}
      </section>
    </div>
  );
}
