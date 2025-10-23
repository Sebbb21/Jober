# Jober - Application Mobile

Application mobile de mise en relation entre employeurs et freelances, développée avec Expo React Native et TypeScript.

## 🚀 Technologies

- **Framework** : Expo + React Native
- **Langage** : TypeScript
- **Navigation** : Expo Router
- **Plateformes** : iOS + Android

## 📁 Structure du projet

```
app/
├─ _layout.tsx                   ← Layout global (navigation principale)
├─ index.tsx                     ← Page d'accueil
├─ (auth)/                       ← Authentification / abonnement
│   ├─ _layout.tsx
│   ├─ login.tsx
│   ├─ register.tsx
│   └─ abonnement.tsx
├─ (employeur)/                  ← Espace employeur
│   ├─ _layout.tsx
│   ├─ accueil.tsx
│   ├─ freelances.tsx
│   ├─ dashboard.tsx
│   ├─ messages.tsx
│   └─ compte.tsx
├─ (freelance)/                  ← Espace freelance
│   ├─ _layout.tsx
│   ├─ accueil.tsx
│   ├─ missions.tsx
│   ├─ dashboard.tsx
│   ├─ messages.tsx
│   └─ compte.tsx
assets/
├─ images/
├─ icons/
src/
├─ components/
├─ contexts/
├─ hooks/
├─ services/
└─ utils/
```

## 🛠️ Installation et lancement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Expo CLI : `npm install -g @expo/cli`
- Expo Go (application mobile pour tester)

### Installation
```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd Jober

# Installer les dépendances
npm install
```

### Lancement
```bash
# Démarrer le serveur de développement
npx expo start

# Ou utiliser npm
npm start
```

### Commandes disponibles
```bash
# Démarrer sur iOS
npm run ios

# Démarrer sur Android
npm run android

# Démarrer sur Web
npm run web
```

## 📱 Test sur mobile

1. Installez l'application **Expo Go** sur votre téléphone
2. Lancez `npx expo start`
3. Scannez le QR code avec Expo Go (iOS) ou l'application Camera (Android)

## 🔧 Configuration

Le projet utilise Expo Router pour la navigation. La configuration est définie dans :
- `app.json` : Configuration Expo avec le plugin expo-router
- `index.ts` : Point d'entrée avec `import "expo-router/entry"`

## 📋 État du projet

✅ **Base technique configurée**
- Structure des dossiers créée
- Navigation Expo Router configurée
- Layouts et pages de base créés
- TypeScript configuré

🚧 **À développer**
- Interface utilisateur des pages
- Logique métier
- Intégration API
- Base de données

## 🎯 Prochaines étapes

1. Développement des maquettes des pages
2. Implémentation de l'interface utilisateur
3. Intégration des fonctionnalités métier
4. Développement du backend et de la base de données

## 📝 Notes

- Toutes les pages sont actuellement des squelettes avec du texte placeholder
- La structure est prête à recevoir les maquettes et le développement des fonctionnalités
- Aucune dépendance UI kit installée pour l'instant (sera ajoutée selon les besoins)
