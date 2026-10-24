// Edufree Academy - Interactive Client Application

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initCourses();
  initCart();
  initAccordion();
  initNewsletter();
});

// Mobile Navigation
function initMobileMenu() {
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#mobail-menu');
  const body = document.body;
  if (!burger || !menu) return;

  function closeMenu() {
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    body.classList.remove('overflow-hidden');
  }

  function openMenu() {
    burger.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    body.classList.add('overflow-hidden');
  }

  burger.addEventListener('click', () => {
    const isActive = burger.classList.contains('active');
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 767.99 && burger.classList.contains('active')) {
        closeMenu();
      }
    },
    { passive: true },
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Sticky Header & Active Navigation
function initStickyHeader() {
  const headerWrapper = document.querySelector('#site-header');
  if (!headerWrapper) return;

  function update() {
    if (window.scrollY > 25) {
      headerWrapper.classList.add(
        'backdrop-blur-xl',
        'bg-slate-950/85',
        'shadow-md',
        'border-b',
        'border-white/10',
        'py-3.5',
      );
      headerWrapper.classList.remove('py-5');
    } else {
      headerWrapper.classList.remove(
        'backdrop-blur-xl',
        'bg-slate-950/85',
        'shadow-md',
        'border-b',
        'border-white/10',
        'py-3.5',
      );
      headerWrapper.classList.add('py-5');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Course Catalog Data
const COURSES_DATA = [
  {
    id: 'course-1',
    title: 'Full-Stack Web Development with React 19 & Node',
    category: 'dev',
    categoryLabel: 'Development',
    level: 'Intermediate',
    image: './src/assets/Rectangle 1085.webp',
    instructor: 'Alex Morrison',
    instructorRole: 'Staff Engineer at Stripe',
    rating: 4.9,
    ratingCount: '1,420',
    hours: '38h',
    lessons: 48,
    price: 49.99,
    oldPrice: 89.99,
    badge: 'Bestseller',
    summary:
      'Master modern frontend and backend architectures: React 19 hooks, server actions, REST & GraphQL APIs, database modeling with Prisma, and production Docker deployments.',
    syllabus: [
      'Modern JavaScript ES2024 & TypeScript fundamentals',
      'React 19 Server Components, Actions & State Architecture',
      'Node.js, Express, REST APIs & PostgreSQL integration',
      'Authentication, security best practices & CI/CD deployment',
    ],
  },
  {
    id: 'course-2',
    title: 'UI/UX Design Systems & Micro-Interactions in Figma',
    category: 'design',
    categoryLabel: 'UI/UX Design',
    level: 'All Levels',
    image: './src/assets/Rectangle 1086.webp',
    instructor: 'Elena Rostova',
    instructorRole: 'Lead Product Designer',
    rating: 4.95,
    ratingCount: '980',
    hours: '26h',
    lessons: 34,
    price: 39.99,
    oldPrice: 69.99,
    badge: 'Trending',
    summary:
      'Build scalable multi-brand design systems, token architecture, auto-layout grids, interactive prototypes, and accessible WCAG 2.2 color systems.',
    syllabus: [
      'Design tokens, variable modes & atomic structure',
      'Component variants, auto-layout 5.0 & responsive auto-grid',
      'Advanced Figma micro-interactions & smart animates',
      'Developer handoff, design audit & documentation',
    ],
  },
  {
    id: 'course-3',
    title: 'Responsive Tailwind CSS v3 & Modern Web Motion',
    category: 'dev',
    categoryLabel: 'Development',
    level: 'Beginner',
    image: './src/assets/Rectangle 1087.webp',
    instructor: 'David Vance',
    instructorRole: 'Frontend Specialist',
    rating: 4.88,
    ratingCount: '1,120',
    hours: '22h',
    lessons: 30,
    price: 34.99,
    oldPrice: 59.99,
    badge: 'Hot',
    summary:
      'Craft high-performance, mobile-first layouts without touching legacy CSS. Learn custom theme plugins, arbitrary properties, container queries, and keyframe motion.',
    syllabus: [
      'Tailwind CSS v3 architecture and configuration',
      'Mobile-first responsive design patterns & flex/grid mastery',
      'Micro-animations, dark mode & custom design tokens',
      'Production optimization, purging & Core Web Vitals',
    ],
  },
  {
    id: 'course-4',
    title: 'TypeScript Masterclass: Clean Code & Architecture',
    category: 'dev',
    categoryLabel: 'Development',
    level: 'Advanced',
    image: './src/assets/Rectangle 1088.webp',
    instructor: 'Marcus Chen',
    instructorRole: 'Principal Architect',
    rating: 4.92,
    ratingCount: '850',
    hours: '32h',
    lessons: 40,
    price: 54.99,
    oldPrice: 99.99,
    badge: 'Top Rated',
    summary:
      'Go beyond the basics into advanced generics, conditional typing, branded types, AST manipulation, and domain-driven design patterns for enterprise codebases.',
    syllabus: [
      'Type inference, distributive conditional types & template literals',
      'Strict null checks, assertion functions & zod validation',
      'Domain-driven design & design patterns (SOLID in TS)',
      'Refactoring legacy JavaScript projects into TypeScript',
    ],
  },
  {
    id: 'course-5',
    title: 'Growth Marketing, SEO & Conversion Optimization',
    category: 'marketing',
    categoryLabel: 'Marketing',
    level: 'Intermediate',
    image: './src/assets/Rectangle 1089.webp',
    instructor: 'Sarah Jenkins',
    instructorRole: 'Head of Growth at Techstars',
    rating: 4.85,
    ratingCount: '740',
    hours: '24h',
    lessons: 28,
    price: 44.99,
    oldPrice: 79.99,
    badge: 'New',
    summary:
      'Develop actionable customer acquisition loops, master technical SEO, set up conversion tracking with Google Analytics 4, and design high-converting landing pages.',
    syllabus: [
      'Customer journey mapping & viral acquisition loops',
      'Technical SEO audits, semantic markup & search intent',
      'A/B testing methodology, heatmaps & CRO heuristics',
      'Paid social campaign budgeting and attribution modeling',
    ],
  },
  {
    id: 'course-6',
    title: 'Product Management: From Discovery to Market Launch',
    category: 'business',
    categoryLabel: 'Business',
    level: 'Intermediate',
    image: './src/assets/Rectangle 1090.webp',
    instructor: 'Rachel Cole',
    instructorRole: 'Ex-VP Product at Linear',
    rating: 4.91,
    ratingCount: '630',
    hours: '30h',
    lessons: 36,
    price: 49.99,
    oldPrice: 89.99,
    badge: 'Editor Choice',
    summary:
      'Learn user research interviewing, hypothesis prioritization (RICE & Kano), PRD drafting, sprint planning with engineering teams, and post-launch analytics.',
    syllabus: [
      'Customer problem discovery & validation frameworks',
      'Writing effective PRDs, user stories & acceptance criteria',
      'Sprint cadence, agile ceremony facilitation & cross-functional leadership',
      'Product analytics (retention curves, churn, LTV)',
    ],
  },
  {
    id: 'course-7',
    title: 'Brand Identity & Visual Storytelling for Designers',
    category: 'design',
    categoryLabel: 'UI/UX Design',
    level: 'Beginner',
    image: './src/assets/Rectangle 1091.webp',
    instructor: 'Liam Gallagher',
    instructorRole: 'Creative Director',
    rating: 4.87,
    ratingCount: '510',
    hours: '20h',
    lessons: 25,
    price: 39.99,
    oldPrice: 65.99,
    badge: 'Popular',
    summary:
      'Discover how world-class brand identities are created: typography pairings, color psychology, guidelines documentation, and digital marketing collateral.',
    syllabus: [
      'Visual identity audits & creative brief formulating',
      'Logotype crafting, geometric grid systems & typography',
      'Brand guideline creation & digital asset kit delivery',
      'Client presentation strategies & brand pitch decks',
    ],
  },
  {
    id: 'course-8',
    title: 'Cloud Infrastructure & DevOps Pipelines with AWS',
    category: 'dev',
    categoryLabel: 'Development',
    level: 'Advanced',
    image: './src/assets/Rectangle 1092.webp',
    instructor: 'Tariq Al-Mansoor',
    instructorRole: 'Cloud Solutions Architect',
    rating: 4.94,
    ratingCount: '910',
    hours: '35h',
    lessons: 44,
    price: 59.99,
    oldPrice: 109.99,
    badge: 'Certified',
    summary:
      'Deploy containerized applications with Docker & Kubernetes, manage infrastructure as code with Terraform, and configure automated GitHub Actions CI/CD workflows.',
    syllabus: [
      'Docker containerization & multi-stage build optimization',
      'AWS core services (ECS, S3, RDS, CloudFront, IAM)',
      'Infrastructure as Code (Terraform) best practices',
      'GitHub Actions automated testing and zero-downtime deployment',
    ],
  },
];

// Course Filtering and Rendering
function initCourses() {
  const gridContainer = document.querySelector('#courses-grid');
  const searchInput = document.querySelector('#course-search');
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const countDisplay = document.querySelector('#courses-count');

  if (!gridContainer) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function render() {
    const filtered = COURSES_DATA.filter((course) => {
      const matchesCategory =
        activeCategory === 'all' || course.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery) ||
        course.instructor.toLowerCase().includes(searchQuery) ||
        course.categoryLabel.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${COURSES_DATA.length} courses`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-800">No matching courses found</h3>
          <p class="mt-2 text-sm text-slate-500">Try adjusting your search query or switching to another category tab.</p>
          <button id="reset-filter-btn" class="btn-shine mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95">
            Reset filters
          </button>
        </div>
      `;
      const resetBtn = document.querySelector('#reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          tabTriggers.forEach((t) =>
            t.classList.toggle('active', t.dataset.category === 'all'),
          );
          render();
        });
      }
      return;
    }

    gridContainer.innerHTML = filtered
      .map(
        (course) => `
        <article class="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_32px_-8px_rgba(7,122,140,0.12)]">
          <div>
            <div class="relative overflow-hidden bg-slate-100 aspect-[277/204]">
              <img
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="${course.image}"
                alt="${course.title}"
                width="277"
                height="204"
                loading="lazy"
                decoding="async"
              />
              <span class="absolute top-3 left-3 rounded-md bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-800 shadow-sm">
                ${course.categoryLabel}
              </span>
              ${
                course.badge
                  ? `<span class="absolute top-3 right-3 rounded-md bg-[#077a8c] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                      ${course.badge}
                    </span>`
                  : ''
              }
            </div>

            <div class="p-5">
              <div class="flex items-center justify-between text-xs text-slate-500">
                <span class="flex items-center gap-1 font-medium text-amber-600">
                  <svg class="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  ${course.rating} <span class="text-slate-400">(${course.ratingCount})</span>
                </span>
                <span class="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                  ${course.level}
                </span>
              </div>

              <h3 class="mt-3 text-base font-bold leading-snug text-slate-900 group-hover:text-[#077a8c] transition-colors line-clamp-2 min-h-[46px]">
                ${course.title}
              </h3>

              <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>By <strong class="font-medium text-slate-700">${course.instructor}</strong></span>
                <span>${course.hours} • ${course.lessons} lessons</span>
              </div>
            </div>
          </div>

          <div class="p-5 pt-0">
            <div class="flex items-baseline justify-between border-t border-slate-100 pt-3">
              <div>
                <span class="text-xl font-extrabold text-slate-900">$${course.price.toFixed(2)}</span>
                <span class="ml-1 text-xs text-slate-400 line-through">$${course.oldPrice.toFixed(2)}</span>
              </div>
              <div class="flex gap-2">
                <button
                  type="button"
                  data-action="preview"
                  data-id="${course.id}"
                  class="btn-shine inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 active:scale-95"
                  aria-label="Preview course ${course.title}"
                >
                  Preview
                </button>
                <button
                  type="button"
                  data-action="enroll"
                  data-id="${course.id}"
                  class="btn-shine inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
                  aria-label="Enroll in course ${course.title}"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </article>
      `,
      )
      .join('');
  }

  // Tabs events
  tabTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      tabTriggers.forEach((t) => t.classList.remove('active'));
      trigger.classList.add('active');
      activeCategory = trigger.dataset.category || 'all';
      render();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      render();
    });
  }

  // Course Grid Actions (Event Delegation)
  gridContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const courseId = btn.dataset.id;
    const course = COURSES_DATA.find((c) => c.id === courseId);
    if (!course) return;

    if (action === 'preview') {
      openCourseModal(course);
    } else if (action === 'enroll') {
      addToCart(course);
    }
  });

  // Initial render
  render();
}

