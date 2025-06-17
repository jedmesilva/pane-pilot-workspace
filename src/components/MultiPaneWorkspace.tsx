
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Plus, 
  Grid3x3, 
  Columns, 
  Rows, 
  FolderOpen, 
  BarChart3, 
  MessageCircle,
  Settings,
  Home,
  Code,
  Database
} from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import ProjectsList from './panes/ProjectsList';
import MetricsView from './panes/MetricsView';
import ChatView from './panes/ChatView';
import CodeEditor from './panes/CodeEditor';
import DatabaseView from './panes/DatabaseView';
import PaneLibrary from './PaneLibrary';

const AVAILABLE_PANES = {
  projects: { 
    id: 'projects', 
    title: 'Projetos', 
    description: 'Gerencie e visualize todos os seus projetos em um só lugar',
    icon: FolderOpen, 
    component: ProjectsList,
    category: 'Desenvolvimento'
  },
  metrics: { 
    id: 'metrics', 
    title: 'Métricas & Analytics', 
    description: 'Monitore performance, usuários e estatísticas em tempo real',
    icon: BarChart3, 
    component: MetricsView,
    category: 'Analytics'
  },
  chat: { 
    id: 'chat', 
    title: 'Chat com IA', 
    description: 'Converse com assistente inteligente para ajuda e suporte',
    icon: MessageCircle, 
    component: ChatView,
    category: 'Assistência'
  },
  code: { 
    id: 'code', 
    title: 'Editor de Código', 
    description: 'Editor avançado com syntax highlighting e autocomplete',
    icon: Code, 
    component: CodeEditor,
    category: 'Desenvolvimento'
  },
  database: { 
    id: 'database', 
    title: 'Banco de Dados', 
    description: 'Visualize e gerencie dados de forma intuitiva',
    icon: Database, 
    component: DatabaseView,
    category: 'Dados'
  }
};

const SIDEBAR_MENU_ITEMS = [
  { id: 'home', title: 'Início', icon: Home },
  { id: 'account', title: 'Minha Conta', icon: Settings },
  { id: 'preferences', title: 'Preferências', icon: Settings },
  { id: 'help', title: 'Ajuda', icon: MessageCircle }
];

export default function MultiPaneWorkspace() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openPanes, setOpenPanes] = useState(['projects', 'metrics', 'chat']);
  const [activeMobilePane, setActiveMobilePane] = useState('projects');
  const [layout, setLayout] = useState('row'); // 'row', 'column', 'grid'
  const [showPaneLibrary, setShowPaneLibrary] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addPane = (paneId) => {
    if (!openPanes.includes(paneId)) {
      setOpenPanes(prev => [...prev, paneId]);
      if (isMobile) {
        setActiveMobilePane(paneId);
      }
    }
    setShowPaneLibrary(false);
    setMobileMenuOpen(false);
  };

  const removePane = (paneId) => {
    setOpenPanes(prev => prev.filter(id => id !== paneId));
    if (isMobile && activeMobilePane === paneId) {
      setActiveMobilePane(openPanes.find(id => id !== paneId) || '');
    }
  };

  const handleSidebarAction = (itemId) => {
    console.log(`Ação executada: ${itemId}`);
    setMobileMenuOpen(false);
  };

  if (isMobile) {
    return (
      <div className="h-screen bg-gray-900 text-white flex flex-col">
        {/* Pane Library Modal */}
        {showPaneLibrary && (
          <PaneLibrary
            onAddPane={addPane}
            onClose={() => setShowPaneLibrary(false)}
          />
        )}

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 p-4" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {SIDEBAR_MENU_ITEMS.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSidebarAction(item.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <Icon size={18} />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {activeMobilePane && openPanes.includes(activeMobilePane) && (
            <div className="h-full flex flex-col">
              <div className="bg-gray-800 p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {AVAILABLE_PANES[activeMobilePane]?.title}
                  </h2>
                  <button 
                    onClick={() => removePane(activeMobilePane)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {React.createElement(AVAILABLE_PANES[activeMobilePane]?.component)}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="bg-gray-800 border-t border-gray-700 flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-4 text-gray-300 hover:text-white flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex-1 flex items-center overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 px-2">
              {openPanes.map(paneId => {
                const pane = AVAILABLE_PANES[paneId];
                const Icon = pane.icon;
                return (
                  <button
                    key={paneId}
                    onClick={() => setActiveMobilePane(paneId)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      activeMobilePane === paneId ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{pane.title}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => setShowPaneLibrary(true)}
                className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex-shrink-0 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* Pane Library Modal */}
      {showPaneLibrary && (
        <PaneLibrary
          onAddPane={addPane}
          onClose={() => setShowPaneLibrary(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <div className="flex-1 p-2 space-y-1">
          {SIDEBAR_MENU_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarAction(item.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                title={sidebarCollapsed ? item.title : ''}
              >
                <Icon size={18} />
                {!sidebarCollapsed && <span>{item.title}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Layout Controls */}
        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Workspace</h1>
            <button
              onClick={() => setShowPaneLibrary(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span>Adicionar Tela</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 mr-2">Layout:</span>
            <button
              onClick={() => setLayout('row')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'row' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
              title="Layout em Linha"
            >
              <Columns size={16} />
            </button>
            <button
              onClick={() => setLayout('column')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'column' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
              title="Layout em Coluna"
            >
              <Rows size={16} />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'grid' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
              title="Layout em Grid"
            >
              <Grid3x3 size={16} />
            </button>
          </div>
        </div>

        {/* Resizable Panes Container */}
        <div className="flex-1 overflow-hidden">
          {openPanes.length > 0 && (
            <ResizablePanelGroup 
              direction={layout === 'column' ? 'vertical' : 'horizontal'}
              className="h-full"
            >
              {openPanes.map((paneId, index) => {
                const pane = AVAILABLE_PANES[paneId];
                return (
                  <React.Fragment key={paneId}>
                    <ResizablePanel 
                      defaultSize={100 / openPanes.length}
                      minSize={20}
                      className="bg-gray-900"
                    >
                      <div className="h-full flex flex-col">
                        <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between">
                          <h3 className="font-medium">{pane.title}</h3>
                          <button
                            onClick={() => removePane(paneId)}
                            className="text-gray-400 hover:text-red-400 p-1 rounded transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                          {React.createElement(pane.component)}
                        </div>
                      </div>
                    </ResizablePanel>
                    
                    {index < openPanes.length - 1 && (
                      <ResizableHandle withHandle className="bg-gray-700 hover:bg-blue-600 transition-colors" />
                    )}
                  </React.Fragment>
                );
              })}
            </ResizablePanelGroup>
          )}
        </div>
      </div>
    </div>
  );
}
