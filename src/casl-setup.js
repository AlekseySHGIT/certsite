import { abilitiesPlugin } from '@casl/vue';
import { defineAbilitiesFor } from './services/ability';
import { useAuthStore } from './stores/auth';

export const ability = defineAbilitiesFor('guest'); // default guest

export function setupCASL(app) {
  const authStore = useAuthStore();
  ability.update(defineAbilitiesFor(authStore.role).rules);
  app.use(abilitiesPlugin, ability);

  authStore.$subscribe((mutation, state) => {
    ability.update(defineAbilitiesFor(state.role).rules);
  });
}
