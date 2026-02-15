const menuWindow = document.getElementById('menuWindow');
const editorWindow = document.getElementById('editorWindow');
const grid = document.getElementById('mapGrid');

const tileTypes = ['grass', 'road', 'water'];
const gridSize = 20;
let mapData = [];

function init() {
    mapData = new Array(gridSize * gridSize).fill(0);
}

function renderGrid() {
    grid.innerHTML = '';
    mapData.forEach((typeIndex, index) => {
        const tile = document.createElement('div');
        tile.className = `tile tile-${tileTypes[typeIndex]}`;                   
        tile.dataset.index = index;
        grid.appendChild(tile);
    });
}

grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('tile')) {
        const index = parseInt(e.target.dataset.index);
        mapData[index] = (mapData[index] + 1) % tileTypes.length;
        
        e.target.className = `tile tile-${tileTypes[mapData[index]]}`;
    }
});

document.getElementById('NewMapBTN').addEventListener('click', () => {
    init();
    renderGrid();
    menuWindow.classList.add('hidden');
    editorWindow.classList.remove('hidden');
});

document.getElementById('backBTN').addEventListener('click', () => {
    menuWindow.classList.remove('hidden');
    editorWindow.classList.add('hidden');
});

function saveMap() {
    const mapName = prompt("Zadejte název mapy:");
    if (!mapName) return;

    const existingMaps = JSON.parse(localStorage.getItem('trackBuilder_maps')) || [];
    
    const newMap = {
        name: mapName,
        data: mapData,
        timestamp: new Date().toISOString()
    };

    existingMaps.push(newMap);
    
    localStorage.setItem('trackBuilder_maps', JSON.stringify(existingMaps));
    alert("Mapa uložena!");
}

function showLoadMenu() {
    const existingMaps = JSON.parse(localStorage.getItem('trackBuilder_maps')) || [];
    savedMapsList.innerHTML = '';

    if (existingMaps.length === 0) {
        savedMapsList.innerHTML = '<p>Žádné uložené mapy.</p>';
    } else {
        existingMaps.forEach((map, index) => {
            const mapEntry = document.createElement('div');
            mapEntry.className = 'map-item';
            mapEntry.innerHTML = `
                <span>${map.name}</span>
                <button class="btn btn-secondary" onclick="loadMap(${index})">Načíst</button>
            `;
            savedMapsList.appendChild(mapEntry);
        });
    }

    menuWindow.classList.add('hidden');
    loadModal.classList.remove('hidden');
}

window.loadMap = function(index) {
    const existingMaps = JSON.parse(localStorage.getItem('trackBuilder_maps'));
    mapData = existingMaps[index].data;
    
    renderGrid();
    loadModal.classList.add('hidden');
    editorWindow.classList.remove('hidden');
};


document.getElementById('saveBTN').addEventListener('click', saveMap);
document.getElementById('LoadMapBTN').addEventListener('click', showLoadMenu);

document.getElementById('closeLoadBTN').addEventListener('click', () => {
    loadModal.classList.add('hidden');
    menuWindow.classList.remove('hidden');
});

document.getElementById('NewMapBTN').addEventListener('click', () => {
    init();
    renderGrid();
    menuWindow.classList.add('hidden');
    editorWindow.classList.remove('hidden');
});