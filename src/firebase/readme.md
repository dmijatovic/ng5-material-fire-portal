
# FIREBASE

Here we set information about firebase. Note there are two versions now:
- firebase: older and simpler data store, object based store
- firestore: new, currenly in beta, document based store

## Credentials
STORE YOUR FIREBASE CREDENTIALS IN THIS FOLDER in the file called credentials.ts 
Same authentication module, based on email works in both database versions

Include credentials file in your angular environment file. Note that credentials.ts is excluded from git, in order to prevent publishing your credentials.

The file should have object `cred` and properties shown in the example below.
```
const cred = {
    user:'your.email@domain.com',
    pass:'YourMagicPass777',
    firebase:{
        apiKey: "YourFirebaseApiKey",
        authDomain: "dv4fire.firebaseapp.com",
        databaseURL: "https://dv4fire.firebaseio.com",
        projectId: "dv4fire",
        storageBucket: "dv4fire.appspot.com",
        messagingSenderId: "153465783888"
    }
}
```

## Data exports & imports using json
NOTE! when importing json in firebase project all data will be replaced!!!

- You can export and import data using json.
- The json needs to have only object literals, arrays are not supported

## dv4fire data structure (dv4fire.json)
The data in dv4fire demo project has follwing structure.

- `menu`: top level object holgin all possible menu items, for top menu. The header of app fetch menu item data from here
- `user`: top level object holding all user profile properties. The key of each user is base64 encoded email. This is needed for firebase because it does not supports @ in the key and we want to match all users in demo by email, as this will be unique user key in this demo database.
- `profile`: top level object for profile menu options