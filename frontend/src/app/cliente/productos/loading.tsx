import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header con búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row items-center py-4 justify-between w-full gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          {/* Input de búsqueda */}
          <Skeleton className="h-10 w-full sm:max-w-sm" />
          
          {/* Select de categoría */}
          <Skeleton className="h-10 w-full sm:max-w-[200px]" />
        </div>
        
        {/* Botón crear producto */}
        <Skeleton className="h-10 w-full sm:max-w-max" />
      </div>

      {/* Tabla skeleton */}
      <div className="rounded-md border">
        <div className="border-b">
          <div className="grid grid-cols-6 gap-4 p-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        {/* Filas de la tabla */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border-b last:border-b-0">
            <div className="grid grid-cols-6 gap-4 p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-12 w-12 rounded-md" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
} 