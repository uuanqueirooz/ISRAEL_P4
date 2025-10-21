describe('Verificação da Página de QA', () => {

  beforeEach(() => {
    cy.visit('exercicio.html');
  });

  it('Deve ter o título principal correto', () => {
    // Verifica o h1, limpando os hífens que estão no HTML
    cy.get('header h1')
      .invoke('text')
      .then(text => {
        const normalizedText = text.replace(/-/g, '').trim();
        // O h1 no HTML é "Jornada do QA"
        expect(normalizedText).to.equal('Jornada do QA');
      });
  });

  // Este teste verifica os 6 cards originais
  it('Deve exibir todos os 6 cards com os títulos corretos', () => {
    
    const expectedTitles = [
      'Passo 1: Entenda os Fundamentos',
      'Passo 2: Aprenda Conceitos Chave',
      'Passo 3: Domine as Ferramentas',
      'Passo 4: Desenvolva Soft Skills', // Corrigido para "Desenvolva" com "a"
      'Passo 5: Lógica e SQL',
      'Passo 6: Pratique!'
    ];

    cy.get('.card h2').as('cardTitles');
    
    // Procura por 6 cards, já que o bônus está comentado no HTML
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


  /*
  // ---- NOVO TESTE (COMENTADO) ----
  // Este teste verifica especificamente os links do novo card.
  // Para usá-lo, descomente este bloco e o card no 'exercicio.html'.
  
  it('Deve verificar os links no card de Bônus', () => {
    
    // 1. Encontra o card de bônus pelo seu h2
    cy.get('.card')
      .contains('h2', 'Bônus: Recursos Adicionais')
      .as('bonusCard');

    // 2. Pega todos os links (tags 'a') dentro desse card
    cy.get('@bonusCard')
      .find('ul li a')
      .as('links');

    // 3. Verifica se são 3 links
    cy.get('@links').should('have.length', 3);

    // 4. Verifica se os links têm os atributos corretos
    cy.get('@links').eq(0)
      .should('have.text', 'Ministry of Testing')
      .and('have.attr', 'href', 'https_//www.ministryoftesting.com/')
      .and('have.attr', 'target', '_blank');
      
    cy.get('@links').eq(1)
      .should('have.text', 'Software Testing Help')
      .and('have.attr', 'href', 'https_//www.softwaretestinghelp.com/')
      .and('have.attr', 'target', '_blank');

    cy.get('@links').eq(2)
      .should('have.text', 'Cursos de Teste de Software na Udemy')
      .and('have.attr', 'href', 'https_//www.udemy.com/topic/software-testing/')
      .and('have.attr', 'target', '_blank');
  });
  */

});