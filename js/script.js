(function () {
  'use strict';

  const CONFIG = Object.freeze({
    routeCount: 10,
    finalRouteIndex: 9,
    previousLessonUrl: 'https://clusterceu-crypto.github.io/UCAN-Lesson05/',
    nextLessonUrl: 'https://clusterceu-crypto.github.io/UCAN-Lesson07/',
    portfolioKey: 'ucan:l06:v1:portfolio',
    progressKey: 'ucan:l06:v1:progress',
    r07Key: 'ucan:l06:v1:r07',
    assessmentKey: 'ucan:l06:v1:assessment',
    routes: [
      { id: 'R01', title: 'Вода як управлінське питання міста', navLabel: 'Вступ' },
      { id: 'R02', title: 'Коли води забагато — і коли її бракує', navLabel: 'Водні ризики' },
      { id: 'R03', title: 'Від дренажу до водосвідомого міста', navLabel: 'Від дренажу' },
      { id: 'R04', title: 'Як мислить «місто-губка»', navLabel: 'Місто-губка' },
      { id: 'R05', title: 'Як інші міста працюють із водним ризиком', navLabel: 'Приклади міст' },
      { id: 'R06', title: 'Що це означає для української громади', navLabel: 'Українська громада' },
      { id: 'R07', title: 'Який це водний ризик?', navLabel: 'Визначте ризик' },
      { id: 'R08', title: 'Карта водного ризику або водного управлінського питання', navLabel: 'Ваша карта' },
      { id: 'R09', title: 'Перевірте своє розуміння', navLabel: 'Перевірка знань' },
      { id: 'R10', title: 'Що Ви берете із собою далі', navLabel: 'Підсумок' }
    ]
  });

  const PORTFOLIO_FIELDS = Object.freeze([
    'areaSystem',
    'waterRiskIssue',
    'riskManifestation',
    'firstManagementStep'
  ]);

  const RISK_CATEGORIES = Object.freeze([
    'Надлишок води / затоплення',
    'Дефіцит води',
    'Комбінований водний ризик'
  ]);

  const R07_ITEMS = Object.freeze([
    {
      id: 's1',
      title: 'Ситуація 1',
      text: 'Після інтенсивних опадів вода регулярно накопичується на вулиці та перевантажує систему відведення.',
      answer: 'Надлишок води / затоплення',
      correct: 'Так. Проблема проявляється через надлишок води після опадів і недостатню здатність міської системи впоратися з ним.',
      incorrect: 'Зверніть увагу на головну ознаку: проблема виникає після сильних опадів через накопичення води. Спробуйте ще раз.'
    },
    {
      id: 's2',
      title: 'Ситуація 2',
      text: 'Під час тривалого сухого періоду місто стає вразливим через нестачу доступної води для міських потреб.',
      answer: 'Дефіцит води',
      correct: 'Так. Тут головний ризик пов’язаний із нестачею води під час тривалого сухого періоду.',
      incorrect: 'Подивіться, чого саме бракує системі в цій ситуації. Спробуйте ще раз.'
    },
    {
      id: 's3',
      title: 'Ситуація 3',
      text: 'Одна територія періодично потерпає від підтоплень, але в сухий сезон у громаді також виникає проблема нестачі води.',
      answer: 'Комбінований водний ризик',
      correct: 'Так. Тут громада стикається і з надлишком води, і з її нестачею в різні періоди.',
      incorrect: 'У ситуації описано два різні прояви водного ризику. Врахуйте обидва й спробуйте ще раз.'
    },
    {
      id: 's4',
      title: 'Ситуація 4',
      text: 'Після сильних опадів вода швидко відводиться з однієї частини міста, але на іншій ділянці система відведення регулярно перевантажується й виникає підтоплення.',
      answer: 'Надлишок води / затоплення',
      correct: 'Так. Ризик не зник: на іншій ділянці він проявляється як перевантаження системи відведення та підтоплення.',
      incorrect: 'Подивіться на всю описану систему: де після опадів фактично виникають перевантаження і підтоплення? Спробуйте ще раз.'
    }
  ]);

  const ASSESSMENT_ITEMS = Object.freeze([
    {
      id: 'q1',
      question: 'Що найточніше описує водну безпеку для міста?',
      options: [
        ['A', 'Лише здатність швидко відвести дощову воду.'],
        ['B', 'Лише наявність достатньої кількості питної води.'],
        ['C', 'Здатність громади працювати з ризиками як надлишку, так і нестачі води.'],
        ['D', 'Будівництво нових дренажних споруд.']
      ],
      answer: 'C',
      correct: 'Так. Водна безпека охоплює різні водні ризики, зокрема надлишок води та її дефіцит.',
      incorrect: 'Водна безпека ширша за одну інфраструктурну систему або один тип проблеми. Пригадайте дві сторони водного ризику.'
    },
    {
      id: 'q2',
      question: 'У чому головна відмінність водосвідомого підходу від підходу, зосередженого лише на дренажі?',
      options: [
        ['A', 'Він замінює дренаж іншими способами роботи з водою.'],
        ['B', 'Він розглядає водний ризик ширше, а дренаж залишає частиною міської системи.'],
        ['C', 'Він стосується переважно озеленення міста.'],
        ['D', 'Він зосереджується переважно на накопиченні дощової води.']
      ],
      answer: 'B',
      correct: 'Так. Йдеться не про відмову від дренажу, а про ширший погляд на управління водним ризиком.',
      incorrect: 'Пригадайте: дренаж залишається важливою частиною системи. Змінюється не його існування, а ширина управлінського погляду.'
    },
    {
      id: 'q3',
      question: 'Після сильних злив біля міської лікарні регулярно накопичується вода. Яке формулювання найкраще підходить для подальшої управлінської роботи?',
      options: [
        ['A', 'Після злив біля лікарні потрібно одразу побудувати новий колектор.'],
        ['B', 'Після злив у місті виникає загальна проблема з водою.'],
        ['C', 'Після злив біля лікарні регулярно накопичується вода; масштаб і причини потрібно уточнити до вибору рішення.'],
        ['D', 'Після злив біля лікарні потрібно одразу застосувати підхід «міста-губки».']
      ],
      answer: 'C',
      correct: 'Так. Формулювання конкретизує місце і прояв проблеми, але ще не підміняє аналіз готовим рішенням.',
      incorrect: 'Шукайте варіант, який чітко описує проблему, але не стрибає одразу до конкретної технології.'
    },
    {
      id: 'q4',
      question: 'Громада визначила, що після сильних опадів на конкретній вулиці регулярно виникає підтоплення. Який перший управлінський крок є найдоречнішим?',
      options: [
        ['A', 'Одразу вибрати конкретну інженерну споруду.'],
        ['B', 'Уточнити масштаб, прояв і доступні дані про проблему, перш ніж обирати рішення.'],
        ['C', 'Одразу визначити бюджет будівництва.'],
        ['D', 'Відкласти питання до наступного великого підтоплення.']
      ],
      answer: 'B',
      correct: 'Так. Перший управлінський крок має допомогти краще зрозуміти проблему до вибору технічного рішення.',
      incorrect: 'Перший крок не повинен передчасно визначати технологію або бюджет. Спочатку потрібно достатньо чітко зрозуміти сам ризик.'
    },
    {
      id: 'q5',
      question: 'У різних частинах міста після злив виникають підтоплення, а в сухі періоди громада також стикається з нестачею води. Команда пропонує одразу скласти перелік споруд, які потрібно побудувати. Яке управлінське рішення є найкращим першим кроком?',
      options: [
        ['A', 'Одразу підготувати технічний проєкт для всіх проблемних ділянок міста.'],
        ['B', 'Розглядати кожен випадок окремо, не пов’язуючи ризики між собою.'],
        ['C', 'Спочатку впорядкувати ризики за місцем і проявом, визначити пріоритетне питання та перший управлінський крок.'],
        ['D', 'Взяти за основу рішення Копенгагена або Роттердама і повторити його.']
      ],
      answer: 'C',
      correct: 'Так. Управлінська команда спочатку має зрозуміти й структурувати ризики, а вже потім переходити до вибору конкретних рішень.',
      incorrect: 'Не починайте з готового переліку споруд або копіювання іншого міста. Перший крок — зрозуміти власний ризик і визначити пріоритетне управлінське питання.'
    }
  ]);

  const $ = (selector, context) => (context || document).querySelector(selector);
  const $$ = (selector, context) => Array.from((context || document).querySelectorAll(selector));

  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function safeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function defaultPortfolio() {
    return {
      areaSystem: '',
      waterRiskIssue: '',
      riskManifestation: '',
      firstManagementStep: '',
      saved: false
    };
  }

  function normalizePortfolio(input) {
    const source = input && typeof input === 'object' ? input : {};
    return {
      areaSystem: typeof source.areaSystem === 'string' ? source.areaSystem : '',
      waterRiskIssue: typeof source.waterRiskIssue === 'string' ? source.waterRiskIssue : '',
      riskManifestation: typeof source.riskManifestation === 'string' ? source.riskManifestation : '',
      firstManagementStep: typeof source.firstManagementStep === 'string' ? source.firstManagementStep : '',
      saved: source.saved === true
    };
  }

  function defaultR07() {
    return {
      currentScenario: 0,
      scenarios: {
        s1: { state: 'unanswered', selected: null },
        s2: { state: 'unanswered', selected: null },
        s3: { state: 'unanswered', selected: null },
        s4: { state: 'unanswered', selected: null }
      }
    };
  }

  function normalizeR07(input) {
    const clean = defaultR07();
    if (!input || typeof input !== 'object') return clean;
    clean.currentScenario = Number.isInteger(input.currentScenario) ? Math.max(0, Math.min(3, input.currentScenario)) : 0;
    R07_ITEMS.forEach((item) => {
      const source = input.scenarios && input.scenarios[item.id];
      if (!source || typeof source !== 'object') return;
      const allowed = ['unanswered', 'selected', 'incorrect', 'retry', 'correct', 'completed'];
      clean.scenarios[item.id].state = allowed.includes(source.state) ? source.state : 'unanswered';
      clean.scenarios[item.id].selected = RISK_CATEGORIES.includes(source.selected) ? source.selected : null;
    });
    return clean;
  }

  function defaultAssessment() {
    return {
      currentQuestion: 0,
      questions: {
        q1: { state: 'unanswered', selected: null, correct: false },
        q2: { state: 'unanswered', selected: null, correct: false },
        q3: { state: 'unanswered', selected: null, correct: false },
        q4: { state: 'unanswered', selected: null, correct: false },
        q5: { state: 'unanswered', selected: null, correct: false }
      },
      passed: false
    };
  }

  function normalizeAssessment(input) {
    const clean = defaultAssessment();
    if (!input || typeof input !== 'object') return clean;
    clean.currentQuestion = Number.isInteger(input.currentQuestion) ? Math.max(0, Math.min(4, input.currentQuestion)) : 0;
    ASSESSMENT_ITEMS.forEach((item) => {
      const source = input.questions && input.questions[item.id];
      if (!source || typeof source !== 'object') return;
      const allowed = ['unanswered', 'selected', 'incorrect', 'retry', 'correct'];
      const selected = ['A', 'B', 'C', 'D'].includes(source.selected) ? source.selected : null;
      const isCorrect = source.correct === true && selected === item.answer;
      clean.questions[item.id] = {
        state: isCorrect ? 'correct' : (allowed.includes(source.state) ? source.state : 'unanswered'),
        selected: selected,
        correct: isCorrect
      };
    });
    clean.passed = ASSESSMENT_ITEMS.every((item) => clean.questions[item.id].correct === true);
    return clean;
  }

  function defaultProgress() {
    return { currentRoute: 0, highestAvailableRoute: 0, r10Reached: false };
  }

  function normalizeProgress(input) {
    const clean = defaultProgress();
    if (!input || typeof input !== 'object') return clean;
    clean.currentRoute = Number.isInteger(input.currentRoute) ? Math.max(0, Math.min(9, input.currentRoute)) : 0;
    clean.highestAvailableRoute = Number.isInteger(input.highestAvailableRoute) ? Math.max(0, Math.min(9, input.highestAvailableRoute)) : clean.currentRoute;
    clean.r10Reached = input.r10Reached === true;
    return clean;
  }

  let portfolio = normalizePortfolio(safeParse(CONFIG.portfolioKey, defaultPortfolio()));
  let r07State = normalizeR07(safeParse(CONFIG.r07Key, defaultR07()));
  let assessmentState = normalizeAssessment(safeParse(CONFIG.assessmentKey, defaultAssessment()));
  let progressState = normalizeProgress(safeParse(CONFIG.progressKey, defaultProgress()));
  let assessmentRequired = new Set();

  function portfolioComplete() {
    return PORTFOLIO_FIELDS.every((key) => portfolio[key].trim().length > 0);
  }

  function assessmentComplete() {
    return ASSESSMENT_ITEMS.every((item) => assessmentState.questions[item.id].correct === true);
  }

  function finalRouteAvailable() {
    return portfolioComplete() && assessmentComplete();
  }

  function lessonIsComplete() {
    return finalRouteAvailable() && progressState.r10Reached === true;
  }

  if (!finalRouteAvailable() && progressState.currentRoute === CONFIG.finalRouteIndex) {
    progressState.currentRoute = 8;
    progressState.r10Reached = false;
    safeStore(CONFIG.progressKey, progressState);
  }

  const routes = $$('.route');
  const headerRouteLabel = $('#header-route-label');
  const progressPage = $('#progress-page');
  const progressPercent = $('#progress-percent');
  const progressBar = $('#progress-bar');
  const progressTrack = $('.progress-track');
  const sectionNavList = $('#section-nav-list');
  const navPage = $('#nav-page');
  const navBack = $('#nav-back');
  const navNext = $('#nav-next');

  function renderSectionNavigation() {
    const fragment = document.createDocumentFragment();
    CONFIG.routes.forEach((route, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'section-nav-button';
      button.dataset.routeIndex = String(index);
      button.textContent = route.navLabel;
      fragment.append(button);
    });
    sectionNavList.replaceChildren(fragment);
  }

  function updateSectionNavigation(routeIndex) {
    $$('.section-nav-button', sectionNavList).forEach((button, index) => {
      const current = index === routeIndex;
      const blocked = index === CONFIG.finalRouteIndex && !finalRouteAvailable();
      if (current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
      button.disabled = blocked;
      button.setAttribute('aria-disabled', blocked ? 'true' : 'false');
    });
    const currentButton = $(`.section-nav-button[data-route-index="${routeIndex}"]`, sectionNavList);
    if (currentButton) currentButton.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function updatePersistentUi(routeIndex) {
    const percent = Math.round(((routeIndex + 1) / CONFIG.routeCount) * 100);
    const pageText = `Сторінка ${routeIndex + 1} з ${CONFIG.routeCount}`;
    headerRouteLabel.textContent = CONFIG.routes[routeIndex].title;
    progressPage.textContent = pageText;
    navPage.textContent = pageText;
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
    progressTrack.setAttribute('aria-valuenow', String(percent));
    progressTrack.setAttribute('aria-valuetext', `${percent}%, ${pageText}`);
    updateSectionNavigation(routeIndex);

    navBack.disabled = routeIndex === 0;
    if (routeIndex === CONFIG.finalRouteIndex) {
      navNext.textContent = 'Наступне заняття';
      navNext.href = CONFIG.nextLessonUrl;
      navNext.setAttribute('aria-label', 'Наступне заняття: Заняття 7');
      const enabled = lessonIsComplete();
      navNext.setAttribute('aria-disabled', enabled ? 'false' : 'true');
      navNext.tabIndex = enabled ? 0 : -1;
    } else {
      navNext.textContent = 'Далі';
      navNext.href = '#';
      navNext.removeAttribute('aria-label');
      const blocked = routeIndex === 8 && !finalRouteAvailable();
      navNext.setAttribute('aria-disabled', blocked ? 'true' : 'false');
      navNext.tabIndex = blocked ? -1 : 0;
    }
  }

  sectionNavList.addEventListener('click', (event) => {
    const button = event.target.closest('.section-nav-button');
    if (!button || button.disabled || button.getAttribute('aria-disabled') === 'true') return;
    showRoute(Number(button.dataset.routeIndex));
  });

  function showRoute(routeIndex, options) {
    const settings = Object.assign({ focus: true, persist: true }, options || {});
    const nextIndex = Math.max(0, Math.min(CONFIG.finalRouteIndex, routeIndex));
    if (nextIndex === CONFIG.finalRouteIndex && !finalRouteAvailable()) return false;

    routes.forEach((route, index) => {
      const active = index === nextIndex;
      route.hidden = !active;
      route.classList.toggle('is-active', active);
    });

    if (settings.persist) {
      progressState.currentRoute = nextIndex;
      progressState.highestAvailableRoute = Math.max(progressState.highestAvailableRoute, nextIndex);
      if (nextIndex === CONFIG.finalRouteIndex) progressState.r10Reached = true;
      safeStore(CONFIG.progressKey, progressState);
    }

    updatePersistentUi(nextIndex);
    if (settings.focus) {
      const heading = $('h1', routes[nextIndex]);
      if (heading) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        heading.focus({ preventScroll: true });
      }
    }
    return true;
  }

  navBack.addEventListener('click', () => {
    const current = routes.findIndex((route) => !route.hidden);
    if (current > 0) showRoute(current - 1);
  });

  navNext.addEventListener('click', (event) => {
    const current = routes.findIndex((route) => !route.hidden);
    if (navNext.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      return;
    }
    if (current < CONFIG.finalRouteIndex) {
      event.preventDefault();
      showRoute(current + 1);
    }
  });

  $('#reset-lesson').addEventListener('click', () => {
    const confirmed = window.confirm('Почати спочатку? Ваша Карта водного ризику або водного управлінського питання буде збережена.');
    if (!confirmed) return;
    localStorage.removeItem(CONFIG.progressKey);
    localStorage.removeItem(CONFIG.r07Key);
    localStorage.removeItem(CONFIG.assessmentKey);
    progressState = defaultProgress();
    r07State = defaultR07();
    assessmentState = defaultAssessment();
    assessmentRequired = new Set();
    renderR07();
    renderAssessment();
    updateArtifactControls();
    showRoute(0);
  });

  function createRadioOption(groupName, value, labelText, selected, disabled) {
    const label = document.createElement('label');
    label.className = 'option-label';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = groupName;
    input.value = value;
    input.checked = selected === value;
    input.disabled = disabled;
    const text = document.createElement('span');
    text.textContent = labelText;
    label.append(input, text);
    return label;
  }

  const r07Counter = $('#r07-counter');
  const r07Situation = $('#r07-situation');
  const r07Options = $('#r07-options');
  const r07Feedback = $('#r07-feedback');
  const r07Check = $('#r07-check');
  const r07Retry = $('#r07-retry');
  const r07Continue = $('#r07-continue');
  const r07Transition = $('#r07-transition');

  function renderR07() {
    const index = r07State.currentScenario;
    const item = R07_ITEMS[index];
    const scenario = r07State.scenarios[item.id];
    const checked = scenario.state === 'incorrect' || scenario.state === 'correct' || scenario.state === 'completed';
    r07Counter.textContent = item.title;
    r07Situation.textContent = item.text;
    r07Options.replaceChildren();
    RISK_CATEGORIES.forEach((category) => {
      const label = createRadioOption(`risk-${item.id}`, category, category, scenario.selected, checked);
      if (checked && category === scenario.selected) {
        label.classList.add(category === item.answer ? 'is-correct' : 'is-incorrect');
      }
      r07Options.append(label);
    });
    r07Feedback.className = 'feedback';
    r07Feedback.textContent = '';
    r07Check.hidden = checked;
    r07Retry.hidden = scenario.state !== 'incorrect';
    r07Continue.hidden = scenario.state !== 'correct' && scenario.state !== 'completed';
    r07Transition.hidden = !(index === 3 && scenario.state === 'completed');
    if (scenario.state === 'incorrect') {
      r07Feedback.textContent = item.incorrect;
      r07Feedback.classList.add('is-incorrect');
    } else if (scenario.state === 'correct' || scenario.state === 'completed') {
      r07Feedback.textContent = item.correct;
      r07Feedback.classList.add('is-correct');
    }
  }

  r07Options.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="radio"]')) return;
    const item = R07_ITEMS[r07State.currentScenario];
    const scenario = r07State.scenarios[item.id];
    scenario.selected = event.target.value;
    scenario.state = 'selected';
    safeStore(CONFIG.r07Key, r07State);
  });

  r07Check.addEventListener('click', () => {
    const item = R07_ITEMS[r07State.currentScenario];
    const scenario = r07State.scenarios[item.id];
    if (!scenario.selected) return;
    scenario.state = scenario.selected === item.answer ? 'correct' : 'incorrect';
    safeStore(CONFIG.r07Key, r07State);
    renderR07();
  });

  r07Retry.addEventListener('click', () => {
    const item = R07_ITEMS[r07State.currentScenario];
    r07State.scenarios[item.id] = { state: 'retry', selected: null };
    safeStore(CONFIG.r07Key, r07State);
    renderR07();
    r07Options.setAttribute('tabindex', '-1');
    r07Options.focus({ preventScroll: true });
  });

  r07Continue.addEventListener('click', () => {
    const item = R07_ITEMS[r07State.currentScenario];
    if (r07State.currentScenario < R07_ITEMS.length - 1) {
      r07State.scenarios[item.id].state = 'completed';
      r07State.currentScenario += 1;
    } else {
      r07State.scenarios[item.id].state = 'completed';
    }
    safeStore(CONFIG.r07Key, r07State);
    renderR07();
  });

  function persistPortfolio(saved) {
    const next = {};
    PORTFOLIO_FIELDS.forEach((key) => {
      next[key] = $(`#${key}`).value;
    });
    next.saved = saved === true;
    portfolio = next;
    safeStore(CONFIG.portfolioKey, portfolio);
    updateArtifactControls();
    updatePersistentUi(routes.findIndex((route) => !route.hidden));
  }

  function restorePortfolio() {
    PORTFOLIO_FIELDS.forEach((key) => {
      $(`#${key}`).value = portfolio[key];
    });
    updateArtifactControls();
  }

  function updateArtifactControls() {
    const complete = portfolioComplete();
    const completedSteps = PORTFOLIO_FIELDS.filter((key) => portfolio[key].trim()).length;
    $('#download-pdf').disabled = !complete;
    $('#save-portfolio').setAttribute('aria-pressed', portfolio.saved ? 'true' : 'false');
    $('#portfolio-step-progress').textContent = `Заповнено кроків: ${completedSteps} із 4`;
    PORTFOLIO_FIELDS.forEach((key) => {
      const field = $(`#${key}`);
      if (field.getAttribute('aria-invalid') === 'true' && field.value.trim()) {
        field.removeAttribute('aria-invalid');
      }
    });
    updateAiControls();
  }

  PORTFOLIO_FIELDS.forEach((key) => {
    $(`#${key}`).addEventListener('input', () => persistPortfolio(false));
  });

  $('#portfolio-form').addEventListener('submit', (event) => {
    event.preventDefault();
    persistPortfolio(false);
    const invalid = PORTFOLIO_FIELDS.filter((key) => !portfolio[key].trim());
    if (invalid.length) {
      invalid.forEach((key) => $(`#${key}`).setAttribute('aria-invalid', 'true'));
      $('#portfolio-status').textContent = 'Карта готова до збереження, коли всі чотири поля заповнені відповідно до підказок вище.';
      $(`#${invalid[0]}`).focus();
      return;
    }
    portfolio = normalizePortfolio(Object.assign({}, portfolio, { saved: true }));
    safeStore(CONFIG.portfolioKey, portfolio);
    $('#portfolio-status').textContent = 'Зберегти карту';
    updateArtifactControls();
    updatePersistentUi(routes.findIndex((route) => !route.hidden));
  });

  function buildPdfDefinition() {
    const fieldLabels = [
      '1. Ділянка або міська система громади',
      '2. Водний ризик або управлінське питання',
      '3. Як ризик проявляється / чому потребує управлінської уваги',
      '4. Перший управлінський крок до водочутливого міста'
    ];
    const content = [
      { text: 'Портфель мера', style: 'collectionLabel' },
      { text: 'Карта водного ризику або водного управлінського питання', style: 'artifactTitle' }
    ];
    PORTFOLIO_FIELDS.forEach((key, index) => {
      content.push({
        stack: [
          { text: fieldLabels[index], style: 'fieldHeading' },
          { text: portfolio[key].trim(), style: 'fieldResponse' }
        ],
        unbreakable: false,
        margin: [0, 0, 0, 18]
      });
    });
    return {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [53.86, 53.86, 53.86, 53.86],
      content: content,
      defaultStyle: {
        font: 'Roboto',
        fontSize: 11,
        lineHeight: 1.35,
        color: '#142a36'
      },
      styles: {
        collectionLabel: {
          fontSize: 10,
          bold: true,
          color: '#5f7f2f',
          margin: [0, 0, 0, 8]
        },
        artifactTitle: {
          fontSize: 20,
          bold: true,
          color: '#123f5b',
          lineHeight: 1.2,
          margin: [0, 0, 0, 24]
        },
        fieldHeading: {
          fontSize: 12,
          bold: true,
          color: '#123f5b',
          margin: [0, 0, 0, 6]
        },
        fieldResponse: {
          fontSize: 11,
          lineHeight: 1.4,
          margin: [0, 0, 0, 0]
        }
      }
    };
  }

  $('#download-pdf').addEventListener('click', () => {
    persistPortfolio(portfolio.saved);
    if (!portfolioComplete() || !window.pdfMake) return;
    const button = $('#download-pdf');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    $('#portfolio-status').textContent = 'Завантажити PDF';
    try {
      window.pdfMake.createPdf(buildPdfDefinition()).download('UCAN_Karta_vodnoho_ryzyku.pdf', () => {
        button.removeAttribute('aria-busy');
        button.disabled = false;
        $('#portfolio-status').textContent = 'Завантажити PDF';
      });
    } catch (error) {
      button.removeAttribute('aria-busy');
      button.disabled = false;
      $('#portfolio-status').textContent = 'Завантажити PDF';
      console.error(error);
    }
  });

  const AI_ACTIONS = Object.freeze({
    'AI-L06-01': Object.freeze({
      required: PORTFOLIO_FIELDS,
      build(values) {
        return `Ви допомагаєте управлінській команді української громади перевірити початкову Карту водного ризику або водного управлінського питання. Не вигадуйте місцевих фактів і не підміняйте управлінську роботу готовим технічним рішенням. Відрізняйте відомі дані від припущень.

Карта учасника:
1. Ділянка або міська система громади: ${values.areaSystem}
2. Водний ризик або управлінське питання: ${values.waterRiskIssue}
3. Як ризик проявляється / чому потребує управлінської уваги: ${values.riskManifestation}
4. Перший управлінський крок до водочутливого міста: ${values.firstManagementStep}

Завдання: перевірте логічну узгодженість між місцем/системою, сформульованим ризиком, його проявом і першим управлінським кроком. Не оцінюйте учасника і не пропонуйте готовий інженерний проєкт.

Дайте відповідь у 4 коротких блоках:
- Що узгоджується добре.
- Що сформульовано нечітко або потребує уточнення.
- Де є припущення, яке варто перевірити.
- Одне запитання, яке допоможе команді посилити карту.`;
      }
    }),
    'AI-L06-02': Object.freeze({
      required: Object.freeze(['areaSystem', 'waterRiskIssue', 'riskManifestation']),
      build(values) {
        const optionalStep = values.firstManagementStep
          ? `\n4. Запропонований перший управлінський крок: ${values.firstManagementStep}`
          : '';
        return `Ви допомагаєте управлінській команді української громади знайти прогалини в описі водного ризику перед вибором рішення. Не вигадуйте відсутніх даних і не робіть висновків про причини, якщо вони не наведені учасником. Не пропонуйте готовий технічний проєкт.

Відомий контекст учасника:
1. Ділянка або міська система громади: ${values.areaSystem}
2. Водний ризик або управлінське питання: ${values.waterRiskIssue}
3. Як ризик проявляється / чому потребує управлінської уваги: ${values.riskManifestation}${optionalStep}

Завдання: визначте, якої інформації або уточнень може бракувати, щоб команда краще зрозуміла проблему до вибору рішення.

Дайте відповідь у 3 частинах:
- Що вже відомо з опису.
- 3–5 конкретних прогалин або запитань для уточнення.
- Яку одну прогалину варто перевірити першою і чому.`;
      }
    }),
    'AI-L06-03': Object.freeze({
      required: PORTFOLIO_FIELDS,
      build(values) {
        return `Ви допомагаєте управлінській команді української громади уточнити перший управлінський крок у роботі з водним ризиком. Не вигадуйте місцевих фактів, не проєктуйте інженерне рішення і не підміняйте рішення відповідальної команди.

Карта учасника:
1. Ділянка або міська система громади: ${values.areaSystem}
2. Водний ризик або управлінське питання: ${values.waterRiskIssue}
3. Як ризик проявляється / чому потребує управлінської уваги: ${values.riskManifestation}
4. Поточний перший управлінський крок: ${values.firstManagementStep}

Завдання: допоможіть зробити перший управлінський крок конкретнішим і практичнішим, не перетворюючи його на готове технічне рішення.

Дайте відповідь у 3 частинах:
- Що в поточному кроці вже працює.
- Що варто уточнити у формулюванні.
- Запропонуйте 2 альтернативні формулювання першого управлінського кроку, які залишають остаточне рішення за командою громади.`;
      }
    })
  });

  function normalizedPortfolioValues() {
    return PORTFOLIO_FIELDS.reduce((values, key) => {
      values[key] = portfolio[key].trim();
      return values;
    }, {});
  }

  function aiActionEnabled(action) {
    const values = normalizedPortfolioValues();
    return action.required.every((key) => values[key].length > 0);
  }

  function buildAiPrompt(actionId) {
    const action = AI_ACTIONS[actionId];
    if (!action || !aiActionEnabled(action)) return null;
    return action.build(normalizedPortfolioValues());
  }

  function updateAiControls() {
    $$('.ai-copy-button').forEach((button) => {
      const action = AI_ACTIONS[button.dataset.aiAction];
      const enabled = Boolean(action && aiActionEnabled(action));
      button.disabled = !enabled;
      button.setAttribute('aria-disabled', enabled ? 'false' : 'true');
      const message = button.nextElementSibling;
      if (message && message.classList.contains('ai-insufficient')) message.hidden = enabled;
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Continue to the non-visible local fallback.
      }
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.setAttribute('aria-hidden', 'true');
    field.style.position = 'fixed';
    field.style.inset = '-9999px auto auto -9999px';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    field.remove();
    return copied;
  }

  $('.lx-ai-support').addEventListener('click', async (event) => {
    const button = event.target.closest('.ai-copy-button');
    if (!button || button.disabled) return;
    const prompt = buildAiPrompt(button.dataset.aiAction);
    if (!prompt) return;
    const status = $('#ai-copy-status');
    const copied = await copyText(prompt);
    status.textContent = copied
      ? 'Промпт скопійовано. Вставте його у вибраний AI-сервіс.'
      : 'Не вдалося скопіювати промпт. Спробуйте ще раз.';
  });

  const assessmentList = $('#assessment-list');
  const assessmentCheck = $('#assessment-check');
  const assessmentRetry = $('#assessment-retry');
  const assessmentSummary = $('#assessment-summary');
  const assessmentResult = $('#assessment-result');

  function renderAssessment() {
    const fragment = document.createDocumentFragment();
    ASSESSMENT_ITEMS.forEach((item, index) => {
      const question = assessmentState.questions[item.id];
      const fieldset = document.createElement('fieldset');
      fieldset.id = `assessment-${item.id}`;
      fieldset.className = 'assessment-question-group';
      fieldset.tabIndex = -1;
      const statusId = `assessment-${item.id}-status`;
      fieldset.setAttribute('aria-describedby', statusId);

      const legend = document.createElement('legend');
      const label = document.createElement('span');
      label.className = 'assessment-question-label';
      label.textContent = `Запитання ${index + 1}`;
      legend.append(label, document.createTextNode(item.question));
      fieldset.append(legend);

      item.options.forEach(([key, text]) => {
        const option = createRadioOption(`assessment-${item.id}`, key, `${key}. ${text}`, question.selected, false);
        option.querySelector('input').dataset.questionId = item.id;
        if ((question.state === 'correct' || question.state === 'incorrect') && key === question.selected) {
          option.classList.add(question.correct ? 'is-correct' : 'is-incorrect');
        }
        fieldset.append(option);
      });

      const status = document.createElement('p');
      status.id = statusId;
      status.className = 'assessment-question-status';
      if (question.state === 'correct') {
        status.textContent = `✓ ${item.correct}`;
        status.classList.add('is-correct');
      } else if (question.state === 'incorrect') {
        status.textContent = `✕ ${item.incorrect}`;
        status.classList.add('is-incorrect');
      } else if (question.state === 'unanswered' && question.selected === null && assessmentRequired.has(item.id)) {
        status.textContent = 'Оберіть відповідь.';
        status.classList.add('is-incorrect');
      }
      fieldset.append(status);
      fragment.append(fieldset);
    });
    assessmentList.replaceChildren(fragment);
    assessmentRetry.hidden = !ASSESSMENT_ITEMS.some((item) => assessmentState.questions[item.id].state === 'incorrect');
    assessmentResult.hidden = !assessmentState.passed;
  }

  assessmentList.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="radio"]')) return;
    const item = ASSESSMENT_ITEMS.find((entry) => entry.id === event.target.dataset.questionId);
    const question = assessmentState.questions[item.id];
    question.selected = event.target.value;
    question.state = 'selected';
    question.correct = false;
    assessmentRequired.delete(item.id);
    assessmentState.passed = false;
    safeStore(CONFIG.assessmentKey, assessmentState);
    const fieldset = event.target.closest('.assessment-question-group');
    $$('.option-label', fieldset).forEach((label) => label.classList.remove('is-correct', 'is-incorrect'));
    const status = $('.assessment-question-status', fieldset);
    status.className = 'assessment-question-status';
    status.textContent = '';
    assessmentSummary.className = 'feedback assessment-summary';
    assessmentSummary.textContent = '';
    assessmentResult.hidden = true;
    assessmentRetry.hidden = !ASSESSMENT_ITEMS.some((entry) => assessmentState.questions[entry.id].state === 'incorrect');
    updatePersistentUi(routes.findIndex((route) => !route.hidden));
  });

  assessmentCheck.addEventListener('click', () => {
    const unanswered = ASSESSMENT_ITEMS.filter((item) => !assessmentState.questions[item.id].selected);
    assessmentSummary.className = 'feedback assessment-summary';
    assessmentSummary.textContent = '';
    if (unanswered.length) {
      assessmentRequired = new Set(unanswered.map((item) => item.id));
      unanswered.forEach((item) => {
        const question = assessmentState.questions[item.id];
        question.state = 'unanswered';
        question.correct = false;
      });
      assessmentState.passed = false;
      safeStore(CONFIG.assessmentKey, assessmentState);
      renderAssessment();
      updatePersistentUi(routes.findIndex((route) => !route.hidden));
      $(`#assessment-${unanswered[0].id}`).focus({ preventScroll: true });
      return;
    }
    assessmentRequired = new Set();
    ASSESSMENT_ITEMS.forEach((item) => {
      const question = assessmentState.questions[item.id];
      question.correct = question.selected === item.answer;
      question.state = question.correct ? 'correct' : 'incorrect';
    });
    assessmentState.passed = ASSESSMENT_ITEMS.every((item) => assessmentState.questions[item.id].correct === true);
    safeStore(CONFIG.assessmentKey, assessmentState);
    renderAssessment();
    updatePersistentUi(routes.findIndex((route) => !route.hidden));
    assessmentSummary.textContent = assessmentState.passed
      ? '5 із 5 правильних відповідей.'
      : 'Якщо Ви помилилися, перегляньте пояснення та спробуйте ще раз.';
    assessmentSummary.classList.add(assessmentState.passed ? 'is-correct' : 'is-incorrect');
    assessmentSummary.focus({ preventScroll: true });
  });

  assessmentRetry.addEventListener('click', () => {
    const incorrect = ASSESSMENT_ITEMS.filter((item) => assessmentState.questions[item.id].state === 'incorrect');
    incorrect.forEach((item) => {
      const question = assessmentState.questions[item.id];
      question.state = 'retry';
      question.correct = false;
    });
    assessmentRequired = new Set();
    assessmentState.passed = false;
    safeStore(CONFIG.assessmentKey, assessmentState);
    renderAssessment();
    assessmentSummary.className = 'feedback assessment-summary';
    assessmentSummary.textContent = '';
    updatePersistentUi(routes.findIndex((route) => !route.hidden));
    if (incorrect.length) $(`#assessment-${incorrect[0].id}`).focus({ preventScroll: true });
  });

  renderSectionNavigation();
  restorePortfolio();
  renderR07();
  renderAssessment();

  showRoute(progressState.currentRoute, { focus: false, persist: false });

  window.__UCAN_L06_TEST__ = Object.freeze({
    getState: () => JSON.parse(JSON.stringify({ portfolio, r07State, assessmentState, progressState })),
    portfolioComplete,
    assessmentComplete,
    finalRouteAvailable,
    lessonIsComplete,
    buildPdfDefinition,
    buildAiPrompt,
    showRoute
  });
})();
