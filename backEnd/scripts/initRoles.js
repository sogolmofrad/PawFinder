import 'dotenv/config';
import mongoose from 'mongoose';
import Role from '../models/Role.js';

const defaultRoles = [
  {
    name: 'user',
    description: 'Regular user with basic permissions',
    permissions: ['read_pets', 'create_adoption_requests', 'edit_own_profile']
  },
  {
    name: 'admin',
    description: 'Administrator with full access',
    permissions: ['read_pets', 'create_pets', 'edit_pets', 'delete_pets', 'manage_users', 'manage_roles']
  },
  {
    name: 'shelter',
    description: 'Animal shelter or rescue organization',
    permissions: ['read_pets', 'create_pets', 'edit_own_pets', 'manage_adoption_requests']
  }
];

async function initRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME
    });
    console.log(`Connected to MongoDB - ${process.env.DB_NAME} database`);

    for (const role of defaultRoles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Created role: ${role.name}`);
      } else {
        console.log(`Role ${role.name} already exists`);
      }
    }

    console.log('Roles initialization completed');
  } catch (error) {
    console.error('Error initializing roles:', error);
  } finally {
    await mongoose.connection.close();
  }
}

initRoles();