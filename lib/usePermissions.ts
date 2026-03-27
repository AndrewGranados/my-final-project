import { useEffect, useState } from "react";

export function usePermissions(modulo: string) {
  const [permisos, setPermisos] = useState<any>(null);

  useEffect(() => {
    //fetch(`/api/permisos-perfil?modulo=${modulo}`)
    fetch(`/api/me/permisos?modulo=${modulo}`)
      .then((res) => res.json())
      .then(setPermisos);
  }, [modulo]);

  return permisos;
}