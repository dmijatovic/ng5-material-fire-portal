// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//get credentials for firebase database
import { cred } from '../firebase/credentials';
import { sysCfg } from '../system/sys.cfg';

export const environment = {
  production: false,
  firebase: cred.firestore,
  cfg: sysCfg
};
