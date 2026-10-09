export function toggleTaskType(selected, type, allTypes) {
  if (type === 'all') return allTypes.slice();
  if (selected.length === allTypes.length) return [type];
  if (!selected.includes(type))
    return allTypes.filter((id) => selected.includes(id) || id === type);
  const remaining = selected.filter((id) => id !== type);
  return remaining.length ? remaining : allTypes.slice();
}

export function selectionLabel(selected, taskTypes) {
  if (selected.length === taskTypes.length) return 'All tasks';
  return taskTypes
    .filter((type) => selected.includes(type.id))
    .map((type) => type.label)
    .join(' + ');
}

export function createFilters(root, taskTypes, onChange) {
  const buttons = [...root.querySelectorAll('[data-task-type]')];
  const allTypes = taskTypes.map((type) => type.id);
  let selected = allTypes.slice();

  function render() {
    const all = selected.length === allTypes.length;
    for (const button of buttons) {
      const active =
        button.dataset.taskType === 'all'
          ? all
          : !all && selected.includes(button.dataset.taskType);
      button.setAttribute('aria-pressed', String(active));
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      selected = toggleTaskType(selected, button.dataset.taskType, allTypes);
      render();
      onChange(selected);
    });
  }
  render();

  return {
    get selectedTypes() {
      return selected.slice();
    },
    get label() {
      return selectionLabel(selected, taskTypes);
    }
  };
}
