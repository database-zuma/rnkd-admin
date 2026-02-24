import { mockUsers, mockDashboardStats } from '../mock-data/users';

// Data Access Layer (DAL) for Users
// Phase 0: Returns mock data
// Phase 11: Will be swapped to Supabase calls

export async function getUsers(opts?: { search?: string; tier?: string }) {
  let users = [...mockUsers];
  
  if (opts?.search) {
    const s = opts.search.toLowerCase();
    users = users.filter(u => u.name.toLowerCase().includes(s) || u.phone.includes(s));
  }
  
  if (opts?.tier) {
    users = users.filter(u => u.profile.tier === opts.tier);
  }
  
  return users;
}

export async function getUserById(id: string) {
  return mockUsers.find(u => u.id === id) || null;
}

export async function getDashboardStats() {
  return mockDashboardStats;
}