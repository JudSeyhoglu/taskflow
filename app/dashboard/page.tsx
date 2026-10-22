'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function initDashboard() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUserEmail(session.user.email || '');
        await fetchTasks();
        setLoading(false);
      }
    }
    initDashboard();
  }, [router]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTasks(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTask, user_id: session.user.id }])
      .select();

    if (!error && data) {
      setTasks([data[0], ...tasks]);
      setNewTask('');
    }
  };

  const toggleTask = async (id: number, currentCompleted: boolean) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !currentCompleted } : t))
    );

    await supabase
      .from('tasks')
      .update({ completed: !currentCompleted })
      .eq('id', id);
  };

  const deleteTask = async (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
    await supabase.from('tasks').delete().eq('id', id);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      {/* Header - متجاوب مع الهواتف */}
      <header className="bg-white border-b px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold text-blue-600">TaskFlow</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-semibold">
            Proje Yönetimi
          </span>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-gray-700 text-xs sm:text-sm font-medium truncate max-w-[180px] sm:max-w-none">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition text-xs sm:text-sm"
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      {/* Main Task Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-grow">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Proje ve Görev Paneli
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Günlük görevlerinizi ekleyin, takip edin ve tamamlayın.
              </p>
            </div>
            <div className="mt-3 md:mt-0 bg-blue-50 px-3 py-1.5 rounded-xl text-blue-800 text-xs sm:text-sm font-medium">
              Plan: <span className="font-bold">Ücretsiz Plan</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-600 mb-1">
              <span>Tamamlanan Görevler</span>
              <span>
                {completedCount} / {tasks.length} (%{progressPercentage})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form - متجاوب للأجهزة الصغيرة */}
        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Yeni bir görev veya proje adımı yazın..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-sm text-sm sm:text-base"
          >
            Ekle
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {tasks.length === 0 ? (
            <div className="p-8 sm:p-10 text-center text-gray-400">
              <p className="text-3xl sm:text-4xl mb-2">📋</p>
              <p className="text-sm sm:text-base">Henüz eklenmiş bir görev yok. Yukarıdan ilk görevinizi ekleyin!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 transition gap-2"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                    />
                    <span
                      className={`text-gray-800 font-medium text-sm sm:text-base break-words ${
                        task.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition px-2 py-1 text-xs sm:text-sm flex-shrink-0"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-6 text-center text-gray-500 text-xs sm:text-sm">
        &copy; 2026 TaskFlow. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}