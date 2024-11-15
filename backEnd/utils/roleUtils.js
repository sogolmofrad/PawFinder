import Role from '../models/Role.js';

export async function getRoleIdByName(roleName) {
  const role = await Role.findOne({ name: roleName });
  if (!role) throw new Error(`Role ${roleName} not found`);
  return role._id;
}