// Course Quick View Modal (HTML <dialog> with modern light-dismiss standard)
function openCourseModal(course) {
  const dialog = document.querySelector('#course-modal');
  if (!dialog) return;

  const titleEl = dialog.querySelector('#modal-course-title');
  const categoryEl = dialog.querySelector('#modal-course-category');
  const levelEl = dialog.querySelector('#modal-course-level');
  const instructorEl = dialog.querySelector('#modal-course-instructor');
  const instructorRoleEl = dialog.querySelector('#modal-course-role');
  const ratingEl = dialog.querySelector('#modal-course-rating');
  const summaryEl = dialog.querySelector('#modal-course-summary');
  const syllabusList = dialog.querySelector('#modal-course-syllabus');
  const priceEl = dialog.querySelector('#modal-course-price');
  const oldPriceEl = dialog.querySelector('#modal-course-old-price');
  const enrollBtn = dialog.querySelector('#modal-enroll-btn');

  if (titleEl) titleEl.textContent = course.title;
  if (categoryEl) categoryEl.textContent = course.categoryLabel;
  if (levelEl) levelEl.textContent = `${course.level} • ${course.hours} duration`;
  if (instructorEl) instructorEl.textContent = course.instructor;
  if (instructorRoleEl) instructorRoleEl.textContent = course.instructorRole;
  if (ratingEl)
    ratingEl.textContent = `★ ${course.rating} (${course.ratingCount} student reviews)`;
  if (summaryEl) summaryEl.textContent = course.summary;
  if (priceEl) priceEl.textContent = `$${course.price.toFixed(2)}`;
  if (oldPriceEl) oldPriceEl.textContent = `$${course.oldPrice.toFixed(2)}`;

  if (syllabusList) {
    syllabusList.innerHTML = course.syllabus
      .map(
        (item, idx) => `
        <li class="flex items-start gap-2.5 text-sm text-slate-600">
          <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[11px] font-bold text-[#077a8c] mt-0.5">
            ${idx + 1}
          </span>
          <span>${item}</span>
        </li>
      `,
      )
      .join('');
  }

  if (enrollBtn) {
    enrollBtn.onclick = () => {
      addToCart(course);
      dialog.close();
    };
  }

  dialog.showModal();

  // Modern Web Guidance fallback for light-dismiss on browsers lacking closedby support
  if (!('closedBy' in HTMLDialogElement.prototype) && !dialog._hasLightDismissFallback) {
    dialog._hasLightDismissFallback = true;
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInside) {
        dialog.close();
      }
    });
  }
}

