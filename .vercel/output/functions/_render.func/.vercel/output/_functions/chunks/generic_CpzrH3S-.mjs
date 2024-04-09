export { renderers } from '../renderers.mjs';

const page = () => import('./pages/generic_DCg_eSPW.mjs').then(n => n.g);

export { page };
