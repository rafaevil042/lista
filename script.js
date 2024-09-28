document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productList = document.querySelectorAll('.product-checkbox');
    const totalPriceElement = document.getElementById('total-price');

    function calculateTotal() {
        let total = 0;
        productList.forEach((checkbox) => {
            if (checkbox.checked) {
                const quantity = checkbox.parentElement.querySelector('.product-quantity').value;
                const priceText = checkbox.parentElement.querySelector('label').innerText;
                const price = parseFloat(priceText.split(' - R$ ')[1].replace(',', '.'));

                total += price * quantity;
            }
        });
        totalPriceElement.textContent = total.toFixed(2).replace('.', ',');
    }

    // Filtra os produtos com base na entrada da barra de busca
    document.getElementById('search-input').addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const items = document.querySelectorAll('.product-item');

        items.forEach(item => {
            const label = item.querySelector('label').innerText.toLowerCase();
            item.style.display = label.includes(filter) ? '' : 'none';
        });
    });

    // Adiciona eventos de mudança (change) para os checkboxes e campos de quantidade
    productList.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
        const quantityField = checkbox.parentElement.querySelector('.product-quantity');
        if (quantityField) {
            quantityField.addEventListener('change', calculateTotal);
        }
    });

    productForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário
        let selectedProducts = '';
        productList.forEach((checkbox) => {
            if (checkbox.checked) {
                const quantity = checkbox.parentElement.querySelector('.product-quantity').value;
                const productText = checkbox.parentElement.querySelector('label').innerText;
                selectedProducts += `${productText} - Quantidade: ${quantity}\n`;
            }
        });

        if (selectedProducts) {
            const whatsappMessage = `Essa e minha lista:\n\n${selectedProducts}\nTotal: R$ ${totalPriceElement.textContent}`;
            const phoneNumber = '+55085981791544'; // Insira seu número de WhatsApp aqui, com DDI e DDD
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
        } else {
            alert('Selecione ao menos um produto.');
        }
    });
});
