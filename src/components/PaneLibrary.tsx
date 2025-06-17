
import React from 'react';
import { X, FolderOpen, BarChart3, MessageCircle, Code, Database } from 'lucide-react';

const AVAILABLE_PANES = {
  projects: { 
    id: 'projects', 
    title: 'Projetos', 
    description: 'Gerencie e visualize todos os seus projetos em um só lugar',
    icon: FolderOpen, 
    category: 'Desenvolvimento'
  },
  metrics: { 
    id: 'metrics', 
    title: 'Métricas & Analytics', 
    description: 'Monitore performance, usuários e estatísticas em tempo real',
    icon: BarChart3, 
    category: 'Analytics'
  },
  chat: { 
    id: 'chat', 
    title: 'Chat com IA', 
    description: 'Converse com assistente inteligente para ajuda e suporte',
    icon: MessageCircle, 
    category: 'Assistência'
  },
  code: { 
    id: 'code', 
    title: 'Editor de Código', 
    description: 'Editor avançado com syntax highlighting e autocomplete',
    icon: Code, 
    category: 'Desenvolvimento'
  },
  database: { 
    id: 'database', 
    title: 'Banco de Dados', 
    description: 'Visualize e gerencie dados de forma intuitiva',
    icon: Database, 
    category: 'Dados'
  }
};

interface PaneLibraryProps {
  onAddPane: (paneId: string) => void;
  onClose: () => void;
}

export default function PaneLibrary({ onAddPane, onClose }: PaneLibraryProps) {
  const categories = [...new Set(Object.values(AVAILABLE_PANES).map(pane => pane.category))];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Adicionar Tela</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(AVAILABLE_PANES)
                  .filter(pane => pane.category === category)
                  .map(pane => {
                    const Icon = pane.icon;
                    return (
                      <div
                        key={pane.id}
                        onClick={() => onAddPane(pane.id)}
                        className="bg-gray-900 p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700 hover:border-blue-500"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-600 rounded-lg">
                            <Icon size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{pane.title}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{pane.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
