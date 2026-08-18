import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

interface NotificationContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

let nextId = 0;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NotificationItem[]>([]);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const push = useCallback(
    (type: NotificationType, message: string) => {
      const id = nextId++;
      setItems((prev) => [...prev, { id, type, message }]);
      setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  const showSuccess = useCallback((message: string) => push('success', message), [push]);
  const showError = useCallback((message: string) => push('error', message), [push]);

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {children}

      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0">
        {items.map((item) => (
          <div
            key={item.id}
            role="alert"
            className={`flex items-start gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in ${
              item.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            <span className="flex-1">{item.message}</span>
            <button
              onClick={() => remove(item.id)}
              className="text-current opacity-60 hover:opacity-100"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextType {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotification deve ser usado dentro de <NotificationProvider>');
  }
  return ctx;
}
