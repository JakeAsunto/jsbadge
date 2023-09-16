/**
 * This script adds a badge to your repl when seen in full-browser view
 */

(function jsBadge(theme, position = 'bottom-left') {

  // define positions
  // helps reduce polluting css classes
  const offset = '1.5rem';
  const validPositions = {
    'top-left': { top: offset, left: offset },
    'top-right': { top: offset, right: offset },
    'bottom-left': { bottom: offset, left: offset },
    'bottom-right': { bottom: offset, right: offset },
  };

  // ensure positions are valid
  if (!validPositions.hasOwnProperty(position)) {
    console.warn(
      `${position} is not a valid position, defaulting to bottom-left`,
    );
    position = 'bottom-left';
  }

  // create link & styles
  const badgeAnchor = document.createElement('a');
  Object.assign(badgeAnchor, {
    target: '_blank',
    href: '/__repl?utm_medium=webview_badge',
  });

  // create badge image & styles
  const badgeImage = document.createElement('img');
  badgeImage.src = `https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=${theme || "%2361DAFB"}`;
  badgeImage.id = 'jsBadge';
  Object.assign(badgeImage.style, validPositions[position]);

  // inject styles
  document.head.insertAdjacentHTML(
    'beforeend',
    `
    <style>
      #jsBadge {
        position: fixed;
        cursor: pointer;
        z-index: 100;
        transition: transform 100ms ease-in-out;
      }

      #jsBadge:hover {
        transform: scale(1.05);
      }
    </style>
  `,
  );

  // append badge to page
  badgeAnchor.appendChild(badgeImage);
  document.body.appendChild(badgeAnchor);
})(
  document.currentScript.getAttribute('position')
);
