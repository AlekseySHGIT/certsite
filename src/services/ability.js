import { Ability } from '@casl/ability';

export function defineAbilitiesFor(role) {
  const ability = new Ability();

  if (role === 'client') {
    ability.update([
      { action: 'create', subject: 'Application' },
      // You can add more client permissions here
    ]);
  } else if (role === 'admin' || role === 'manager') {
    ability.update([
      // Admin/manager permissions, but NOT create Application
    ]);
  }

  return ability;
}
