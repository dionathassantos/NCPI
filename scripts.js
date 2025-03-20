const products = [
    {
        name: 'Crypter - NFT UI Kit',
        price: 3550,
        status: 'Active',
        image: '🎨'
    },
    {
        name: 'Bento Pro 2.0',
        price: 7990,
        status: 'Active',
        image: '🎨'
    },
    {
        name: 'Fleet - travel shopping kit',
        price: 1650,
        status: 'Offline',
        image: '🎨'
    }
];

function formatPrice(price) {
    return `$${(price).toFixed(2)}`;
}

window.onload = function() {
    const productList = document.querySelector('.product-list');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <div class="product-info">
                <span class="product-image">${product.image}</span>
                <div>
                    <h3>${product.name}</h3>
                    <span class="price">${formatPrice(product.price)}</span>
                </div>
            </div>
            <span class="status ${product.status.toLowerCase()}">${product.status}</span>
        `;
        productList.appendChild(productElement);
    });
};

const ncpiData = [
    {
        "Iniciativas": "NCPI Dissemina",
        "O que é": "O NCPI Dissemina é a iniciativa voltada a ampliar a capacidade do NCPI disseminar evidências e conhecimentos científicos plurais com potencial de impacto sobre o desenho e a implementação de políticas públicas voltadas às Primeiras Infâncias.",
        "Descrição": "Canais e produtos voltados a levar evidências científicas para formuladores de políticas e agentes de implementação que atuam para aterrissar as políticas públicas e para desenvolver serviços públicos para as crianças na primeira infância.",
        "Resultados": "NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
        "Nº": 1,
        "Metas": "Manter o site do NCPI entre os 3 primeiros colocados no Google em buscas de expressões prioritárias",
        "Porta": "Porta para fora"
    },
    {
        "Iniciativas": "NCPI Dissemina",
        "Resultados": "NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
        "Nº": 2,
        "Metas": "Aumentar a diversidade étnico-racial e regional de fontes sugeridas para entrevistas a veículos Tier 1",
        "Porta": "Porta para fora"
    },
    {
        "Iniciativas": "NCPI Dissemina",
        "Resultados": "NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
        "Nº": 3,
        "Metas": "Obter espaço editorial fixo para ao menos 2 integrantes do CC, com diversidade étnico-racial, regional e epistemológica",
        "Porta": "Porta para fora"
    },
    {
        "Iniciativas": "NCPI Dissemina",
        "Resultados": "NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
        "Nº": 4,
        "Metas": "Aumentar base de inscrições na newsletter em X% ao ano com taxa média de abertura de 20% ao ano",
        "Porta": "Porta para fora"
    },
    {
        "Iniciativas": "NCPI Dissemina",
        "Resultados": "NCPI visto como top referência sobre evidências para desenho e implementação de PPPI",
        "Nº": 5,
        "Metas": "5 X% de crescimento de menções ao NCPI e seus produtos na imprensa",
        "Porta": "Porta para fora"
    }
];

function groupByInitiative(data) {
    return data.reduce((groups, item) => {
        const group = groups[item.Iniciativas] || [];
        group.push(item);
        groups[item.Iniciativas] = group;
        return groups;
    }, {});
}

function createIndicatorCard(data) {
    const card = document.createElement('div');
    card.className = 'indicator-card';
    
    card.innerHTML = `
        <div class="indicator-content">
            <div class="date-tag">Fase 5 - 2025/2027</div>
            <h3 class="indicator-title">${data.Iniciativas}</h3>
            <div class="indicator-description">
                <p><strong>Meta ${data.Nº}:</strong> ${data.Metas}</p>
                <p><strong>Resultado Esperado:</strong> ${data.Resultados}</p>
            </div>
        </div>
        <select class="farol-select" onchange="updateFarol(this)">
            <option value="">Selecione o status</option>
            <option value="in-review">Em Revisão</option>
            <option value="done">Concluído</option>
            <option value="new">Novo</option>
        </select>
        <div class="status-bar"></div>
    `;
    
    return card;
}

function createInitiativeGroup(initiativeName, items) {
    const group = document.createElement('div');
    group.className = 'initiative-group';
    
    group.innerHTML = `
        <div class="initiative-header">
            <h3>${initiativeName}</h3>
            <span class="material-icons expand-icon">expand_more</span>
        </div>
        <div class="initiative-content">
            <div class="indicators-grid"></div>
        </div>
    `;
    
    const indicatorsGrid = group.querySelector('.indicators-grid');
    items.forEach(item => {
        indicatorsGrid.appendChild(createIndicatorCard(item));
    });
    
    const header = group.querySelector('.initiative-header');
    header.addEventListener('click', () => {
        const content = group.querySelector('.initiative-content');
        const isActive = content.classList.contains('active');
        
        // Fecha todos os outros grupos
        document.querySelectorAll('.initiative-content').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.initiative-header').forEach(el => {
            el.classList.remove('active');
        });
        
        // Abre/fecha o grupo atual
        if (!isActive) {
            content.classList.add('active');
            header.classList.add('active');
        }
    });
    
    return group;
}

function updateFarol(select) {
    const statusBar = select.parentElement.querySelector('.status-bar');
    statusBar.className = 'status-bar ' + select.value;
}

window.onload = function() {
    const portaFora = document.querySelector('#porta-fora .initiatives-accordion');
    const portaDentro = document.querySelector('#porta-dentro .initiatives-accordion');
    
    const groupedData = groupByInitiative(ncpiData);
    
    for (const [initiative, items] of Object.entries(groupedData)) {
        const portaForaItems = items.filter(item => item.Porta === "Porta para fora");
        const portaDentroItems = items.filter(item => item.Porta === "Porta para dentro");
        
        if (portaForaItems.length > 0) {
            portaFora.appendChild(createInitiativeGroup(initiative, portaForaItems));
        }
        
        if (portaDentroItems.length > 0) {
            portaDentro.appendChild(createInitiativeGroup(initiative, portaDentroItems));
        }
    }
};
