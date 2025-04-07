chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "gerar-cpf",
    title: "Gerar CPF e colar",
    contexts: ["editable"]
  });
  chrome.contextMenus.create({
    id: "gerar-cnpj",
    title: "Gerar CNPJ e colar",
    contexts: ["editable"]
  });
});

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  if (info.menuItemId === "gerar-cpf" && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: gerarEColarCPF
    });
  }
  if (info.menuItemId === "gerar-cnpj" && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: gerarEColarCNPJ
    });
  }
});

function gerarEColarCPF() {
  function calcularDigito(digs: number[], pesos: number[]): number {
    const soma = digs.reduce((acc, dig, i) => acc + dig * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  function gerarCPF(): string {
    const rand = () => Math.floor(Math.random() * 9);
    const base = Array.from({ length: 9 }, rand);
    const d1 = calcularDigito(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
    const d2 = calcularDigito([...base, d1], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
    return [...base, d1, d2].join('');
  }

  const input = document.activeElement as HTMLInputElement;
  if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
    input.value = gerarCPF();
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function gerarEColarCNPJ() {
  function calcularDigito(digs: number[], pesos: number[]): number {
    const soma = digs.reduce((acc, dig, i) => acc + dig * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  function gerarCNPJ(): string {
    const rand = () => Math.floor(Math.random() * 9);
    const base = Array.from({ length: 12 }, rand);
    const d1 = calcularDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const d2 = calcularDigito([...base, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return [...base, d1, d2].join('');
  }

  const input = document.activeElement as HTMLInputElement;
  if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
    input.value = gerarCNPJ();
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}