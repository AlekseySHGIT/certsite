import { Ability } from '@casl/ability';

export function defineAbilitiesFor(role) {
  const ability = new Ability();

  if (role === 'client') {
    ability.update([
      // Client can only create applications
      { action: 'create', subject: 'Application' },
      { action: 'read', subject: 'Application' },
      { action: 'read', subject: 'Profile' },
      { action: 'update', subject: 'Profile' },
      { action: 'read', subject: 'News' },
      { action: 'read', subject: 'About' },
      { action: 'read', subject: 'Home' }
    ]);
  } else if (role === 'admin') {
    // Admin has access to everything
    ability.update([
      { action: 'manage', subject: 'all' },
      // Explicitly add create Application permission for admin
      { action: 'create', subject: 'Application' }
    ]);
  } else if (role === 'manager') {
    // Manager has access to most things but not everything
    ability.update([
      { action: 'read', subject: 'all' },
      { action: 'update', subject: 'Application' },
      { action: 'approve', subject: 'Application' },
      { action: 'reject', subject: 'Application' },
      { action: 'assign', subject: 'Application' },
      { action: 'read', subject: 'Profile' },
      { action: 'update', subject: 'Profile' },
      { action: 'read', subject: 'News' },
      { action: 'create', subject: 'News' },
      { action: 'update', subject: 'News' },
      { action: 'delete', subject: 'News' },
      { action: 'manage', subject: 'Invoice' }
    ]);
  } else if (role === 'expert') {
    ability.update([
      { action: 'read', subject: 'Application' },
      { action: 'update', subject: 'Application' },
      { action: 'review', subject: 'Application' },
      { action: 'read', subject: 'Profile' },
      { action: 'update', subject: 'Profile' },
      { action: 'read', subject: 'News' },
      { action: 'read', subject: 'About' },
      { action: 'read', subject: 'Home' }
    ]);
  } else {
    // Guest permissions
    ability.update([
      { action: 'read', subject: 'News' },
      { action: 'read', subject: 'About' },
      { action: 'read', subject: 'Home' }
    ]);
  }

  return ability;
}
