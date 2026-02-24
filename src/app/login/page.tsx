export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="glass-card w-full max-w-md p-8">
        {/* Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#D2F802]">RNKD</h1>
          <p className="mt-2 text-sm text-[#A1A1A6]">Admin Portal</p>
        </div>

        {/* Form */}
        <form action="#" className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-[#F5F5F7]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@rnkd.com"
              className="block w-full rounded-xl bg-[#2C2C2E] border border-white/[0.08] px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#A1A1A6] outline-none focus:ring-2 focus:ring-[#D2F802]/40 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#F5F5F7]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="block w-full rounded-xl bg-[#2C2C2E] border border-white/[0.08] px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#A1A1A6] outline-none focus:ring-2 focus:ring-[#D2F802]/40 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#D2F802] px-4 py-3 text-sm font-semibold text-black transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#A1A1A6]">
          RNKD Padel &middot; Operations Dashboard
        </p>
      </div>
    </div>
  );
}
