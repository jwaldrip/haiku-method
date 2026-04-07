import { useState } from "react";

export interface TrayComment {
  type: "inline" | "pin";
  text: string;
  comment: string;
  id: string;
}

interface Props {
  comments: TrayComment[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onScrollTo: (id: string) => void;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.substring(0, max) + "...";
}

export function CommentTray({ comments, onDelete, onClearAll, onScrollTo }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (comments.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expanded list */}
      {expanded && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-stone-900 border border-b-0 border-stone-200 dark:border-stone-700 rounded-t-xl shadow-xl max-h-64 overflow-y-auto">
            <div className="p-3 space-y-2">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer group transition-colors"
                  onClick={() => onScrollTo(c.id)}
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold inline-flex items-center justify-center mt-0.5 ${
                      c.type === "pin"
                        ? "bg-rose-600 text-white"
                        : "text-amber-900"
                    }`}
                    style={c.type === "inline" ? { background: "rgba(251,191,36,0.8)" } : undefined}
                  >
                    {c.type === "pin" ? "\u25CF" : "\u270E"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-500 dark:text-stone-400 italic truncate">
                      &ldquo;{truncate(c.text, 60)}&rdquo;
                    </p>
                    {c.comment && (
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-0.5 line-clamp-2">
                        {c.comment}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 text-stone-400 hover:text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete comment"
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(c.id);
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed bar */}
      <div className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-bold"
            >
              {comments.length}
            </span>
            <span>{comments.length === 1 ? "1 comment" : `${comments.length} comments`}</span>
            <span
              className="text-stone-400 transition-transform"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              &#9650;
            </span>
          </button>

          <div className="flex-1" />

          <button
            type="button"
            onClick={onClearAll}
            className="px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
