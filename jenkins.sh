# ESTAS DEPEMDENCIAS HAN ESTADO DESDE SIEMPRE...
# npm install -g @vue/cli-service-global
# npm install -g @vue/cli@latest

# npm install jquery@1.9.1
# npm install
# npm install sass
# npm install sass-loader


#  ESTE ARCHIVO SE BAJA UNA SOLA VEZ. (LA PRIMERA VEZ) Y LUEGO YA NO SE VUELVE A USAR:
#  wget https://www.gustavo-arellano.com/wp-content/node_modules.tar.gz
#tar xzvf node_modules.tar.gz
#rm -rf node_modules.tar.gz


# LAS SIGUIENTES DEPENDENCIAS SE SUPONE QUE YA SIEMPRE ESTÁN EN EL package.json:
# npm install --save core-js regenerator-runtime
# npm install --save @johmun/vue-tags-input
# npm install --save vue-input-tag
# npm install --save keycloak-js
# npm install --save axios
# npm install --save vue-axios
# npm install --save plugin-vuejs-keycloak
# npm install --save dhx-vault
# npm install --save vue-js-modal
# npm install --save vuejs-datepicker
# npm install --save vue-meta
# npm install --save vue-select
# npm install --save vue-materialize-datatable


##########################################################################
# COLOCAR AQUI ABAJO LAS NUEVAS DEPENDENCIAS A INSTALAR Y LUEGO DE LA PRIMER
# EJECUCIÓN EXITOSA CON ESTA DEPENDENCIA, *** COMENTARLA *** Y COPIARLA AL
# BLOQUE DE ARRIBA DE DEPENDENCIAS YA EJECUTADAS. DE NO HACER ESTO, LA
# DEPENDENCIA SE VA A REINSTALAR AUNQUE YA ESTÉ INSTALADA Y ESO HACE QUE EL
# BUILD SE TARDE MUCHO EN EFECTUARSE. CON LO ANTERIOR, ESTE TIEMPO SÓLO SE
# PAGA LA PRIMERA VEZ Y LAS SUBSECUENTES YA NO ES CARGADO !!!!!!! !!!!!!!!
###########################################################################

#npm install --save vue-range-slider
#npm install --save

echo "Ejecutando la parte invariante de este script..."
RUTA=.

echo "Borrando directorios viejos..."
rm -rf $RUTA/lib
mkdir -p $RUTA/lib/src/main/resources

echo "Creando archivo binario..."
npm run build

if [ $? -eq 0 ]
then
  mv dist $RUTA/lib/src/main/resources/static
  cp pom.xml $RUTA/lib/
  # mvn -U -f lib/pom.xml clean deploy
  echo "Proceso concluido exitosamente..."
else
  echo "El proceso falló"
  exit -1
fi



