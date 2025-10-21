describe('Verificação da Página de QA', () => {

  beforeEach(() => {
    cy.visit('exercicio.html');
  });

  it('Deve ter o título principal correto', () => {
    // O seu HTML na verdade tem "Jornada para se tornar um -QA-"
    // Vamos corrigir isso também, usando .invoke('text') para limpar.
    cy.get('header h1')
      .invoke('text')
      .then(text => {
        const normalizedText = text.replace(/-/g, '').trim();
        expect(normalizedText).to.equal('Jornada do QA');
      });
  });

  it('Deve exibir todos os 6 cards com os títulos corretos', () => {
    
    // Este array DEVE bater 100% com seu HTML
    const expectedTitles = [
      'Passo 1: Entenda os Fundamentos',
      'Passo 2: Aprenda Conceitos Chave',
      'Passo 3: Domine as Ferramentas',
      'Passo 4: Desenvolv**a** Soft Skills', // GARANTIR QUE ESTÁ COM 'a'
      'Passo 5: Lógica e SQL',
      'Passo 6: Pratique!'
    ];

    cy.get('.card h2').as('cardTitles');
    cy.get('@cardTitles').should('have.length', 6);

    cy.get('@cardTitles').each((titleElement, index) => {
      
      const expectedText = expectedTitles[index];

      cy.wrap(titleElement)
        .invoke('text') 
        .then((actualText) => {
          // Limpa espaços em branco extras
          const normalizedText = actualText.replace(/\s+/g, ' ').trim();
          // Compara o texto limpo
          expect(normalizedText).to.equal(expectedText);
        });
    });
  });

});