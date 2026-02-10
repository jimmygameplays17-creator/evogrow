"use client";

import { useState } from "react";

const wallets = [
  { name: "MetaMask", icon: "🦊" },
  { name: "Phantom", icon: "👻" },
  { name: "Coinbase Wallet", icon: "🧿" },
  { name: "WalletConnect", icon: "🔗" }
];

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent"
      >
        Open Login
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Welcome to Fundra</h2>
              <button onClick={() => setIsOpen(false)} className="text-sm text-slate-300 hover:text-white">
                Close
              </button>
            </div>

            <div className="space-y-5 px-6 py-6 text-slate-100">
              <button className="w-full rounded-full bg-money px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg">
                Continue with Google
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px flex-1 bg-white/10" />
                OR
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/30 focus:outline-none"
                />
                <button className="w-full rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent hover:bg-white/5">
                  Continue
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Wallets</p>
                <div className="grid grid-cols-2 gap-3">
                  {wallets.map((wallet) => (
                    <button
                      key={wallet.name}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/10"
                    >
                      <span className="text-base">{wallet.icon}</span>
                      {wallet.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-xs text-slate-400">
              <button className="transition hover:text-white">Terms</button>
              <button className="transition hover:text-white">Privacy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
