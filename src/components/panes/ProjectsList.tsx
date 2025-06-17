
import React from 'react';

export default function ProjectsList() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-400">Meus Projetos</h3>
      <div className="space-y-2">
        {['Website Portfólio', 'App Mobile', 'Dashboard Analytics', 'API Backend'].map((project, i) => (
          <div key={i} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
            <div className="font-medium">{project}</div>
            <div className="text-sm text-gray-400">Última modificação: há {i + 1} dias</div>
          </div>
        ))}
      </div>
    </div>
  );
}
