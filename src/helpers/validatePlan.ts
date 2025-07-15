export const ValidarPlanSucursal = (plan: string,cantidadSucursales:number) => {

    if(plan === "basico" && cantidadSucursales === 1) {
      
        throw new Error("El plan basico solo permite una sucursal");
    }
    if(plan === "intermedio" && cantidadSucursales ===2) {
        throw new Error("El plan intermedio solo permite hasta 3 sucursales");
    }
}