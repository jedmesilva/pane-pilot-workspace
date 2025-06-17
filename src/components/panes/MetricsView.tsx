
import React from 'react';

export default function MetricsView() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-400">Métricas & Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-400">1.2k</div>
          <div className="text-sm text-gray-400">Usuários Ativos</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">89%</div>
          <div className="text-sm text-gray-400">Performance</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">15</div>
          <div className="text-sm text-gray-400">Projetos</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-400">24h</div>
          <div className="text-sm text-gray-400">Uptime</div>
        </div>
      </div>
    </div>
  );
}
