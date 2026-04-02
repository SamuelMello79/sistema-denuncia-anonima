const DATA = {
    "Segurança e Violência": {
        icon: 'shield-alert',
        subs: ["Violência contra a mulher", "Violência contra crianças", "Violência contra idosos", "Furto/Roubo", "Drogas", "Atividade suspeita"]
    },
    "Direitos e Conduta": {
        icon: 'user-x',
        subs: ["Assédio moral/sexual", "Bullying/Cyberbullying", "Discriminação", "Direitos humanos", "Denúncia institucional"]
    },
    "Meio Ambiente e Bem-Estar": {
        icon: 'leaf',
        subs: ["Maus-tratos a animais", "Crimes ambientais", "Perturbação do sossego", "Situações de risco"]
    },
    "Cidade e Serviços": {
        icon: 'building-2',
        subs: ["Infraestrutura urbana", "Serviços públicos", "Transporte e trânsito", "Irregularidades escolares"]
    }
};

let report = { category: '', sub: '', bairro: '', rua: '' };

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderMainCategories();
    window.addEventListener('keydown', (e) => e.key === 'Escape' && quickExit());
});

function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${id}`).classList.add('active');
    window.scrollTo(0,0);
}

function quickExit() {
    window.location.replace("https://www.google.com");
}

function startReport() {
    showView('report');
    goToStep(1);
}

function renderMainCategories() {
    const list = document.getElementById('main-category-list');
    list.innerHTML = '';
    Object.keys(DATA).forEach(cat => {
        const item = document.createElement('div');
        item.className = 'selection-item';
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <i data-lucide="${DATA[cat].icon}" size="20" style="color:var(--primary)"></i>
                <span style="font-weight:600">${cat}</span>
            </div>
            <i data-lucide="chevron-right" size="18" style="color:var(--text-muted)"></i>
        `;
        item.onclick = () => selectMainCategory(cat);
        list.appendChild(item);
    });
    lucide.createIcons();
}

function selectMainCategory(cat) {
    report.category = cat;
    const subList = document.getElementById('subcategory-list');
    subList.innerHTML = '';
    DATA[cat].subs.forEach(sub => {
        const item = document.createElement('div');
        item.className = 'selection-item';
        item.innerHTML = `<span>${sub}</span> <i data-lucide="chevron-right" size="18"></i>`;
        item.onclick = () => { report.sub = sub; goToStep(3); };
        subList.appendChild(item);
    });
    lucide.createIcons();
    goToStep(2);
}

function goToStep(num) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step-dot').forEach(d => d.classList.remove('active'));
    
    document.getElementById(`step-${num}`).classList.add('active');
    const labels = ["Categoria", "Assunto", "Localização", "Evidências"];
    document.getElementById('step-label').innerText = `Etapa ${num}: ${labels[num-1]}`;
    
    for(let i=1; i<=num; i++) {
        document.getElementById(`dot-${i}`).classList.add('active');
    }
    window.scrollTo(0,0);
}

function validateLocation() {
    const b = document.getElementById('input-bairro').value;
    const r = document.getElementById('input-rua').value;
    document.getElementById('btn-loc-next').disabled = b.length < 3 || r.length < 3;
}

function simulateCepSearch() {
    const cep = document.getElementById('input-cep').value;
    if(cep.length >= 8) {
        document.getElementById('input-bairro').value = "Bairro Simulado";
        document.getElementById('input-rua').value = "Rua das Flores";
        validateLocation();
    }
}

function updateFileStatus() {
    const input = document.getElementById('file-input');
    document.getElementById('file-status').innerText = `${input.files.length} arquivo(s) prontos.`;
}

function submitFinal() {
    const protocol = 'PROT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('res-protocol').innerText = protocol;
    document.querySelector('.stepper').style.display = 'none';
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-success').classList.add('active');
    lucide.createIcons();
}

function trackProtocol() {
    const code = document.getElementById('track-input').value;
    if(code.length > 5) {
        document.getElementById('track-id').innerText = code.toUpperCase();
        document.getElementById('track-result').style.display = 'block';
        lucide.createIcons();
    }
}