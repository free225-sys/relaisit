/**
 * Détection du premier rendu sur une page pré-rendue.
 *
 * Le HTML livré est pré-rendu au build (voir scripts/prerender.js) : au premier
 * chargement, React « hydrate » un DOM déjà peuplé. Si les composants animés
 * démarraient alors à l'opacité 0, le HTML de départ et le rendu de React ne
 * concorderaient pas — React signale une erreur d'hydratation et reconstruit la
 * section — et le visiteur verrait le contenu disparaître avant de réapparaître.
 *
 * On neutralise donc les animations d'apparition pour ce seul premier rendu :
 * le contenu pré-rendu reste affiché tel quel, sans clignotement. Dès la frame
 * suivante, les animations reprennent normalement pour toute la navigation.
 */
const root = typeof document !== "undefined" ? document.getElementById("root") : null;

let hydrating = !!root && root.hasChildNodes();

export const isHydrating = () => hydrating;

/**
 * Appelé une fois que React a terminé le premier rendu (voir src/App.js).
 * L'hydratation étant concurrente, elle peut s'étaler sur plusieurs frames :
 * seul un effet monté en fin de commit garantit qu'aucun composant ne sera
 * plus rendu avec l'ancien état.
 */
export const endHydration = () => {
  hydrating = false;
};

/**
 * Renvoie les props d'animation, ou rien pendant l'hydratation initiale.
 * Usage : <motion.div {...reveal({ initial, whileInView, transition })} />
 */
export const reveal = (props) => (hydrating ? {} : props);
