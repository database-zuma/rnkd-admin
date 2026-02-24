"use client";


export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Login submitted');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(210,248,2,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(10,132,255,0.04)_0%,transparent_50%)]" />
      
      <div className="glass-card w-full max-w-md p-10 relative z-10 animate-fade-in-up">
        {/* Branding */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-[#D2F802] drop-shadow-[0_0_20px_rgba(210,248,2,0.3)]">RNKD</h1>
          <p className="mt-3 text-sm text-[#A1A1A6] tracking-wide">Admin Portal</p>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#D2F802]/30 to-transparent" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up-delay-1">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-[#F5F5F7]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@rnkd.com"
              className="block w-full rounded-xl bg-[#2C2C2E]/80 border border-white/[0.08] px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#8E8E93] outline-none focus:ring-2 focus:ring-[#D2F802]/30 focus:border-[#D2F802]/20 transition-all duration-200"
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
              className="block w-full rounded-xl bg-[#2C2C2E]/80 border border-white/[0.08] px-4 py-3 text-sm text-[#F5F5F7] placeholder:text-[#8E8E93] outline-none focus:ring-2 focus:ring-[#D2F802]/30 focus:border-[#D2F802]/20 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#D2F802] px-4 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(210,248,2,0.25)] active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#8E8E93] animate-fade-in-up-delay-2">
          RNKD Padel · Operations Dashboard
        </p>
      </div>
    </div>
  );
}