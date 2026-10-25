// Navigation highlighting is optional; all content and links work without JavaScript.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}

// Optional publication and award images share one viewer. Missing or failed
// images leave the original text-only entry intact.
let figureViewer;
let viewerImage;
let viewerTitle;
let lastFigureLink;

function openFigure(event, link, image, title) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (!('HTMLDialogElement' in window) || typeof HTMLDialogElement.prototype.showModal !== 'function') return;
  event.preventDefault();

  if (!figureViewer) {
    figureViewer = document.createElement('dialog');
    figureViewer.className = 'figure-viewer';
    figureViewer.setAttribute('aria-labelledby', 'figure-viewer-title');
    const toolbar = document.createElement('div');
    toolbar.className = 'viewer-toolbar';
    viewerTitle = document.createElement('p');
    viewerTitle.id = 'figure-viewer-title';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'viewer-close';
    close.setAttribute('aria-label', 'Close figure');
    close.textContent = '×';
    close.addEventListener('click', () => figureViewer.close());
    toolbar.append(viewerTitle, close);
    viewerImage = document.createElement('img');
    figureViewer.append(toolbar, viewerImage);
    document.body.append(figureViewer);

    figureViewer.addEventListener('click', click => {
      const bounds = figureViewer.getBoundingClientRect();
      if (click.target === figureViewer && (
        click.clientX < bounds.left || click.clientX > bounds.right ||
        click.clientY < bounds.top || click.clientY > bounds.bottom
      )) figureViewer.close();
    });
    figureViewer.addEventListener('close', () => {
      document.body.classList.remove('figure-is-open');
      viewerImage.removeAttribute('src');
      lastFigureLink?.focus({ preventScroll: true });
    });
  }

  lastFigureLink = link;
  viewerTitle.textContent = title;
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  figureViewer.showModal();
  document.body.classList.add('figure-is-open');
}

for (const paper of document.querySelectorAll('.publication, .award-list li')) {
  const source = paper.dataset.image?.trim();
  if (!source) continue;

  const isPublication = paper.matches('.publication');
  const title = paper.querySelector(isPublication ? '.publication-body h3' : '.award-body strong')?.textContent.trim() || 'Figure';
  const figure = document.createElement('figure');
  figure.className = isPublication ? 'publication-figure' : 'award-figure';
  const link = document.createElement('a');
  link.className = 'figure-link';
  link.href = source;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', `${isPublication ? 'Enlarge figure' : 'View certificate'}: ${title}`);
  link.title = isPublication ? 'Enlarge figure' : 'View certificate';
  const image = document.createElement('img');
  image.alt = paper.dataset.imageAlt?.trim() || `Figure for ${title}`;
  image.loading = 'lazy';
  image.decoding = 'async';
  const zoom = document.createElement('span');
  zoom.className = 'figure-zoom';
  zoom.setAttribute('aria-hidden', 'true');
  zoom.textContent = '↗';
  link.append(image, zoom);
  figure.append(link);
  paper.prepend(figure);
  paper.classList.add('has-image');

  image.addEventListener('load', () => {
    image.width = image.naturalWidth;
    image.height = image.naturalHeight;
  });
  image.addEventListener('error', () => {
    figure.remove();
    paper.classList.remove('has-image');
  }, { once: true });
  link.addEventListener('click', event => openFigure(event, link, image, title));
  image.src = source;
}
