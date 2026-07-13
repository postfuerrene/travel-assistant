"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BedDouble,
  Bus,
  CircleDollarSign,
  Plus,
  Ticket,
  Trash2,
  Utensils,
  type LucideIcon,
} from "lucide-react";

type Category = "Hotel" | "Essen" | "Eintritte" | "Transport" | "Sonstiges";

type Expense = {
  id: string;
  description: string;
  amount: number;
  category: Category;
};

const CATEGORIES: Category[] = [
  "Hotel",
  "Essen",
  "Eintritte",
  "Transport",
  "Sonstiges",
];

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  Hotel: BedDouble,
  Essen: Utensils,
  Eintritte: Ticket,
  Transport: Bus,
  Sonstiges: CircleDollarSign,
};

const STORAGE_KEY = "travel-assistant-expenses-v1";

const currency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export default function ExpenseTracker({
  estimateEUR,
}: {
  estimateEUR: number;
}) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Sonstiges");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage after mount, since the value
      // isn't available during SSR and must match the server-rendered
      // empty state until this effect runs.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setExpenses(JSON.parse(raw));
    } catch {
      // ignore corrupt local data
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, loaded]);

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );
  const remaining = estimateEUR - total;
  const percentUsed = Math.min(100, (total / estimateEUR) * 100);

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount.replace(",", "."));
    if (!description.trim() || !Number.isFinite(value) || value <= 0) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        description: description.trim(),
        amount: value,
        category,
      },
    ]);
    setDescription("");
    setAmount("");
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="mt-4 rounded-2xl bg-white/85 p-4 shadow-float backdrop-blur-sm">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy">Eigene Ausgaben</h3>
        <span className="text-xs text-ink-soft">Nur auf diesem Gerät</span>
      </div>
      <p className="mb-4 text-xs text-ink-soft">
        Tragt hier ein, was ihr unterwegs tatsächlich ausgebt — die Summe wird
        automatisch mit der Schätzung verglichen.
      </p>

      <div className="mb-4">
        <div className="mb-1.5 flex items-baseline justify-between text-sm">
          <span className="font-semibold text-navy">
            {currency.format(total)}
          </span>
          <span className="text-xs text-ink-soft">
            {remaining >= 0
              ? `${currency.format(remaining)} übrig`
              : `${currency.format(Math.abs(remaining))} über Budget`}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-cream">
          <div
            className={`h-full rounded-full transition-all ${
              total > estimateEUR ? "bg-orange" : "bg-green"
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={addExpense}
        className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto_auto]"
      >
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="z.B. Eis am Prater"
          aria-label="Beschreibung"
          className="min-h-11 rounded-xl border border-line px-3 text-sm focus:ring-2 focus:ring-green focus:outline-none"
        />
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="€"
          aria-label="Betrag in Euro"
          className="min-h-11 w-full rounded-xl border border-line px-3 text-sm focus:ring-2 focus:ring-green focus:outline-none sm:w-24"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          aria-label="Kategorie"
          className="min-h-11 rounded-xl border border-line px-2 text-sm focus:ring-2 focus:ring-green focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-green-deep px-4 text-sm font-semibold text-white transition active:scale-95 hover:bg-navy-light"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          Hinzufügen
        </button>
      </form>

      {expenses.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {expenses
            .slice()
            .reverse()
            .map((e) => {
              const Icon = CATEGORY_ICON[e.category];
              return (
                <li
                  key={e.id}
                  className="flex items-center gap-2.5 rounded-xl bg-cream px-3 py-2 animate-fade-up"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-navy">
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink">
                    {e.description}
                  </span>
                  <span className="text-sm font-semibold whitespace-nowrap text-navy">
                    {currency.format(e.amount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExpense(e.id)}
                    aria-label={`${e.description} löschen`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-ink-soft transition active:scale-90 hover:text-orange"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
