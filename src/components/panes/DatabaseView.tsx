
import React from 'react';

export default function DatabaseView() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-cyan-400">Banco de Dados</h3>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-700 px-4 py-2 font-semibold">Tabela: users</div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="font-semibold text-cyan-400">ID</div>
            <div className="font-semibold text-cyan-400">Nome</div>
            <div className="font-semibold text-cyan-400">Email</div>
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <div>{i}</div>
                <div>Usuário {i}</div>
                <div>user{i}@email.com</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
