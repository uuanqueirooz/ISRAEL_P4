describe('Verificação da Página de QA', () => {

  beforeEach(() => {
    cy.visit('exercicio.html');
  });

  it('Deve ter o título principal correto', () => {
    // Verifica se o h1 contém o texto esperado. É mais simples e direto.
    cy.get('header h1').should('have.text', 'Jornada do QA');
  });

  it('Deve exibir todos os 7 cards com os títulos corretos', () => {
    const expectedTitles = [
      'Passo 1: Entenda os Fundamentos',
      'Passo 2: Aprenda Conceitos Chave',
      'Passo 3: Domine as Ferramentas',
      'Passo 4: Desenvolva Soft Skills',
      'Passo 5: Lógica e SQL',
      'Passo 6: Pratique!',
      'Bônus: Recursos Adicionais'
    ];

    cy.get('.card h2').should('have.length', expectedTitles.length);

    cy.get('.card h2').each((cardTitle, index) => {
      cy.wrap(cardTitle).should('have.text', expectedTitles[index]);
    });
  });

  it('Deve verificar os links no card de Bônus', () => {
    // 1. Encontra o card de bônus pelo seu h2
    cy.get('.card')
      .contains('h2', 'Bônus: Recursos Adicionais')
      .parent() // Sobe para o elemento .card
      .as('bonusCard');

    // 2. Pega todos os links (tags 'a') dentro desse card
    cy.get('@bonusCard').find('ul li a').as('links');

    // 3. Verifica se são 3 links
    cy.get('@links').should('have.length', 3);

    // 4. Verifica se os links têm os atributos corretos
    cy.get('@links').eq(0)
      .should('have.text', 'Ministry of Testing')
      .and('have.attr', 'href', 'https://www.ministryoftesting.com/')
      .and('have.attr', 'target', '_blank');
      
    cy.get('@links').eq(1)
      .should('have.text', 'Software Testing Help')
      .and('have.attr', 'href', 'https://www.softwaretestinghelp.com/')
      .and('have.attr', 'target', '_blank');

    cy.get('@links').eq(2)
      .should('have.text', 'Cursos de Teste de Software na Udemy')
      .and('have.attr', 'href', 'https://www.udemy.com/topic/software-testing/')
      .and('have.attr', 'target', '_blank');
  });
  

});