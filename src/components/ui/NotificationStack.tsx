"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { CheckCircle, Info, AlertCircle, X } from "lucide-react";

const ICONS = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
};

const COLORS = {
  success: "border-slime/30 bg-slime/10 text-slime",
  info: "border-spectral/30 bg-spectral/10 text-spectral",
  error: "border-red-500/30 bg-red-500/10 text-red-400",
};

export function NotificationStack() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-xs w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((n) => {
          const Icon = ICONS[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border glass-dark ${COLORS[n.type]}`}
            >
              <Icon className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium flex-1">{n.message}</p>
              <button
                onClick={() => removeNotification(n.id)}
                className="text-current opacity-60 hover:opacity-100 transition-opacity shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