// Shopping Cart & Drawer
const CART_STORAGE_KEY = 'edufree_cart_items';
let cartItems = [];

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    cartItems = raw ? JSON.parse(raw) : [];
  } catch {
    cartItems = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (err) {
    console.error('Storage error', err);
  }
}

function updateCartUI() {
  const badge = document.querySelector('#cart-badge');
  const countSpan = document.querySelector('#drawer-cart-count');
  const itemsContainer = document.querySelector('#drawer-cart-items');
  const subtotalEl = document.querySelector('#drawer-subtotal');
  const discountEl = document.querySelector('#drawer-discount');
  const totalEl = document.querySelector('#drawer-total');

  const totalCount = cartItems.length;
  if (badge) {
    badge.textContent = String(totalCount);
    badge.classList.toggle('hidden', totalCount === 0);
  }
  if (countSpan) {
    countSpan.textContent = `(${totalCount})`;
  }

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discountPercent = window._promoDiscount || 0;
  const discountAmount = rawSubtotal * discountPercent;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  if (subtotalEl) subtotalEl.textContent = `$${rawSubtotal.toFixed(2)}`;
  if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;

  if (!itemsContainer) return;

  if (cartItems.length === 0) {
    itemsContainer.innerHTML = `
      <div class="py-12 text-center text-slate-500">
        <svg class="mx-auto h-12 w-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p class="font-medium text-slate-700">Your cart is empty</p>
        <p class="mt-1 text-xs text-slate-400">Explore our catalog and choose your next skill.</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cartItems
    .map(
      (item, idx) => `
      <div class="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">
        <img src="${item.image}" alt="${item.title}" class="h-14 w-14 rounded-lg object-cover bg-slate-100 shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-semibold text-slate-900 truncate">${item.title}</h4>
          <p class="text-[11px] text-slate-500">${item.instructor} • ${item.hours}</p>
          <span class="text-xs font-bold text-[#077a8c]">$${item.price.toFixed(2)}</span>
        </div>
        <button
          type="button"
          data-remove-index="${idx}"
          class="p-1 text-slate-400 transition-colors hover:text-red-500"
          aria-label="Remove ${item.title} from cart"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `,
    )
    .join('');

  itemsContainer.querySelectorAll('button[data-remove-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.removeIndex, 10);
      cartItems.splice(index, 1);
      saveCart();
      updateCartUI();
      showToast('Item removed from cart', 'info');
    });
  });
}

function addToCart(course) {
  const exists = cartItems.some((item) => item.id === course.id);
  if (exists) {
    showToast(`"${course.title}" is already in your cart!`, 'info');
    openCartDrawer();
    return;
  }
  cartItems.push(course);
  saveCart();
  updateCartUI();
  showToast(`Added "${course.title}" to your cart!`, 'success');
}

function openCartDrawer() {
  const drawer = document.querySelector('#cart-drawer');
  const overlay = document.querySelector('#cart-drawer-overlay');
  if (!drawer || !overlay) return;
  drawer.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeCartDrawer() {
  const drawer = document.querySelector('#cart-drawer');
  const overlay = document.querySelector('#cart-drawer-overlay');
  if (!drawer || !overlay) return;
  drawer.classList.add('translate-x-full');
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function initCart() {
  loadCart();
  updateCartUI();

  const cartTrigger = document.querySelector('#cart-trigger');
  const closeBtn = document.querySelector('#close-cart-drawer');
  const overlay = document.querySelector('#cart-drawer-overlay');
  const promoBtn = document.querySelector('#apply-promo-btn');
  const promoInput = document.querySelector('#promo-code-input');
  const checkoutBtn = document.querySelector('#checkout-btn');

  if (cartTrigger) {
    cartTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCartDrawer();
  });

  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'EDUFREEE20' || code === 'SAVE20') {
        window._promoDiscount = 0.2;
        updateCartUI();
        showToast('🎉 Promo code applied! 20% discount activated.', 'success');
        promoInput.disabled = true;
        promoBtn.textContent = 'Applied';
        promoBtn.disabled = true;
      } else if (code) {
        showToast('Invalid promo code. Try "EDUFREEE20"', 'error');
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cartItems.length === 0) {
        showToast('Your cart is empty. Add a course first!', 'error');
        return;
      }
      showToast('Proceeding to secure checkout...', 'success');
      setTimeout(() => {
        alert(
          'Simulated Checkout: Thank you for enrolling! Your learning dashboard is now ready.',
        );
        cartItems = [];
        window._promoDiscount = 0;
        saveCart();
        updateCartUI();
        closeCartDrawer();
      }, 600);
    });
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('#toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className =
      'fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgStyles =
    type === 'success'
      ? 'bg-slate-900 border-teal-500 text-white'
      : type === 'error'
        ? 'bg-red-950 border-red-500 text-white'
        : 'bg-slate-900 border-slate-700 text-white';

  toast.className = `pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl text-xs font-medium transition-all duration-300 translate-y-3 opacity-0 ${bgStyles}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="ml-2 text-slate-400 hover:text-white" aria-label="Dismiss">&times;</button>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  });

  const dismiss = () => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('button').addEventListener('click', dismiss);
  setTimeout(dismiss, 3500);
}

// Accessible FAQ Accordion
function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const content = item.querySelector('.accordion__content');
    if (!trigger || !content) return;

    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', () => {
      const isExpanded = item.classList.contains('active');

      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.accordion__trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Newsletter Subscription
function initNewsletter() {
  const form = document.querySelector('#newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"], input[name="firstName"]');
    if (!input) return;
    const email = input.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address.', 'error');
      input.focus();
      return;
    }

    showToast('🎉 Subscribed! Check your inbox for the free learning guide.', 'success');
    input.value = '';
  });
}
