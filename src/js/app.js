function toggleMenu() {
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#mobail-menu');
  const body = document.querySelector('body');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
    body.classList.toggle('overflow-hidden');
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 767.999) {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      burger.classList.remove('active');
      body.classList.remove('overflow-hidden');
    }
  });
}
toggleMenu();
// Tabs
function toggleTabs(tabsTriggerClass, tabsContentClass) {
  const tabsTriggers = document.querySelectorAll(tabsTriggerClass);
  const tabsContents = document.querySelectorAll(tabsContentClass);
  tabsContents.forEach((content) => {
    content.classList.add('hidden');
    tabsContents[0].classList.remove('hidden');
  });
  tabsTriggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', () => {
      tabsTriggers.forEach((t) => t.classList.remove('active'));

      trigger.classList.add('active');

      tabsContents.forEach((content) => {
        content.classList.add('hidden');
      });

      tabsContents[idx].classList.remove('hidden');
    });
  });
}
toggleTabs('.tab-trigger', '.tab-content');
// Accordion
function accordion() {
  const items = document.querySelectorAll('.accordion__trigger');

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;

      if (parent.classList.contains('active')) {
        parent.classList.remove('active');
      } else {
        // Закрываем все активные элементы перед открытием нового
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.parentNode.classList.remove('active');
          }
        });

        parent.classList.add('active');
      }
    });
  });
}

accordion();