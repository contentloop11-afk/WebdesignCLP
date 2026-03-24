// ===== STORE BILDER ENTFERNEN =====

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        removeStoreItems();
    }, 1000);
});

function removeStoreItems() {
    console.log('Entferne Store-Bilder...');
    
    // Entferne alle Store-Collection-Items
    const storeItems = document.querySelectorAll('.store-collection-item-main');
    storeItems.forEach(function(item) {
        console.log('Entferne Store-Item:', item);
        item.remove();
    });
    
    console.log('Store-Bilder erfolgreich entfernt');
}
