describe('Verificação da Página de QA', () => {

  beforeEach(() => {
    cy.visit('exercicio.html');
  });

  it('Deve ter o título principal correto', () => {
    cy.get('header h1').should('have.text', 'Jornada do QA');
  });

  it('Deve exibir todos os 6 cards com os títulos corretos', () => {
    
    const expectedTitles = [
      'Passo 1: Entenda os Fundamentos',
      'Passo 2: Aprenda Conceitos Chave',
      'Passo 3: Domine as Ferramentas',
      'Passo 4: Desenvolve Soft Skills', // O teste falhou aqui
      'Passo 5: Lógica e SQL',
      'Passo 6: Pratique!'
    ];

    cy.get('.card h2').as('cardTitles');
    cy.get('@cardTitles').should('have.length', 6);

    // --- INÍCIO DA CORREÇÃO ---
    // Em vez de 'should('have.text')', vamos pegar o texto,
    // normalizá-lo e então comparar.
    
    cy.get('@cardTitles').each((titleElement, index) => {
      
      const expectedText = expectedTitles[index];

      cy.wrap(titleElement)
        .invoke('text') // Pega o texto do elemento (ex: "  Olá  \n ")
        .then((actualText) => {
          // Normaliza o texto: remove espaços/quebras de linha extras
          const normalizedText = actualText.replace(/\s+/g, ' ').trim();
          
          // Compara o texto limpo
          expect(normalizedText).to.equal(expectedText);
        });
    });
    // --- FIM DA CORREÇÃO ---
  });

});