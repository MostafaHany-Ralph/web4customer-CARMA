/* ============================================================
   CARMA Website – app.js
   • Language switching (AR / EN) + localStorage persist
   • Dark / Light theme toggle + localStorage persist
   • Real Auth API (mirrors mobile AuthService exactly)
   • Navbar scroll, hamburger, scroll-reveal, modals
   ============================================================ */

'use strict';

/* ─── CONSTANTS ─────────────────────────────────────────── */
const API_PORT      = 5050;
const API_BASES     = [
  `http://localhost:${API_PORT}/api/auth`,
  `http://127.0.0.1:${API_PORT}/api/auth`,
];
const TOKEN_KEY = 'carma_token';
const USER_KEY  = 'carma_user';
const LANG_KEY  = 'carma_lang';
const THEME_KEY = 'carma_theme';

/* ─── TRANSLATIONS ──────────────────────────────────────── */
const T = {
  ar: {
    nav_home:      'الرئيسية',
    nav_about:     'من نحن',
    nav_foryou:    'لك أنت',
    nav_login:     'تسجيل الدخول',
    nav_signup:    'إنشاء حساب',
    nav_download:  'تحميل التطبيق',

    hero_badge:    'الآن متاح في مصر',
    hero_title1:   'رفيقك',
    hero_title2:   'على الطريق',
    hero_sub:      'CARMA هو تطبيقك الشامل لكل خدمات السيارات — صيانة، غسيل، إكسسوارات، طوارئ ووَنش. كل اللي محتاجه في مكان واحد.',
    hero_cta1:     'حمّل التطبيق',
    hero_cta2:     'اعرف أكثر',
    stat1_n:       '+5',
    stat1_l:       'خدمات متكاملة',
    stat2_n:       '24/7',
    stat2_l:       'خدمات الطوارئ',
    stat3_n:       '100%',
    stat3_l:       'مجانيًا للتسجيل',
    hero_scroll:   'اسحب للأسفل',

    svc_tag:       'خدماتنا',
    svc_title1:    'كل اللي محتاجه',
    svc_title2:    'في تطبيق واحد',
    svc_desc:      'سواء صيانة أو غسيل أو إكسسوارات أو ونش — CARMA وفّرها كلها',
    svc1_h:        'الصيانة',
    svc1_p:        'احجز ميكانيكي متخصص يجيلك أو روح لأقرب مركز صيانة معتمد بسهولة',
    svc2_h:        'غسيل السيارات',
    svc2_p:        'خدمة غسيل بالبيت أو عند أقرب مغسلة معتمدة، كيماوي أو عادي',
    svc3_h:        'متجر الإكسسوارات',
    svc3_p:        'جنوط، زجاج، فرش داخلي وإلكترونيات — اشتري أو احجز بالتوصيل',
    svc4_h:        'الطوارئ',
    svc4_p:        'مشكلة على الطريق؟ اطلب مساعدة فورية على مدار الساعة',
    svc5_h:        'خدمة الونش',
    svc5_p:        'احجز ونش قريب منك في أي وقت لنقل سيارتك بأمان',

    how_tag:       'ازاي بيشتغل؟',
    how_title:     'خطوات بسيطة',
    step1_h:       'حمّل التطبيق',
    step1_p:       'حمّل CARMA على موبايلك مجانًا',
    step2_h:       'سجّل حساب',
    step2_p:       'أنشئ حسابك في ثوانٍ وأضف بيانات سيارتك',
    step3_h:       'اختار الخدمة',
    step3_p:       'اختار الخدمة اللي محتاجها من القائمة',
    step4_h:       'استمتع بالخدمة',
    step4_p:       'تابع طلبك وقيّم مزود الخدمة',

    dl_tag:        'متاح قريبًا',
    dl_title:      'حمّل تطبيق CARMA الآن',
    dl_sub:        'اختر النسخة المناسبة لك: تطبيق العميل لأصحاب السيارات أو تطبيق مقدم الخدمة للمراكز والورش.',
    dl_customer_sub:'لأصحاب السيارات والعملاء',
    dl_customer:   'تطبيق العميل (Customer)',
    dl_provider_sub:'للورش ومراكز الصيانة ومقدمي الخدمات',
    dl_provider:   'تطبيق مقدم الخدمة (Provider)',
    dl_apk:        'APK Android',
    dl_apk_s:      'تحميل مباشر',
    dl_gplay:      'Google Play',
    dl_soon:       'قريبًا',
    dl_apple:      'App Store',

    ft_desc:       'رفيقك على الطريق — تطبيق متكامل لكل خدمات سيارتك',
    ft_site:       'الموقع',
    ft_account:    'الحساب',
    ft_app:        'التطبيق',
    ft_copy:       '© 2026 CARMA. جميع الحقوق محفوظة.',

    login_tab:     'تسجيل الدخول',
    signup_tab:    'إنشاء حساب',
    login_title:   'أهلاً بعودتك',
    login_sub:     'سجّل دخولك لمتابعة رحلتك',
    email_label:   'البريد الإلكتروني',
    email_ph:      'example@email.com',
    pass_label:    'كلمة المرور',
    pass_ph:       'كلمة المرور',
    remember:      'تذكرني',
    forgot:        'نسيت كلمة المرور؟',
    btn_login:     'تسجيل الدخول',
    no_account:    'ما عندكش حساب؟',
    goto_signup:   'سجّل دلوقتي',

    signup_title:  'انضم لـ CARMA',
    signup_sub:    'سجّل في ثوانٍ وابدأ رحلتك',
    name_label:    'الاسم الكامل',
    name_ph:       'الاسم بالكامل',
    phone_label:   'رقم الموبايل',
    phone_ph:      '01xxxxxxxxx',
    conf_label:    'تأكيد كلمة المرور',
    conf_ph:       'أعد إدخال كلمة المرور',
    btn_signup:    'إنشاء الحساب',
    have_account:  'عندك حساب؟',
    goto_login:    'سجّل دخولك',

    app_notice_h:  'خدمات CARMA على موبايلك',
    app_notice_p:  'الخدمات متاحة بالكامل من تطبيق الموبايل. حمّل التطبيق واستمتع بكل الخدمات.',
    dl_btn:        'تحميل التطبيق',
    cancel:        'إلغاء',

    coming_title:  'قريبًا!',
    coming_p:      'التطبيق سيكون متاح للتحميل قريبًا. ابقى متابعنا!',
    ok:            'تمام',

    err_required:  'هذا الحقل مطلوب',
    err_email:     'البريد الإلكتروني غير صحيح',
    err_pass_len:  'يجب ألا تقل كلمة المرور عن 8 أحرف وتحتوي على حرف كبير وصغير ورقم ورمز خاص',
    err_pass_match:'كلمتا المرور غير متطابقتين',
    err_phone:     'رقم الموبايل غير صحيح',
    err_connect:   'تعذر الاتصال بالخادم. تأكد من تشغيل الـ Backend.',

    success_login:  'تم تسجيل الدخول بنجاح',
    success_signup: 'تم إنشاء الحساب بنجاح',
    welcome:        'مرحبًا',
  },
  en: {
    nav_home:      'Home',
    nav_about:     'About',
    nav_foryou:    'For You',
    nav_login:     'Login',
    nav_signup:    'Sign Up',
    nav_download:  'Download App',

    hero_badge:    'Now available in Egypt',
    hero_title1:   'Your Companion',
    hero_title2:   'On The Road',
    hero_sub:      'CARMA is your all-in-one car services app — maintenance, wash, accessories, emergency & towing. Everything you need in one place.',
    hero_cta1:     'Download App',
    hero_cta2:     'Learn More',
    stat1_n:       '5+',
    stat1_l:       'Integrated Services',
    stat2_n:       '24/7',
    stat2_l:       'Emergency Services',
    stat3_n:       '100%',
    stat3_l:       'Free to Sign Up',
    hero_scroll:   'Scroll down',

    svc_tag:       'Our Services',
    svc_title1:    'Everything You Need',
    svc_title2:    'In One App',
    svc_desc:      'Whether it\'s maintenance, wash, accessories or towing — CARMA has it all',
    svc1_h:        'Maintenance',
    svc1_p:        'Book a certified mechanic to come to you or visit the nearest certified service center',
    svc2_h:        'Car Wash',
    svc2_p:        'Home wash service or at the nearest certified car wash, chemical or regular',
    svc3_h:        'Accessories Store',
    svc3_p:        'Rims, glass, interior upholstery & electronics — buy or reserve with delivery',
    svc4_h:        'Emergency',
    svc4_p:        'Problem on the road? Request immediate assistance 24/7',
    svc5_h:        'Towing Service',
    svc5_p:        'Book the nearest tow truck anytime to safely transport your vehicle',

    how_tag:       'How it works?',
    how_title:     'Simple Steps',
    step1_h:       'Download the App',
    step1_p:       'Download CARMA on your phone for free',
    step2_h:       'Create Account',
    step2_p:       'Sign up in seconds and add your car details',
    step3_h:       'Choose Service',
    step3_p:       'Pick the service you need from the list',
    step4_h:       'Enjoy the Service',
    step4_p:       'Track your order and rate the service provider',

    dl_tag:        'Coming Soon',
    dl_title:      'Download CARMA Apps',
    dl_sub:        'Choose your version: Customer app for car owners or Service Provider app for workshops and centers.',
    dl_customer_sub:'For Car Owners & Drivers',
    dl_customer:   'Customer App',
    dl_provider_sub:'For Workshops & Service Providers',
    dl_provider:   'Service Provider App',
    dl_apk:        'APK Android',
    dl_apk_s:      'Direct Download',
    dl_gplay:      'Google Play',
    dl_soon:       'Soon',
    dl_apple:      'App Store',

    ft_desc:       'Your companion on the road — a complete app for all your car services',
    ft_site:       'Site',
    ft_account:    'Account',
    ft_app:        'App',
    ft_copy:       '© 2026 CARMA. All rights reserved.',

    login_tab:     'Login',
    signup_tab:    'Sign Up',
    login_title:   'Welcome Back',
    login_sub:     'Sign in to continue your journey',
    email_label:   'Email Address',
    email_ph:      'example@email.com',
    pass_label:    'Password',
    pass_ph:       'Your password',
    remember:      'Remember me',
    forgot:        'Forgot password?',
    btn_login:     'Sign In',
    no_account:    "Don't have an account?",
    goto_signup:   'Sign up now',

    signup_title:  'Join CARMA',
    signup_sub:    'Sign up in seconds and start your journey',
    name_label:    'Full Name',
    name_ph:       'Your full name',
    phone_label:   'Phone Number',
    phone_ph:      '01xxxxxxxxx',
    conf_label:    'Confirm Password',
    conf_ph:       'Re-enter your password',
    btn_signup:    'Create Account',
    have_account:  'Already have an account?',
    goto_login:    'Sign in',

    app_notice_h:  'CARMA services on your phone',
    app_notice_p:  'Services are fully available through the mobile app. Download and enjoy all features.',
    dl_btn:        'Download App',
    cancel:        'Cancel',

    coming_title:  'Coming Soon!',
    coming_p:      'The app will be available for download soon. Stay tuned!',
    ok:            'OK',

    err_required:  'This field is required',
    err_email:     'Invalid email address',
    err_pass_len:  'Password must be at least 8 characters (with uppercase, lowercase, number & special character)',
    err_pass_match:'Passwords do not match',
    err_phone:     'Invalid phone number',
    err_connect:   'Could not connect to server. Make sure the Backend is running.',

    success_login:  'Logged in successfully',
    success_signup: 'Account created successfully',
    welcome:        'Welcome',
  }
};

