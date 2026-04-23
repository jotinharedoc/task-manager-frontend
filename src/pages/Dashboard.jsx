import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask, updateTask } from '../services/taskService';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('media');

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      setErro('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await createTask({ title, description, date, priority });
      setTitle('');
      setDescription('');
      setDate('');
      setPriority('media');
      await loadTasks();
    } catch {
      setErro('Erro ao criar tarefa');
    }
  };

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch {
      setErro('Erro ao deletar tarefa');
    }
  }

  async function handleToggleComplete(task) {
  try {
    await updateTask(task._id, { completed: !task.completed });
    await loadTasks();
  } catch {
    setErro('Erro ao atualizar tarefa');
  }
}

  return (
    <div className="dash-page">
      <div className="dash-container">
        <div className="dash-header">
          <h1 className="dash-title">Minhas tarefas</h1>
          <button className="dash-logout" onClick={handleLogout}>Sair</button>
        </div>

        {erro && <p className="dash-error">{erro}</p>}

        <div className="form-card">
          <p className="form-card-title">Nova tarefa</p>
          <form onSubmit={handleCreateTask}>
            <div className="form-field">
              <label>Título</label>
              <input
                type="text"
                placeholder="Ex: Reunião com cliente"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Descrição</label>
              <input
                type="text"
                placeholder="Detalhes opcionais"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Data</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Prioridade</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>
            <button type="submit" className="form-submit">Adicionar tarefa</button>
          </form>
        </div>

        <p className="tasks-section-title">Tarefas</p>

        {loading ? (
          <p className="tasks-loading">Carregando...</p>
        ) : tasks.length === 0 ? (
          <p className="tasks-empty">Nenhuma tarefa encontrada</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-card">
                <div
  className={`task-check ${task.completed ? 'completed' : ''}`}
  onClick={() => handleToggleComplete(task)}
/>
                <div className="task-body">
                  <p className={`task-title ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <div className="task-meta">
                    {task.date && (
                      <span className="task-date">
                        {new Date(task.date).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                    <span className={`priority-pill priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <button
                  className="task-delete"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}