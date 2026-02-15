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