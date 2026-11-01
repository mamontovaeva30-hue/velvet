// ======================================================
// VELVET — APPLICATION ENGINE
// ======================================================

// ---------- ДАННЫЕ ИСТОРИЙ ----------

const stories = [
  {
    id: 1,
    title: "Последний секрет",
    description: "Некоторые тайны лучше не раскрывать.",
    genre: "thriller",
    genreName: "Триллер",
    age: 16,
    episodes: 12,
    cover: "cover-one",
    status: "В разработке"
  },
  {
    id: 2,
    title: "Без возврата",
    description: "У каждого решения есть последствия.",
    genre: "mystery",
    genreName: "Мистика и тайны",
    age: 18,
    episodes: 18,
    cover: "cover-two",
    status: "В разработке"
  },
  {
    id: 3,
    title: "После полуночи",
    description: "Одна встреча может изменить целую жизнь.",
    genre: "drama",
    genreName: "Драма",
    age: 16,
    episodes: 9,
    cover: "cover-three",
    status: "В разработке"
  },
  {
    id: 4,
    title: "Тихий свидетель",
    description: "В этом городе никто не говорит всей правды.",
    genre: "detective",
    genreName: "Детектив",
    age: 12,
    episodes: 14,
    cover: "cover-one",
    status: "В разработке"
  },
  {
    id: 5,
    title: "Королевство пепла",
    description: "Старая легенда оказалась реальностью.",
    genre: "fantasy",
    genreName: "Фэнтези",
    age: 16,
    episodes: 16,
    cover: "cover-two",
    status: "В разработке"
  }
];

// ---------- ДАННЫЕ ОБНОВЛЕНИЙ ----------

const updates = {
  app: [
    {
      date: "01.11.2026",
      title: "VELVET начинает работу",
      text: "Добро пожаловать на платформу интерактивных историй. Сейчас мы создаём основные разделы и инструменты."
    }
  ],

  news: [
    {
      date: "01.11.2026",
      title: "Открытие платформы",
      text: "VELVET готовится стать пространством для читателей и авторов."
    }
  ],

  stories: [
    {
      date: "01.11.2026",
      title: "Первые истории",
      text: "Каталог постепенно пополняется новыми проектами."
    }
  ]
};

// ---------- ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ ----------

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("[data-page]");
const pageName = document.getElementById("page-name");

const pageTitles = {
  home: "Главная",
  catalog: "Каталог",
  updates: "Обновления",
  community: "Сообщество",
  activity: "Моя библиотека",
  studio: "Авторская студия",
  pro: "VELVET PRO",
  profile: "Профиль"
};

function openPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target) return;

  pages.forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });

  if (pageName) {
    pageName.textContent = pageTitles[pageId] || pageId;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});

// ---------- КАРТОЧКИ ИСТОРИЙ ----------

function createStoryCard(story) {
  const card = document.createElement("article");
  card.className = "story-card";

  const cover = document.createElement("div");
  cover.className = `story-cover ${story.cover}`;

  const tag = document.createElement("span");
  tag.className = "cover-tag";
  tag.textContent = story.genreName.toUpperCase();

  const number = document.createElement("div");
  number.className = "cover-number";
  number.textContent = String(story.id).padStart(3, "0");

  const title = document.createElement("div");
  title.className = "cover-title";
  title.textContent = story.title.toUpperCase();

  cover.append(tag, title, number);

  const info = document.createElement("div");
  info.className = "story-info";

  const meta = document.createElement("div");
  meta.className = "story-meta";
  meta.textContent = `${story.age}+ · ${story.episodes} ЭПИЗОДОВ`;

  const heading = document.createElement("h3");
  heading.textContent = story.title;

  const description = document.createElement("p");
  description.textContent = story.description;

  const button = document.createElement("button");
  button.className = "outline-button";
  button.textContent = "СКОРО В VELVET";

  button.addEventListener("click", () => {
    alert(
      `${story.title}\n\nЭта история пока находится в разработке.`
    );
  });

  info.append(meta, heading, description, button);
  card.append(cover, info);

  return card;
}

// ---------- ГЛАВНАЯ ----------

function renderFeaturedStories() {
  const container = document.getElementById("featured-stories");

  if (!container) return;

  container.replaceChildren();

  stories.slice(0, 3).forEach(story => {
    container.appendChild(createStoryCard(story));
  });
}

// ---------- КАТАЛОГ ----------

function renderCatalog() {
  const container = document.getElementById("catalog-grid");
  const search = document.getElementById("story-search");
  const genre = document.getElementById("genre-filter");
  const age = document.getElementById("age-filter");

  if (!container) return;

  const searchValue = search.value.trim().toLowerCase();
  const genreValue = genre.value;
  const ageValue = age.value;

  const filtered = stories.filter(story => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchValue) ||
      story.description.toLowerCase().includes(searchValue);

    const matchesGenre =
      genreValue === "all" || story.genre === genreValue;

    const matchesAge =
      ageValue === "all" || String(story.age) === ageValue;

    return matchesSearch && matchesGenre && matchesAge;
  });

  container.replaceChildren();

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "По твоему запросу ничего не найдено.";
    container.appendChild(empty);
    return;
  }

  filtered.forEach(story => {
    container.appendChild(createStoryCard(story));
  });
}

document
  .getElementById("story-search")
  .addEventListener("input", renderCatalog);

document
  .getElementById("genre-filter")
  .addEventListener("change", renderCatalog);

document
  .getElementById("age-filter")
  .addEventListener("change", renderCatalog);

// ---------- ОБНОВЛЕНИЯ ----------

function renderUpdates(type = "app") {
  const container = document.getElementById("updates-list");

  if (!container) return;

  container.replaceChildren();

  const items = updates[type] || [];

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "update-card";

    const date = document.createElement("div");
    date.className = "story-meta";
    date.textContent = dateLabel(item.date);

    const heading = document.createElement("h3");
    heading.textContent = item.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = item.text;

    card.append(date, heading, paragraph);
    container.appendChild(card);
  });
}

function dateLabel(value) {
  return `VELVET · ${value}`;
}

document.querySelectorAll(".update-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".update-tab").forEach(tab => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    renderUpdates(button.dataset.update);
  });
});

// ---------- ПРОЕКТЫ АВТОРА ----------

const projectKey = "velvet_author_projects";

function getProjects() {
  try {
    return JSON.parse(localStorage.getItem(projectKey)) || [];
  } catch {
    return [];
  }
}

function saveProjects(projects) {
  localStorage.setItem(projectKey, JSON.stringify(projects));
}

function renderProjects() {
  const container = document.getElementById("my-projects");

  if (!container) return;

  const projects = getProjects();
  container.replaceChildren();

  if (projects.length === 0) {
    container.textContent = "Пока нет проектов.";
    return;
  }

  projects.forEach(project => {
    const item = document.createElement("div");
    item.className = "project-item";
    item.textContent = project.title;
    container.appendChild(item);
  });
}

document
  .getElementById("create-project")
  .addEventListener("click", () => {
    const title = prompt("Как будет называться твоя история?");

    if (!title || !title.trim()) return;

    const projects = getProjects();

    projects.push({
      id: Date.now(),
      title: title.trim(),
      createdAt: new Date().toISOString(),
      status: "Черновик"
    });

    saveProjects(projects);
    renderProjects();

    alert("Проект создан и сохранён на этом устройстве.");
  });

// ---------- ЗАПУСК ----------

renderFeaturedStories();
renderCatalog();
renderUpdates("app");
renderProjects();

console.log("VELVET успешно запущен.");
