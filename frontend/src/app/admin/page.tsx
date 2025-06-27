
export default async function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="bg-white rounded-lg shadow-md p-6">        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Acciones de Administrador</h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Gestionar Usuarios
            </button>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Gestionar Productos
            </button>
            <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Ver Estadísticas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 