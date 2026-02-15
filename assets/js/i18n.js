(() => {
    const lang = (document.documentElement.lang || 'en').toLowerCase();
    const dictionary = {
        'Dashboard': 'Дашборд',
        'My Day': 'Мой день',
        'Projects': 'Проекты',
        'Bugs': 'Баги',
        'Test Plans': 'Тест-планы',
        'Test Runs': 'Тест-раны',
        'Wiki': 'Вики',
        'Kanban': 'Канбан',
        'Calendar': 'Календарь',
        'Reports': 'Отчеты',
        'Users': 'Пользователи',
        'Favorites': 'Избранное',
        'No favorites yet.': 'Пока нет избранного.',
        'Search (Ctrl+K)': 'Поиск (Ctrl+K)',
        'Type to search...': 'Введите для поиска...',
        'Close': 'Закрыть',
        'Settings': 'Настройки',
        'Theme': 'Тема',
        'Light': 'Светлая',
        'Dark': 'Темная',
        'Language': 'Язык',
        'English': 'Английский',
        'Russian': 'Русский',
        'New password': 'Новый пароль',
        'Leave empty': 'Оставьте пустым',
        'Save': 'Сохранить',
        'Login - YJH': 'Вход - YJH',
        'Sign in': 'Войти',
        'Email': 'Email',
        'Password': 'Пароль',
        'Login': 'Войти',
        'One platform. One team. One source of truth.': 'Одна платформа. Одна команда. Один источник правды.',
        'Pass / Fail Rate': 'Доля Pass / Fail',
        'High Priority Bugs': 'Баги высокого приоритета',
        'Risk Engine': 'Оценка риска',
        'Score:': 'Оценка:',
        'Bug Trends (7 days)': 'Тренд багов (7 дней)',
        'Low': 'Низкий',
        'Medium': 'Средний',
        'High': 'Высокий',
        'My Bugs': 'Мои баги',
        'No assigned bugs.': 'Нет назначенных багов.',
        'My Test Runs': 'Мои тест-раны',
        'No test runs.': 'Нет тест-ранов.',
        'Mentions': 'Упоминания',
        'No mentions.': 'Нет упоминаний.',
        'Create Project': 'Создать проект',
        'Project name': 'Название проекта',
        'Description': 'Описание',
        'Active': 'Активный',
        'Archived': 'Архивный',
        'Name': 'Название',
        'Status': 'Статус',
        'Open': 'Открыть',
        'Project not found': 'Проект не найден',
        'Back': 'Назад',
        'Project details': 'Детали проекта',
        'Releases': 'Релизы',
        'Create Release': 'Создать релиз',
        'Release name': 'Название релиза',
        'Planned': 'Запланирован',
        'In Progress': 'В работе',
        'Released': 'Выпущен',
        'Cancelled': 'Отменен',
        'Release': 'Релиз',
        'Project': 'Проект',
        'Date': 'Дата',
        'Lead Time': 'Время выполнения',
        'Reopen Rate': 'Доля переоткрытий',
        'Velocity (7d)': 'Скорость (7д)',
        'Buggiest Modules': 'Самые проблемные модули',
        'Team Calendar': 'Календарь команды',
        'Add absence': 'Добавить отсутствие',
        'Vacation': 'Отпуск',
        'Sick leave': 'Больничный',
        'Day off': 'Выходной',
        'Conference': 'Конференция',
        'Other': 'Другое',
        'Reason': 'Причина',
        'User': 'Пользователь',
        'Type': 'Тип',
        'From': 'С',
        'To': 'По',
        'Card title': 'Название карточки',
        'labels,comma': 'метки,через запятую',
        'Assignee': 'Исполнитель',
        'Add Card': 'Добавить карточку',
        'No boards configured.': 'Доски не настроены.',
        'Create Bug': 'Создать баг',
        'None': 'Нет',
        'Back to list': 'Назад к списку',
        'Possible duplicates:': 'Возможные дубликаты:',
        'Title': 'Заголовок',
        'Severity': 'Серьезность',
        'Priority': 'Приоритет',
        'Due date': 'Срок',
        'Steps to reproduce': 'Шаги воспроизведения',
        'Expected result': 'Ожидаемый результат',
        'Actual result': 'Фактический результат',
        'Environment': 'Окружение',
        'Estimated time (h)': 'Оценка времени (ч)',
        'Actual time (h)': 'Фактическое время (ч)',
        'Comments': 'Комментарии',
        'Add a comment': 'Добавить комментарий',
        'Post': 'Отправить',
        'All projects': 'Все проекты',
        'Apply': 'Применить',
        'Save Filter': 'Сохранить фильтр',
        'Saved filters:': 'Сохраненные фильтры:',
        'ID': 'ID',
        'Filter name': 'Имя фильтра',
        'Create Plan': 'Создать план',
        'Plan name': 'Название плана',
        'Draft': 'Черновик',
        'Completed': 'Завершен',
        'Test plan not found': 'Тест-план не найден',
        'Create Suite': 'Создать набор',
        'Suite name': 'Название набора',
        'No parent': 'Без родителя',
        'Suites': 'Наборы',
        'Test Cases': 'Тест-кейсы',
        'Suite': 'Набор',
        'Create Test Case': 'Создать тест-кейс',
        'Create Test Run': 'Создать тест-ран',
        'Run name': 'Название рана',
        'Unassigned': 'Не назначен',
        'Execute': 'Выполнить',
        'Test run not found': 'Тест-ран не найден',
        'Case': 'Кейс',
        'Notes': 'Заметки',
        'Create bug': 'Создать баг',
        'Create Test Case': 'Создать тест-кейс',
        'Test Case #': 'Тест-кейс #',
        'Suite': 'Набор',
        'Preconditions': 'Предусловия',
        'Automation': 'Автоматизация',
        'Estimated time (min)': 'Оценка времени (мин)',
        'Steps (one per line)': 'Шаги (по одному в строке)',
        'Expected (one per line)': 'Ожидаемый результат (по одному в строке)',
        'Checklist (one per line)': 'Чеклист (по одному в строке)',
        'Wiki': 'Вики',
        'Create Page': 'Создать страницу',
        'slug': 'слаг',
        'Markdown': 'Markdown',
        'Slug': 'Слаг',
        'Page not found': 'Страница не найдена',
        'Edit Page': 'Редактировать страницу',
        'Version Compare': 'Сравнение версий',
        'Current': 'Текущая',
        'Compare': 'Сравнить',
        'Left': 'Левая',
        'Right': 'Правая',
        'Create User': 'Создать пользователя',
        'Username': 'Логин',
        'Role': 'Роль',
        'Admin': 'Администратор',
        'Developer': 'Разработчик',
        'Viewer': 'Наблюдатель',
        'QA': 'Тестировщик',
        'Pass': 'Пройдено',
        'Fail': 'Провалено',
        'Opened': 'Открыто',
        'Closed': 'Закрыто',
        'Welcome back': 'С возвращением',
        'Invalid credentials': 'Неверные учетные данные',
        'Settings updated': 'Настройки обновлены',
        'Project created': 'Проект создан',
        'Project updated': 'Проект обновлен',
        'Release created': 'Релиз создан',
        'Availability added': 'Отсутствие добавлено',
        'Card created': 'Карточка создана',
        'Comment added': 'Комментарий добавлен',
        'Bug updated': 'Баг обновлен',
        'Bug created': 'Баг создан',
        'Test plan created': 'Тест-план создан',
        'Suite created': 'Набор создан',
        'Test case updated': 'Тест-кейс обновлен',
        'Test case created': 'Тест-кейс создан',
        'Test run created': 'Тест-ран создан',
        'Execution updated': 'Выполнение обновлено',
        'Page created': 'Страница создана',
        'Page updated': 'Страница обновлена',
        'User created': 'Пользователь создан',
        'new': 'новый',
        'assigned': 'назначен',
        'in_progress': 'в работе',
        'fixed': 'исправлен',
        'verified': 'проверен',
        'closed': 'закрыт',
        'reopened': 'переоткрыт',
        'highest': 'самый высокий',
        'high': 'высокий',
        'medium': 'средний',
        'low': 'низкий',
        'lowest': 'самый низкий',
        'blocker': 'блокирующий',
        'critical': 'критический',
        'major': 'серьезный',
        'minor': 'незначительный',
        'trivial': 'тривиальный',
        'functional': 'функциональный',
        'ui': 'интерфейсный',
        'performance': 'производительность',
        'security': 'безопасность',
        'integration': 'интеграционный',
        'manual': 'ручной',
        'automated': 'автоматизированный',
        'partially': 'частично',
        'pass': 'пройден',
        'fail': 'провален',
        'blocked': 'заблокирован',
        'not_tested': 'не протестирован',
        'skipped': 'пропущен',
        'planned': 'запланирован',
        'released': 'выпущен',
        'cancelled': 'отменен',
        'vacation': 'отпуск',
        'sick_leave': 'больничный',
        'day_off': 'выходной',
        'conference': 'конференция',
        'other': 'другое',
        'draft': 'черновик',
        'active': 'активный',
        'completed': 'завершен',
        'admin': 'администратор',
        'qa': 'тестировщик',
        'developer': 'разработчик',
        'viewer': 'наблюдатель',
        'My Tasks': 'Мои задачи',
        'No open tasks.': 'Нет открытых задач.',
        'Quick Actions': 'Быстрые действия',
        'Create Test Plan': 'Создать тест-план',
        'Create Wiki Page': 'Создать страницу Wiki',
        'Test Runs Today': 'Тест-раны сегодня',
        'Runs completed': 'Завершено ранов',
        'Pass today:': 'Pass сегодня:',
        'Fail today:': 'Fail сегодня:',
        'Bug Trends (14 days)': 'Тренд багов (14 дней)',
        'Bug Trends (30 days)': 'Тренд багов (30 дней)',
        '+ Bug': '+ Баг',
        '+ Test Case': '+ Тест-кейс',
        '+ Test Run': '+ Тест-ран',
        '+ Project': '+ Проект',
        'Filter: runs with': 'Фильтр: раны с',
        'results': 'результатами',
        'clear': 'сбросить',
        'Save Card': 'Сохранить карточку',
        'Cancel edit': 'Отменить редактирование',
        'Edit card': 'Редактировать карточку',
        'Delete card': 'Удалить карточку',
        'Edit column': 'Редактировать столбец',
        'Delete column': 'Удалить столбец',
        'Delete card?': 'Удалить карточку?',
        'Delete column?': 'Удалить столбец?',
        'Unable to delete card': 'Не удалось удалить карточку',
        'Unable to update column': 'Не удалось обновить столбец',
        'Column is not empty': 'Столбец не пустой',
        'Invalid CSRF token': 'Неверный CSRF токен'
        ,
        'Actions': 'Действия',
        'Delete release?': 'Удалить релиз?',
        'Delete record?': 'Удалить запись?',
        'Delete user?': 'Удалить пользователя?',
        'Release deleted': 'Релиз удален',
        'Release updated': 'Релиз обновлен',
        'Cannot delete release: it is used in linked records': 'Нельзя удалить релиз: он используется в связанных данных',
        'Availability deleted': 'Отсутствие удалено',
        'Availability updated': 'Отсутствие обновлено',
        'Edit absence': 'Редактировать отсутствие',
        'User updated': 'Пользователь обновлен',
        'User deleted': 'Пользователь удален',
        'You cannot delete your own account': 'Нельзя удалить свой аккаунт',
        'Cannot delete user: linked records exist': 'Нельзя удалить пользователя: есть связанные записи'
    };

    const translate = (input) => {
        if (lang !== 'ru') {
            return input;
        }
        if (/^Bug #\d+$/i.test(input)) {
            return input.replace(/^Bug/i, 'Баг');
        }
        if (/^Test Case #\d+$/i.test(input)) {
            return input.replace(/^Test Case/i, 'Тест-кейс');
        }
        return dictionary[input] || input;
    };

    window.uiT = translate;

    if (lang !== 'ru') {
        return;
    }

    const translateTextNode = (node) => {
        const raw = node.nodeValue;
        if (!raw || !raw.trim()) {
            return;
        }
        const leading = raw.match(/^\s*/)[0];
        const trailing = raw.match(/\s*$/)[0];
        const core = raw.trim();
        const converted = translate(core);
        if (converted !== core) {
            node.nodeValue = `${leading}${converted}${trailing}`;
        }
    };

    const translateAttributes = (root) => {
        root.querySelectorAll('[placeholder],[title],[aria-label]').forEach((el) => {
            ['placeholder', 'title', 'aria-label'].forEach((attr) => {
                if (!el.hasAttribute(attr)) {
                    return;
                }
                const original = el.getAttribute(attr);
                const converted = translate(original);
                if (converted !== original) {
                    el.setAttribute(attr, converted);
                }
            });
        });
    };

    const translateTree = (root) => {
        if (!(root instanceof Element) && root !== document.body) {
            return;
        }
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const parent = node.parentElement;
                if (!parent) {
                    return NodeFilter.FILTER_REJECT;
                }
                const tag = parent.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        let node = walker.nextNode();
        while (node) {
            translateTextNode(node);
            node = walker.nextNode();
        }

        translateAttributes(root);
    };

    translateTree(document.body);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((added) => {
                if (added.nodeType === Node.TEXT_NODE) {
                    translateTextNode(added);
                } else if (added.nodeType === Node.ELEMENT_NODE) {
                    translateTree(added);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();

