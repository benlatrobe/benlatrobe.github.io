const progressBar = document.getElementById('progressBar');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }
};

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

const observer = 'IntersectionObserver' in window ? new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
) : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (observer) observer.observe(el);
  else el.classList.add('is-visible');
});
