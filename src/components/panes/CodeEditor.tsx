
import React from 'react';

export default function CodeEditor() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-yellow-400">Editor de Código</h3>
      <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm">
        <div className="text-purple-400">import React from 'react';</div>
        <div className="text-blue-400">export default function <span className="text-yellow-400">App</span>() {`{`}</div>
        <div className="text-gray-300 ml-4">return (</div>
        <div className="text-gray-300 ml-8">&lt;<span className="text-red-400">div</span>&gt;</div>
        <div className="text-gray-300 ml-12">&lt;<span className="text-red-400">h1</span>&gt;Hello World!&lt;/<span className="text-red-400">h1</span>&gt;</div>
        <div className="text-gray-300 ml-8">&lt;/<span className="text-red-400">div</span>&gt;</div>
        <div className="text-gray-300 ml-4">);</div>
        <div className="text-blue-400">{`}`}</div>
      </div>
    </div>
  );
}