/* ─── STATE ─────────────────────────────────────────────── */
let currentLang  = localStorage.getItem(LANG_KEY)  || 'ar';
let currentTheme = localStorage.getItem(THEME_KEY) || 'dark';

/* ─── HELPERS ───────────────────────────────────────────── */
function t(key) { return (T[currentLang] || T.ar)[key] || key; }

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.body.lang = lang;
  document.body.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  // Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  // Update lang toggle button text
  document.querySelectorAll('.lang-toggle-txt').forEach(el => {
    el.textContent = lang === 'ar' ? 'English' : 'عربي';
  });
}

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-icon').forEach(ic => {
    ic.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
  });
}

/* ─── SVG ICONS ─────────────────────────────────────────── */
const ICON_SUN  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const ICON_MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const ICON_LOGOUT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`;
const ICON_EYE_OPEN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const ICON_EYE_CLOSED = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

/* ─── NAVBAR ─────────────────────────────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks?.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target)) {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    }
  });

  // Highlight active link
  const page = location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href')?.includes(page)) a.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, _) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0');
        setTimeout(() => entry.target.classList.add('in'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = String((i % 5) * 80);
    obs.observe(el);
  });
}

/* ─── MODALS ─────────────────────────────────────────────── */
window.openModal  = id => document.getElementById(id)?.classList.add('active');
window.closeModal = id => document.getElementById(id)?.classList.remove('active');
window.showComingSoon = (type = 'customer') => {
  const modal = document.getElementById('modalComingSoon');
  if (modal) {
    const title = modal.querySelector('h3');
    const desc = modal.querySelector('p');
    if (type === 'provider') {
      if (title) title.textContent = currentLang === 'ar' ? 'تطبيق مقدم الخدمة — قريبًا!' : 'Provider App — Coming Soon!';
      if (desc) desc.textContent = currentLang === 'ar'
        ? 'تطبيق شركاء ومقدمي خدمات CARMA سيكون متاحًا للتحميل بصيغة APK للمتاجر والورش ومراكز الصيانة قريبًا.'
        : 'The CARMA Service Provider App will be available for APK download soon for workshops and service centers.';
    } else {
      if (title) title.textContent = currentLang === 'ar' ? 'تطبيق العميل — قريبًا!' : 'Customer App — Coming Soon!';
      if (desc) desc.textContent = currentLang === 'ar'
        ? 'تطبيق عملاء CARMA سيكون متاحًا للتحميل بصيغة APK على الأندرويد والآيفون قريبًا.'
        : 'The CARMA Customer App will be available for APK download on Android and iOS soon.';
    }
    openModal('modalComingSoon');
  }
};
window.hideComingSoon = () => closeModal('modalComingSoon');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
});

/* ─── LANGUAGE & THEME BUTTONS ───────────────────────────── */
function initControls() {
  document.querySelectorAll('[data-action="toggle-lang"]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(currentLang === 'ar' ? 'en' : 'ar'));
  });
  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
  });
}

/* ─── AUTH API (mirrors mobile AuthService) ──────────────── */
const AuthService = {
  async _post(endpoint, body) {
    const bases = API_BASES;
    let lastErr;
    for (const base of bases) {
      try {
        const res = await fetch(`${base}${endpoint}`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    JSON.stringify(body),
          signal:  AbortSignal.timeout(5000),
        });
        let data;
        try { data = await res.json(); } catch { continue; }
        return { status: res.status, data };
      } catch (e) { lastErr = e; }
    }
    throw new Error(t('err_connect') + (lastErr ? ` (${lastErr.message})` : ''));
  },

  saveSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken() { return localStorage.getItem(TOKEN_KEY); },

  getUser() {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  async login(email, password) {
    const { status, data } = await this._post('/login', { email: email.trim(), password });
    if (status === 200 && data.success) {
      if (data.token) this.saveSession(data.token, data.user);
      return { ok: true, message: data.message || t('success_login'), user: data.user, token: data.token };
    }
    return { ok: false, message: data.messageAr || data.message || 'Login failed' };
  },

  async register(name, email, phone, password) {
    const { status, data } = await this._post('/signup', {
      name: name.trim(), email: email.trim(), phone: phone.trim(), password
    });
    if (status === 201 && data.success) {
      if (data.token) this.saveSession(data.token, data.user);
      return { ok: true, message: data.message || t('success_signup'), user: data.user, token: data.token };
    }
    return { ok: false, message: data.messageAr || data.message || 'Registration failed' };
  }
};

/* ─── AUTH PAGE (login.html / signup.html) ───────────────── */
function initAuthPage() {
  const loginPanel  = document.getElementById('loginPanel');
  const signupPanel = document.getElementById('signupPanel');
  const tabLogin    = document.getElementById('tabLogin');
  const tabSignup   = document.getElementById('tabSignup');
  if (!loginPanel || !signupPanel) return;

  // --- tab switching with slide animation ---
  function showPanel(show, hide, tabActive, tabInactive, fromDir) {
    hide.classList.remove('hidden', 'slide-out', 'slide-in');
    hide.classList.add('hidden', fromDir === 'left' ? 'slide-out' : 'slide-in');
    show.classList.remove('hidden', 'slide-out', 'slide-in');
    tabActive.classList.add('active');
    tabInactive.classList.remove('active');
  }

  tabLogin?.addEventListener('click',  () => showPanel(loginPanel,  signupPanel, tabLogin,  tabSignup,  'right'));
  tabSignup?.addEventListener('click', () => showPanel(signupPanel, loginPanel,  tabSignup, tabLogin,   'left'));

  // Switch from footer link
  document.querySelectorAll('[data-goto="signup"]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); tabSignup?.click(); })
  );
  document.querySelectorAll('[data-goto="login"]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); tabLogin?.click(); })
  );

  // If URL has ?tab=signup, start there
  if (new URLSearchParams(location.search).get('tab') === 'signup') {
    setTimeout(() => tabSignup?.click(), 50);
  }

  /* --- Login Form --- */
  const loginForm    = document.getElementById('loginForm');
  const loginError   = document.getElementById('loginError');
  const loginSuccess = document.getElementById('loginSuccess');
  const loginBtn     = document.getElementById('loginBtn');

  loginForm?.addEventListener('submit', async e => {
    e.preventDefault();
    loginError?.classList.remove('show');
    loginSuccess?.classList.remove('show');

    const email = document.getElementById('loginEmail')?.value.trim() || '';
    const pass  = document.getElementById('loginPass')?.value || '';

    // Validate
    if (!email) return showError(loginError, t('err_required'));
    if (!email.includes('@') || !email.includes('.')) return showError(loginError, t('err_email'));
    if (!pass) return showError(loginError, t('err_required'));
    if (pass.length < 6) return showError(loginError, t('err_pass_len'));

    setLoading(loginBtn, true);
    try {
      const res = await AuthService.login(email, pass);
      if (res.ok) {
        const name = res.user?.name || email.split('@')[0];
        showSuccessMsg(loginSuccess, `${t('success_login')} — ${t('welcome')} ${name}!`);
        setTimeout(() => { window.location.href = 'index.html'; }, 900);
      } else {
        showError(loginError, res.message);
      }
    } catch (err) {
      showError(loginError, err.message);
    }
    setLoading(loginBtn, false);
  });

  /* --- Signup Form --- */
  const signupForm    = document.getElementById('signupForm');
  const signupError   = document.getElementById('signupError');
  const signupSuccess = document.getElementById('signupSuccess');
  const signupBtn     = document.getElementById('signupBtn');

  signupForm?.addEventListener('submit', async e => {
    e.preventDefault();
    signupError?.classList.remove('show');
    signupSuccess?.classList.remove('show');

    const name    = document.getElementById('signupName')?.value.trim()  || '';
    const email   = document.getElementById('signupEmail')?.value.trim() || '';
    const phone   = document.getElementById('signupPhone')?.value.trim() || '';
    const pass    = document.getElementById('signupPass')?.value || '';
    const confirm = document.getElementById('signupConf')?.value || '';

    if (!name)  return showError(signupError, t('err_required'));
    if (!email || !email.includes('@')) return showError(signupError, t('err_email'));
    if (!phone || phone.length < 10)    return showError(signupError, t('err_phone'));
    if (pass.length < 8)                return showError(signupError, t('err_pass_len'));
    if (pass !== confirm)               return showError(signupError, t('err_pass_match'));

    setLoading(signupBtn, true);
    try {
      const res = await AuthService.register(name, email, phone, pass);
      if (res.ok) {
        showSuccessMsg(signupSuccess, `${t('success_signup')} — ${t('welcome')} ${res.user?.name || name}!`);
        setTimeout(() => { window.location.href = 'index.html'; }, 900);
      } else {
        showError(signupError, res.message);
      }
    } catch (err) {
      showError(signupError, err.message);
    }
    setLoading(signupBtn, false);
  });
}

function showError(el, msg)   { if (!el) return; el.querySelector('span').textContent = msg; el.classList.add('show'); }
function showSuccessMsg(el, msg) { if (!el) return; el.querySelector('span').textContent = msg; el.classList.add('show'); }
function setLoading(btn, on)  { if (!btn) return; btn.classList.toggle('loading', on); }

/* ─── NAVBAR USER PROFILE BADGE ──────────────────────────── */
function updateNavbarUser() {
  const user = AuthService.getUser();
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  if (user && user.name) {
    // Hide login / signup links
    navLinks.querySelectorAll('a[href*="login"], a[href*="signup"]').forEach(el => el.style.display = 'none');

    // Remove existing badge if already inserted
    document.querySelectorAll('.nav-user-badge').forEach(b => b.remove());

    const initial = user.name.trim().charAt(0).toUpperCase();
    const badge = document.createElement('div');
    badge.className = 'nav-user-badge';
    badge.innerHTML = `
      <div class="user-avatar-circle">${initial}</div>
      <span class="user-name-text">${user.name}</span>
      <button class="nav-logout-btn" id="logoutBtn" title="${currentLang === 'ar' ? 'تسجيل الخروج' : 'Log out'}">
        ${ICON_LOGOUT}
      </button>
    `;
    navLinks.appendChild(badge);

    badge.querySelector('#logoutBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      AuthService.clearSession();
      window.location.reload();
    });
  }
}

/* ─── SERVICE GUARD (Web can't book - Mobile only) ───────── */
function initServiceGuards() {
  // Ensure modalAppNotice exists in DOM
  if (!document.getElementById('modalAppNotice')) {
    const modalHTML = `
      <div class="modal-overlay" id="modalAppNotice" onclick="closeModal('modalAppNotice')">
        <div class="modal-box" onclick="event.stopPropagation()">
          <div class="modal-box-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <h3 id="appNoticeTitle">${t('app_notice_h')}</h3>
          <p id="appNoticeBody">${t('app_notice_p')}</p>
          <div class="modal-actions">
            <button class="btn-primary btn-full" onclick="closeModal('modalAppNotice'); showComingSoon();">${t('dl_btn')}</button>
            <button class="btn-outline btn-full" onclick="closeModal('modalAppNotice')">${t('cancel')}</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  document.querySelectorAll('.service-card, .feat-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const user = AuthService.getUser();
      const title = document.getElementById('appNoticeTitle');
      const body = document.getElementById('appNoticeBody');
      if (user && user.name) {
        if (title) title.textContent = currentLang === 'ar' ? `مرحبًا بك، ${user.name}` : `Welcome, ${user.name}!`;
        if (body) body.textContent = currentLang === 'ar'
          ? 'خدمات CARMA — الصيانة، غسيل السيارات، متجر الإكسسوارات، الطوارئ والونش — متاحة بالكامل عبر تطبيق الموبايل لمتابعة الفنيين والطلبات خطوة بخطوة. يرجى فتح التطبيق على هاتفك.'
          : 'CARMA services — Maintenance, Car Wash, Accessories, Emergency & Towing — are fully managed directly through the mobile app. Please open the app on your phone.';
      } else {
        if (title) title.textContent = t('app_notice_h');
        if (body) body.textContent = t('app_notice_p');
      }
      openModal('modalAppNotice');
    });
  });
}

/* ─── PASSWORD TOGGLE ────────────────────────────────────── */
function initPassToggles() {
  document.querySelectorAll('.pass-toggle').forEach(btn => {
    btn.innerHTML = ICON_EYE_CLOSED;
    btn.title = currentLang === 'ar' ? 'إظهار كلمة المرور' : 'Show password';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const isPass = target.type === 'password';
      target.type = isPass ? 'text' : 'password';
      btn.innerHTML = isPass ? ICON_EYE_OPEN : ICON_EYE_CLOSED;
      btn.title = isPass 
        ? (currentLang === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password') 
        : (currentLang === 'ar' ? 'إظهار كلمة المرور' : 'Show password');
    });
  });
}

/* ─── BOOT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  applyLang(currentLang);
  initNavbar();
  updateNavbarUser();
  initControls();
  initScrollReveal();
  initAuthPage();
  initPassToggles();
  initServiceGuards();
});
