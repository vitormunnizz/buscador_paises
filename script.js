document.addEventListener('DOMContentLoaded', () => {
    const countryInput = document.getElementById('country-input');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');
    const countryInfoDiv = document.getElementById('country-info');

    searchButton.addEventListener('click', () => {
        const countryName = countryInput.value.trim();
        if (countryName) {
            fetchCountryInfo(countryName);
        }
    });

    clearButton.addEventListener('click', () => {
         countryInfoDiv.innerHTML = "";
         countryInput.value = "";
    })


    async function fetchCountryInfo(countryName) {
        countryInfoDiv.innerHTML = '<p>Carregando...</p>';
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            if (!response.ok) {
                throw new Error('País não encontrado');
            }
            const data = await response.json();
            displayCountryInfo(data[0]);
        } catch (error) {
            countryInfoDiv.innerHTML = `<p class="error-message">${error.message}</p>`;
        }
    }

    function displayCountryInfo(country) {
        countryInfoDiv.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" class="country-flag">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'Não informada'}</p>
            <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Região:</strong> ${country.region}</p>
        `;
    }
});