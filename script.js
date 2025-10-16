const draggableItems = document.querySelectorAll('.draggable-item');
const dropZone = document.getElementById('drop-zone');
const droppedList = document.getElementById('dropped-items-list');

let draggedElement = null;

// 1. Draggable Element Event Handlers

draggableItems.forEach(item => {
    // When the drag starts, store a reference to the element and set data
    item.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
        e.target.classList.add('dragging');
        // Store the element's ID for retrieval in the drop event
        e.dataTransfer.setData('text/plain', e.target.id);
    });

    // When the drag ends, remove the 'dragging' class
    item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });
});

// 2. Drop Zone Event Handlers

// Prevent default to allow dropping
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    e.target.classList.add('drag-over');
});

// Add visual feedback when a draggable item enters the drop zone
dropZone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
});

// Remove visual feedback when a draggable item leaves the drop zone
dropZone.addEventListener('dragleave', (e) => {
    e.target.classList.remove('drag-over');
});

// Handle the drop action
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    // Get the ID of the dragged element
    const data = e.dataTransfer.getData('text/plain');
    const itemToDrop = document.getElementById(data);

    if (itemToDrop) {
        // A. Move the draggable item to the 'Drop here' zone
        dropZone.appendChild(itemToDrop);
        
        // B. Add the item's name to the 'Dropped Items List' for tracking (optional)
        const droppedItemName = itemToDrop.textContent;
        const listItem = document.createElement('div');
        listItem.textContent = droppedItemName;
        listItem.classList.add('dropped-item-name');
        droppedList.appendChild(listItem);
    }
});
