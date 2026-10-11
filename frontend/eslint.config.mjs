import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

/**
 * Configuration ESLint du site.
 *
 * Le contrôle d'accessibilité (`jsx-a11y`) est actif : il attrape au plus tôt
 * les régressions du type libellé manquant, image sans alternative textuelle ou
 * élément interactif non atteignable au clavier.
 *
 * Usage : npm run lint
 */
export default [
  // Les fichiers de la bibliothèque de composants (shadcn/ui) sont livrés tels
  // quels et ne sont pas maintenus ici.
  { ignores: ["build/**", "node_modules/**", "src/components/ui/**", "src/hooks/use-toast.js"] },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Le JSX moderne n'exige plus d'importer React dans chaque fichier.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Le contenu du site est en français : les apostrophes sont partout et
      // React les échappe déjà correctement.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    // Scripts d'outillage : Node, plus les globales du navigateur pour le code
    // exécuté dans la page via `page.evaluate`.
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node, ...globals.browser },
    },
  },
];
