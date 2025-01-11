export const animateAttack = (
  attackingElement: HTMLElement,
  targetElement: HTMLElement,
  onAnimationEnd: () => void
) => {
  const attackingRect = attackingElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  const deltaX = targetRect.left - attackingRect.left;
  const deltaY = targetRect.top - attackingRect.top;

  attackingElement.classList.add("attacking");
  targetElement.classList.add("attacked");

  attackingElement.style.zIndex = "10";
  targetElement.style.zIndex = "5";

  attackingElement.style.transition =
    "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
  attackingElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

  setTimeout(() => {
    attackingElement.style.transition = "transform 0.3s ease";
    attackingElement.style.transform = `translate(${deltaX * 0.1}px, ${
      deltaY * 0.1
    }px)`;

    setTimeout(() => {
      attackingElement.classList.remove("attacking");
      targetElement.classList.remove("attacked");

      attackingElement.style.transition = "transform 0.2s ease";
      attackingElement.style.transform = "translate(0, 0)";
      attackingElement.style.zIndex = "";
      targetElement.style.zIndex = "";

      onAnimationEnd();
    }, 100);
  }, 200);
};
