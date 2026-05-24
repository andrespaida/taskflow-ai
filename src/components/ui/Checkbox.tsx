import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label ?? 'Toggle completion'}
      onClick={onChange}
      className={`group relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
        checked
          ? 'border-brand-500 bg-brand-500'
          : 'border-slate-300 hover:border-brand-400 dark:border-slate-600 dark:hover:border-brand-400'
      }`}
    >
      <motion.span
        initial={false}
        animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </motion.span>
    </button>
  );
}
