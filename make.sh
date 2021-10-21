### NOTA 1: lo que lleva doble # es para una ejecución local
### NOTA 2: lo que lleva una sola # es para ser ejecutado solo la primera vez

# RUTA=/home/ruta/work/proyecto-frontend
# cd $RUTA

# Usar estas dos lineas sólo la primera vez
 #npm install -g @vue/cli
 #npm install --save
 #npm install --save vue-slick-carousel

echo "Borrando directorios viejos..."
rm -rf dist
rm -rf lib

echo "Creando archivo binario..."
npm run build

echo "Preparando creacion del archivo jar..."
mkdir -p lib/src/main/resources
cp -r dist lib/src/main/resources/static
cp pom.xml lib

## echo "Copiando a Nexus..."
mvn -U -f lib/pom.xml clean deploy
#mvn -U -f lib/pom.xml clean install
#/home/ruta/work/proyecto-backend/build-run/run-docker.sh
