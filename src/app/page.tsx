'use client';

import { Header } from '@/components/layout/Header';
import { TodoList } from '@/components/todo/TodoList';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="mx-auto max-w-[500px] relative">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}
