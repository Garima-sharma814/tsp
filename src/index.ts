import { v4 as uuid4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const loadTasks = (): Task[] => {
  const allTasks = localStorage.getItem('TASKS');
  if (!allTasks) return [];
  return JSON.parse(allTasks);
};

const addListItem = (task: Task): boolean => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  return true;
};

const tasksList: Task[] = loadTasks();
tasksList.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const task: Task = {
    id: uuid4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasksList.push(task);
  saveTasks();

  addListItem(task);
  input.value = '';
});

const saveTasks = () => {
  localStorage.setItem('TASKS', JSON.stringify(tasksList));
};
