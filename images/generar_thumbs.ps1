# Ruta de origen y destino
$sourcePath = "."
$thumbsPath = ".\thumbs"

# Crear carpeta de thumbnails si no existe
if (!(Test-Path $thumbsPath)) {
    New-Item -ItemType Directory -Path $thumbsPath
}

# Procesar cada imagen JPG del directorio actual
Get-ChildItem -Path $sourcePath -Filter *.JPG | ForEach-Object {
    $input = $_.FullName
    $output = Join-Path $thumbsPath $_.Name
    magick convert $input -resize 400x400 $output
}

Write-Host "Proceso terminado. Revisa la carpeta 'thumbs'."
