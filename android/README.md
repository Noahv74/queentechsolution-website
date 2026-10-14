# Queen Tech Android app (Trusted Web Activity)

The app opens https://queentechsolution.info full-screen in Chrome, so every change to the website
shows up in the app automatically. Rebuild the app only to change its name, icon or Android version.

- Package: `info.queentechsolution.app` · generated with Bubblewrap (twa-manifest.json).
- Build: pushing changes under `android/` to `main` runs `.github/workflows/android.yml`, which builds an
  **unsigned** APK + AAB and puts them on the `android-dist` branch.
- Signing happens offline with the upload key (not in this repo):
  - APK: `apksigner sign --ks queentech-upload.jks --ks-key-alias queentech --out queentech.apk app-release-unsigned.apk`
  - AAB: `jarsigner -sigalg SHA256withRSA -digestalg SHA-256 -keystore queentech-upload.jks app-release.aab queentech`
- For each new version: raise `versionCode` and `versionName` in `app/build.gradle` (and in twa-manifest.json).
- Full-screen (no URL bar) needs https://queentechsolution.info/.well-known/assetlinks.json to list the
  SHA-256 of the signing certificate. If Google Play signs the app (Play App Signing), add Google's
  "App signing key certificate" SHA-256 there too.
