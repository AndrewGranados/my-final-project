-- CreateTable
CREATE TABLE "Perfil" (
    "id" SERIAL NOT NULL,
    "strNombrePerfil" TEXT NOT NULL,
    "bitAdministrador" BOOLEAN NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "strNombreUsuario" TEXT NOT NULL,
    "strPwd" TEXT NOT NULL,
    "strCorreo" TEXT NOT NULL,
    "strNumeroCelular" TEXT NOT NULL,
    "idEstadoUsuario" BOOLEAN NOT NULL,
    "imagenUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "perfilId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "strNombreModulo" TEXT NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermisosPerfil" (
    "id" SERIAL NOT NULL,
    "perfilId" INTEGER NOT NULL,
    "moduloId" INTEGER NOT NULL,
    "bitAgregar" BOOLEAN NOT NULL,
    "bitEditar" BOOLEAN NOT NULL,
    "bitConsulta" BOOLEAN NOT NULL,
    "bitEliminar" BOOLEAN NOT NULL,
    "bitDetalle" BOOLEAN NOT NULL,

    CONSTRAINT "PermisosPerfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "idMenu" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "moduloId" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_strNombreUsuario_key" ON "Usuario"("strNombreUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_strCorreo_key" ON "Usuario"("strCorreo");

-- CreateIndex
CREATE UNIQUE INDEX "PermisosPerfil_perfilId_moduloId_key" ON "PermisosPerfil"("perfilId", "moduloId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisosPerfil" ADD CONSTRAINT "PermisosPerfil_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisosPerfil" ADD CONSTRAINT "PermisosPerfil_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
