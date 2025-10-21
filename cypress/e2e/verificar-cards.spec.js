describe('Verificação da Página de QA', () => {

  beforeEach(() => {
    // 1. Visita o seu arquivo HTML local
    // (O Cypress vai procurar o 'exercicio.html' na raiz do seu projeto)
    cy.visit('exercicio.html');
  });

  it('Deve ter o título principal correto', () => {
    cy.get('header h1').should('have.text', 'Jornada do QA');
  });

  it('Deve exibir todos os 6 cards com os títulos corretos', () => {
    
    // 2. Define os títulos que esperamos encontrar
    const expectedTitles = [
      'Passo 1: Entenda os Fundamentos',
      'Passo 2: Aprenda Conceitos Chave',
      'Passo 3: Domine as Ferramentas',
      'Passo 4: Desenvolve Soft Skills',
      'Passo 5: Lógica e SQL',
      'Passo 6: Pratique!'
    ];

    // 3. Pega todos os 'h2' que estão dentro de um '.card'
    cy.get('.card h2').as('cardTitles');

    // 4. Verifica se a quantidade está correta (6)
    cy.get('@cardTitles').should('have.length', 6);

    // 5. Faz um loop e verifica o texto de cada título
    cy.get('@cardTitles').each((titleElement, index) => {
      cy.wrap(titleElement).should('have.text', expectedTitles[index]);
    });
  });

});